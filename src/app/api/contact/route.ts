import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(20).max(5000),
});

// Rate limiting: simple in-memory store (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message } = validatedData.data;

    // Check for reCAPTCHA token if configured
    const recaptchaToken = body.recaptchaToken;
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
      const recaptchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
          }),
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed" },
          { status: 400 }
        );
      }
    }

    // Send email via Resend (if configured)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "hello@dardandemiri.com",
        replyTo: email,
        subject: `New contact from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `.trim(),
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<h3>Message:</h3>
<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `.trim(),
      });
    } else {
      // Log to console if Resend not configured (development)
      console.log("Contact form submission:", { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// Helper to escape HTML
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
