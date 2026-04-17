"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccordionDayPlan from "@/components/AccordionDayPlan";
import { generateMockItinerary } from "@/data/mockItinerary";
import {
  Plane, Hotel, UtensilsCrossed, Activity, Bus, Package,
  ArrowLeft, RefreshCw, Download, MapPin, Calendar, Users,
  Tag, Lightbulb, Info, Sparkles,
} from "lucide-react";

const budgetItems = [
  { key: "flights"       as const, label: "Flights",         icon: Plane,           color: "#60A5FA", bg: "rgba(96,165,250,0.1)"  },
  { key: "hotels"        as const, label: "Hotels",          icon: Hotel,           color: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  { key: "food"          as const, label: "Food & Dining",   icon: UtensilsCrossed, color: "#FCD34D", bg: "rgba(252,211,77,0.1)"  },
  { key: "activities"    as const, label: "Activities",      icon: Activity,        color: "#6EE7B7", bg: "rgba(110,231,183,0.1)" },
  { key: "transport"     as const, label: "Local Transport", icon: Bus,             color: "#67E8F9", bg: "rgba(103,232,249,0.1)" },
  { key: "miscellaneous" as const, label: "Miscellaneous",   icon: Package,         color: "#D1D5DB", bg: "rgba(209,213,219,0.1)" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function ResultPageContent() {
  const params    = useSearchParams();
  const router    = useRouter();

  const destination = params.get("destination") || "Bali";
  const days        = parseInt(params.get("days")      || "5");
  const travelFrom  = params.get("travelFrom")          || "Delhi";
  const travelers   = parseInt(params.get("travelers") || "2");
  const tripType    = params.get("tripType")             || "leisure";
  const currency    = params.get("currency")             || "INR";
  const budgetStyle = params.get("budgetStyle")          || "mid-range";

  const itinerary  = generateMockItinerary({ destination, travelFrom, days, travelers, tripType, currency, budgetStyle });
  const totalBudget = Object.values(itinerary.budget).reduce((a, b) => a + b, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">
        {/* Page header */}
        <div className="border-b border-white/8 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link href="/planner" className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white transition-colors mb-3">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Planner
                </Link>
                <h1 className="text-3xl font-black text-white tracking-tight">
                  Your {destination} Trip Plan
                </h1>
                <p className="text-white/35 text-sm mt-1 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                  AI-generated · Personalised for your travel style
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => router.refresh()} className="btn-ghost flex items-center gap-2 text-sm">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Regenerate
                </button>
                <button onClick={() => window.print()} className="btn-gradient flex items-center gap-2 text-sm">
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Trip overview */}
              <motion.div {...fadeUp(0)} className="card-dark">
                <h2 className="font-bold text-white text-base mb-6">Trip Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {[
                    { icon: MapPin,    label: "Destination", value: destination },
                    { icon: Calendar,  label: "Duration",    value: `${days} days` },
                    { icon: Users,     label: "Travelers",   value: `${travelers}` },
                    { icon: Tag,       label: "Trip Type",   value: tripType.charAt(0).toUpperCase() + tripType.slice(1) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center mb-2">
                        <Icon className="w-3.5 h-3.5 text-white/40" strokeWidth={1.75} />
                      </div>
                      <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="font-semibold text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/8 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                    <p className="label-caps mb-1">Best time to visit</p>
                    <p className="text-sm font-semibold text-white">{itinerary.bestTimeToVisit}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#D97706]/8 border border-[#D97706]/15">
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FCD34D]/70 mb-1">Visa Info</p>
                    <p className="text-sm font-semibold text-[#FCD34D]/80 leading-snug">{itinerary.visaInfo}</p>
                  </div>
                </div>
              </motion.div>

              {/* Day-by-day */}
              <div>
                <h2 className="font-black text-white text-xl mb-5 tracking-tight">Day-by-Day Itinerary</h2>
                <div className="space-y-3">
                  {itinerary.days_plan.map((day, i) => (
                    <AccordionDayPlan key={day.day} day={day} defaultOpen={i === 0} />
                  ))}
                </div>
              </div>

              {/* Tips */}
              <motion.div {...fadeUp(0.3)} className="card-dark">
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb className="w-5 h-5 text-[#FCD34D]" />
                  <h2 className="font-bold text-white text-base">Travel Tips for {destination}</h2>
                </div>
                <ul className="space-y-3">
                  {itinerary.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/55">
                      <span className="w-5 h-5 rounded-full bg-[#FCD34D]/10 text-[#FCD34D] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              {/* Total */}
              <motion.div
                {...fadeUp(0.15)}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1a2e] to-[#0e0e1f] border border-[#2563EB]/20 p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-white/30" />
                  <span className="text-white/40 text-xs font-medium">
                    Estimated total ({budgetStyle})
                  </span>
                </div>
                <p className="text-4xl font-black text-white tracking-tight mb-1">
                  {currency} {totalBudget.toLocaleString("en-IN")}
                </p>
                <p className="text-white/35 text-sm">{travelers} traveller{travelers > 1 ? "s" : ""} · {days} days</p>
                <div className="mt-4 pt-4 border-t border-white/8">
                  <p className="text-white/30 text-xs leading-relaxed">
                    Based on {budgetStyle} travel from {travelFrom}. Actual costs may vary.
                  </p>
                </div>
              </motion.div>

              {/* Breakdown */}
              <div>
                <p className="label-caps mb-4">Budget Breakdown</p>
                <div className="space-y-3">
                  {budgetItems.map(({ key, label, icon: Icon, color, bg }, i) => {
                    const amount = itinerary.budget[key];
                    const pct = Math.round((amount / totalBudget) * 100);
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="card-dark flex items-center gap-4 p-4"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                          <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-white/40 font-medium">{label}</p>
                            <span className="text-[10px] text-white/25">{pct}%</span>
                          </div>
                          <p className="font-bold text-white text-sm">{currency} {amount.toLocaleString("en-IN")}</p>
                          {/* Bar */}
                          <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                              className="h-full rounded-full"
                              style={{ background: color }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Link href="/planner" className="btn-ghost w-full justify-center flex">
                <ArrowLeft className="w-4 h-4" />
                Plan Another Trip
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
