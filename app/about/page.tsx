"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { ClayCouple, ClayBackpacker, ClayClimber, ClayMapReader, ClaySUV, ClayBonfire } from "@/components/clay/ClayCharacters";
import { DriftingClouds, MountainRidge, PineTree, BirdFlock, Fireflies } from "@/components/clay/SceneElements";

/* A row of pines forming the forest floor of a scene */
function PineRow() {
  return (
    <div className="absolute bottom-0 inset-x-0 flex items-end justify-between px-[3%] pointer-events-none">
      {[16, 26, 14, 30, 18, 24, 13, 28, 20].map((w, i) => (
        <PineTree key={i} className="opacity-90" style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

/* A calm lake with reflections */
function Lake() {
  return (
    <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="absolute bottom-0 inset-x-0 w-full h-[38%]" aria-hidden>
      <path d="M0 60 Q 720 0 1440 60 L1440 260 L0 260 Z" fill="#5B8FA3" opacity="0.85" />
      <path d="M0 60 Q 720 0 1440 60 L1440 120 L0 120 Z" fill="#84B0C1" opacity="0.6" />
      <g stroke="#FAF9F5" strokeWidth="3" opacity="0.4" strokeLinecap="round">
        <line x1="380" y1="150" x2="520" y2="150" /><line x1="900" y1="180" x2="1080" y2="180" />
        <line x1="620" y1="210" x2="740" y2="210" />
      </g>
    </svg>
  );
}

/* A winding road receding into the forest */
function ForestRoad() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute bottom-0 inset-x-0 w-full h-[55%]" aria-hidden>
      <path d="M620 0 Q 700 160 500 260 Q 320 360 200 400 L1200 400 Q 1000 340 860 260 Q 720 170 820 0 Z" fill="#7A5233" opacity="0.5" />
      <path d="M700 0 Q 740 170 620 400" stroke="#F3F0E7" strokeWidth="5" strokeDasharray="14 20" fill="none" opacity="0.7" />
    </svg>
  );
}

/* Scene wrapper — a full-height "page" the reader uncovers on scroll */
function Scene({ children, bg, className = "" }: { children: React.ReactNode; bg: string; className?: string }) {
  return (
    <section
      className={`relative overflow-hidden flex flex-col justify-start md:justify-center min-h-[92svh] pt-24 md:pt-0 ${className}`}
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

const chapters = [
  {
    page: "Page 02", label: "Our mission",
    title: "Plan slow.\nWander far.",
    body: "Travel planning turned into a chore — forty tabs, contradicting blogs, budgets that never survived reality. We wanted the opposite: a calm companion that hands you a route and steps aside.",
  },
  {
    page: "Page 03", label: "Why we built it",
    title: "The same problem,\nover and over.",
    body: "Blogs sell inspiration but hide the numbers. Agents sell packages but not freedom. None of it sounds like a friend who's actually been. We wanted to be that friend — the one with the dog-eared notebook.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── SCENE 1 · Forest entrance ── */}
        <Scene bg="linear-gradient(180deg,#FAF9F5 0%,#EEF0E4 55%,#DDE4D2 100%)" className="paper-texture">
          <DriftingClouds />
          <div className="absolute right-[14%] top-[18%]"><BirdFlock /></div>
          <div className="relative z-20 wrap w-full pb-40">
            <Reveal className="max-w-3xl">
              <p className="eyebrow mb-5">Page 01 · Our story</p>
              <h1 className="d-hero text-ink mb-7">We help you<br /><span className="italic-serif text-forest-800">get out there.</span></h1>
              <p className="body-lg text-text-2 max-w-xl mb-8">
                Weary Passports began as a shared notebook — coffee-stained, over-annotated, full
                of scribbled budgets. Walk with us a while; the story&apos;s just up the trail.
              </p>
              <div className="flex items-center gap-3 text-forest-700">
                <span className="text-[0.65rem] font-bold tracking-[0.28em] uppercase">Keep walking</span>
                <ArrowDown className="w-4 h-4 a-float" />
              </div>
            </Reveal>
          </div>
          {/* forest floor */}
          <MountainRidge fill="#9DBE8F" className="absolute bottom-[22%] w-full h-[26%] opacity-60" />
          <MountainRidge fill="#5C8A5B" className="absolute bottom-[8%] w-full h-[30%] opacity-90" />
          <PineRow />
          <div className="absolute bottom-[2%] left-[42%] w-24 md:w-28 z-10"><ClayBackpacker /></div>
        </Scene>

        {/* ── SCENE 2 · Lake view (mission) ── */}
        <Scene bg="linear-gradient(180deg,#DDE4D2 0%,#C9DAD3 60%,#B4CBD1 100%)">
          <DriftingClouds tone="#FBFDFB" />
          <MountainRidge fill="#5C8A5B" className="absolute top-[8%] w-full h-[34%] opacity-70" />
          <MountainRidge fill="#335C45" className="absolute top-[16%] w-full h-[30%] opacity-90" />
          <Lake />
          <PineTree className="absolute bottom-[36%] left-[8%] w-20 z-10" />
          <PineTree className="absolute bottom-[38%] right-[10%] w-16 z-10" />
          <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-40 md:w-52 z-10"><ClayMapReader className="a-float-2" /></div>
          <div className="relative z-20 wrap w-full">
            <Reveal className="max-w-lg" y={44}>
              <p className="eyebrow mb-4">{chapters[0].page} · {chapters[0].label}</p>
              <h2 className="d-1 text-ink mb-5 whitespace-pre-line">{chapters[0].title}</h2>
              <p className="body-lg text-text-2">{chapters[0].body}</p>
            </Reveal>
          </div>
        </Scene>

        {/* ── SCENE 3 · Mountain view (why) ── */}
        <Scene bg="linear-gradient(180deg,#B4CBD1 0%,#9DB4A6 55%,#7E9A82 100%)">
          <DriftingClouds tone="#FBFDFB" />
          <MountainRidge fill="#9DBE8F" className="absolute bottom-[30%] w-full h-[42%] opacity-70" />
          <MountainRidge fill="#5C8A5B" className="absolute bottom-[16%] w-full h-[50%] opacity-90" />
          <MountainRidge fill="#1F4D36" className="absolute bottom-0 w-full h-[48%]" />
          <PineRow />
          <div className="absolute bottom-[10%] right-[16%] w-28 md:w-36 z-10"><ClayClimber /></div>
          <div className="relative z-20 wrap w-full">
            <Reveal className="max-w-lg ml-auto text-right" y={44}>
              <p className="eyebrow mb-4">{chapters[1].page} · {chapters[1].label}</p>
              <h2 className="d-1 text-ink mb-5 whitespace-pre-line">{chapters[1].title}</h2>
              <p className="body-lg text-text-2">{chapters[1].body}</p>
            </Reveal>
          </div>
        </Scene>

        {/* ── SCENE 4 · Forest road (values) ── */}
        <Scene bg="linear-gradient(180deg,#7E9A82 0%,#3f5f49 60%,#1F4D36 100%)" className="text-paper">
          <MountainRidge fill="#335C45" className="absolute top-[6%] w-full h-[30%] opacity-60" />
          <ForestRoad />
          <PineTree className="absolute bottom-[18%] left-[6%] w-24 z-10" />
          <PineTree className="absolute bottom-[24%] right-[8%] w-20 z-10" />
          <div className="absolute bottom-[14%] left-[38%] w-28 md:w-36 z-10"><ClaySUV style={{ animation: "car-bob 1.1s ease-in-out infinite" }} /></div>
          <div className="relative z-20 wrap w-full">
            <Reveal className="text-center max-w-2xl mx-auto mb-10">
              <p className="eyebrow mb-3" style={{ color: "#9DBE8F" }}>Page 04 · What we stand for</p>
              <h2 className="d-1 text-paper">Three signposts<br /><span className="italic-serif text-sun">we never pass.</span></h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { t: "Honest to the rupee", b: "Real costs, not aspirational ones. A true ₹85k beats a fantasy ₹40k every time." },
                { t: "Slow is a feature", b: "We plan for lingering, not ticking boxes. The best mornings have nowhere to be." },
                { t: "Made by humans", b: "No templates, no filler. Routes drawn by people who got lost and loved it." },
              ].map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="border-t pt-5" style={{ borderColor: "rgba(250,249,245,0.22)" }}>
                    <h3 className="font-serif text-2xl text-paper mb-2">{v.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(250,249,245,0.72)" }}>{v.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Scene>

        {/* ── SCENE 5 · Night clearing (CTA) ── */}
        <Scene bg="linear-gradient(180deg,#1F4D36 0%,#12281C 60%,#0d1f15 100%)" className="text-paper">
          {/* stars */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="absolute rounded-full bg-paper a-twinkle"
                style={{ left: `${(i * 61.8) % 100}%`, top: `${(i * 29.3) % 55}%`, width: i % 4 === 0 ? 2.5 : 1.5, height: i % 4 === 0 ? 2.5 : 1.5, opacity: 0.6, animationDelay: `${(i % 6) * 0.5}s` }} />
            ))}
          </div>
          <Fireflies count={14} />
          <div className="relative z-20 wrap w-full text-center">
            <Reveal>
              <p className="eyebrow mb-5" style={{ color: "#9DBE8F" }}>Page 05 · The clearing</p>
              <h2 className="d-1 text-paper mb-5">Stop planning.<br /><span className="italic-serif text-sun">Start going.</span></h2>
              <p className="body-lg mx-auto max-w-lg mb-9" style={{ color: "rgba(250,249,245,0.72)" }}>
                Free, unhurried, no sign-up. Just the next blank page, waiting by the fire.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/planner" className="btn-sun">Draw My Journey <ArrowUpRight className="w-4 h-4" /></Link>
                <Link href="/blog" className="btn-outline !text-paper !border-[rgba(250,249,245,0.3)] hover:!bg-white/5">Read the Notes</Link>
              </div>
              <div className="relative mt-12 flex items-end justify-center gap-6">
                <PineTree className="w-12 opacity-80" />
                <ClayBonfire className="w-40 md:w-48" />
                <ClayCouple className="w-52 md:w-60" />
                <PineTree className="w-16 opacity-90" />
              </div>
            </Reveal>
          </div>
        </Scene>

        <Footer />
      </main>
    </>
  );
}
