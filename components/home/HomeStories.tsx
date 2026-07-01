"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/data/blogPosts";

export default function HomeStories() {
  const [lead, ...rest] = blogPosts.slice(0, 4);
  return (
    <section
      className="paper-deep-texture relative overflow-hidden"
      style={{ paddingBlock: "clamp(3rem,6vw,5rem)", paddingInline: "clamp(1.25rem,4vw,3rem)" }}
    >
      <div className="wrap-wide relative">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-3">Chapter three · From the journal</p>
            <h2 className="d-2 text-ink">Stories with <span className="italic-serif text-forest-800">the real numbers in.</span></h2>
          </div>
          <Link href="/blog" className="btn-outline self-start md:self-end !py-2.5 !px-5 !text-sm">All field notes <ArrowUpRight className="w-4 h-4" /></Link>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {/* lead story */}
          {lead && (
            <Reveal>
              <Link href={`/blog/${lead.slug}`} className="card card-hover group flex flex-col h-full overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={lead.coverImage} alt={lead.title} fill className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105" sizes="(max-width:768px) 100vw, 45vw" />
                  <span className="absolute top-3 left-3 chip !bg-paper/90">{lead.category}</span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-text-3 font-semibold mb-2">{lead.date} · {lead.readTime}</p>
                  <h3 className="font-serif text-2xl text-ink leading-tight mb-2 group-hover:text-forest-800 transition-colors line-clamp-2">{lead.title}</h3>
                  <p className="body text-text-2 line-clamp-2">{lead.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          )}

          {/* compact list */}
          <div className="grid gap-4 content-between">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="card card-hover group flex gap-4 overflow-hidden items-stretch">
                  <div className="relative w-24 sm:w-32 flex-shrink-0 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105" sizes="128px" />
                  </div>
                  <div className="py-3.5 pr-4 flex flex-col justify-center">
                    <p className="text-[0.65rem] text-forest-700 font-bold tracking-[0.16em] uppercase mb-1">{post.category}</p>
                    <h3 className="font-serif text-base sm:text-lg text-ink leading-snug group-hover:text-forest-800 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs text-text-3 mt-1.5">{post.readTime}</p>
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
