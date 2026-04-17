"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";
import BlogWriter from "./BlogWriter";

const categories = ["All", "Budget Travel", "Itineraries", "Honeymoon", "Food & Culture", "Adventure"];

interface Props {
  posts: BlogPost[];
}

export default function BlogEditorialGrid({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [writerOpen, setWriterOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/65 border border-white/12 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Write CTA */}
          <motion.button
            onClick={() => setWriterOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#2563EB]/20 hover:shadow-[#2563EB]/30 transition-all duration-200"
          >
            <PenLine className="w-4 h-4" />
            Write a Story
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {featured && (
              <>
                {/* Featured post */}
                <Link href={`/blog/${featured.slug}`} className="group block mb-8">
                  <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/8 bg-[#111111] hover:border-white/18 transition-all duration-300 hover:shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
                    {/* Image */}
                    <div className="relative h-64 lg:h-[420px] overflow-hidden">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 lg:to-black/50" />
                      <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide bg-white/10 backdrop-blur-sm text-white/80 border border-white/15">
                        {featured.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#111111]">
                      <div>
                        <p className="label-caps mb-5">Featured · {featured.date}</p>
                        <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-5 group-hover:text-[#60A5FA] transition-colors duration-300">
                          {featured.title}
                        </h2>
                        <p className="text-white/60 text-base leading-relaxed line-clamp-3 mb-8">
                          {featured.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/55">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[#60A5FA] text-sm font-bold group-hover:gap-2.5 transition-all duration-200">
                          Read story <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Rest of posts */}
                {rest.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post, i) => (
                      <PostCard key={post.slug} post={post} index={i} />
                    ))}
                  </div>
                )}
              </>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-24 text-white/30">
                <p className="text-4xl mb-4">✈️</p>
                No posts in this category yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {filtered.length > 4 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-xl border border-white/12 text-white/50 text-sm font-semibold hover:border-white/25 hover:text-white/80 transition-all duration-200">
              Load More Stories
            </button>
          </div>
        )}
      </section>

      {/* Blog writer overlay */}
      <AnimatePresence>
        {writerOpen && (
          <BlogWriter onClose={() => setWriterOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#111111] hover:border-white/18 hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-52 overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/10 backdrop-blur-sm text-white/80 border border-white/15">
              {post.category}
            </span>
          </div>
          <div className="flex-1 flex flex-col p-6">
            <div className="flex items-center gap-3 text-[10px] text-white/55 font-medium uppercase tracking-wider mb-3">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{post.readTime}
              </span>
            </div>
            <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-[#60A5FA] transition-colors duration-200 line-clamp-2 flex-1">
              {post.title}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-5">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-1 text-[#60A5FA] text-sm font-bold mt-auto">
              Read <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
