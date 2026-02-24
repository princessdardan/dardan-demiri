"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { personalInfo } from "@/data";
import { Features } from "./features";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white/60 dark:bg-emerald-950/60 backdrop-blur-xl"
    >
      <Container>
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-emerald-950 dark:text-white mb-4 font-space-grotesk">
            About Me
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Get to know the person behind the code
          </p>
        </motion.div>

        {/* Two-column: text left, image right */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-6 order-2 md:order-1"
          >
            {personalInfo.about.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative order-1 md:order-2"
          >
            <motion.div
              whileHover={{ rotate: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-4 border-white dark:border-emerald-800 shadow-2xl"
            >
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Features below */}
        <Features />
      </Container>
    </section>
  );
}
