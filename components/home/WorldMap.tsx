"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ATLAS, HUB, geoToXY, arcPath, MAP_W, MAP_H } from "@/components/map/geo";

export default function WorldMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="map" className="relative overflow-hidden" style={{ paddingBlock: "clamp(3.5rem,7vw,6rem)", paddingInline: "clamp(1.25rem,4vw,3rem)", background: "linear-gradient(180deg,#EFECE0,#E7EADD)" }}>
      <div className="wrap relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-9">
          <p className="eyebrow mb-4">Chapter four · The atlas</p>
          <h2 className="d-1 text-ink">Pins in the map,<br /><span className="italic-serif text-forest-800">stamps in the passport.</span></h2>
          <p className="body text-text-2 mt-4 max-w-lg mx-auto">Every marker is a real place we&apos;ve costed and walked. Tap one to start drawing your own.</p>
        </Reveal>

        <Reveal>
          <div
            className="relative mx-auto card !rounded-4xl overflow-hidden"
            style={{ maxWidth: 940, background: "#F3F0E7" }}
            onMouseLeave={() => setActive(null)}
          >
            {/* real world map — in-flow so it defines the container height */}
            <img src="/world-map.svg" alt="World map" className="block w-full h-auto opacity-90" />

            {/* dotted routes from the Delhi hub */}
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet" aria-hidden>
              {ATLAS.map((m, i) => (
                <path key={m.name} d={arcPath([HUB.lon, HUB.lat], [m.lon, m.lat], 0.2)}
                  fill="none" stroke="#C56B4A" strokeWidth="1.4" strokeDasharray="1 6" strokeLinecap="round"
                  opacity={active === null || active === i ? 0.55 : 0.15} className="transition-opacity duration-300" />
              ))}
            </svg>

            {/* markers */}
            {ATLAS.map((m, i) => {
              const [x, y] = geoToXY(m.lon, m.lat);
              const left = (x / MAP_W) * 100;
              const top = (y / MAP_H) * 100;
              const isActive = active === i;
              const flipDown = top < 26;
              const flipLeft = left > 72;
              return (
                <div key={m.name} className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%,-100%)" }}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(isActive ? null : i)}
                    className="group relative block"
                    aria-label={m.name}
                  >
                    {/* tooltip card */}
                    <div
                      className={`absolute z-20 w-44 rounded-2xl p-3.5 text-left shadow-soft-md transition-all duration-200 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                      style={{
                        left: flipLeft ? "auto" : "50%",
                        right: flipLeft ? "0" : "auto",
                        transform: flipLeft ? "none" : "translateX(-50%)",
                        bottom: flipDown ? "auto" : "calc(100% + 10px)",
                        top: flipDown ? "calc(100% + 10px)" : "auto",
                        background: "#1F4D36",
                        color: "#FAF9F5",
                      }}
                    >
                      <p className="font-serif text-lg leading-none">{m.name}</p>
                      <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase mt-1" style={{ color: "#9DBE8F" }}>{m.country}</p>
                      <p className="text-xs mt-2 leading-snug" style={{ color: "rgba(250,249,245,0.82)" }}>{m.note}</p>
                      <div className="flex items-center justify-between mt-2.5 pt-2.5" style={{ borderTop: "1px solid rgba(250,249,245,0.15)" }}>
                        <span className="text-xs font-semibold text-sun">{m.cost}</span>
                        <Link href={`/planner?destination=${m.name}`} className="text-[0.65rem] font-bold uppercase tracking-wide hover:text-sun transition-colors" style={{ color: "rgba(250,249,245,0.9)" }}>
                          Plan →
                        </Link>
                      </div>
                    </div>

                    {/* pulse + pin */}
                    <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-6 h-6 rounded-full bg-terracotta/25 animate-ping" style={{ animationDuration: "2.4s" }} />
                    <svg width="22" height="30" viewBox="0 0 26 34" className={`relative transition-transform duration-200 ${isActive ? "-translate-y-1 scale-110" : "group-hover:-translate-y-0.5"}`}>
                      <path d="M13 0 C4 0 0 7 0 13 C0 22 13 34 13 34 C13 34 26 22 26 13 C26 7 22 0 13 0 Z" fill="#C56B4A" />
                      <circle cx="13" cy="13" r="5" fill="#FAF9F5" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* quick links */}
        <Reveal className="flex flex-wrap justify-center gap-2.5 mt-7">
          {ATLAS.map((m, i) => (
            <Link
              key={m.name}
              href={`/planner?destination=${m.name}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="chip hover:!bg-forest-800 hover:!text-paper transition-colors"
            >
              {m.name}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
