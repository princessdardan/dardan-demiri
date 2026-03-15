"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/data";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
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
    } catch {
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
    <section
      id="contact"
      className="relative py-24 section-overlay-dense text-white overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 font-space-grotesk brand-gradient-text inline-block">
            Get in Touch
          </h2>
          <p className="text-lg text-primary-300">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Contact info */}
          <GlowCard
            as={motion.div}
            glowColor="green"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
            className="p-8 rounded-2xl"
          >
            <h3 className="text-xl font-space-grotesk font-semibold text-white mb-6">
              Contact Information
            </h3>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 text-primary-300 hover:text-white transition-colors duration-150 mb-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800/60 border border-primary-700">
                <Mail className="w-5 h-5" />
              </div>
              <span>{personalInfo.email}</span>
            </a>

            {/* Social profiles */}
            <div>
              <p className="text-sm text-primary-400 mb-4 uppercase tracking-wider font-medium">
                Find me online
              </p>
              <div className="flex items-center gap-3">
                {personalInfo.socials.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800/60 border border-primary-700 text-primary-300 hover:text-white hover:border-secondary-500 hover:shadow-[0_0_12px_var(--glow-secondary)] transition-all duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.socials.linkedin && (
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800/60 border border-primary-700 text-primary-300 hover:text-white hover:border-secondary-500 hover:shadow-[0_0_12px_var(--glow-secondary)] transition-all duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </GlowCard>

          {/* RIGHT: Form */}
          <GlowCard
            as={motion.div}
            glowColor="pink"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
            className="p-8 rounded-2xl shadow-xl text-primary-50"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-900/50 text-green-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_12px_var(--glow-green)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-foreground-muted mb-6">
                    Thanks for reaching out. I&rsquo;ll get back to you within 1–2 business days.
                  </p>
                  <Button variant="outline">
                    Browse My Work
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Error Banner */}
                  {formState === "error" && (
                    <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-800 flex items-start gap-3 shadow-[0_0_8px_var(--glow-red)]">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-red-300">{errorMessage}</p>
                        <div className="mt-2 flex gap-3">
                          <button
                            onClick={handleRetry}
                            className="text-sm font-medium text-red-400 hover:text-red-300"
                          >
                            Try again
                          </button>
                          <a
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm font-medium text-red-400 hover:text-red-300"
                          >
                            Email directly
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-primary-100 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-50",
                          "bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-primary-500",
                          errors.name
                            ? "border-red-500"
                            : "border-primary-700 hover:border-primary-600"
                        )}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-primary-100 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-50",
                          "bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-primary-500",
                          errors.email
                            ? "border-red-500"
                            : "border-primary-700 hover:border-primary-600"
                        )}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-primary-100 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-50 resize-none",
                          "bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-primary-500",
                          errors.message
                            ? "border-red-500"
                            : "border-primary-700 hover:border-primary-600"
                        )}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
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

                    <p className="text-sm text-center text-primary-500">
                      I typically respond within 1–2 business days
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </GlowCard>
        </div>
      </Container>
    </section>
  );
}
