"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=90",
    location: "Bali, Indonesia",
    headline: "Your nearest\ntropical escape.",
    subline: "₹55,000 all-in · 5–7 days · Fly from Mumbai or Delhi",
  },
  {
    img: "https://images.unsplash.com/photo-1652204597589-962156b9483d?w=1200&q=90",
    location: "Ladakh, India",
    headline: "No filter\nrequired.",
    subline: "₹22,000 from Delhi · 9–12 days · The trip that changes everything",
  },
  {
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=90",
    location: "Japan",
    headline: "Ancient shrines,\nneon streets.",
    subline: "₹1,20,000 · 8–12 days · Cherry blossoms or autumn leaves",
  },
  {
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90",
    location: "Santorini, Greece",
    headline: "Once in\na lifetime.",
    subline: "₹1,50,000 · 5–7 days · Blue domes, Aegean sunsets",
  },
  {
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=90",
    location: "Thailand",
    headline: "Street food\nat midnight.",
    subline: "₹50,000 · 5–8 days · Temples at dawn, beaches at dusk",
  },
  {
    img: "https://images.unsplash.com/photo-1706186839147-0d708602587b?w=1200&q=90",
    location: "Varanasi, India",
    headline: "The oldest city\nstill standing.",
    subline: "₹15,000 · 3–5 days · Ghats, aarti, and the Ganges at dawn",
  },
];

const INTERVAL = 4500;

export default function PlannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length;
    setDirection(1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];

  const imgVariants = {
    enter: (d: number) => ({
      scale: 1.08,
      x: d > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      scale: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d: number) => ({
      scale: 0.96,
      x: d > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const textVariants = {
    enter: { y: 24, opacity: 0 },
    center: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] } },
    exit:  { y: -16, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl lg:rounded-none lg:rounded-r-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image layer */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slide.img}
            alt={slide.location}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="relative flex-1 h-0.5 rounded-full overflow-hidden bg-white/20"
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-white origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                key={`${current}-bar`}
              />
            )}
            {i < current && (
              <div className="absolute inset-0 bg-white/80 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* Location pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
              <span className="text-xs font-bold text-white/80 tracking-wide">{slide.location}</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-[1] tracking-[-0.03em] mb-3 whitespace-pre-line">
              {slide.headline}
            </h2>

            {/* Subline */}
            <p className="text-sm text-white/55 font-medium leading-relaxed">
              {slide.subline}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="flex items-center gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
