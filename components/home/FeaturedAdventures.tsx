"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { destinations } from "@/data/destinations";
import { PassportStamp } from "@/components/clay/SceneElements";

export default function FeaturedAdventures() {
  return (
    <section id="adventures" className="section paper-deep-texture relative overflow-hidden">
      <div className="wrap-wide relative">
        {/* header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow mb-5">Chapter one · Featured adventures</p>
            <h2 className="d-1 text-ink">Places worth<br /><span className="italic-serif text-forest-800">the long way round.</span></h2>
          </div>
          <p className="body text-text-2 max-w-sm">
            A handful of routes we keep coming back to — each one costed honestly, paced slowly,
            and drawn by hand in the journal.
          </p>
        </Reveal>

        {/* editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6 auto-rows-[minmax(0,1fr)]">
          {destinations.slice(0, 5).map((d, i) => {
            const wide = i === 0;
            return (
              <Reveal
                key={d.slug}
                delay={i * 0.05}
                className={wide ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
              >
                <Link
                  href={`/planner?destination=${d.name}`}
                  className="card card-hover group relative block overflow-hidden h-full min-h-[240px]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={d.image} alt={d.name} fill
                      className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
                      sizes={wide ? "(max-width:768px) 100vw, 55vw" : "(max-width:768px) 100vw, 30vw"}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,40,28,0) 30%, rgba(18,40,28,0.82) 100%)" }} />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-6 md:p-7 text-paper">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[0.65rem] font-bold tracking-[0.24em] uppercase text-paper/75">{d.country}</span>
                      <span className="w-1 h-1 rounded-full bg-sun" />
                      <span className="text-[0.65rem] font-semibold text-sun">{d.bestTime}</span>
                    </div>
                    <h3 className={`font-serif text-paper ${wide ? "text-4xl md:text-6xl" : "text-3xl"} leading-none`}>{d.name}</h3>
                    <p className="text-paper/80 text-sm mt-2 max-w-xs">{d.tagline}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-paper/15">
                      <span className="text-sm text-paper/90"><span className="text-paper/55">from</span> {d.avgCost}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-paper group-hover:gap-2.5 transition-all">
                        Plan it <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {wide && (
                    <div className="absolute top-5 right-5 w-20 md:w-24 opacity-90 mix-blend-luminosity">
                      <PassportStamp label="STAMPED" sub="VISITED" color="#F4CF74" />
                    </div>
                  )}
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/planner" className="btn-outline">See every route <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}
