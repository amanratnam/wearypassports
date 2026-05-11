"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import FloatingDestCards from "./FloatingDestCards";
import { Sparkles, ArrowDown } from "lucide-react";

const words = ["Bali", "Ladakh", "Tokyo", "Goa", "Santorini", "Rajasthan", "Maldives", "Thailand"];

const headlineLines = ["PLAN YOUR", "TRIP TO"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028, delayChildren: 0.2 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length);
    }, 2200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background video — parallax zoom on scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, y: videoY, willChange: "transform" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]/85 z-[2] pointer-events-none" />

      {/* Ambient light blobs */}
      <motion.div
        animate={{ scale: [1, 1.22, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 blur-[120px] pointer-events-none z-[3]"
      />
      <motion.div
        animate={{ scale: [1, 1.16, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[-5%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#7C3AED]/8 blur-[100px] pointer-events-none z-[3]"
      />

      {/* Floating destination cards (desktop only) */}
      <FloatingDestCards />

      {/* Center content — scrolls up and fades on scroll */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 text-center px-6 w-full max-w-5xl mx-auto pointer-events-none select-none"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/20 text-white/80 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#60A5FA]" />
            Trip plans that do not get cancelled
          </span>
        </motion.div>

        {/* Main headline — character stagger */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black text-white leading-[0.88] tracking-[-0.04em] mb-4"
        >
          {headlineLines[0].split("").map((char, i) => (
            <motion.span
              key={`l0-${i}`}
              variants={charVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
          <br />
          {headlineLines[1].split("").map((char, i) => (
            <motion.span
              key={`l1-${i}`}
              variants={charVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Rotating destination word */}
        <div className="overflow-hidden mb-8 h-[13vw] sm:h-[10vw] lg:h-[8.5vw]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={wordIdx}
              initial={{ y: "110%", opacity: 0, scale: 0.94 }}
              animate={{ y: "0%", opacity: 1, scale: 1 }}
              exit={{ y: "-55%", opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black leading-[1] tracking-[-0.04em] bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent"
            >
              {words[wordIdx].toUpperCase()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtext — personal, direct */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/70 text-base sm:text-lg max-w-sm mx-auto leading-relaxed mb-10 pointer-events-auto"
        >
          Tell me where you want to go. I&apos;ll give you a full itinerary, real budget, and local tips — in 30 seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <Link
            href="/planner"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold rounded-2xl hover:bg-white/90 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full sm:w-auto justify-center"
          >
            <Sparkles className="w-4 h-4" />
            Start Planning — It&apos;s Free
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white/85 text-sm font-semibold rounded-2xl hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-200 w-full sm:w-auto justify-center backdrop-blur-sm"
          >
            Read travel stories
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
