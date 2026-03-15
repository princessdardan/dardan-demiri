"use client";

import React, { useEffect, useRef, type ReactNode } from 'react';
import { cn } from "@/lib/utils";

type GlowColor = 'pink' | 'purple' | 'green' | 'blue' | 'red' | 'orange';

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  pink:   { base: 25, spread: 30 },
  purple: { base: 204, spread: 30 },
  green:  { base: 155, spread: 30 },
  blue:   { base: 200, spread: 30 },
  red:    { base: 0, spread: 30 },
  orange: { base: 30, spread: 30 },
};

interface GlowCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: ReactNode;
  glowColor?: GlowColor;
  // Allow any additional props to pass through (e.g. Framer Motion)
  [key: string]: unknown;
}

function GlowCard({
  as: Component = 'div',
  children,
  className,
  glowColor = 'green',
  style,
  ...rest
}: GlowCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const { clientX: x, clientY: y } = e;
      el.style.setProperty('--x', x.toFixed(2));
      el.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
      el.style.setProperty('--y', y.toFixed(2));
      el.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const glowStyles = {
    '--base': base,
    '--spread': spread,
    '--radius': '14',
    '--border': '3',
    '--backdrop': 'hsl(0 0% 60% / 0.12)',
    '--backup-border': 'var(--backdrop)',
    '--size': '200',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: 'var(--backdrop, transparent)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative' as const,
    touchAction: 'none' as const,
    ...(style as Record<string, unknown>),
  } as React.CSSProperties;

  return (
    <Component
      ref={cardRef}
      data-glow
      style={glowStyles}
      className={cn(
        "rounded-2xl relative backdrop-blur-[5px] shadow-[0_1rem_2rem_-1rem_black]",
        className
      )}
      {...rest}
    >
      <div data-glow-inner />
      {children}
    </Component>
  );
}

export { GlowCard };
export type { GlowCardProps };
