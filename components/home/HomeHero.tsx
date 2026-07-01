"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import HeroFlightMap from "@/components/map/HeroFlightMap";
import { PassportStamp } from "@/components/clay/SceneElements";

export default function HomeHero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden paper-texture grain"
      style={{ minHeight: "100svh" }}
    >
      {/* sky wash + animated flight map */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#FAF9F5 0%,#F3F1E7 55%,#EEEDE1 100%)" }} />
      <HeroFlightMap />
      {/* soft vignette so text stays legible over the map */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 22% 42%, rgba(250,249,245,0.92) 0%, rgba(250,249,245,0.4) 46%, rgba(250,249,245,0) 76%)" }} />

      <div className="relative z-20 flex-1 flex items-center">
        <div className="wrap w-full py-24">
          <div className="max-w-3xl">
            <h1 className="d-hero text-ink">
              <span className="block overflow-hidden"><span className="hero-line" style={{ animationDelay: "0.05s" }}>The world is</span></span>
              <span className="block overflow-hidden"><span className="hero-line" style={{ animationDelay: "0.17s" }}>best read</span></span>
              <span className="block overflow-hidden"><span className="hero-line italic-serif" style={{ color: "var(--forest-800)", animationDelay: "0.29s" }}>on foot.</span></span>
            </h1>
            <p className="hero-fade body-lg text-text-2 max-w-2xl mt-7" style={{ animationDelay: "0.5s" }}>
              Hey traveller, welcome to a hub of travel stories, hand-drawn routes, and honest
              trip itineraries for people who&apos;d rather wander than rush. Plan your trips, or
              read the stories — completely up to you.
            </p>
            <div className="hero-fade flex flex-wrap gap-4 mt-9" style={{ animationDelay: "0.62s" }}>
              <Link href="/planner" className="btn-forest">Plan a Journey</Link>
              <Link href="/blog" className="btn-outline">Read the Stories</Link>
            </div>
          </div>
        </div>
      </div>

      {/* passport stamp accent */}
      <div className="hero-fade absolute right-[6%] top-[24%] w-24 md:w-36 z-20 hidden sm:block" style={{ animationDelay: "0.7s" }}>
        <PassportStamp label="DEPART" sub="WEARY" color="#C56B4A" />
      </div>

      {/* scroll cue */}
      <div className="hero-fade relative z-20 pb-8 flex flex-col items-center gap-2 text-forest-700" style={{ animationDelay: "0.8s" }}>
        <span className="text-[0.65rem] font-bold tracking-[0.28em] uppercase">Scroll to wander</span>
        <ArrowDown className="w-4 h-4 a-float" />
      </div>
    </section>
  );
}
