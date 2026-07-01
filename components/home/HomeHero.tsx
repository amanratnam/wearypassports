"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { DriftingClouds, BirdFlock, MountainRidge, PassportStamp, PineTree } from "@/components/clay/SceneElements";
import { ClayBackpacker } from "@/components/clay/ClayCharacters";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // intro
      gsap.from("[data-hero-line]", {
        yPercent: 120, opacity: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15,
      });
      gsap.from("[data-hero-fade]", { opacity: 0, y: 20, duration: 1, ease: "power2.out", delay: 0.7, stagger: 0.1 });

      // parallax layers on scroll
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]");
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || "0");
        gsap.to(layer, {
          yPercent: depth * 22,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden paper-texture grain flex flex-col">
      {/* sky wash */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#FAF9F5 0%,#F1EFE4 42%,#E7EADD 100%)" }} />
      <DriftingClouds tone="#FFFFFF" />

      {/* birds */}
      <div data-depth="-0.4" className="absolute left-[12%] top-[22%]">
        <BirdFlock />
      </div>
      <div data-depth="-0.6" className="absolute right-[18%] top-[16%] scale-75">
        <BirdFlock />
      </div>

      {/* headline block */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="wrap w-full pt-24">
          <div className="max-w-4xl">
            <p data-hero-fade className="eyebrow mb-6">An interactive travel journal</p>
            <h1 className="d-hero text-ink">
              <span className="block overflow-hidden"><span data-hero-line className="block">The world is</span></span>
              <span className="block overflow-hidden"><span data-hero-line className="block">best read</span></span>
              <span className="block overflow-hidden"><span data-hero-line className="block italic-serif" style={{ color: "var(--forest-800)" }}>on foot.</span></span>
            </h1>
            <p data-hero-fade className="body-lg text-text-2 max-w-xl mt-8">
              Field notes, hand-drawn routes and honest budgets for people who&apos;d rather
              wander than rush. Open the journal — the next page is blank on purpose.
            </p>
            <div data-hero-fade className="flex flex-wrap gap-4 mt-10">
              <Link href="/planner" className="btn-forest">Plan a Journey</Link>
              <Link href="/blog" className="btn-outline">Read Field Notes</Link>
            </div>
          </div>
        </div>
      </div>

      {/* passport stamp accent */}
      <div data-hero-fade className="absolute right-[6%] top-[26%] w-28 md:w-40 z-20 hidden sm:block">
        <PassportStamp label="DEPART" sub="WEARY" color="#C56B4A" />
      </div>

      {/* layered landscape */}
      <div className="relative z-10 h-[42vh] min-h-[280px]">
        <MountainRidge data-depth="0.2" fill="#9DBE8F" className="absolute bottom-[38%] left-0 w-full h-[60%] opacity-70" style={{}} />
        <MountainRidge data-depth="0.5" fill="#5C8A5B" className="absolute bottom-[20%] left-0 w-full h-[70%] opacity-90" />
        <MountainRidge data-depth="0.9" fill="#1F4D36" className="absolute bottom-0 left-0 w-full h-[75%]" />

        {/* trees */}
        <PineTree className="absolute bottom-[6%] left-[8%] w-12 md:w-16 z-10" />
        <PineTree className="absolute bottom-[3%] left-[16%] w-16 md:w-24 z-10" />
        <PineTree className="absolute bottom-[5%] right-[10%] w-14 md:w-20 z-10" />

        {/* walking backpacker */}
        <div className="absolute bottom-[2%] left-[38%] w-24 md:w-32 z-20">
          <ClayBackpacker />
        </div>
      </div>

      {/* scroll cue */}
      <div data-hero-fade className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-forest-700">
        <span className="text-[0.65rem] font-bold tracking-[0.28em] uppercase">Scroll to wander</span>
        <ArrowDown className="w-4 h-4 a-float" />
      </div>
    </section>
  );
}
