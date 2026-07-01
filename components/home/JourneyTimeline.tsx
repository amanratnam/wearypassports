"use client";

import Reveal from "@/components/Reveal";
import { ClaySUV, ClayClimber, ClayCamp, ClayMapReader } from "@/components/clay/ClayCharacters";
import { MapPin } from "lucide-react";

/* ── Per-step animated scenes — each character acts out its step ── */

function DreamScene() {
  return (
    <div className="relative w-44 md:w-56 mx-auto md:mx-0">
      {/* floating idea bubble */}
      <div className="absolute -top-2 right-2 z-10" style={{ animation: "idea-bob 3.4s ease-in-out infinite" }}>
        <div className="relative flex items-center justify-center w-14 h-11 rounded-[50%] bg-paper shadow-soft">
          <MapPin className="w-5 h-5 text-terracotta" />
          <span className="absolute -bottom-1.5 left-4 w-3 h-3 rounded-full bg-paper" />
          <span className="absolute -bottom-3 left-2.5 w-1.5 h-1.5 rounded-full bg-paper" />
        </div>
      </div>
      <ClayMapReader className="a-sway-soft" />
    </div>
  );
}

function RouteScene() {
  return (
    <div className="relative w-44 md:w-56 mx-auto md:mx-0">
      <ClaySUV style={{ animation: "car-bob 1.1s ease-in-out infinite" }} />
      {/* road being driven, dashes stream toward the car */}
      <svg viewBox="0 0 240 20" className="w-full -mt-1" aria-hidden>
        <line x1="0" y1="10" x2="240" y2="10" stroke="#C56B4A" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="10 12" style={{ animation: "road-draw 0.7s linear infinite", strokeDashoffset: 44 }} />
      </svg>
    </div>
  );
}

function CountScene() {
  return (
    <div className="relative w-44 md:w-56 mx-auto md:mx-0">
      {/* rising rupee coins = tallying costs */}
      {[0, 1, 2].map((i) => (
        <span key={i}
          className="absolute z-10 flex items-center justify-center w-7 h-7 rounded-full bg-sun text-forest-900 font-bold text-sm shadow-soft"
          style={{ left: `${18 + i * 26}%`, top: "8%", animation: `coin-rise ${2.4 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
          ₹
        </span>
      ))}
      <ClayCamp className="a-float-2" />
    </div>
  );
}

function GoScene() {
  return (
    <div className="relative w-40 md:w-52 mx-auto md:mx-0">
      {/* summit flag waving */}
      <div className="absolute top-0 left-[58%] z-10 origin-bottom" style={{ animation: "flag-wave 1.6s ease-in-out infinite" }}>
        <div className="w-0.5 h-9 bg-forest-800" />
        <div className="absolute top-0 left-0.5 w-6 h-4" style={{ background: "#C56B4A", clipPath: "polygon(0 0,100% 50%,0 100%)" }} />
      </div>
      <ClayClimber />
    </div>
  );
}

const stops = [
  { n: "01", title: "Dream it up", body: "Tell us where your mind keeps wandering. A city, a season, a feeling. No wrong answers.", Scene: DreamScene },
  { n: "02", title: "Draw the route", body: "We sketch a day-by-day path — the detours, the slow mornings, the roads worth the extra hour.", Scene: RouteScene },
  { n: "03", title: "Count it honestly", body: "Real numbers in real rupees. Flights, beds, food, and the little things nobody warns you about.", Scene: CountScene },
  { n: "04", title: "Go get lost", body: "Print it, pocket it, and let the plan bend. The best pages of the journal are written on the road.", Scene: GoScene },
];

export default function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden paper-texture topo-texture" style={{ paddingBlock: "clamp(3.5rem,7vw,6rem)", paddingInline: "clamp(1.25rem,4vw,3rem)" }}>
      <div className="wrap relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-4">Chapter two · The journey</p>
          <h2 className="d-1 text-ink">Four steps from<br /><span className="italic-serif text-forest-800">itch to itinerary.</span></h2>
        </Reveal>

        <div className="relative">
          {/* dotted route connecting the steps (desktop) */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-28 hidden md:block pointer-events-none" viewBox="0 0 120 900" preserveAspectRatio="none" fill="none" aria-hidden>
            <path d="M60 10 C 10 130, 110 200, 60 320 S 10 500, 60 610 S 110 780, 60 890"
              stroke="#C56B4A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 10" opacity="0.55" />
          </svg>

          <div className="space-y-12 md:space-y-20">
            {stops.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={s.n} className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className={`${left ? "md:order-1 md:text-right" : "md:order-2"}`}>
                    <div className={`flex items-center gap-3 mb-2.5 ${left ? "md:justify-end" : ""}`}>
                      <span className="font-serif text-4xl text-forest-300">{s.n}</span>
                      <span className="chip">Step {s.n}</span>
                    </div>
                    <h3 className="d-3 text-ink mb-2.5">{s.title}</h3>
                    <p className="body text-text-2 max-w-sm md:inline-block">{s.body}</p>
                  </div>
                  <div className={`${left ? "md:order-2" : "md:order-1 md:flex md:justify-end"} mt-5 md:mt-0`}>
                    <s.Scene />
                  </div>
                  <span className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sun ring-4 ring-paper" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
