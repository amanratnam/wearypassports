"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Buttery smooth scroll via Lenis, synced with GSAP ScrollTrigger.
 * Disabled entirely when the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: !reduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}
