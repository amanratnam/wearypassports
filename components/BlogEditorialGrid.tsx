"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";
import BlogCard from "./BlogCard";
import BlogWriter from "./BlogWriter";

const categories = ["All", "Budget Travel", "Itineraries", "Honeymoon", "Food & Culture", "Adventure"];

interface Props { posts: BlogPost[]; }

export default function BlogEditorialGrid({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [writerOpen, setWriterOpen] = useState(false);

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <section className="section wrap-wide">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-forest-800 text-paper"
                    : "bg-paper text-text-2 border border-[color:var(--line)] hover:border-forest-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.button
            onClick={() => setWriterOpen(true)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="btn-sun !py-2.5 !px-5 !text-sm"
          >
            <PenLine className="w-4 h-4" /> Write a Note
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {featured && (
              <>
                {/* Featured */}
                <Link href={`/blog/${featured.slug}`} className="group block mb-10">
                  <div className="card card-hover grid lg:grid-cols-2 overflow-hidden">
                    <div className="relative h-64 lg:h-[420px] overflow-hidden">
                      <Image src={featured.coverImage} alt={featured.title} fill priority
                        className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw" />
                      <span className="absolute top-5 left-5 chip !bg-paper/90">{featured.category}</span>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                      <div>
                        <p className="eyebrow mb-5">Featured · {featured.date}</p>
                        <h2 className="font-serif text-3xl lg:text-5xl text-ink leading-tight mb-5 group-hover:text-forest-800 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="body text-text-2 line-clamp-3 mb-8">{featured.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-text-3"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                        <span className="inline-flex items-center gap-1.5 text-forest-700 text-sm font-bold group-hover:gap-2.5 transition-all">
                          Read note <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => <BlogCard key={post.slug} post={post} index={i} />)}
                  </div>
                )}
              </>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24 text-text-3">
                <p className="font-serif text-5xl mb-4 text-forest-300">✎</p>
                No notes in this chapter yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {writerOpen && <BlogWriter onClose={() => setWriterOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
