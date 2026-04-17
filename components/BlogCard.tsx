"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#111111] hover:border-white/18 hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/10 backdrop-blur-sm text-white/80 border border-white/15">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex items-center gap-3 text-[10px] text-white/30 font-medium uppercase tracking-wider mb-3">
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-[#60A5FA] transition-colors duration-200 line-clamp-2 flex-1">
              {post.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-5">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-1 text-[#60A5FA] text-sm font-semibold mt-auto">
              Read article
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
