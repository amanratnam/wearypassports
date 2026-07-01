"use client";

import Reveal from "@/components/Reveal";
import { ClayBonfire } from "@/components/clay/ClayCharacters";
import { Fireflies } from "@/components/clay/SceneElements";

const beliefs = [
  { k: "Slow", t: "Slow is a feature.", b: "The best mornings have nowhere to be. We plan for room to linger, not boxes to tick." },
  { k: "Honest", t: "Honest to the rupee.", b: "Real costs, including the ones nobody mentions. A true ₹85k beats a fantasy ₹40k every time." },
  { k: "Human", t: "Made by wanderers.", b: "No templates, no filler. Routes drawn by people who actually got lost and came back grinning." },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="section relative overflow-hidden text-paper" style={{ background: "linear-gradient(180deg,#1F4D36,#12281C)" }}>
      <Fireflies count={12} />
      <div className="wrap relative">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-6" style={{ color: "#9DBE8F" }}>Chapter five · Why we wander</p>
          <blockquote className="font-serif text-3xl md:text-5xl leading-[1.15] text-paper">
            &ldquo;We don&apos;t sell trips. We keep a{" "}
            <span className="italic-serif text-sun">journal</span> — and lend it to anyone
            curious enough to fill the next page.&rdquo;
          </blockquote>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-16">
          {beliefs.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.08}>
              <div className="border-t pt-6" style={{ borderColor: "rgba(250,249,245,0.18)" }}>
                <span className="text-[0.7rem] font-bold tracking-[0.28em] uppercase text-sun">{b.k}</span>
                <h3 className="font-serif text-2xl text-paper mt-3 mb-2">{b.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(250,249,245,0.7)" }}>{b.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* bonfire */}
        <Reveal className="flex justify-center mt-14">
          <ClayBonfire className="w-40 md:w-52" />
        </Reveal>
      </div>
    </section>
  );
}
