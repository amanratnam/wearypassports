"use client";

import { motion } from "framer-motion";
import { Map, Wallet, CalendarCheck, FileText, Hotel, PenLine } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "AI Itinerary Builder",
    description: "Day-by-day plans tailored to your travel style, trip length, and interests — generated in seconds.",
    accent: "#60A5FA",
  },
  {
    icon: Wallet,
    title: "Trip Budget Estimator",
    description: "Realistic cost breakdowns covering flights, hotels, food, activities, and local transport.",
    accent: "#A78BFA",
  },
  {
    icon: CalendarCheck,
    title: "Best Time To Visit",
    description: "Know exactly when to go — weather patterns, peak seasons, and local events factored in.",
    accent: "#34D399",
  },
  {
    icon: FileText,
    title: "Visa Guidance",
    description: "Up-to-date visa requirements for Indian passport holders, with processing tips.",
    accent: "#FBBF24",
  },
  {
    icon: Hotel,
    title: "Hotel Suggestions",
    description: "Neighbourhood-aware recommendations matched to your budget and travel style.",
    accent: "#F472B6",
  },
  {
    icon: PenLine,
    title: "Editable Plans",
    description: "Your itinerary is a starting point, not a constraint. Adjust any part to fit your needs.",
    accent: "#60A5FA",
  },
];

export default function FeaturesGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map(({ icon: Icon, title, description, accent }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group cursor-default rounded-2xl border border-white/8 bg-[#111111] p-6 transition-all duration-300 hover:border-white/15 hover:bg-[#161616]"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
            style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
          >
            <Icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.75} />
          </div>
          <h3 className="font-bold text-white text-base mb-2.5 leading-snug group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">{description}</p>
        </motion.div>
      ))}
    </div>
  );
}
