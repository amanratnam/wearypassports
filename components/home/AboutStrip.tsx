"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { ClayCouple, ClayPhotographer } from "@/components/clay/ClayCharacters";

export default function AboutStrip() {
  return (
    <section className="section paper-texture relative overflow-hidden">
      <div className="wrap-wide grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* characters */}
        <Reveal className="order-2 md:order-1">
          <div className="relative rounded-4xl paper-deep-texture topo-texture overflow-hidden p-8 md:p-10 min-h-[320px] flex items-end justify-center gap-4">
            <ClayPhotographer className="w-32 md:w-40 a-float" />
            <ClayCouple className="w-52 md:w-64 a-float-2" style={{ animationDelay: "-1s" }} />
          </div>
        </Reveal>

        {/* text */}
        <Reveal className="order-1 md:order-2">
          <p className="eyebrow mb-5">Chapter six · The people</p>
          <h2 className="d-1 text-ink mb-6">Two travellers,<br /><span className="italic-serif text-forest-800">one open journal.</span></h2>
          <p className="body-lg text-text-2 mb-5">
            Weary Passports started as a shared notebook — dog-eared, coffee-stained, full of
            scribbled budgets and bus timetables. We built the tool we always wished we&apos;d had:
            honest, unhurried, and made for people who travel to feel small in the best way.
          </p>
          <p className="body text-text-2 mb-8">
            No agency upsell. No 40 open tabs. Just a plan that sounds like you wrote it yourself.
          </p>
          <Link href="/about" className="btn-forest">Read our story <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}
