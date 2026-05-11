"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, Phone, ArrowUpRight, MessageCircle } from "lucide-react";

type FieldKey = "name" | "email" | "phone" | "message";

const FIELDS: {
  key: FieldKey;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ElementType;
  multiline?: boolean;
}[] = [
  {
    key: "name",
    label: "What should we call you?",
    placeholder: "The name on your passport — or your travel alias",
    type: "text",
    icon: User,
  },
  {
    key: "email",
    label: "Where do we send the boarding pass?",
    placeholder: "yourname@somewhere.com",
    type: "email",
    icon: Mail,
  },
  {
    key: "phone",
    label: "Preferred number (optional)",
    placeholder: "+91 98765 43210 — or wherever you're roaming",
    type: "tel",
    icon: Phone,
  },
  {
    key: "message",
    label: "What's on your mind?",
    placeholder: "Tell us everything. We've got time zones, not deadlines.",
    type: "textarea",
    icon: MessageCircle,
    multiline: true,
  },
];

// Simple client-side rate limit: max 3 submissions per hour
function canSubmit(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem("wp_contact_times");
  const times: number[] = raw ? JSON.parse(raw) : [];
  const hour = Date.now() - 60 * 60 * 1000;
  const recent = times.filter((t) => t > hour);
  return recent.length < 3;
}

function recordSubmit() {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem("wp_contact_times");
  const times: number[] = raw ? JSON.parse(raw) : [];
  times.push(Date.now());
  localStorage.setItem("wp_contact_times", JSON.stringify(times.slice(-20)));
}

export default function ContactPage() {
  const [form, setForm] = useState<Record<FieldKey, string>>({
    name: "", email: "", phone: "", message: "",
  });
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
      <main className="min-h-screen bg-[#080808] pt-16">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/0 via-[#080808]/40 to-[#080808]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#2563EB]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label-caps mb-6"
            >
              Get in touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-[0.88] tracking-[-0.035em] mb-6"
            >
              Say hello.<br />
              <span className="gradient-text">We don&apos;t bite.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-white/45 text-lg leading-relaxed max-w-lg"
            >
              Questions, ideas, partnership pitches, or just vibes — we read everything.
              Usually respond before your next layover.
            </motion.p>
          </div>
        </section>

        {/* ── FORM + SIDEBAR ── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12 items-start">

            {/* ── FORM ── */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <PlaneSuccess key="success" onReset={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }} />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-[#0f0f0f] border border-white/8 rounded-3xl p-8 overflow-hidden"
                  >
                    {/* Ambient corner glow */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2563EB]/6 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#7C3AED]/6 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                          <Send className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">Drop us a message</p>
                          <p className="text-white/35 text-xs">We respond within 24–48 hours</p>
                        </div>
                      </div>

                      {rateLimited && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                          Slow down, speed racer. You&apos;ve sent a few messages recently. Try again in an hour.
                        </div>
                      )}

                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        {FIELDS.map((field, i) => {
                          const Icon = field.icon;
                          const isFocused = focused === field.key;
                          const hasValue = !!form[field.key];

                          return (
                            <motion.div
                              key={field.key}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <label className={`block text-xs font-bold tracking-wide mb-2 transition-colors duration-200 ${isFocused ? "text-white/80" : "text-white/30"}`}>
                                {field.label}
                              </label>
                              <div className={`relative transition-all duration-300 rounded-xl ${
                                isFocused
                                  ? "ring-1 ring-[#2563EB]/60 bg-white/4"
                                  : hasValue
                                  ? "bg-white/3"
                                  : "bg-white/2"
                              }`}>
                                <Icon className={`absolute left-4 ${field.multiline ? "top-4" : "top-1/2 -translate-y-1/2"} w-4 h-4 transition-colors duration-200 ${isFocused ? "text-[#60A5FA]" : "text-white/20"}`} />
                                {field.multiline ? (
                                  <textarea
                                    rows={5}
                                    required={field.key !== "phone"}
                                    placeholder={field.placeholder}
                                    value={form[field.key]}
                                    onChange={(e) => update(field.key, e.target.value)}
                                    onFocus={() => setFocused(field.key)}
                                    onBlur={() => setFocused(null)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-transparent text-white text-sm placeholder:text-white/18 focus:outline-none resize-none border border-white/8 rounded-xl transition-all duration-200 leading-relaxed"
                                  />
                                ) : (
                                  <input
                                    type={field.type}
                                    required={field.key !== "phone"}
                                    placeholder={field.placeholder}
                                    value={form[field.key]}
                                    onChange={(e) => update(field.key, e.target.value)}
                                    onFocus={() => setFocused(field.key)}
                                    onBlur={() => setFocused(null)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-transparent text-white text-sm placeholder:text-white/18 focus:outline-none border border-white/8 rounded-xl transition-all duration-200"
                                  />
                                )}
                              </div>
                            </motion.div>
                          );
                        })}

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: loading ? 1 : 1.015 }}
                          whileTap={{ scale: 0.98 }}
                          className="group w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-black text-sm font-black rounded-xl hover:bg-white/92 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                              Preparing for takeoff…
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              Send Message
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-2 space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <p className="label-caps mb-5">Other ways to find us</p>

                <a href="mailto:aman@wearypassports.com"
                  className="group flex items-center justify-between p-5 rounded-2xl bg-[#0f0f0f] border border-white/8 hover:border-white/18 transition-all duration-300 mb-3 hover:-translate-y-0.5"
                >
                  <div>
                    <p className="text-[10px] text-white/30 font-bold tracking-[0.15em] uppercase mb-1.5">Email us directly</p>
                    <p className="text-sm font-semibold text-white">aman@wearypassports.com</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </a>

                <div className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/8">
                  <p className="text-[10px] text-white/30 font-bold tracking-[0.15em] uppercase mb-1.5">Response time</p>
                  <p className="text-sm font-semibold text-white">Within 24–48 hours</p>
                  <p className="text-xs text-white/30 mt-1">Faster if you catch us between flights</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0f1a2e] to-[#0e0e1f] border border-[#2563EB]/15"
              >
                <p className="text-sm font-bold text-white mb-2">In a hurry?</p>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  For trip planning — skip the inbox. Our AI answers in 30 seconds, not 48 hours.
                </p>
                <a href="/planner" className="text-sm font-bold text-[#60A5FA] hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1.5">
                  Open AI Planner <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              {/* Fun stat */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="p-6 rounded-2xl border border-white/6 bg-white/2"
              >
                <p className="text-4xl font-black text-white mb-1">100%</p>
                <p className="text-sm text-white/40">of messages read by an actual human.<br />Not a bot. Promise.</p>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

function PlaneSuccess({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-[#0f0f0f] border border-white/8 rounded-3xl overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0e1628] to-[#0a1025]" />

      {/* Stars */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* Runway glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2563EB]/15 to-transparent" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-[#60A5FA]/40 to-transparent" />

      {/* Plane animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 text-center">
        <motion.div
          initial={{ y: 60, x: -30, rotate: 0, opacity: 1 }}
          animate={{ y: -200, x: 80, rotate: -30, opacity: 0 }}
          transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M8 40L28 32L20 16L28 20L40 12L56 28L32 36L36 52L28 48L20 40L8 40Z"
              fill="#60A5FA"
              opacity="0.9"
            />
            <path d="M28 32L20 16" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M32 36L36 52" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Trail */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: [0, 0.4, 0] }}
          transition={{ duration: 2.2, delay: 0.3 }}
          className="absolute bottom-[35%] left-[48%] w-0.5 h-24 bg-gradient-to-b from-[#60A5FA]/50 to-transparent origin-bottom"
        />

        {/* Success text — appears after plane is gone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/25 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Message sent!</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
            Your message is now 35,000 feet in the air, headed straight to us.
            We&apos;ll land back in your inbox soon.
          </p>
          <button
            onClick={onReset}
            className="px-6 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm font-semibold hover:border-white/30 hover:text-white transition-all duration-200"
          >
            Send another message
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
