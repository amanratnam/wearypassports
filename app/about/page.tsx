"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ClayCouple, ClayPhotographer, ClayBackpacker, ClayMapReader } from "@/components/clay/ClayCharacters";
import { DriftingClouds, MountainRidge, PineTree, BirdFlock } from "@/components/clay/SceneElements";

const stats = [
  { num: "50+", label: "Routes drawn" },
  { num: "Slow", label: "By design" },
  { num: "₹0", label: "To wander with us" },
  { num: "100%", label: "Human-written" },
];

const travelPhotos = [
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&q=80",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
];

const stories = [
  {
    label: "Our mission",
    title: "Plan slow.\nWander far.",
    body: "Travel planning turned into a chore — forty open tabs, contradicting blogs, budgets that never survive contact with reality. We wanted the opposite: a calm, honest companion that hands you a route and gets out of the way.\n\nSo we built a journal you can plan inside. One that costs things truthfully and leaves room for the detour.",
    Char: ClayMapReader,
  },
  {
    label: "Why we built it",
    title: "The same problem,\nover and over.",
    body: "Blogs sell inspiration but hide the numbers. Agents sell packages but not freedom. Search gives you noise. None of it sounds like a friend who's actually been.\n\nWeary Passports is that friend — the one with the dog-eared notebook and the good recommendations.",
    Char: ClayBackpacker,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="paper-texture">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-[68px] min-h-[92vh] flex flex-col">
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#FAF9F5,#F1EFE4 60%,#E7EADD)" }} />
          <DriftingClouds />
          <div className="absolute right-[14%] top-[20%]"><BirdFlock /></div>

          <div className="relative z-10 flex-1 flex items-center">
            <div className="wrap w-full pt-16">
              <Reveal className="max-w-3xl">
                <p className="eyebrow mb-6">Our story</p>
                <h1 className="d-hero text-ink mb-8">We help you<br /><span className="italic-serif text-forest-800">get out there.</span></h1>
                <p className="body-lg text-text-2 max-w-xl mb-10">
                  Weary Passports began as a shared notebook — coffee-stained, over-annotated,
                  full of scribbled budgets. We turned it into a tool for anyone who&apos;d rather
                  wander than rush.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/planner" className="btn-forest">Start a Journey <ArrowUpRight className="w-4 h-4" /></Link>
                  <Link href="/blog" className="btn-outline">Read Field Notes</Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* landscape */}
          <div className="relative z-10 h-[30vh] min-h-[220px]">
            <MountainRidge fill="#9DBE8F" className="absolute bottom-[34%] w-full h-[60%] opacity-70" />
            <MountainRidge fill="#5C8A5B" className="absolute bottom-[16%] w-full h-[70%] opacity-90" />
            <MountainRidge fill="#1F4D36" className="absolute bottom-0 w-full h-[72%]" />
            <PineTree className="absolute bottom-[3%] left-[12%] w-16 z-10" />
            <PineTree className="absolute bottom-[5%] right-[14%] w-14 z-10" />
            <div className="absolute bottom-[2%] right-[30%] w-28 z-20"><ClayPhotographer /></div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="paper-deep-texture border-y border-[color:var(--line-soft)]">
          <div className="wrap grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="py-10 px-6 text-center border-r border-[color:var(--line-soft)] last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r">
                <p className="font-serif text-4xl sm:text-5xl text-forest-800 mb-1">{s.num}</p>
                <p className="text-xs text-text-3 font-semibold tracking-wide uppercase">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PHOTO MOSAIC ── */}
        <section className="section">
          <div className="wrap-wide">
            <Reveal stagger className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {travelPhotos.map((src, i) => (
                <div key={src} className={`relative rounded-3xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2 h-64 sm:h-80" : "h-28 sm:h-36"}`}>
                  <Image src={src} alt="" fill className="object-cover" sizes="(max-width:640px) 33vw, 20vw" />
                </div>
              ))}
            </Reveal>
            <p className="text-center text-text-3 text-sm mt-6 italic-serif">Real travellers. Real mornings. That&apos;s the whole point.</p>
          </div>
        </section>

        {/* ── STORY SECTIONS ── */}
        {stories.map((s, i) => (
          <section key={s.label} className={`section ${i % 2 ? "paper-deep-texture" : ""} topo-texture`}>
            <div className={`wrap-wide grid md:grid-cols-2 gap-12 md:gap-16 items-center`}>
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")} — {s.label}</p>
                <h2 className="d-1 text-ink mb-6 whitespace-pre-line">{s.title}</h2>
                {s.body.split("\n\n").map((para, j) => (
                  <p key={j} className="body text-text-2 mb-4 last:mb-0">{para}</p>
                ))}
              </Reveal>
              <Reveal className={`${i % 2 ? "md:order-1" : ""} flex justify-center`}>
                <div className="relative rounded-4xl paper-texture topo-texture w-full min-h-[300px] flex items-end justify-center p-8 overflow-hidden shadow-soft">
                  <s.Char className="w-56 md:w-64 a-float" />
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* ── VALUES ── */}
        <section className="section relative overflow-hidden text-paper" style={{ background: "linear-gradient(180deg,#1F4D36,#12281C)" }}>
          <div className="wrap">
            <Reveal className="text-center max-w-2xl mx-auto mb-14">
              <p className="eyebrow mb-4" style={{ color: "#9DBE8F" }}>What we stand for</p>
              <h2 className="d-1 text-paper">Built on three<br /><span className="italic-serif text-sun">simple beliefs.</span></h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { t: "Honest to the rupee", b: "Real costs, not aspirational ones. A true ₹85k beats a fantasy ₹40k every time." },
                { t: "Slow is a feature", b: "We plan for lingering, not ticking boxes. The best mornings have nowhere to be." },
                { t: "Made by humans", b: "No templates, no filler. Routes drawn by people who actually got lost and loved it." },
              ].map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="border-t pt-6" style={{ borderColor: "rgba(250,249,245,0.18)" }}>
                    <h3 className="font-serif text-2xl text-paper mb-2">{v.t}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(250,249,245,0.7)" }}>{v.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section paper-texture">
          <Reveal className="wrap-wide grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-4xl paper-deep-texture topo-texture min-h-[280px] flex items-end justify-center p-8 overflow-hidden">
              <ClayCouple className="w-64 a-float" />
            </div>
            <div>
              <p className="eyebrow mb-4">Your next chapter</p>
              <h2 className="d-1 text-ink mb-5">Stop planning.<br /><span className="italic-serif text-forest-800">Start going.</span></h2>
              <p className="body-lg text-text-2 mb-8">Free. Unhurried. No sign-up, no upsell. Just the next blank page, waiting.</p>
              <Link href="/planner" className="btn-forest">Draw My Journey <ArrowUpRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>
    </>
  );
}
