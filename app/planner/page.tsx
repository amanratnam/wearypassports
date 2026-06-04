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
    <main
      className="bg-[#080808]"
      /* Clamp the full page to viewport height so the form is always in the first fold */
      style={{ minHeight: "100svh" }}
    >
      {/* ── Full-viewport split — no scroll needed ── */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ height: "100svh", paddingTop: "4rem" /* navbar */ }}
      >

        {/* LEFT — animated destination carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative lg:w-[52%] h-[42vw] max-h-[340px] lg:h-full lg:max-h-none"
        >
          <PlannerCarousel />
        </motion.div>

        {/* RIGHT — Personal Trip Planner form */}
        <div
          className="lg:w-[48%] flex flex-col justify-center overflow-y-auto"
          style={{ padding: "clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 4vw, 4rem)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="mb-6">
              <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/35 mb-2">
                Free · Instant · No signup
              </p>
              <h1 className="font-black text-white tracking-tight leading-none mb-2"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)" }}>
                Personal Trip Planner
              </h1>
              <p className="text-white/40 text-sm">
                Fill in the blanks — we&apos;ll handle everything else.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8 mb-6" />

            {/* Fill-in-the-blanks form */}
            <PlannerForm prefilledDestination={prefilledDestination} />
          </motion.div>
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
