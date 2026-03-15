"use client";

import { useEffect, useState } from "react";
import { WaveGlow } from "./wave-glow";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function BackgroundEffect() {
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <WaveGlow
        gridDistance={isMobile ? 8 : 5}
        pointSize={isMobile ? 1.5 : 2.0}
        waveSpeed={0.6}
        waveIntensity={6.0}
        glowIntensity={0.6}
        colorA="#FFC49B"
        colorB="#294C60"
        colorC="#ADB6C4"
        className="w-full h-full"
      />
    </div>
  );
}
