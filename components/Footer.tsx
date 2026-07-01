"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { ClayCamp } from "@/components/clay/ClayCharacters";
import { Fireflies, PineTree } from "@/components/clay/SceneElements";

const links = {
  Wander: [
    { label: "Plan a Trip", href: "/planner" },
    { label: "Destinations", href: "/#adventures" },
    { label: "Journey Map", href: "/#map" },
  ],
  Read: [
    { label: "Field Notes", href: "/blog" },
    { label: "Budget Diaries", href: "/blog" },
    { label: "Slow Travel", href: "/blog" },
  ],
  Journal: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Our Philosophy", href: "/#philosophy" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-paper" style={{ background: "linear-gradient(180deg,#1a3326 0%,#12281C 55%,#0d1f15 100%)" }}>
      {/* stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-paper a-twinkle"
            style={{
              left: `${(i * 61.8) % 100}%`,
              top: `${(i * 29.3) % 55}%`,
              width: i % 4 === 0 ? 2.5 : 1.5,
              height: i % 4 === 0 ? 2.5 : 1.5,
              opacity: 0.6,
              animationDelay: `${(i % 6) * 0.5}s`,
            }}
          />
        ))}
      </div>
      {/* moon */}
      <div className="pointer-events-none absolute right-[8%] top-16 w-24 h-24 rounded-full a-float"
        style={{ background: "radial-gradient(circle at 38% 32%, #FBF3D9, #E8DFB8)", boxShadow: "0 0 60px 12px rgba(244,207,116,0.25)" }} aria-hidden />
      <Fireflies count={16} />

      {/* ── Night camp CTA ── */}
      <div className="relative wrap pt-24 pb-16 text-center">
        <p className="eyebrow mb-6" style={{ color: "#9DBE8F" }}>Set up camp</p>
        <h2 className="d-1 text-paper mb-6">Where does the<br /><span className="italic-serif" style={{ color: "#E8B23A" }}>trail take you next?</span></h2>
        <p className="body-lg mx-auto max-w-lg mb-10" style={{ color: "rgba(250,249,245,0.72)" }}>
          Pitch the tent, open the journal, and let the next route draw itself.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/planner" className="btn-sun">Plan the Journey <ArrowUpRight className="w-4 h-4" /></Link>
          <Link href="/blog" className="btn-outline !text-paper !border-[rgba(250,249,245,0.3)] hover:!bg-white/5">Read the Notes</Link>
        </div>

        {/* clay camp on a ridge */}
        <div className="relative mt-14 flex items-end justify-center gap-6">
          <PineTree className="w-10 opacity-80" />
          <ClayCamp className="w-64 max-w-[70vw]" />
          <PineTree className="w-14 opacity-90" />
        </div>
      </div>

      {/* ridge line */}
      <div className="relative h-px" style={{ background: "rgba(250,249,245,0.12)" }} />

      {/* ── link grid ── */}
      <div className="relative wrap py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-2xl font-semibold text-paper">Weary Passports</span>
            <p className="mt-3 text-sm leading-relaxed max-w-[220px]" style={{ color: "rgba(250,249,245,0.6)" }}>
              A field journal for curious travellers. Slow routes, honest budgets, hand-drawn maps.
            </p>
            <a href="mailto:aman@wearypassports.com"
              className="mt-5 inline-flex items-center gap-2 text-sm hover:text-sun transition-colors" style={{ color: "rgba(250,249,245,0.72)" }}>
              <Mail className="w-4 h-4" /> aman@wearypassports.com
            </a>
          </div>

          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-[0.7rem] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: "#9DBE8F" }}>{cat}</h4>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm transition-colors hover:text-sun" style={{ color: "rgba(250,249,245,0.68)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(250,249,245,0.12)" }}>
          <p className="text-xs" style={{ color: "rgba(250,249,245,0.5)" }}>© {year} Weary Passports. Wander gently.</p>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: "rgba(250,249,245,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-sun a-twinkle" />
            <span className="text-[0.65rem] font-bold tracking-[0.24em] uppercase" style={{ color: "rgba(250,249,245,0.6)" }}>
              Made for the curious
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
