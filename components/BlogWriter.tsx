"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, Edit3, CheckCircle, Image as ImageIcon, Bold, Italic, Heading2, List, Sparkles, AlertCircle } from "lucide-react";
import { saveUserPost, slugify } from "@/lib/blogStore";

interface Props {
  onClose: () => void;
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
    if (!title.trim()) {
      setError("Give your story a headline first.");
      return;
    }
    if (content.trim().length < 100) {
      setError("Write a bit more before publishing — at least 100 characters.");
      return;
    }
    setError("");
    setPublishing(true);

    // Small artificial delay so publish feels intentional
    await new Promise((r) => setTimeout(r, 700));

    const slug = slugify(title);
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

    saveUserPost({
      slug,
      title: title.trim(),
      excerpt: content.replace(/^##.*$/gm, "").replace(/[#*|`_]/g, "").trim().slice(0, 180) + "…",
      category,
      readTime,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      coverImage: "",
      content,
    });

    setPublishing(false);
    setPublished(true);

    // Redirect after showing success state
    setTimeout(() => router.push(`/blog/${slug}`), 1200);
  };

  const insertMarkdown = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("blog-content") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const newContent =
      content.slice(0, start) + prefix + (selected || "text") + suffix + content.slice(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length);
    }, 0);
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#080808] overflow-y-auto"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[102] min-h-screen flex flex-col max-w-4xl mx-auto px-4 sm:px-6 py-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
              <span className="hidden sm:block text-white/65 text-sm font-medium tracking-wide">New Story</span>
            </div>
            <span className="hidden sm:block text-white/15">·</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-white/30 transition-colors"
            >
              <option>Budget Travel</option>
              <option>Itineraries</option>
              <option>Honeymoon</option>
              <option>Food & Culture</option>
              <option>Adventure</option>
            </select>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setPreview(!preview)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                preview
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/55 hover:text-white/80 border border-white/10 hover:border-white/25"
              }`}
            >
              {preview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {preview ? "Edit" : "Preview"}
            </button>

            <motion.button
              onClick={handlePublish}
              disabled={publishing || published}
              whileHover={!publishing && !published ? { scale: 1.02 } : {}}
              whileTap={!publishing && !published ? { scale: 0.97 } : {}}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 min-w-[90px] sm:min-w-[100px] justify-center ${
                published
                  ? "bg-[#059669] text-white"
                  : publishing
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              {published ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Published!
                </>
              ) : publishing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white/70 rounded-full animate-spin" />
                  Publishing…
                </>
              ) : (
                "Publish"
              )}
            </motion.button>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-white/55 hover:text-white hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/25"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Title */}
        <input
          type="text"
          placeholder="Give your story a headline worth clicking…"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          className="w-full bg-transparent text-white text-2xl sm:text-4xl md:text-5xl font-black placeholder:text-white/20 focus:outline-none tracking-tight leading-tight mb-6 resize-none"
        />

        <div className="h-px bg-white/8 mb-6" />

        {!preview ? (
          <>
            {/* Markdown toolbar */}
            <div className="flex items-center gap-1 mb-5">
              {[
                { icon: Heading2, label: "H2", action: () => insertMarkdown("## ") },
                { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**") },
                { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*") },
                { icon: List, label: "List", action: () => insertMarkdown("- ") },
                { icon: ImageIcon, label: "Image", action: () => insertMarkdown("![alt](", ")") },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  title={label}
                  className="w-8 h-8 flex items-center justify-center rounded text-white/45 hover:text-white/80 hover:bg-white/8 transition-all duration-150"
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
              <div className="ml-3 text-[10px] text-white/35 font-medium tracking-[0.18em] uppercase">
                Markdown supported
              </div>
            </div>

            {/* Editor */}
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing…"
              className="flex-1 w-full min-h-[480px] bg-transparent text-white/75 text-base leading-[1.9] placeholder:text-white/25 focus:outline-none resize-none"
              style={{ fontFamily: "'Inter', ui-monospace, monospace", fontSize: "15px" }}
            />
          </>
        ) : (
          /* Preview */
          <div className="flex-1 text-white/75 max-w-none">
            {title && (
              <h1 className="text-4xl font-black text-white mb-8 tracking-tight leading-tight">{title}</h1>
            )}
            <div dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/8 flex items-center justify-between">
          <p className="text-[11px] text-white/45">
            {wordCount} words · {Math.max(1, Math.round(wordCount / 200))} min read
          </p>
          <p className="text-[11px] text-white/45">
            Stories help fellow Indian travelers plan smarter.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function renderPreview(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.5rem;font-weight:800;color:white;margin-top:2.5rem;margin-bottom:0.75rem;letter-spacing:-0.02em">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;color:rgba(255,255,255,0.9);margin-top:1.75rem;margin-bottom:0.5rem">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:white;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:rgba(255,255,255,0.75)">$1</em>')
    .replace(/^- (.+)$/gm, '<li style="color:rgba(255,255,255,0.6);margin-bottom:0.35rem;padding-left:0.25rem">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, '<ul style="padding-left:1.5rem;margin-bottom:1.25rem;list-style:disc">$1</ul>')
    .replace(/\|(.+)\|/g, (row) => {
      if (row.includes("---")) return "";
      const cells = row.split("|").map((c) => c.trim()).filter(Boolean);
      return `<tr>${cells.map((c) => `<td style="padding:0.55rem 0.85rem;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.55)">${c}</td>`).join("")}</tr>`;
    })
    .replace(/^(?!<[h|u|l|t]).+$/gm, (line) =>
      line.trim() ? `<p style="color:rgba(255,255,255,0.55);line-height:1.9;margin-bottom:1.1rem">${line}</p>` : ""
    );
}
