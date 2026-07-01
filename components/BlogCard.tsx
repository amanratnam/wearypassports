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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="card card-hover group flex flex-col h-full overflow-hidden">
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <Image
            src={post.coverImage} alt={post.title} fill
            className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute top-4 left-4 chip !bg-paper/90">{post.category}</span>
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-3 text-[0.7rem] text-text-3 font-semibold uppercase tracking-wider mb-3">
            <span>{post.date}</span><span>·</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
          </div>
          <h3 className="font-serif text-xl text-ink leading-snug mb-3 group-hover:text-forest-800 transition-colors line-clamp-2 flex-1">
            {post.title}
          </h3>
          <p className="body text-text-2 line-clamp-2 mb-5">{post.excerpt}</p>
          <span className="flex items-center gap-1 text-forest-700 text-sm font-bold mt-auto">
            Read the note <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
