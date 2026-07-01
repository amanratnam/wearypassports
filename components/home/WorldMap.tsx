"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ClayDrone } from "@/components/clay/ClayCharacters";

type Pin = { name: string; x: number; y: number; note: string };
const pins: Pin[] = [
  { name: "Ladakh", x: 63, y: 34, note: "Roof of the world" },
  { name: "Bali", x: 76, y: 62, note: "Temples & terraces" },
  { name: "Japan", x: 83, y: 33, note: "Shrines & neon" },
  { name: "Santorini", x: 50, y: 36, note: "Blue & white" },
  { name: "Kerala", x: 62, y: 52, note: "Backwaters" },
  { name: "Iceland", x: 42, y: 20, note: "Fire & ice" },
  { name: "Peru", x: 25, y: 62, note: "Andes trails" },
];

export default function WorldMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="map" className="section relative overflow-hidden" style={{ background: "linear-gradient(180deg,#EFECE0,#E7EADD)" }}>
      <div className="wrap-wide relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-5">Chapter four · The atlas</p>
          <h2 className="d-1 text-ink">Pins in the map,<br /><span className="italic-serif text-forest-800">stamps in the passport.</span></h2>
          <p className="body text-text-2 mt-5 max-w-lg mx-auto">Every marker is a route we&apos;ve costed and walked. Tap one to start drawing your own.</p>
        </Reveal>

        <Reveal className="relative">
          <div className="relative card !rounded-4xl overflow-hidden topo-texture" style={{ background: "#F3F0E7" }}>
            {/* the map */}
            <div className="relative aspect-[16/9] w-full">
              <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* stylised landmasses */}
                <g fill="#9DBE8F" opacity="0.55">
                  <path d="M14 16 q10 -6 20 -2 q8 4 6 12 q-4 10 -14 12 q-12 2 -16 -8 q-4 -10 4 -14 Z" />
                  <path d="M20 34 q8 -4 12 2 q6 8 2 16 q-4 8 -12 6 q-8 -4 -6 -14 q0 -6 4 -10 Z" />
                  <path d="M44 14 q14 -6 24 0 q10 6 6 16 q-2 10 -16 12 q-16 2 -20 -10 q-4 -12 6 -18 Z" />
                  <path d="M48 32 q10 -2 14 6 q4 10 -4 16 q-10 6 -16 -2 q-6 -10 0 -16 q2 -3 6 -4 Z" />
                  <path d="M74 24 q10 -4 16 4 q6 10 -2 18 q-10 8 -18 0 q-6 -10 0 -18 q2 -3 4 -4 Z" />
                </g>
                {/* dashed flight paths from India hub */}
                <g stroke="#C56B4A" strokeWidth="0.3" fill="none" strokeDasharray="1 1.2" opacity="0.5">
                  <path d="M62 40 Q55 30 50 36" />
                  <path d="M62 40 Q70 48 76 62" />
                  <path d="M62 40 Q74 34 83 33" />
                  <path d="M62 40 Q52 26 42 20" />
                </g>
              </svg>

              {/* pins */}
              {pins.map((pin) => (
                <button
                  key={pin.name}
                  onMouseEnter={() => setActive(pin.name)}
                  onFocus={() => setActive(pin.name)}
                  onMouseLeave={() => setActive(null)}
                  className="absolute -translate-x-1/2 -translate-y-full group"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  aria-label={pin.name}
                >
                  <span className="relative flex flex-col items-center">
                    {/* label */}
                    <span
                      className={`absolute bottom-full mb-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold shadow-soft transition-all duration-200 ${
                        active === pin.name ? "opacity-100 -translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                      }`}
                      style={{ background: "#1F4D36", color: "#FAF9F5" }}
                    >
                      {pin.name} · <span className="text-sun">{pin.note}</span>
                    </span>
                    {/* pulse */}
                    <span className="absolute bottom-0 w-6 h-6 rounded-full bg-terracotta/30 animate-ping" />
                    {/* pin */}
                    <svg width="26" height="34" viewBox="0 0 26 34" className="relative transition-transform duration-200 group-hover:-translate-y-1">
                      <path d="M13 0 C4 0 0 7 0 13 C0 22 13 34 13 34 C13 34 26 22 26 13 C26 7 22 0 13 0 Z" fill="#C56B4A" />
                      <circle cx="13" cy="13" r="5" fill="#FAF9F5" />
                    </svg>
                  </span>
                </button>
              ))}

              {/* flying drone */}
              <div className="absolute left-[30%] top-[16%] w-24 md:w-32" style={{ animation: "drift-x 9s ease-in-out infinite" }}>
                <ClayDrone />
              </div>
            </div>
          </div>

          {/* pin quick-links */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {pins.map((pin) => (
              <Link
                key={pin.name}
                href={`/planner?destination=${pin.name}`}
                onMouseEnter={() => setActive(pin.name)}
                onMouseLeave={() => setActive(null)}
                className="chip hover:!bg-forest-800 hover:!text-paper transition-colors"
              >
                {pin.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
