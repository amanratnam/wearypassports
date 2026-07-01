"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlannerForm from "@/components/PlannerForm";
import PlannerCarousel from "@/components/PlannerCarousel";
import { motion } from "framer-motion";
import { PassportStamp } from "@/components/clay/SceneElements";

function PlannerContent() {
  const params = useSearchParams();
  const prefilledDestination = params.get("destination") || "";

  return (
    <main className="paper-texture" style={{ minHeight: "100svh" }}>
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "100svh", paddingTop: "68px" }}>

        {/* LEFT — destination carousel */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          className="relative lg:w-[52%] h-[46vw] max-h-[380px] lg:h-auto lg:max-h-none lg:min-h-[calc(100svh-68px)] p-3 lg:p-4"
        >
          <div className="relative w-full h-full overflow-hidden rounded-4xl shadow-soft-lg">
            <PlannerCarousel />
          </div>
        </motion.div>

        {/* RIGHT — the journal page */}
        <div
          className="lg:w-[48%] flex flex-col justify-center relative"
          style={{ padding: "clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 4rem)" }}
        >
          <PassportStamp label="PLAN" sub="ROUTE" color="#C56B4A"
            className="absolute top-8 right-8 w-20 opacity-70 hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
              <p className="eyebrow mb-4">Free · Instant · No signup</p>
              <h1 className="d-2 text-ink mb-3">Fill in the<br /><span className="italic-serif text-forest-800">blanks.</span></h1>
              <p className="body text-text-2">Tell the journal where you&apos;re headed — we&apos;ll draw the rest.</p>
            </div>
            <div className="h-px bg-[color:var(--line)] mb-8" />
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
        <div className="min-h-screen paper-texture flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-forest-800 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <PlannerContent />
      </Suspense>
    </>
  );
}
