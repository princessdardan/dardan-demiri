"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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
      className="relative py-24 bg-primary-950/90 backdrop-blur-xl text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-700/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary-600/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-tertiary-600/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-red-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-green-600/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-space-grotesk">
            Get in Touch
          </h2>
          <p className="text-lg text-primary-300">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
            className="bg-primary-900/50 p-8 rounded-2xl border border-primary-800/50"
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
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as const }}
            className="bg-white dark:bg-primary-900 p-8 rounded-2xl shadow-xl text-primary-950 dark:text-primary-50"
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
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-6 dark:shadow-[0_0_12px_var(--glow-green)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-primary-950 dark:text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
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
                    <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-start gap-3 dark:shadow-[0_0_8px_var(--glow-red)]">
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-red-800 dark:text-red-300">{errorMessage}</p>
                        <div className="mt-2 flex gap-3">
                          <button
                            onClick={handleRetry}
                            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          >
                            Try again
                          </button>
                          <a
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
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
                        className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-950 dark:text-primary-50",
                          "bg-primary-50 dark:bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-primary-500",
                          errors.name
                            ? "border-red-500"
                            : "border-primary-100 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600"
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
                        className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-950 dark:text-primary-50",
                          "bg-primary-50 dark:bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-primary-500",
                          errors.email
                            ? "border-red-500"
                            : "border-primary-100 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600"
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
                        className="block text-sm font-medium text-primary-900 dark:text-primary-100 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-primary-950 dark:text-primary-50 resize-none",
                          "bg-primary-50 dark:bg-primary-800",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-primary-500",
                          errors.message
                            ? "border-red-500"
                            : "border-primary-100 dark:border-primary-700 hover:border-primary-300 dark:hover:border-primary-600"
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

                    <p className="text-sm text-center text-gray-400 dark:text-primary-500">
                      I typically respond within 1–2 business days
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
