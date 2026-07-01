"use client";

import { MapPin } from "lucide-react";

const destinations = [
  "Bali", "Rajasthan", "Tokyo", "Goa", "Thailand", "Ladakh",
  "Santorini", "Singapore", "Manali", "Dubai", "Vietnam", "Kerala",
  "Japan", "Andaman", "Maldives", "Paris", "Spiti Valley", "Indonesia",
];

interface MarqueeStripProps {
  /** kept for API compatibility; palette is always warm now */
  dark?: boolean;
  slow?: boolean;
}

export default function MarqueeStrip({ slow = false }: MarqueeStripProps) {
  return (
    <div className="w-full overflow-hidden py-4 border-y border-[color:var(--line-soft)] paper-deep-texture">
      <div className={`flex whitespace-nowrap ${slow ? "a-marquee-slow" : "a-marquee"}`}>
        {[...destinations, ...destinations, ...destinations, ...destinations].map((d, i) => (
          <span key={i} className="inline-flex items-center gap-2 pr-8 text-sm font-semibold tracking-[0.14em] uppercase text-forest-700/60">
            <MapPin className="w-3 h-3 flex-shrink-0" /> {d}
          </span>
        ))}
      </div>
    </div>
  );
}
