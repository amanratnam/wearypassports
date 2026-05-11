"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Globe, Cpu, Heart, ArrowRight, Users, Map, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const travelPhotos = [
  { src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80", alt: "Traveler at sunset" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80", alt: "Mountain road trip" },
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80", alt: "Couple travel" },
  { src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80", alt: "Backpackers" },
  { src: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&q=80", alt: "Airport departure" },
  { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", alt: "Exploring streets" },
];

const stats = [
  { num: "50+", label: "Destinations covered" },
  { num: "30s", label: "Average plan time" },
  { num: "₹0", label: "Cost to use" },
  { num: "24/7", label: "Always available" },
];

const values = [
  {
    icon: Globe, color: "#60A5FA",
    title: "Honest information",
    body: "Real costs, not aspirational ones. A ₹85,000 accurate estimate beats a ₹40,000 fantasy every time.",
  },
  {
    icon: Cpu, color: "#A78BFA",
    title: "AI that actually helps",
    body: "One input. One complete plan. No 20 prompts. No generic templates. Just a plan that's yours.",
  },
  {
    icon: Heart, color: "#F9A8D4",
    title: "Built for Indian travelers",
    body: "INR budgets, Indian passport visa guides, flights from Delhi/Mumbai/Bangalore — calibrated for you.",
  },
];

const stories = [
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    label: "Our Mission",
    title: "Plan in 30 seconds.\nTravel for a lifetime.",
    body: "Travel planning takes too long. Between tab-switching to compare flights, guessing at hotel costs, and trying to figure out what a reasonable daily budget looks like in Bali versus Bangkok — most people spend more time planning than travelling.\n\nOur mission: give every traveller a complete, personalised plan in under 30 seconds.",
    align: "left" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&q=80",
    label: "Why we built this",
    title: "We kept running\ninto the same problem.",
    body: "Travel blogs give inspiration but rarely real numbers. Travel agents give packages but not flexibility. Google searches give 40 open tabs and no clear answer.\n\nWeary Passports bridges that gap. Your specific inputs. Your personalised plan. Not a template.",
    align: "right" as const,
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className="relative overflow-hidden h-full w-full">
      <motion.div className="absolute inset-[-10%] h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">

        {/* ── HERO: Full-bleed split ── */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
              alt="Traveler looking at horizon"
              fill className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              variants={stagger} initial="hidden" animate="show"
              className="max-w-2xl"
            >
              <motion.p variants={fadeUp} className="label-caps mb-6">Our story</motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-6xl sm:text-7xl md:text-[5.5rem] font-black text-white leading-[0.88] tracking-[-0.035em] mb-8"
              >
                We help you
                <br />
                <span className="gradient-text">get out there.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/55 text-xl leading-relaxed mb-10 max-w-lg">
                Weary Passports was built because the gap between &quot;I want to travel&quot;
                and &quot;I have a plan&quot; was unnecessarily wide. We closed it.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/planner" className="btn-gradient inline-flex items-center gap-2 px-6 py-3 text-sm">
                  Start planning free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/blog" className="btn-ghost inline-flex items-center gap-2 px-6 py-3 text-sm">
                  Read travel stories
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="border-y border-white/6 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map(({ num, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="py-8 px-6 text-center border-r border-white/6 last:border-r-0 sm:[&:nth-child(2)]:border-r sm:[&:nth-child(4)]:border-r-0"
                >
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">{num}</p>
                  <p className="text-xs text-white/35 font-medium tracking-wide">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO MOSAIC ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
              {travelPhotos.map(({ src, alt }, i) => (
                <motion.div
                  key={alt}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2 h-64 sm:h-72" : "h-28 sm:h-32"}`}
                >
                  <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 640px) 33vw, 20vw" />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-white/25 text-sm"
            >
              Real travelers. Real moments. That&apos;s what we help create.
            </motion.p>
          </div>
        </section>

        {/* ── STORY SECTIONS ── */}
        {stories.map(({ image, label, title, body, align }, idx) => (
          <section
            key={label}
            className="py-4 sm:py-0 border-t border-white/6 overflow-hidden"
          >
            <div className={`max-w-7xl mx-auto grid md:grid-cols-2 min-h-[480px] ${align === "right" ? "md:flex-row-reverse" : ""}`}>
              {/* Image */}
              <div className={`relative h-64 md:h-auto ${align === "right" ? "md:order-2" : ""}`}>
                <ParallaxImage src={image} alt={title} />
                <div className={`absolute inset-0 bg-gradient-to-${align === "right" ? "r" : "l"} from-[#080808] via-[#080808]/20 to-transparent md:from-transparent md:via-transparent`} />
              </div>

              {/* Text */}
              <div className={`flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 ${align === "right" ? "md:order-1" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, x: align === "right" ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="label-caps mb-4">
                    {String(idx + 1).padStart(2, "0")} — {label}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-6 whitespace-pre-line">
                    {title}
                  </h2>
                  {body.split("\n\n").map((para, j) => (
                    <p key={j} className="text-white/50 text-base leading-[1.85] mb-4 last:mb-0">{para}</p>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ── HOW AI HELPS ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="label-caps mb-4">03 — How AI helps</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
                Your best travel agent.<br />Available at 3am.
              </h2>
              <p className="text-white/50 text-base leading-[1.85] mb-4">
                The best travel agent you ever had was someone who knew your budget, your preferences,
                and could give you a recommendation in 10 minutes — not 10 days. AI makes that possible
                at scale, for free, without an appointment.
              </p>
              <p className="text-white/50 text-base leading-[1.85]">
                We&apos;re not replacing the joy of discovery. We&apos;re removing the friction that
                stops people from starting the journey at all.
              </p>
            </motion.div>

            {/* Feature list */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Map, label: "Day-by-day itinerary", desc: "Every hour accounted for, none of the rigidity." },
                { icon: Zap, label: "Real-time budget", desc: "INR costs, not vague estimates." },
                { icon: Users, label: "Built for groups", desc: "1 person or 12. Solo or honeymoon." },
                { icon: Globe, label: "50+ destinations", desc: "From Goa to Greece. Local to luxury." },
              ].map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/12 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[#60A5FA]" strokeWidth={1.75} />
                  </div>
                  <p className="font-bold text-white text-sm mb-1">{label}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="label-caps mb-4"
              >
                What we stand for
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-black text-white tracking-tight"
              >
                Built on three beliefs.
              </motion.h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {values.map(({ icon: Icon, color, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-dark group cursor-default"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-3">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL-BLEED TRAVEL IMAGE CTA ── */}
        <section className="relative overflow-hidden min-h-[50vh] flex items-center border-t border-white/6">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1600&q=80"
              alt="Airport departure board"
              fill className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#080808]/80" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 py-20"
          >
            <p className="label-caps mb-4">Your next adventure</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to stop planning<br />and start going?
            </h2>
            <p className="text-white/45 text-lg mb-8">Free. Instant. No signup. No excuses.</p>
            <Link href="/planner" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
              Build My Trip Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
