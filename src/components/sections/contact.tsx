"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { useForm, type UseFormSetValue } from "react-hook-form";
import { personalInfo } from "@/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactMessages, contactSchema, contactServices, type ContactFormData, type ContactService } from "@/lib/contact";

const fieldClass = "mt-1 w-full rounded-lg border border-foreground-subtle bg-background px-3 py-2.5 text-white placeholder:text-foreground-muted aria-invalid:border-red-300";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1 text-sm text-red-300">{message}</p> : null;
}

function ServicePrefill({ setValue }: { setValue: UseFormSetValue<ContactFormData> }) {
  const service = useSearchParams().get("service");

  useEffect(() => {
    if (service && Object.hasOwn(contactServices, service)) {
      setValue("service", service as ContactService);
    }
  }, [service, setValue]);

  return null;
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const started = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const { register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (sent) successHeading.current?.focus();
  }, [sent]);

  async function onSubmit(data: ContactFormData) {
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20_000),
      });

      if (response.ok && (await response.json()).success === true) {
        setSent(true);
        track("project_inquiry_accepted", { service: data.service || "unspecified" });
      } else {
        setErrorMessage(response.status === 429 ? contactMessages.limited : contactMessages.failed);
      }
    } catch {
      setErrorMessage(contactMessages.failed);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-14 sm:py-20">
      <Container>
        <h2 id="contact-title" className="text-3xl text-white sm:text-4xl">Tell me about your project</h2>
        <p className="mb-7 mt-3 max-w-2xl text-foreground-muted">
          Share what you’d like to improve. A short description is enough to get started.
        </p>

        <div className="grid items-start gap-6 md:grid-cols-[3fr_2fr]">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
            {sent ? (
              <div className="space-y-4">
                <h3 ref={successHeading} tabIndex={-1} className="text-2xl text-white">Inquiry received</h3>
                <p className="text-foreground-muted">{contactMessages.received}</p>
                <Button asChild variant="outline"><a href="#work">Browse selected work</a></Button>
              </div>
            ) : (
              <form
                method="post"
                action="/api/contact"
                onSubmit={handleSubmit(onSubmit)}
                onFocus={(event) => {
                  if (started.current || !["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
                  started.current = true;
                  track("project_inquiry_started");
                }}
                className="space-y-4"
              >
                <Suspense fallback={null}><ServicePrefill setValue={setValue} /></Suspense>
                <div hidden>
                  <label htmlFor="contact-company-fax">Company fax</label>
                  <input id="contact-company-fax" autoComplete="off" tabIndex={-1} {...register("companyFax")} />
                </div>
                <div>
                  <label htmlFor="contact-name" className="font-medium text-white">Name</label>
                  <input
                    id="contact-name" autoComplete="name" required maxLength={120} className={fieldClass}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined}
                    {...register("name")}
                  />
                  <FieldError id="contact-name-error" message={errors.name?.message} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-medium text-white">Email</label>
                  <input
                    id="contact-email" type="email" autoComplete="email" required maxLength={254} className={fieldClass}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined}
                    {...register("email")}
                  />
                  <FieldError id="contact-email-error" message={errors.email?.message} />
                </div>
                <div>
                  <label htmlFor="contact-service" className="font-medium text-white">What can I help with?</label>{" "}
                  <span className="text-sm text-foreground-muted">(optional)</span>
                  <select id="contact-service" className={fieldClass} {...register("service")}>
                    <option value="">Select a service</option>
                    {Object.entries(contactServices).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-website" className="font-medium text-white">Current website</label>{" "}
                  <span className="text-sm text-foreground-muted">(optional)</span>
                  <input
                    id="contact-website" inputMode="url" autoComplete="url" maxLength={2048} placeholder="example.com" className={fieldClass}
                    aria-invalid={!!errors.website} aria-describedby={errors.website ? "contact-website-error" : undefined}
                    {...register("website")}
                  />
                  <FieldError id="contact-website-error" message={errors.website?.message} />
                </div>
                <div>
                  <label htmlFor="contact-message" className="font-medium text-white">What would you like to achieve?</label>
                  <textarea
                    id="contact-message" required rows={4} maxLength={5000} className={fieldClass}
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined}
                    {...register("message")}
                  />
                  <FieldError id="contact-message-error" message={errors.message?.message} />
                </div>

                <div role="alert">
                  {errorMessage && (
                    <p className="rounded-lg border border-red-500 bg-red-950 p-3 text-sm text-red-200">
                      {errorMessage}{" "}
                      {errorMessage === contactMessages.failed && (
                        <a href={`mailto:${personalInfo.email}`} className="font-medium underline">Email me directly</a>
                      )}
                    </p>
                  )}
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting} size="lg" className="min-h-11">
                    Send project inquiry
                  </Button>
                  <p role="status" className="mt-2 text-sm text-foreground-muted">
                    {isSubmitting ? "Sending your inquiry…" : ""}
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
            <h3 className="mb-3 text-xl text-white">What happens next</h3>
            <p className="text-foreground-muted">
              I typically reply within 1–2 business days. If the project looks like a fit,
              we’ll discuss your goals, scope, and timing before I put together a proposal.
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-4 inline-flex min-h-11 items-center font-medium text-accent hover:underline"
              onClick={() => track("project_email_clicked")}
            >
              Email me directly
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
