"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blogPosts";

export default function HomeStories() {
  const [lead, ...rest] = blogPosts.slice(0, 4);
  return (
    <section className="section paper-deep-texture relative overflow-hidden">
      <div className="wrap-wide relative">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-5">Chapter three · From the journal</p>
            <h2 className="d-1 text-ink">Stories with<br /><span className="italic-serif text-forest-800">the real numbers in.</span></h2>
          </div>
          <Link href="/blog" className="btn-outline self-start md:self-end">All field notes <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* lead story */}
          {lead && (
            <Reveal>
              <Link href={`/blog/${lead.slug}`} className="card card-hover group block overflow-hidden h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={lead.coverImage} alt={lead.title} fill className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105" sizes="(max-width:768px) 100vw, 45vw" />
                  <span className="absolute top-4 left-4 chip !bg-paper/90">{lead.category}</span>
                </div>
                <div className="p-7">
                  <p className="text-xs text-text-3 font-semibold mb-3">{lead.date} · {lead.readTime}</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-3 group-hover:text-forest-800 transition-colors">{lead.title}</h3>
                  <p className="body text-text-2 line-clamp-2">{lead.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          )}

          {/* stacked list */}
          <div className="grid gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`} className="card card-hover group flex gap-5 overflow-hidden items-stretch">
                  <div className="relative w-28 sm:w-40 flex-shrink-0 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105" sizes="160px" />
                  </div>
                  <div className="py-5 pr-5 flex flex-col justify-center">
                    <p className="text-[0.7rem] text-forest-700 font-bold tracking-[0.18em] uppercase mb-2">{post.category}</p>
                    <h3 className="font-serif text-lg sm:text-xl text-ink leading-snug group-hover:text-forest-800 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-text-3 mt-2">{post.readTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
