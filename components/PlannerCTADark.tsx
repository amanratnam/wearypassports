"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function PlannerCTADark() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/planner?destination=${encodeURIComponent(destination)}`);
    }, 800);
  };

  const suggestions = ["Bali", "Ladakh", "Thailand", "Japan", "Goa", "Dubai", "Rajasthan", "Maldives"];

  return (
    <section className="relative bg-[#080808] py-28 px-4 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#2563EB]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/55 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            AI Trip Planner · Free · Instant
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.92] tracking-tight mb-6">
            Where are you
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
              going next?
            </span>
          </h2>
          <p className="text-white/65 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Type a destination. Get a full itinerary and budget in 30 seconds.
            No account needed.
          </p>

          <form onSubmit={submit} className="relative max-w-lg mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus-within:border-white/30 transition-colors duration-200">
              <Sparkles className="w-5 h-5 text-white/55 flex-shrink-0" />
              <input
                type="text"
                placeholder="Try: Bali, Ladakh, Thailand, Paris…"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 bg-transparent text-white text-base placeholder:text-white/45 focus:outline-none"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-200 disabled:opacity-60 flex-shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                {loading ? "..." : "Plan it"}
              </motion.button>
            </div>
          </form>

          {/* Quick picks */}
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setDestination(s); }}
                className="px-4 py-2 rounded-full border border-white/20 text-white/65 text-xs font-medium hover:border-white/40 hover:text-white transition-all duration-200 hover:scale-105"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
