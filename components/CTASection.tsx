"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111111] via-[#1a1a2e] to-[#16213e] p-12 md:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-r from-[#2563EB]/30 to-[#7C3AED]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
              AI-Powered Planning
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Your Next Trip
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>

            <p className="text-white/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Build a personalized travel plan in under 30 seconds. No signup
              required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#111111] text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/20"
              >
                Generate My Trip
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Explore Destinations
              </Link>
            </div>

            <p className="mt-8 text-white/60 text-sm">
              Free to use · Instant results · No account needed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
