"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import { ClaySUV, ClayClimber, ClayCamp, ClayMapReader } from "@/components/clay/ClayCharacters";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stops = [
  { n: "01", title: "Dream it up", body: "Tell us where your mind keeps wandering. A city, a season, a feeling. No wrong answers.", Char: ClayMapReader },
  { n: "02", title: "Draw the route", body: "We sketch a day-by-day path — the detours, the slow mornings, the roads worth the extra hour.", Char: ClaySUV },
  { n: "03", title: "Count it honestly", body: "Real numbers in real rupees. Flights, beds, food, and the little things nobody warns you about.", Char: ClayCamp },
  { n: "04", title: "Go get lost", body: "Print it, pocket it, and let the plan bend. The best pages of the journal are written on the road.", Char: ClayClimber },
];

export default function JourneyTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = root.current;
    const p = path.current;
    if (!el || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p.style.strokeDashoffset = "0";
      return;
    }
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
    const ctx = gsap.context(() => {
      gsap.to(p, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 80%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section relative overflow-hidden paper-texture topo-texture">
      <div className="wrap relative">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-5">Chapter two · The journey</p>
          <h2 className="d-1 text-ink">Four steps from<br /><span className="italic-serif text-forest-800">itch to itinerary.</span></h2>
        </Reveal>

        <div ref={root} className="relative">
          {/* the drawn map path (desktop) */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-40 hidden md:block pointer-events-none"
            viewBox="0 0 160 900" preserveAspectRatio="none" fill="none" aria-hidden
          >
            <path
              ref={path}
              d="M80 10 C 20 130, 140 200, 80 320 S 20 500, 80 610 S 140 780, 80 890"
              stroke="#C56B4A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9"
            />
          </svg>

          <div className="space-y-14 md:space-y-24">
            {stops.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={s.n} className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
                  {/* text */}
                  <div className={`${left ? "md:order-1 md:text-right" : "md:order-2"}`}>
                    <div className={`flex items-center gap-3 mb-3 ${left ? "md:justify-end" : ""}`}>
                      <span className="font-serif text-5xl text-forest-300">{s.n}</span>
                      <span className="chip">Step {s.n}</span>
                    </div>
                    <h3 className="d-3 text-ink mb-3">{s.title}</h3>
                    <p className="body text-text-2 max-w-sm md:inline-block">{s.body}</p>
                  </div>
                  {/* clay character */}
                  <div className={`${left ? "md:order-2" : "md:order-1 md:flex md:justify-end"} mt-6 md:mt-0`}>
                    <div className="w-44 md:w-56 mx-auto md:mx-0 a-float" style={{ animationDelay: `${i * 0.4}s` }}>
                      <s.Char />
                    </div>
                  </div>
                  {/* node dot */}
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
