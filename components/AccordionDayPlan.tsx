"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sun, Cloud, Moon } from "lucide-react";
import { ItineraryDay } from "@/data/mockItinerary";
import { cn } from "@/lib/utils";

interface Props { day: ItineraryDay; defaultOpen?: boolean; }

const periods = [
  { key: "morning"   as const, label: "Morning",   icon: Sun,   color: "#FCD34D" },
  { key: "afternoon" as const, label: "Afternoon",  icon: Cloud, color: "#60A5FA" },
  { key: "evening"   as const, label: "Evening",    icon: Moon,  color: "#A78BFA" },
];

export default function AccordionDayPlan({ day, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn(
      "border rounded-2xl overflow-hidden transition-all duration-200",
      open ? "border-white/14 bg-[#111111]" : "border-white/8 bg-[#0d0d0d] hover:border-white/12"
    )}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/15 to-[#7C3AED]/15 border border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-black text-white">{day.day}</span>
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{day.date}</p>
            <p className="text-white/35 text-xs mt-0.5">{day.theme}</p>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-white/25 transition-transform duration-300 flex-shrink-0", open && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-white/8 pt-5">
              {periods.map(({ key, label, icon: Icon, color }) => {
                const act = day[key];
                return (
                  <div key={key} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}12` }}>
                      <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold" style={{ color }}>{label}</span>
                        <span className="text-xs text-white/25">{act.time}</span>
                      </div>
                      <p className="font-semibold text-white text-sm mb-1">{act.activity}</p>
                      <p className="text-white/45 text-sm leading-relaxed mb-2">{act.description}</p>
                      <span className="inline-flex items-center text-xs text-[#6EE7B7] bg-[#6EE7B7]/8 border border-[#6EE7B7]/15 px-2.5 py-1 rounded-full font-medium">
                        Est. {act.estimatedCost}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
