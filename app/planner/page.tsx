"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlannerForm from "@/components/PlannerForm";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Clock, Map, Wallet, FileText } from "lucide-react";

const perks = [
  { icon: Map,         text: "Day-by-day itinerary" },
  { icon: Wallet,      text: "Realistic budget breakdown" },
  { icon: CheckCircle, text: "Visa requirements" },
  { icon: Clock,       text: "Best time to visit" },
  { icon: FileText,    text: "Hotel suggestions" },
  { icon: Sparkles,    text: "Local travel tips" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function PlannerContent() {
  const params = useSearchParams();
  const prefilledDestination = params.get("destination") || "";

  return (
    <main className="min-h-screen bg-[#080808] pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/85 via-[#080808]/70 to-[#080808] z-[1]" />
        {/* Ambient */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2563EB]/7 blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[100px] pointer-events-none z-[2]" />

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-lg"
            >
              <motion.div variants={fadeUp}>
                <span className="badge-accent mb-6 inline-flex">
                  <Sparkles className="w-3 h-3" />
                  AI Trip Planner · Free · Instant
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl font-black text-white leading-[0.9] tracking-[-0.03em] mb-6"
              >
                Your plan,
                <br />
                <span className="gradient-text">in 30 seconds.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-white/45 text-lg leading-relaxed mb-10">
                Type your destination. We&apos;ll build a complete day-by-day itinerary
                with a realistic budget — tailored to how you travel.
              </motion.p>

              {/* Perks grid */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
                {perks.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#60A5FA]" strokeWidth={1.75} />
                    </div>
                    <span className="text-sm text-white/55">{text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Trust bar */}
              <motion.div
                variants={fadeUp}
                className="mt-10 p-5 rounded-2xl bg-white/3 border border-white/8"
              >
                <p className="text-white/80 text-sm font-semibold mb-1">100% free, always.</p>
                <p className="text-white/35 text-sm leading-relaxed">
                  No account required. No credit card. Generate as many plans as you want.
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlannerForm prefilledDestination={prefilledDestination} dark />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom marquee of destinations */}
      <div className="border-t border-white/6 py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-[0.2em] uppercase text-white/15 pr-4">
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
