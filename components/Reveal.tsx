"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

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
 * Scroll-reveal wrapper. Fades + rises into place once.
 * No-ops under prefers-reduced-motion (content shows immediately).
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, [y, delay, stagger]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
