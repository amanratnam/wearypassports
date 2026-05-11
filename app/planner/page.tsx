"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlannerForm from "@/components/PlannerForm";
import PlannerCarousel from "@/components/PlannerCarousel";
import { motion } from "framer-motion";

function PlannerContent() {
  const params = useSearchParams();
  const prefilledDestination = params.get("destination") || "";

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Full-height split */}
      <div className="flex flex-col lg:flex-row lg:min-h-screen pt-16">

        {/* ── LEFT: Carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative lg:w-[55%] h-[56vw] max-h-[400px] lg:max-h-none lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:self-start"
        >
          <PlannerCarousel />
        </motion.div>

        {/* ── RIGHT: Form ── */}
        <div className="lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-12 lg:py-16 bg-[#080808]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/25 text-[#60A5FA] text-xs font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
              AI Trip Planner · Free · Instant
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white leading-[0.92] tracking-[-0.03em] mb-3">
              Your plan,
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
                in 30 seconds.
              </span>
            </h1>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              Tell us where you&apos;re going. We&apos;ll handle the rest —
              day-by-day itinerary, real budget, visa info.
            </p>

            <PlannerForm prefilledDestination={prefilledDestination} dark />
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t border-white/6 py-4 overflow-hidden bg-[#080808]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-[0.2em] uppercase text-white/12 pr-4">
              Bali · Ladakh · Thailand · Japan · Goa · Dubai · Santorini · Maldives · Rajasthan · Vietnam · Singapore · Europe ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function PlannerPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <PlannerContent />
      </Suspense>
    </>
  );
}
