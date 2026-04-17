"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FloatingDestCards from "./FloatingDestCards";
import { Sparkles, ArrowDown } from "lucide-react";

const words = ["Bali", "Ladakh", "Tokyo", "Goa", "Santorini", "Rajasthan", "Maldives", "Thailand"];

export default function HomeHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#080808] flex items-center justify-center overflow-hidden grain-overlay">
      {/* Ambient light blob */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#2563EB]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#7C3AED]/6 blur-[100px] pointer-events-none" />

      {/* Floating destination cards */}
      <FloatingDestCards />

      {/* Center content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#60A5FA]" />
            AI-Powered Travel Planning
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black text-white leading-[0.88] tracking-[-0.04em] mb-4"
        >
          PLAN YOUR
          <br />
          TRIP TO
        </motion.h1>

        {/* Rotating destination word */}
        <div className="h-[1.1em] overflow-hidden mb-8">
          <motion.div
            key={wordIdx}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black leading-[0.88] tracking-[-0.04em] bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent"
          >
            {words[wordIdx].toUpperCase()}
          </motion.div>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/40 text-base sm:text-lg max-w-sm mx-auto leading-relaxed mb-10 pointer-events-auto"
        >
          From the ghats of Varanasi to the beaches of Bali — get a personalized
          AI itinerary in 30 seconds. Free.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <Link
            href="/planner"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold rounded-2xl hover:bg-white/90 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <Sparkles className="w-4 h-4" />
            Start Planning — It&apos;s Free
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white/70 text-sm font-semibold rounded-2xl hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            Read travel stories
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}
