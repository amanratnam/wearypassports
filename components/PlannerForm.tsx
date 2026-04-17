"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Calendar, Plane, Users, Tag, DollarSign, Sparkles, Loader2 } from "lucide-react";

const tripTypes    = ["leisure", "adventure", "honeymoon", "business", "family", "solo"];
const currencies   = ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)", "AED (د.إ)"];
const budgetStyles = ["budget", "mid-range", "luxury"];

interface Props {
  dark?: boolean;
  prefilledDestination?: string;
}

export default function PlannerForm({ dark = false, prefilledDestination = "" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destination: prefilledDestination,
    days: "5",
    travelFrom: "",
    travelers: "2",
    tripType: "leisure",
    currency: "INR (₹)",
    budgetStyle: "mid-range",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.destination || !form.travelFrom) return;
    setLoading(true);
    const p = new URLSearchParams({
      destination: form.destination,
      days: form.days,
      travelFrom: form.travelFrom,
      travelers: form.travelers,
      tripType: form.tripType,
      currency: form.currency.split(" ")[0],
      budgetStyle: form.budgetStyle,
    });
    setTimeout(() => router.push(`/result?${p.toString()}`), 1000);
  };

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const inputClass = dark
    ? "input-dark"
    : "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/25 transition-all duration-200";

  const selectClass = dark
    ? "select-dark"
    : "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/25 transition-all duration-200 appearance-none";

  const labelClass = "block text-xs font-semibold text-white/45 mb-1.5";
  const iconClass  = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="relative bg-[#111111] border border-white/10 rounded-3xl p-7 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Glow corners */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2563EB]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#7C3AED]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">AI Trip Planner</p>
              <p className="text-white/30 text-xs">Free · Instant · No signup</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Destination */}
            <div>
              <label className={labelClass}>Where do you want to go?</label>
              <div className="relative">
                <MapPin className={iconClass} />
                <input type="text" placeholder="Bali, Ladakh, Thailand, Japan…"
                  value={form.destination} onChange={(e) => update("destination", e.target.value)}
                  required className={`${inputClass} pl-10`} />
              </div>
            </div>

            {/* Days + Travelers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Days</label>
                <div className="relative">
                  <Calendar className={iconClass} />
                  <input type="number" min="1" max="30" value={form.days}
                    onChange={(e) => update("days", e.target.value)}
                    className={`${inputClass} pl-10`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Travelers</label>
                <div className="relative">
                  <Users className={iconClass} />
                  <input type="number" min="1" max="20" value={form.travelers}
                    onChange={(e) => update("travelers", e.target.value)}
                    className={`${inputClass} pl-10`} />
                </div>
              </div>
            </div>

            {/* Traveling from */}
            <div>
              <label className={labelClass}>Traveling from</label>
              <div className="relative">
                <Plane className={iconClass} />
                <input type="text" placeholder="Delhi, Mumbai, Bangalore…"
                  value={form.travelFrom} onChange={(e) => update("travelFrom", e.target.value)}
                  required className={`${inputClass} pl-10`} />
              </div>
            </div>

            {/* Trip type */}
            <div>
              <label className={labelClass}>Trip type</label>
              <div className="relative">
                <Tag className={iconClass} />
                <select value={form.tripType} onChange={(e) => update("tripType", e.target.value)}
                  className={`${selectClass} pl-10`}>
                  {tripTypes.map((t) => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Currency + Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Currency</label>
                <div className="relative">
                  <DollarSign className={iconClass} />
                  <select value={form.currency} onChange={(e) => update("currency", e.target.value)}
                    className={`${selectClass} pl-10`}>
                    {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Budget style</label>
                <select value={form.budgetStyle} onChange={(e) => update("budgetStyle", e.target.value)}
                  className={selectClass}>
                  {budgetStyles.map((b) => (
                    <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-bold rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.5)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Generating your plan…</>
              ) : (
                <><Sparkles className="w-4 h-4" />Generate My Trip Plan</>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
