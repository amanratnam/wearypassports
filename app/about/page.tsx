"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Globe, Cpu, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Globe,  color: "#60A5FA", title: "Honest information",       body: "Real costs, not aspirational ones. A ₹85,000 accurate estimate beats a ₹40,000 fantasy every time." },
  { icon: Cpu,    color: "#A78BFA", title: "AI that's actually useful", body: "Not a chatbot requiring 20 prompts. One input. One complete plan. Immediately actionable." },
  { icon: Heart,  color: "#F9A8D4", title: "Built for Indian travelers", body: "INR budgets, Indian passport visa guides, flights from Delhi/Mumbai/Bangalore — everything calibrated for you." },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8 text-center grain-overlay">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#2563EB]/10 via-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />

          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="relative z-10 max-w-3xl mx-auto"
          >
            <motion.p variants={fadeUp} className="label-caps mb-6">Our story</motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-[0.88] tracking-[-0.035em] mb-8"
            >
              Making Travel
              <br />
              <span className="gradient-text">Planning Easier.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/45 text-xl leading-relaxed max-w-xl mx-auto">
              Weary Passports was built because travel planning is harder than it should be —
              and we wanted to fix that with AI.
            </motion.p>
          </motion.div>

          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </section>

        {/* Story sections */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/6">
          <div className="max-w-3xl mx-auto space-y-20">

            {[
              {
                label: "Our Mission",
                title: "Plan in 30 seconds. Travel for a lifetime.",
                body: [
                  "Travel planning takes too long. Between tab-switching to compare flights, guessing at hotel costs, and trying to figure out what a reasonable daily budget looks like in Bali versus Bangkok versus Dubai — most people spend more time planning than they do travelling.",
                  "Our mission: give every traveller a complete, personalised plan in under 30 seconds — so they spend less time researching and more time actually going.",
                ],
              },
              {
                label: "Why we built this",
                title: "We kept running into the same problem.",
                body: [
                  "Travel blogs give inspiration but rarely real numbers. Travel agents give packages but not flexibility. Google searches give 40 open tabs and no clear answer.",
                  "Weary Passports bridges that gap. It takes your specific inputs — destination, duration, budget style, number of travellers — and produces a plan that's actually yours. Not a template. Not a generic post. Your personalised plan.",
                ],
              },
              {
                label: "How AI helps",
                title: "Your best travel agent. Available 24/7.",
                body: [
                  "The best travel agent you ever had was someone who knew your budget, your preferences, and could give you a recommendation in 10 minutes — not 10 days. AI makes that possible at scale, for free, without an appointment.",
                  "We're not replacing the joy of discovery. We're removing the friction that stops people from starting the journey at all.",
                ],
              },
            ].map(({ label, title, body }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-[180px_1fr] gap-8 md:gap-16"
              >
                <div>
                  <p className="label-caps">{String(i + 1).padStart(2, "0")} — {label}</p>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-5 leading-tight">{title}</h2>
                  {body.map((p, j) => (
                    <p key={j} className="text-white/50 text-base leading-[1.85] mb-4 last:mb-0">{p}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/6">
          <div className="max-w-5xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="label-caps text-center mb-4"
            >
              What we stand for
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-black text-white text-center tracking-tight mb-14"
            >
              Built on three beliefs.
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-5">
              {values.map(({ icon: Icon, color, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="card-dark-hover"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-3">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">
              Ready to plan your next trip?
            </h2>
            <p className="text-white/40 text-lg mb-8">Free. Instant. No signup.</p>
            <Link href="/planner" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
              Start Planning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
