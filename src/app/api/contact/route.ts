import { createHash } from "node:crypto";
import { after, type NextRequest } from "next/server";
import { Resend } from "resend";
import { personalInfo } from "@/data";
import { contactMessages, contactSchema, contactServices, type ContactResult } from "@/lib/contact";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUEST_BYTES = 80 * 1024;
const attempts = new Map<string, { count: number; resetAt: number }>();
let nextCleanup = 0;

function allowAttempt(client: string) {
  const now = Date.now();
  if (now >= nextCleanup) {
    for (const [key, entry] of attempts) {
      if (entry.resetAt <= now) attempts.delete(key);
    }
    nextCleanup = now + RATE_LIMIT_WINDOW;
  }

  const entry = attempts.get(client);
  if (entry && entry.resetAt > now) {
    if (entry.count >= 3) return false;
    entry.count += 1;
  } else {
    if (attempts.size >= 2_000) return false;
    attempts.set(client, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }
  return true;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type")?.split(";")[0]?.trim();
  const isNativeForm = contentType === "application/x-www-form-urlencoded";

  function respond(result: ContactResult, status: number) {
    const headers = new Headers({ "Cache-Control": "no-store" });
    if (status === 429) headers.set("Retry-After", "60");

    if (isNativeForm) {
      headers.set("Location", `/contact/status?result=${result}`);
      return new Response(null, { status: 303, headers });
    }

    const payload = result === "received" ? { success: true } : { error: contactMessages[result] };
    return Response.json(payload, { status, headers });
  }

  const origin = request.headers.get("origin");
  const originHost = origin && URL.canParse(origin) ? new URL(origin).host : undefined;
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && originHost !== request.headers.get("host"))) {
    return respond("invalid", 403);
  }

  if (!isNativeForm && contentType !== "application/json") return respond("invalid", 415);

  let body: unknown;
  try {
    if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES) return respond("invalid", 413);
    const raw = await request.text();
    if (Buffer.byteLength(raw) > MAX_REQUEST_BYTES) return respond("invalid", 413);
    body = isNativeForm ? Object.fromEntries(new URLSearchParams(raw)) : JSON.parse(raw);
  } catch {
    return respond("invalid", 400);
  }

  const validated = contactSchema.safeParse(body);
  if (!validated.success) return respond("invalid", 400);

  const { name, email, message, service, website, companyFax } = validated.data;
  if (companyFax) return respond("invalid", 400);

  // Vercel injects this header at its edge. Other hosts share a local fallback bucket.
  const client = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "unknown";
  if (!allowAttempt(client)) return respond("limited", 429);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("Contact delivery is unavailable because the mail provider is not configured.");
    return respond("failed", 503);
  }

  const confirmationReplyTo = process.env.REPLY_TO?.trim() || personalInfo.email;
  const resend = new Resend(apiKey);
  const submissionId = createHash("sha256")
    .update(JSON.stringify([name, email, message, service || "", website || ""]))
    .digest("hex");
  const details = [
    ["Name", name],
    ["Email", email],
    ...(service ? [["Service", contactServices[service]]] : []),
    ...(website ? [["Website", website]] : []),
  ];

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: personalInfo.email,
      replyTo: email,
      subject: "Work Inquiry",
      text: `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nMessage:\n${message}`,
      html: `<h2>New project inquiry</h2>
${details.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("\n")}
<h3>Message</h3>
<p>${escapeHtml(message).replace(/\r?\n/g, "<br>")}</p>`,
    }, { idempotencyKey: `contact-owner/${submissionId}` });
    if (error || !data?.id) {
      console.error("Contact owner notification failed:", error?.name ?? "missing_message_id");
      return respond("failed", 503);
    }
  } catch {
    console.error("Contact owner notification failed unexpectedly.");
    return respond("failed", 503);
  }

  after(async () => {
    try {
      const { error } = await resend.emails.send({
        from,
        to: email,
        replyTo: confirmationReplyTo,
        subject: "I received your project inquiry",
        text: `Thanks for contacting me through dardandemiri.com. I’ll get back to you as soon as possible.\n\n${personalInfo.name}`,
      }, { idempotencyKey: `contact-confirmation/${submissionId}` });
      if (error) console.error("Contact visitor confirmation failed:", error.name);
    } catch {
      console.error("Contact visitor confirmation failed unexpectedly.");
    }
  });

  return respond("received", 200);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
