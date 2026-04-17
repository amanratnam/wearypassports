"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="card group cursor-default"
    >
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#F5F3FF] border border-[#DBEAFE] flex items-center justify-center mb-5 transition-all duration-300 group-hover:from-[#2563EB]/10 group-hover:to-[#7C3AED]/10 group-hover:border-[#BFDBFE]">
        <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
      </div>
      <h3 className="font-semibold text-[#111111] text-base mb-2.5 leading-snug">
        {title}
      </h3>
      <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
