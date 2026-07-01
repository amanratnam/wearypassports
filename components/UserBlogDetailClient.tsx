"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUserPost, UserBlogPost } from "@/lib/blogStore";
import { ArrowLeft, Clock, Calendar, Compass } from "lucide-react";

function fmt(t: string): string {
  return t
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code style="background:var(--paper-deep);padding:2px 6px;border-radius:6px;font-size:0.85em">$1</code>');
}

function renderTable(lines: string[], key: number) {
  const rows = lines.filter((l) => !l.includes("---"));
  if (rows.length < 2) return null;
  const headers = rows[0].split("|").map((h) => h.trim()).filter(Boolean);
  const dataRows = rows.slice(1).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
  return (
    <div key={key} className="overflow-x-auto">
      <table>
        <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{dataRows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: fmt(cell) }} />)}</tr>)}</tbody>
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
      if (inTable && tableLines.length > 0) { elements.push(renderTable(tableLines, elements.length)); tableLines = []; inTable = false; }
      i++; continue;
    }
    if (line.startsWith("|")) { inTable = true; tableLines.push(line); i++; continue; }
    if (inTable && tableLines.length > 0) { elements.push(renderTable(tableLines, elements.length)); tableLines = []; inTable = false; }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={elements.length}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={elements.length}>{line.slice(4)}</h3>);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) { items.push(lines[i].trim().slice(2)); i++; }
      elements.push(<ul key={elements.length}>{items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: fmt(it) }} />)}</ul>);
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, "")); i++; }
      elements.push(<ol key={elements.length}>{items.map((it, j) => <li key={j} dangerouslySetInnerHTML={{ __html: fmt(it) }} />)}</ol>);
      continue;
    } else if (line.length > 0) {
      elements.push(<p key={elements.length} dangerouslySetInnerHTML={{ __html: fmt(line) }} />);
    }
    i++;
  }
  if (inTable && tableLines.length > 0) elements.push(renderTable(tableLines, elements.length));
  return elements;
}

interface Props { slug: string; }

export default function UserBlogDetailClient({ slug }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<UserBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setPost(getUserPost(slug)); setLoading(false); }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen paper-texture pt-[68px] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-forest-800/30 border-t-forest-800 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen paper-texture pt-[68px] flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-sm">
            <p className="text-5xl mb-6">🧭</p>
            <h1 className="font-serif text-3xl text-ink mb-3">Note not found</h1>
            <p className="body text-text-2 mb-8">This page doesn&apos;t exist, or has drifted off the map.</p>
            <Link href="/blog" className="btn-forest inline-flex">Back to all notes</Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen paper-texture pt-[68px]">
        <div className="relative h-72 sm:h-[420px] overflow-hidden">
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="100vw" />
          ) : (
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#335C45,#12281C)" }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,40,28,0.1), rgba(18,40,28,0.75))" }} />
          <div className="absolute inset-0 flex items-end">
            <div className="wrap pb-10 w-full">
              <span className="chip !bg-paper/90 mb-4 inline-flex">{post.category}</span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-paper leading-tight max-w-3xl">{post.title}</h1>
            </div>
          </div>
        </div>

        <div className="wrap-wide section !py-14">
          <div className="grid lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-3 mb-10 pb-8 border-b border-[color:var(--line)]">
                <Link href="/blog" className="flex items-center gap-1.5 text-forest-700 hover:text-forest-800 transition-colors font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> All Field Notes
                </Link>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                {post.readTime && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>}
                <span className="ml-auto chip">Community note</span>
              </div>

              <div className="prose-journal">{renderContent(post.content)}</div>

              <div className="mt-12 rounded-4xl p-7 text-paper" style={{ background: "linear-gradient(135deg,#1F4D36,#12281C)" }}>
                <div className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-2xl bg-sun flex items-center justify-center flex-shrink-0"><Compass className="w-5 h-5 text-forest-900" /></span>
                  <div>
                    <h3 className="font-serif text-xl text-paper mb-2">Ready to draw this route?</h3>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(250,249,245,0.7)" }}>
                      Open the planner for a day-by-day itinerary and honest budget — free, instant, no signup.
                    </p>
                    <Link href="/planner" className="btn-sun !py-2.5 !px-5 !text-sm">Plan This Trip</Link>
                  </div>
                </div>
              </div>
            </article>

            <aside>
              <div className="card p-6 sticky top-24 paper-deep-texture">
                <h3 className="font-serif text-xl text-ink mb-3">Plan your own</h3>
                <p className="body text-text-2 mb-5">A complete itinerary and budget for any destination, in seconds.</p>
                <Link href="/planner" className="btn-forest w-full">Start Planning</Link>
                <div className="mt-6 pt-6 border-t border-[color:var(--line-soft)]">
                  <button onClick={() => router.push("/blog")} className="w-full flex items-center gap-2 text-sm text-text-3 hover:text-forest-800 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> All notes
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
