"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const deckItems = [
  {
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
    tagline: "Temples. Rice terraces. Endless golden coastline.",
    cost: "₹55,000",
    days: "5–7 days",
    from: "Mumbai / Delhi",
    slug: "bali",
  },
  {
    name: "Thailand",
    country: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80",
    tagline: "Street food at midnight. Temples at dawn.",
    cost: "₹50,000",
    days: "5–8 days",
    from: "All major cities",
    slug: "thailand",
  },
  {
    name: "Rajasthan",
    country: "India",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900&q=80",
    tagline: "Palaces, desert dunes, and city of pink.",
    cost: "₹18,000",
    days: "7–10 days",
    from: "Delhi / Mumbai",
    slug: "rajasthan",
  },
  {
    name: "Japan",
    country: "East Asia",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80",
    tagline: "Where ancient shrines meet neon-lit streets.",
    cost: "₹1,20,000",
    days: "8–12 days",
    from: "Delhi / Mumbai",
    slug: "japan",
  },
  {
    name: "Ladakh",
    country: "India",
    image: "https://images.unsplash.com/photo-1584182741570-4e63a1f59b08?w=900&q=80",
    tagline: "The roof of the world. Every view is a painting.",
    cost: "₹22,000",
    days: "9–12 days",
    from: "Delhi / Chandigarh",
    slug: "ladakh",
  },
  {
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80",
    tagline: "Blue domes. Aegean sunsets. Once in a lifetime.",
    cost: "₹1,50,000",
    days: "5–7 days",
    from: "Mumbai / Delhi",
    slug: "santorini",
  },
];

export default function DestinationDeck() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + deckItems.length) % deckItems.length);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) go(1);
    else if (info.offset.x > 50) go(-1);
  };

  const item = deckItems[current];
  const next = deckItems[(current + 1) % deckItems.length];
  const prev = deckItems[(current - 1 + deckItems.length) % deckItems.length];

  const cardVariants = {
    enter: (d: number) => ({ x: d > 0 ? "70%" : "-70%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-70%" : "70%", opacity: 0 }),
  };

  const desktopVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <section className="relative bg-[#080808] py-16 sm:py-24 px-4 overflow-hidden">
      {/* Background name hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[22vw] font-black text-white leading-none tracking-tighter">
          {item.name.toUpperCase()}
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <p className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Where are you going?
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Pick a destination
            </h2>
          </div>
          {/* Dots — desktop */}
          <div className="hidden sm:flex items-center gap-3">
            {deckItems.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Go to ${deckItems[i].name}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE CARD (swipeable) ── */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="rounded-3xl overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing select-none"
              style={{ willChange: "transform" }}
            >
              {/* Image */}
              <div className="relative h-[58vw] max-h-[260px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {current + 1} / {deckItems.length}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-[#111111] border-x border-b border-white/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-white/35" />
                  <span className="text-white/35 text-xs font-medium">{item.country}</span>
                </div>
                <h3 className="text-4xl font-black text-white leading-none tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4">
                  {item.tagline}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-t border-white/6">
                  {[
                    { label: "Avg Cost", val: item.cost },
                    { label: "Duration", val: item.days },
                    { label: "Fly from", val: item.from },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-[9px] font-bold tracking-widest uppercase text-white/25 mb-1">{label}</p>
                      <p className="text-xs font-semibold text-white leading-tight">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/planner?destination=${item.name}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-bold rounded-xl active:scale-[0.97] transition-transform"
                  >
                    Plan this trip
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous destination"
                      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 active:bg-white/10 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next destination"
                      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 active:bg-white/10 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {deckItems.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                aria-label={`Go to ${deckItems[i].name}`}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/20 active:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── DESKTOP CARD ── */}
        <div className="hidden sm:block relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={desktopVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
            >
              {/* Image side */}
              <div className="relative h-[320px] md:h-[480px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:to-black/50" />
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {current + 1} / {deckItems.length}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="bg-[#111111] border border-white/5 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-4 h-4 text-white/40" />
                    <span className="text-white/40 text-sm">{item.country}</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-5">
                    {item.name}
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed mb-8">
                    {item.tagline}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Avg Cost", val: item.cost },
                      { label: "Duration", val: item.days },
                      { label: "Fly from", val: item.from },
                    ].map(({ label, val }) => (
                      <div key={label}>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-white/25 mb-1">{label}</p>
                        <p className="text-sm font-semibold text-white leading-tight">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/planner?destination=${item.name}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-200 hover:gap-3"
                  >
                    Plan this trip
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous destination"
                      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next destination"
                      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-white/40 hover:text-white transition-all duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side peek cards */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none scale-90 origin-right">
            <div className="relative w-24 h-32 rounded-xl overflow-hidden">
              <Image src={prev.image} alt={prev.name} fill className="object-cover" sizes="96px" />
            </div>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none scale-90 origin-left">
            <div className="relative w-24 h-32 rounded-xl overflow-hidden">
              <Image src={next.image} alt={next.name} fill className="object-cover" sizes="96px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
