import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import UserBlogDetailClient from "@/components/UserBlogDetailClient";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react";

interface Params { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Story" };
  return { title: post.title, description: post.excerpt };
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

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // If not in seeded posts, render client component that checks localStorage
  if (!post) {
    return <UserBlogDetailClient slug={slug} />;
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">
        {/* Cover image */}
        <div className="relative h-72 sm:h-[420px] overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill priority
            className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/10" />
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
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
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
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/8">
              <h2 className="font-black text-white text-2xl mb-8 tracking-tight">More Stories</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((p, i) => <BlogCard key={p.slug} post={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
