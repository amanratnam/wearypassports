import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import UserBlogDetailClient from "@/components/UserBlogDetailClient";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock, Calendar, Compass } from "lucide-react";

interface Params { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Field Note" };
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
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci} dangerouslySetInnerHTML={{ __html: fmt(cell) }} />)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <UserBlogDetailClient slug={slug} />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="paper-texture pt-[68px]">
        {/* Cover */}
        <div className="relative h-72 sm:h-[460px] overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,40,28,0.1), rgba(18,40,28,0.75))" }} />
          <div className="absolute inset-0 flex items-end">
            <div className="wrap pb-10 w-full">
              <span className="chip !bg-paper/90 mb-4 inline-flex">{post.category}</span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-paper leading-tight max-w-3xl">{post.title}</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="wrap-wide section !py-14">
          <div className="grid lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-5 text-sm text-text-3 mb-10 pb-8 border-b border-[color:var(--line)]">
                <Link href="/blog" className="flex items-center gap-1.5 text-forest-700 hover:text-forest-800 transition-colors font-semibold">
                  <ArrowLeft className="w-3.5 h-3.5" /> All Field Notes
                </Link>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              </div>

              <div className="prose-journal">{renderContent(post.content)}</div>

              {/* Inline CTA */}
              <div className="mt-12 rounded-4xl p-7 text-paper relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1F4D36,#12281C)" }}>
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
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[color:var(--line)]">
              <h2 className="font-serif text-3xl text-ink mb-8">More from the journal</h2>
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
