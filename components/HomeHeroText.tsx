"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomeHeroText() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl"
    >
      {/* Eyebrow */}
      <motion.div variants={item} className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#EFF6FF] to-[#F5F3FF] border border-[#BFDBFE] text-xs font-semibold text-[#2563EB]">
          <Sparkles className="w-3 h-3" />
          AI Powered Travel Planning
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={item}
        className="text-5xl sm:text-6xl lg:text-[64px] font-extrabold text-[#111111] leading-[1.05] tracking-[-0.03em] mb-6"
      >
        Plan Better Trips
        <br />
        <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
          with AI
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={item}
        className="text-[#6B7280] text-lg sm:text-xl leading-relaxed mb-8 max-w-md"
      >
        Create personalized itineraries, realistic budgets, and day-wise
        travel plans in seconds.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"
      >
        <Link
          href="/planner"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-semibold rounded-xl shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <Sparkles className="w-4 h-4" />
          Start Planning
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E5E7EB] text-[#111111] text-sm font-semibold rounded-xl hover:bg-[#F8FAFC] hover:border-[#D1D5DB] transition-all duration-200"
        >
          Explore Blogs
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Trust indicators */}
      <motion.div variants={item} className="flex flex-wrap gap-x-5 gap-y-2">
        {["Free to use", "Instant plans", "No signup required"].map((text) => (
          <span
            key={text}
            className="flex items-center gap-1.5 text-sm text-[#6B7280]"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
            {text}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
