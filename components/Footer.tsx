"use client";

import Link from "next/link";
import { ArrowRight, Compass, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const links = {
  Plan: [
    { label: "Trip Planner", href: "/planner" },
    { label: "Destinations", href: "/#destinations" },
    { label: "Budget Tool", href: "/planner" },
  ],
  Explore: [
    { label: "Travel Stories", href: "/blog" },
    { label: "Budget Travel", href: "/blog" },
    { label: "Honeymoon Trips", href: "/blog" },
    { label: "Itineraries", href: "/blog" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
};

const destinations = [
  "Bali", "Ladakh", "Japan", "Santorini", "Thailand", "Maldives",
  "Rajasthan", "Dubai", "Vietnam", "Goa", "Singapore", "Europe",
  "Manali", "Kerala", "Spiti Valley", "Indonesia", "Paris", "Tokyo",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/6 overflow-hidden">

      {/* ── CTA strip ── */}
      <div className="relative border-b border-white/6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a35] via-[#080808] to-[#120820] pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2563EB]/8 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative container-max py-16 sm:py-20 px-[clamp(1rem,4vw,4rem)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30 mb-3">
                Ready to go?
              </p>
              <h2 className="fluid-h1 font-black text-white leading-[0.95] tracking-[-0.03em]">
                Where to next?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black font-bold text-sm rounded-2xl hover:bg-white/92 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                  Plan My Trip
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 font-semibold text-sm rounded-2xl hover:border-white/30 hover:text-white transition-all duration-200"
              >
                Read Stories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Destinations marquee ── */}
      <div className="border-b border-white/6 py-3 overflow-hidden bg-[#080808]/50">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {[...destinations, ...destinations].map((d, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-4 text-[10px] font-bold tracking-[0.18em] uppercase text-white/20">
              <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="container-max px-[clamp(1rem,4vw,4rem)] pt-14 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Compass className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight block leading-none">Weary Passports</span>
                <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/30">Plan smarter</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[220px] mb-5">
              Personalised trip planning for Indian explorers. Real budgets. Real routes. Done in seconds.
            </p>
            <a
              href="mailto:aman@wearypassports.com"
              className="inline-flex items-center gap-2 text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              aman@wearypassports.com
            </a>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/35 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 border-t border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {year} Weary Passports. All rights reserved.
          </p>

          {/* Tagline stamp */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40">
              Built for travelers who plan smarter
            </span>
          </div>
        </div>
      </div>

      {/* ── Giant background wordmark ── */}
      <div className="relative overflow-hidden h-16 sm:h-24">
        <div
          className="absolute inset-x-0 bottom-0 text-center select-none pointer-events-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 10rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "rgba(255,255,255,0.03)",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          WEARY PASSPORTS
        </div>
      </div>
    </footer>
  );
}
