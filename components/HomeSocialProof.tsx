"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Zap, Globe } from "lucide-react";

const badges = [
  { icon: Users, label: "Trusted by travelers", value: "10,000+" },
  { icon: TrendingUp, label: "Smart budgets", value: "Real costs" },
  { icon: Zap, label: "Fast itineraries", value: "< 30 sec" },
  { icon: Globe, label: "Destinations covered", value: "100+" },
];

export default function HomeSocialProof() {
  return (
    <section className="py-10 bg-white border-y border-[#F3F4F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2 py-5 px-4 rounded-2xl bg-[#F8FAFC] border border-[#F3F4F6]"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#F5F3FF] border border-[#DBEAFE] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={1.75} />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#111111] text-lg leading-tight">{value}</p>
                <p className="text-[#6B7280] text-xs mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
