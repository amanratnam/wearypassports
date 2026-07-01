"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowUpRight } from "lucide-react";
import { PassportStamp, DriftingClouds } from "@/components/clay/SceneElements";
import { ClayMapReader } from "@/components/clay/ClayCharacters";

type FieldKey = "name" | "email" | "phone" | "message";

const FIELDS: { key: FieldKey; label: string; placeholder: string; type: string; multiline?: boolean }[] = [
  { key: "name", label: "What should we call you?", placeholder: "The name on your passport — or your travel alias", type: "text" },
  { key: "email", label: "Where do we write back?", placeholder: "yourname@somewhere.com", type: "email" },
  { key: "phone", label: "A number (optional)", placeholder: "+91 98765 43210 — or wherever you're roaming", type: "tel" },
  { key: "message", label: "What's on your mind?", placeholder: "Tell us everything. We've got time zones, not deadlines.", type: "textarea", multiline: true },
];

function canSubmit(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem("wp_contact_times");
  const times: number[] = raw ? JSON.parse(raw) : [];
  const hour = Date.now() - 60 * 60 * 1000;
  return times.filter((t) => t > hour).length < 3;
}
function recordSubmit() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("wp_contact_times");
  const times: number[] = raw ? JSON.parse(raw) : [];
  times.push(Date.now());
  localStorage.setItem("wp_contact_times", JSON.stringify(times.slice(-20)));
}

export default function ContactPage() {
  const [form, setForm] = useState<Record<FieldKey, string>>({ name: "", email: "", phone: "", message: "" });
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (k: FieldKey, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) { setRateLimited(true); return; }
    setLoading(true);
    recordSubmit();
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    <>
      <Navbar />
      <main className="paper-texture pt-[68px]">
        {/* HERO */}
        <section className="relative overflow-hidden pt-20 pb-12 section !py-0">
          <DriftingClouds />
          <div className="wrap relative z-10 pt-16">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-6">A postcard to us</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="d-hero text-ink mb-6">
              Say hello.<br /><span className="italic-serif text-forest-800">We write back.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="body-lg text-text-2 max-w-lg">
              Questions, ideas, partnerships, or just where you&apos;re headed next — we read every line.
              Usually a reply before your next layover.
            </motion.p>
          </div>
        </section>

        {/* FORM + SIDEBAR */}
        <section className="section">
          <div className="wrap grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <Success key="s" onReset={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }} />
                ) : (
                  <motion.div key="f" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="relative card !rounded-4xl p-8 paper-deep-texture overflow-hidden">
                    <PassportStamp label="POSTED" sub="MAIL" color="#C56B4A" className="absolute -top-2 right-4 w-20 opacity-60" />
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center"><Send className="w-4 h-4 text-paper" /></span>
                      <div>
                        <p className="font-serif text-lg text-ink">Drop us a line</p>
                        <p className="text-text-3 text-xs">We reply within 24–48 hours</p>
                      </div>
                    </div>

                    {rateLimited && (
                      <div className="mb-6 px-4 py-3 rounded-2xl bg-terracotta/10 border border-terracotta/25 text-terracotta text-sm">
                        Steady on, wanderer. A few messages already — try again in an hour.
                      </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                      {FIELDS.map((field, i) => (
                        <motion.div key={field.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.06 }}>
                          <label className={`block text-xs font-bold tracking-wide mb-2 transition-colors ${focused === field.key ? "text-forest-800" : "text-text-3"}`}>
                            {field.label}
                          </label>
                          {field.multiline ? (
                            <textarea rows={5} required={field.key !== "phone"} placeholder={field.placeholder}
                              value={form[field.key]} onChange={(e) => update(field.key, e.target.value)}
                              onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)}
                              className="field resize-none leading-relaxed" />
                          ) : (
                            <input type={field.type} required={field.key !== "phone"} placeholder={field.placeholder}
                              value={form[field.key]} onChange={(e) => update(field.key, e.target.value)}
                              onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)}
                              className="field" />
                          )}
                        </motion.div>
                      ))}
                      <button type="submit" disabled={loading} className="btn-forest w-full !py-4 disabled:opacity-60">
                        {loading ? (<><span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />Sealing the envelope…</>)
                          : (<><Send className="w-4 h-4" />Send the Postcard</>)}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 space-y-5">
              <p className="eyebrow mb-2">Other ways to find us</p>
              <a href="mailto:aman@wearypassports.com" className="card card-hover group flex items-center justify-between p-5">
                <div>
                  <p className="text-[0.65rem] text-text-3 font-bold tracking-[0.18em] uppercase mb-1.5">Write to us directly</p>
                  <p className="text-sm font-semibold text-ink">aman@wearypassports.com</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-forest-700 group-hover:rotate-12 transition-transform" />
              </a>
              <div className="card p-5">
                <p className="text-[0.65rem] text-text-3 font-bold tracking-[0.18em] uppercase mb-1.5">Response time</p>
                <p className="text-sm font-semibold text-ink">Within 24–48 hours</p>
                <p className="text-xs text-text-3 mt-1">Faster if you catch us between trains.</p>
              </div>
              <div className="rounded-4xl p-6 text-paper relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1F4D36,#12281C)" }}>
                <div className="absolute -right-4 -bottom-4 w-28 opacity-80"><ClayMapReader /></div>
                <p className="font-serif text-xl text-paper mb-2 relative">In a hurry?</p>
                <p className="text-sm mb-4 relative max-w-[70%]" style={{ color: "rgba(250,249,245,0.7)" }}>
                  For trip planning, skip the inbox — the journal draws a route in seconds.
                </p>
                <a href="/planner" className="text-sm font-bold text-sun inline-flex items-center gap-1.5 relative">
                  Open the Planner <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="relative card !rounded-4xl overflow-hidden text-paper" style={{ minHeight: 480, background: "linear-gradient(180deg,#1a3326,#12281C)" }}>
      {[...Array(20)].map((_, i) => (
        <motion.span key={i} className="absolute w-[3px] h-[3px] bg-paper rounded-full"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 60}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i % 4) * 0.4 }} />
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 text-center">
        <motion.div initial={{ y: 40, x: -20, opacity: 1 }} animate={{ y: -160, x: 70, opacity: 0 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
          <PassportStamp label="SENT" sub="MAIL" color="#E8B23A" className="w-24" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <h2 className="font-serif text-3xl text-paper mb-3">Postcard&apos;s on its way.</h2>
          <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: "rgba(250,249,245,0.7)" }}>
            Somewhere over the ocean and headed to us. We&apos;ll write back before you know it.
          </p>
          <button onClick={onReset} className="btn-outline !text-paper !border-[rgba(250,249,245,0.3)]">Send another</button>
        </motion.div>
      </div>
    </motion.div>
  );
}
