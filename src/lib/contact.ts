import { z } from "zod";

const serviceSchema = z.enum(["website", "seo", "email", "other"]);
export type ContactService = z.infer<typeof serviceSchema>;

export const contactServices: Record<ContactService, string> = {
  website: "Websites and booking",
  seo: "Technical SEO",
  email: "Email setup and automation",
  other: "Something else",
};

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().max(254).pipe(z.email("Enter a valid email address.")),
  message: z.string().trim().min(1, "Describe what you’d like to improve.").max(5000),
  service: serviceSchema.or(z.literal("")).optional(),
  website: z.string().trim().max(2048).transform((value) => {
    if (!value || value.includes("://")) return value;
    return `https://${value}`;
  }).pipe(z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
    error: "Enter a valid website address, such as example.com.",
  }).or(z.literal(""))).optional(),
  companyFax: z.string().optional(),
});

export type ContactFormData = z.input<typeof contactSchema>;

export const contactMessages = {
  invalid: "Check your details and try again.",
  limited: "Too many attempts. Wait a minute and try again.",
  failed: "I couldn’t receive your inquiry. Try again or use the direct email link.",
  received: "Thanks for reaching out. I typically reply within 1–2 business days.",
} as const;

export type ContactResult = keyof typeof contactMessages;
