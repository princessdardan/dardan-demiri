"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  email?: string;
  responseTime?: string;
}

export function Contact({
  email = "dardemiri@gmail.com",
  responseTime = "1-2 business days",
}: ContactProps) {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormState("success");
      reset();
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        "Something went wrong. Please try again or email me directly."
      );
    }
  };

  const handleRetry = () => {
    setFormState("idle");
    setErrorMessage("");
  };

  return (
    <Section id="contact" className="bg-background-secondary">
      <Container size="narrow">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have a project in mind? Let's talk about how I can help."
        />

        <div className="max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              // Success State - replaces form
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Message Sent!
                </h3>
                <p className="text-foreground-muted mb-6">
                  Thanks for reaching out. I&rsquo;ll get back to you within{" "}
                  {responseTime}.
                </p>
                <Button variant="outline" asChild>
                  <a href="#portfolio">Browse My Work</a>
                </Button>
              </motion.div>
            ) : (
              // Form State
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Error Banner */}
                {formState === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-800">{errorMessage}</p>
                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={handleRetry}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Try again
                        </button>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Email directly
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      autoComplete="name"
                      {...register("name")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-surface text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        "placeholder:text-foreground-subtle",
                        errors.name
                          ? "border-red-500"
                          : "border-border hover:border-foreground-subtle"
                      )}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      {...register("email")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-surface text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        "placeholder:text-foreground-subtle",
                        errors.email
                          ? "border-red-500"
                          : "border-border hover:border-foreground-subtle"
                      )}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-surface text-foreground resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                        "placeholder:text-foreground-subtle",
                        errors.message
                          ? "border-red-500"
                          : "border-border hover:border-foreground-subtle"
                      )}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Response Time Note */}
                  <p className="text-sm text-center text-foreground-muted">
                    I typically respond within {responseTime}
                  </p>
                </form>

                {/* Alternative Contact */}
                <div className="mt-8 pt-8 border-t border-border text-center">
                  <p className="text-sm text-foreground-muted mb-3">
                    Prefer email?
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    {email}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
