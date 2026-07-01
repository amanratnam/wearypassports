"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { destinations } from "@/data/destinations";

export default function FeaturedAdventures() {
  return (
    <section
      id="adventures"
      className="paper-deep-texture relative overflow-hidden"
      style={{ paddingBlock: "clamp(3rem,6vw,5rem)", paddingInline: "clamp(1.25rem,4vw,3rem)" }}
    >
      <div className="wrap-wide relative">
        {/* header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Chapter one · Featured adventures</p>
            <h2 className="d-2 text-ink">Places worth <span className="italic-serif text-forest-800">the long way round.</span></h2>
          </div>
          <Link href="/planner" className="btn-outline self-start md:self-end !py-2.5 !px-5 !text-sm">See every route <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>

        {/* compact editorial grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.slice(0, 4).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.05}>
              <Link
                href={`/planner?destination=${d.name}`}
                className="card card-hover group relative block overflow-hidden h-52 sm:h-64"
              >
                <Image
                  src={d.image} alt={d.name} fill
                  className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,40,28,0) 35%, rgba(18,40,28,0.85) 100%)" }} />
                <div className="relative h-full flex flex-col justify-end p-4 text-paper">
                  <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-sun mb-1">{d.bestTime}</span>
                  <h3 className="font-serif text-2xl leading-none">{d.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-paper/80"><span className="text-paper/55">from</span> {d.avgCost}</span>
                    <ArrowUpRight className="w-4 h-4 text-paper group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
