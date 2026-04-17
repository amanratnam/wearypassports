"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Mail, MessageSquare, User, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-b border-white/6">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-b from-[#7C3AED]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label-caps mb-6"
            >
              Get in touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-7xl font-black text-white leading-[0.88] tracking-[-0.035em] mb-6"
            >
              We&apos;d love to
              <br />
              <span className="gradient-text">hear from you.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-lg leading-relaxed"
            >
              Questions, suggestions, or just want to say hello — we read everything.
            </motion.p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12">

            {/* Left: form */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="card-dark text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-[#6EE7B7]" />
                    </div>
                    <h2 className="font-black text-white text-2xl mb-3 tracking-tight">Message sent!</h2>
                    <p className="text-white/40 text-base leading-relaxed mb-8 max-w-xs mx-auto">
                      Thanks for reaching out. We&apos;ll reply within 24–48 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                      className="btn-ghost"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="card-dark"
                  >
                    <h2 className="font-black text-white text-xl mb-8 tracking-tight">Send a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold text-white/35 mb-2">Your name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="text" placeholder="Aman Ratnam" value={form.name}
                            onChange={(e) => update("name", e.target.value)} required
                            className="input-dark pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/35 mb-2">Email address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                          <input type="email" placeholder="hello@example.com" value={form.email}
                            onChange={(e) => update("email", e.target.value)} required
                            className="input-dark pl-10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/35 mb-2">Message</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/20" />
                          <textarea rows={5} placeholder="What's on your mind?" value={form.message}
                            onChange={(e) => update("message", e.target.value)} required
                            className="input-dark pl-10 resize-none" />
                        </div>
                      </div>
                      <motion.button
                        type="submit" disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Sending…</>
                        ) : (
                          <><Send className="w-4 h-4" />Send Message</>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: info */}
            <div className="md:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="label-caps mb-5">Other ways to reach us</p>
                <a href="mailto:hello@wearypassports.com"
                  className="group flex items-center justify-between card-dark hover:border-white/20 mb-3">
                  <div>
                    <p className="text-xs text-white/30 mb-1">Email</p>
                    <p className="text-sm font-semibold text-white">hello@wearypassports.com</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </a>
                <div className="card-dark">
                  <p className="text-xs text-white/30 mb-1">Response time</p>
                  <p className="text-sm font-semibold text-white">Within 24–48 hours</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#2563EB]/8 to-[#7C3AED]/8 border border-white/8"
              >
                <p className="text-sm font-semibold text-white mb-2">Have a trip question?</p>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  For trip planning help, try the AI Planner — it&apos;s faster than email.
                </p>
                <a href="/planner" className="text-sm font-bold text-[#60A5FA] hover:text-[#93C5FD] transition-colors inline-flex items-center gap-1">
                  Open AI Planner <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
