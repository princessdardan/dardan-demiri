"use client";

import { motion } from "framer-motion";
import { features } from "@/data";
import { User, ShieldCheck, Zap, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types";

// Map feature index to icon (order matches data/index.ts features array)
const FEATURE_ICONS = [User, ShieldCheck, Zap, Code2];

// Rotating glow colors per card: purple → green → blue → red
const FEATURE_GLOW_CLASSES = [
  "dark:hover:shadow-[0_0_15px_var(--glow-primary)]",
  "dark:hover:shadow-[0_0_15px_var(--glow-green)]",
  "dark:hover:shadow-[0_0_15px_var(--glow-secondary)]",
  "dark:hover:shadow-[0_0_15px_var(--glow-red)]",
];

const FEATURE_ICON_COLORS = [
  "text-primary-600 dark:text-primary-400",
  "text-green-600 dark:text-green-400",
  "text-secondary-600 dark:text-secondary-400",
  "text-red-600 dark:text-red-400",
];

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
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl p-6",
        "bg-white dark:bg-primary-900/30",
        "border border-primary-100 dark:border-primary-800",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200",
        FEATURE_GLOW_CLASSES[index % FEATURE_GLOW_CLASSES.length]
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          "bg-primary-50 dark:bg-primary-800",
          "transition-colors duration-200 group-hover:bg-primary-100 dark:group-hover:bg-primary-700"
        )}
      >
        <Icon className={cn("h-5 w-5", FEATURE_ICON_COLORS[index % FEATURE_ICON_COLORS.length])} />
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <h3 className="font-space-grotesk text-base font-semibold text-primary-900 dark:text-primary-50">
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Features() {
  return (
    <section
      aria-label="Key qualities"
      className="w-full"
    >
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
