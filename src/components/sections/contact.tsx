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
      className="relative py-24 bg-emerald-950/90 backdrop-blur-xl text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-teal-700/20 blur-3xl pointer-events-none"
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
          <p className="text-lg text-emerald-300">
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
            className="bg-emerald-900/50 p-8 rounded-2xl border border-emerald-800/50"
          >
            <h3 className="text-xl font-space-grotesk font-semibold text-white mb-6">
              Contact Information
            </h3>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 text-emerald-300 hover:text-white transition-colors duration-150 mb-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800/60 border border-emerald-700">
                <Mail className="w-5 h-5" />
              </div>
              <span>{personalInfo.email}</span>
            </a>

            {/* Social profiles */}
            <div>
              <p className="text-sm text-emerald-400 mb-4 uppercase tracking-wider font-medium">
                Find me online
              </p>
              <div className="flex items-center gap-3">
                {personalInfo.socials.github && (
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800/60 border border-emerald-700 text-emerald-300 hover:text-white hover:border-emerald-500 transition-colors duration-150"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800/60 border border-emerald-700 text-emerald-300 hover:text-white hover:border-emerald-500 transition-colors duration-150"
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
            className="bg-white dark:bg-emerald-900 p-8 rounded-2xl shadow-xl text-emerald-950 dark:text-emerald-50"
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
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-emerald-950 dark:text-white mb-3">
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
                            href={`mailto:${personalInfo.email}`}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
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
                        className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-emerald-950 dark:text-emerald-50",
                          "bg-emerald-50 dark:bg-emerald-800",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-emerald-500",
                          errors.name
                            ? "border-red-500"
                            : "border-emerald-100 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600"
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
                        className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        {...register("email")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-emerald-950 dark:text-emerald-50",
                          "bg-emerald-50 dark:bg-emerald-800",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-emerald-500",
                          errors.email
                            ? "border-red-500"
                            : "border-emerald-100 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600"
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
                        className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register("message")}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-emerald-950 dark:text-emerald-50 resize-none",
                          "bg-emerald-50 dark:bg-emerald-800",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                          "placeholder:text-gray-400 dark:placeholder:text-emerald-500",
                          errors.message
                            ? "border-red-500"
                            : "border-emerald-100 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600"
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

                    <p className="text-sm text-center text-gray-400 dark:text-emerald-500">
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
