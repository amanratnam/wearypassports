"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface BudgetCardProps {
  label: string;
  amount: number;
  currency: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  percentage?: number;
  index?: number;
}

export default function BudgetCard({
  label,
  amount,
  currency,
  icon: Icon,
  color,
  bgColor,
  percentage,
  index = 0,
}: BudgetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="card group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.75} />
        </div>
        {percentage !== undefined && (
          <span className="text-xs font-medium text-[#9CA3AF] bg-[#F3F4F6] px-2 py-1 rounded-full">
            {percentage}%
          </span>
        )}
      </div>
      <p className="text-sm text-[#6B7280] font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#111111] tracking-tight">
        {currency} {amount.toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
}
