"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DownloadButtonProps {
  onDownload?: () => void;
}

export const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    if (isDownloading) return;

    setIsDownloading(true);
    onDownload?.();

    setTimeout(() => {
      setIsDownloading(false);
    }, 3500);
  };

  return (
    <motion.button
      onClick={handleDownloadClick}
      className={`relative flex items-center gap-3 rounded-lg pl-3 pr-7 py-3 text-lg font-semibold transition-colors
        ${isDownloading ? "cursor-wait bg-accent" : "cursor-pointer bg-accent hover:bg-accent-hover active:scale-[0.98]"}`}
    >
      {/* Inner circle */}
      <div className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center overflow-hidden shrink-0">
        {/* Progress fill — rises from bottom */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-primary-800"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              exit={{ height: "0%", opacity: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Spinner dot — orbits inside the circle via CSS animation */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="absolute w-2 h-2 bg-white rounded-full z-20 animate-[orbit_1.5s_linear_infinite]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Loading dot — centered */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-white z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Download icon — visible at rest */}
        <AnimatePresence>
          {!isDownloading && (
            <motion.svg
              className="w-5 h-5 text-accent-foreground z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 5v14m0 0-4-4m4 4 4-4"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Text label — always visible */}
      <span className="text-accent-foreground select-none">Download Resume</span>
    </motion.button>
  );
};
