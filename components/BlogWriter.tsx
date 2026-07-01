"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Edit3, CheckCircle, Image as ImageIcon, Bold, Italic, Heading2, List, PenLine, AlertCircle } from "lucide-react";
import { saveUserPost, slugify } from "@/lib/blogStore";

interface Props { onClose: () => void; }

const RATE_KEY = "wp_publish_times";
const RATE_LIMIT = 3;
const RATE_WINDOW = 24 * 60 * 60 * 1000;

function getRateLimitStatus(): { allowed: boolean; remaining: number; resetIn: string } {
  if (typeof window === "undefined") return { allowed: true, remaining: RATE_LIMIT, resetIn: "" };
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const times: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = times.filter((t) => now - t < RATE_WINDOW);
    const remaining = Math.max(0, RATE_LIMIT - recent.length);
    const oldest = recent[0];
    const resetIn = oldest ? `${Math.ceil((oldest + RATE_WINDOW - now) / 3600000)}h` : "";
    return { allowed: remaining > 0, remaining, resetIn };
  } catch { return { allowed: true, remaining: RATE_LIMIT, resetIn: "" }; }
}
function recordPublish() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RATE_KEY);
    const times: number[] = raw ? JSON.parse(raw) : [];
    times.push(Date.now());
    localStorage.setItem(RATE_KEY, JSON.stringify(times.slice(-50)));
  } catch { /* ignore */ }
}

const placeholderContent = `## Start with a hook

Write the opening line that makes someone stop scrolling. One sentence. Make it land.

## The story

What happened? What did you see, eat, spend, regret, or love? Be specific — ₹400 for a sunset dinner at a shack in Goa is more useful than "it was affordable."

## What it actually costs

| Item | Cost |
|---|---|
| Flights | ₹XX,XXX |
| Hotel (X nights) | ₹XX,XXX |
| Food (daily) | ₹X,XXX |

## The honest verdict

Would you go back? What would you do differently? What does the internet get wrong about this place?
`;

export default function BlogWriter({ onClose }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(placeholderContent);
  const [preview, setPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("Budget Travel");

  const handlePublish = async () => {
    if (!title.trim()) { setError("Give your note a headline first."); return; }
    if (content.trim().length < 100) { setError("Write a bit more before publishing — at least 100 characters."); return; }
    const { allowed, remaining, resetIn } = getRateLimitStatus();
    void remaining;
    if (!allowed) { setError(`You've hit the daily publish limit (${RATE_LIMIT} notes/24h). Try again in ${resetIn}.`); return; }
    setError(""); setPublishing(true);
    await new Promise((r) => setTimeout(r, 700));
    recordPublish();
    const slug = slugify(title);
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;
    saveUserPost({
      slug, title: title.trim(),
      excerpt: content.replace(/^##.*$/gm, "").replace(/[#*|`_]/g, "").trim().slice(0, 180) + "…",
      category, readTime,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      coverImage: "", content,
    });
    setPublishing(false); setPublished(true);
    setTimeout(() => router.push(`/blog/${slug}`), 1200);
  };

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("blog-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart, end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const newContent = content.slice(0, start) + prefix + (selected || "text") + suffix + content.slice(end);
    setContent(newContent);
    setTimeout(() => { textarea.focus(); textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length); }, 0);
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] paper-texture grain overflow-y-auto">
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[102] min-h-screen flex flex-col max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-forest-700" />
              <span className="hidden sm:block text-text-2 text-sm font-medium tracking-wide">New Field Note</span>
            </div>
            <span className="hidden sm:block text-text-4">·</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="bg-paper border border-[color:var(--line)] text-text-2 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-forest-500 transition-colors">
              <option>Budget Travel</option><option>Itineraries</option><option>Honeymoon</option><option>Food & Culture</option><option>Adventure</option>
            </select>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button onClick={() => setPreview(!preview)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                preview ? "bg-forest-800/8 text-forest-800 border border-forest-800/20" : "text-text-3 hover:text-forest-800 border border-[color:var(--line)]"
              }`}>
              {preview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}{preview ? "Edit" : "Preview"}
            </button>
            <motion.button onClick={handlePublish} disabled={publishing || published}
              whileHover={!publishing && !published ? { scale: 1.02 } : {}} whileTap={!publishing && !published ? { scale: 0.97 } : {}}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all min-w-[100px] justify-center ${
                published ? "bg-forest-700 text-paper" : publishing ? "bg-paper-shadow text-text-3 cursor-not-allowed" : "bg-forest-800 text-paper hover:bg-forest-900"
              }`}>
              {published ? (<><CheckCircle className="w-3.5 h-3.5" />Published!</>)
                : publishing ? (<><span className="w-3.5 h-3.5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />Publishing…</>)
                : "Publish"}
            </motion.button>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full text-text-3 hover:text-forest-800 border border-[color:var(--line)] transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-terracotta/10 border border-terracotta/25 text-terracotta text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
            </motion.div>
          )}
        </AnimatePresence>

        <input type="text" placeholder="A headline worth clicking…" value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          className="w-full bg-transparent font-serif text-ink text-3xl sm:text-5xl font-medium placeholder:text-text-4 focus:outline-none leading-tight mb-6" />

        <div className="h-px bg-[color:var(--line)] mb-6" />

        {!preview ? (
          <>
            <div className="flex items-center gap-1 mb-5">
              {[
                { icon: Heading2, label: "H2", action: () => insertMarkdown("## ") },
                { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
                { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
                { icon: List, label: "List", action: () => insertMarkdown("- ") },
                { icon: ImageIcon, label: "Image", action: () => insertMarkdown("![alt](", ")") },
              ].map(({ icon: Icon, label, action }) => (
                <button key={label} onClick={action} title={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-text-3 hover:text-forest-800 hover:bg-forest-800/5 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
              <div className="ml-3 text-[0.65rem] text-text-3 font-semibold tracking-[0.18em] uppercase">Markdown supported</div>
            </div>
            <textarea id="blog-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Start writing…"
              className="flex-1 w-full min-h-[480px] bg-transparent text-text-2 leading-[1.9] placeholder:text-text-4 focus:outline-none resize-none"
              style={{ fontSize: "15px" }} />
          </>
        ) : (
          <div className="flex-1 prose-journal max-w-none">
            {title && <h1 className="font-serif text-4xl text-ink mb-8 leading-tight">{title}</h1>}
            <div dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[color:var(--line)] flex items-center justify-between">
          <p className="text-[0.7rem] text-text-3">{wordCount} words · {Math.max(1, Math.round(wordCount / 200))} min read</p>
          <p className="text-[0.7rem] text-text-3">{(() => { const { remaining } = getRateLimitStatus(); return `${remaining} of ${RATE_LIMIT} daily publishes remaining`; })()}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function renderPreview(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\|(.+)\|/g, (row) => {
      if (row.includes("---")) return "";
      const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
      return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
    })
    .replace(/^(?!<[h|u|l|t]).+$/gm, (line) => (line.trim() ? `<p>${line}</p>` : ""));
}
