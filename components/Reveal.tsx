"use client";

import { useRef, useEffect, ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** stagger direct children instead of the wrapper */
  stagger?: boolean;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Scroll-reveal wrapper. Fades + rises into place once, via CSS transitions
 * toggled by IntersectionObserver — compositor-driven, so it stays smooth and
 * never leaves content stuck hidden if the main thread is busy. No-ops (shows
 * immediately) under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className,
  y = 34,
  delay = 0,
  stagger = false,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    if (stagger) {
      Array.from(el.children).forEach((c, i) => {
        (c as HTMLElement).style.transitionDelay = `${delay + i * 0.09}s`;
      });
    }

    // Reveal immediately if already in or above the viewport (e.g. deep links).
    const initial = el.getBoundingClientRect();
    if (initial.top < window.innerHeight * 0.9) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, stagger]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  const style = { "--reveal-y": `${y}px`, "--reveal-d": `${delay}s` } as CSSProperties;

  return (
    // @ts-expect-error dynamic tag with data-reveal attrs
    <Tag ref={ref} className={className} style={style} {...(stagger ? { "data-reveal-stagger": "" } : { "data-reveal": "" })}>
      {children}
    </Tag>
  );
}
