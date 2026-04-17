"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUserPost, UserBlogPost } from "@/lib/blogStore";
import { ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react";

function fmt(t: string): string {
  return t
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:white;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code style="background:rgba(255,255,255,0.07);padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>');
}

function renderTable(lines: string[], key: number) {
  const rows = lines.filter((l) => !l.includes("---"));
  if (rows.length < 2) return null;
  const headers = rows[0].split("|").map((h) => h.trim()).filter(Boolean);
  const dataRows = rows.slice(1).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
  return (
    <div key={key} className="overflow-x-auto my-6 rounded-xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/3 border-b border-white/8">
            {headers.map((h, i) => <th key={i} className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 hover:bg-white/2 transition-colors">
              {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-white/50" dangerouslySetInnerHTML={{ __html: fmt(cell) }} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableLines: string[] = [];
  let inTable = false;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "") {
      if (inTable && tableLines.length > 0) {
        elements.push(renderTable(tableLines, elements.length));
        tableLines = [];
        inTable = false;
      }
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      inTable = true;
      tableLines.push(line);
      i++;
      continue;
    }

    if (inTable && tableLines.length > 0) {
      elements.push(renderTable(tableLines, elements.length));
      tableLines = [];
      inTable = false;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={elements.length} className="text-2xl font-black text-white mt-10 mb-4 tracking-tight">{line.slice(3)}</h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={elements.length} className="text-lg font-bold text-white/90 mt-7 mb-3">{line.slice(4)}</h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-1.5 mb-4">
          {items.map((it, j) => (
            <li key={j} className="text-white/55 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: fmt(it) }} />
          ))}
        </ul>
      );
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="list-decimal list-inside space-y-1.5 mb-4">
          {items.map((it, j) => (
            <li key={j} className="text-white/55 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: fmt(it) }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.length > 0) {
      elements.push(
        <p key={elements.length} className="text-white/55 text-base leading-[1.85] mb-4"
          dangerouslySetInnerHTML={{ __html: fmt(line) }} />
      );
    }
    i++;
  }

  if (inTable && tableLines.length > 0) elements.push(renderTable(tableLines, elements.length));
  return elements;
}

interface Props {
  slug: string;
}

export default function UserBlogDetailClient({ slug }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<UserBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getUserPost(slug);
    setPost(found);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] pt-16 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] pt-16 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-sm"
          >
            <p className="text-5xl mb-6">🧳</p>
            <h1 className="text-2xl font-black text-white mb-3">Story not found</h1>
            <p className="text-white/40 text-base mb-8">
              This story doesn't exist or may have been removed.
            </p>
            <Link href="/blog" className="btn-gradient inline-flex">
              Back to all stories
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">
        {/* Cover — gradient fallback if no image */}
        <div className="relative h-72 sm:h-[380px] overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1a2e] via-[#1a0a2e] to-[#080808]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <span className="badge-accent text-xs font-bold mb-4 inline-flex">{post.category}</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight max-w-2xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/30 mb-10 pb-8 border-b border-white/8">
                <Link href="/blog" className="flex items-center gap-1.5 text-[#60A5FA] hover:text-[#93C5FD] transition-colors font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> All Stories
                </Link>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{post.readTime}
                  </span>
                )}
                <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/20">
                  Community story
                </span>
              </div>

              <div>{renderContent(post.content)}</div>

              {/* Inline CTA */}
              <div className="mt-12 p-7 rounded-3xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 border border-[#2563EB]/15">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-2">Ready to plan this trip?</h3>
                    <p className="text-white/40 text-sm mb-4 leading-relaxed">
                      Use the AI planner to get a personalised itinerary and budget breakdown — free, instant, no signup.
                    </p>
                    <Link href="/planner" className="btn-gradient inline-flex">
                      <Sparkles className="w-4 h-4" /> Plan This Trip
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside>
              <div className="card-dark sticky top-24">
                <h3 className="font-bold text-white text-sm mb-3">Plan Your Trip</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">
                  Get a complete itinerary + budget for any destination in seconds.
                </p>
                <Link href="/planner" className="btn-gradient w-full justify-center flex">
                  <Sparkles className="w-4 h-4" /> Start Planning
                </Link>

                <div className="mt-6 pt-6 border-t border-white/8">
                  <button
                    onClick={() => router.push("/blog")}
                    className="w-full flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> All stories
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
