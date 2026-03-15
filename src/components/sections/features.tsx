"use client";

import { motion } from "framer-motion";
import { features } from "@/data";
import { User, ShieldCheck, Zap, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { Feature } from "@/types";

// Map feature index to icon (order matches data/index.ts features array)
const FEATURE_ICONS = [User, ShieldCheck, Zap, Code2];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];

  return (
    <GlowCard
      as={motion.article}
      glowColor="green"
      variants={cardVariants}
      whileHover={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col gap-4 p-8 rounded-2xl transition-all duration-200"
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          "bg-primary-100",
          "transition-colors duration-200"
        )}
      >
        <Icon className="h-5 w-5 text-neutral-900" />
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <h3 className="font-space-grotesk text-base font-semibold text-primary-50">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-200">
          {feature.description}
        </p>
      </div>
    </GlowCard>
  );
}

export function Features() {
  return (
    <section
      aria-label="Key qualities"
      className="w-full"
    >
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
