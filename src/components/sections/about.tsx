"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Code2, Lightbulb, Users, Zap } from "lucide-react";

interface AboutProps {
  photo?: string;
  photoAlt?: string;
  bio?: string;
  strengths?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

const defaultStrengths = [
  {
    title: "User-Focused",
    description:
      "I believe great software starts with understanding the people who use it. Every decision I make prioritizes the user experience.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Detail-Oriented",
    description:
      "The small things matter. I obsess over pixel-perfect implementations, smooth animations, and polished interactions.",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    title: "Performance-Driven",
    description:
      "Speed is a feature. I build applications that are fast, accessible, and work beautifully on any device.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Clean Code Advocate",
    description:
      "I write code that's readable, maintainable, and built to last. Today's shortcuts become tomorrow's headaches.",
    icon: <Code2 className="w-6 h-6" />,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function About({
  photo = "/images/profile.jpg",
  photoAlt = "Dardan Demiri",
  bio = `I'm a web developer who loves turning complex problems into elegant,
intuitive solutions. With a background in both design and engineering,
I bring a unique perspective to every project—balancing aesthetic appeal
with technical excellence.

When I'm not coding, you'll find me exploring new technologies, contributing
to open source, or enjoying the outdoors. I believe in continuous learning
and staying curious about the ever-evolving world of web development.

I approach every project as a partnership. I listen carefully, communicate
clearly, and deliver work I'm genuinely proud of. Whether you need a
stunning marketing site or a complex web application, I'm here to help
bring your vision to life.`,
  strengths = defaultStrengths,
}: AboutProps) {
  return (
    <Section id="about" className="bg-background-secondary">
      <Container>
        <SectionHeader
          title="About Me"
          subtitle="Get to know the person behind the code"
        />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-accent-muted">
              {/* Placeholder for photo - replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-accent">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12" />
                  </div>
                  <p className="text-sm text-foreground-muted">
                    Add your photo at
                    <br />
                    <code className="text-xs">/public/images/profile.jpg</code>
                  </p>
                </div>
              </div>
              {/* Uncomment when photo is added:
              <Image
                src={photo}
                alt={photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              */}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-6"
          >
            {bio.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground-muted leading-relaxed text-lg"
              >
                {paragraph.trim()}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Strengths/Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-xl bg-surface border border-border hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-muted text-accent flex items-center justify-center mb-4">
                {strength.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {strength.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
