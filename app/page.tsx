import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarqueeStrip from "@/components/MarqueeStrip";
import ParallaxSection from "@/components/ParallaxSection";
import DestinationDeck from "@/components/DestinationDeck";
import PlannerCTADark from "@/components/PlannerCTADark";
import FeaturesGrid from "@/components/FeaturesGrid";
import SectionHeader from "@/components/SectionHeader";
import BlogCard from "@/components/BlogCard";
import HomeHero from "@/components/HomeHero";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Weary Passports — AI Travel Planning for Indian Explorers",
  description:
    "From the ghats of Varanasi to the beaches of Bali. Plan your next trip with AI — personalized itineraries, real budgets, instant results.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <HomeHero />

      {/* ── MARQUEE ── */}
      <MarqueeStrip dark />

      {/* ── DESTINATION DECK ── */}
      <DestinationDeck />

      {/* ── PARALLAX 1: India ── */}
      <ParallaxSection
        image="https://images.unsplash.com/photo-1706186839147-0d708602587b?w=1600&q=80"
        eyebrow="Incredible India"
        headline={"48 hours<br/>in Varanasi."}
        subtext="Ancient ghats, morning aarti, street food on every corner. India's most spiritual city doesn't need a planner. But a budget breakdown helps."
        cta="Plan India trips"
        ctaHref="/planner?destination=Varanasi"
        overlay="from-black/80 via-black/50 to-transparent"
        align="left"
      />

      {/* ── PARALLAX 2: SE Asia ── */}
      <ParallaxSection
        image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80"
        eyebrow="Southeast Asia"
        headline={"Bali is<br/>3 hours away."}
        subtext="From Mumbai or Delhi, your nearest tropical escape. ₹55,000 all-in. Temples, rice terraces, surf, and the kind of sunsets you'll screenshot forever."
        cta="Build a Bali plan"
        ctaHref="/planner?destination=Bali"
        overlay="from-transparent via-black/40 to-black/80"
        align="right"
      />

      {/* ── MARQUEE (light) ── */}
      <MarqueeStrip dark={false} slow />

      {/* ── PARALLAX 3: Mountains ── */}
      <ParallaxSection
        image="https://images.unsplash.com/photo-1652204597589-962156b9483d?w=1600&q=80"
        eyebrow="Roof of the World"
        headline={"Ladakh.<br/>No filter needed."}
        subtext="The highest motorable passes. Blue lakes that look fake. Monasteries on clifftops. ₹22,000 from Delhi. The trip that changes how you see India."
        cta="Plan a Ladakh trip"
        ctaHref="/planner?destination=Ladakh"
        overlay="from-black/70 via-black/35 to-transparent"
        align="left"
      />

      {/* ── AI PLANNER CTA ── */}
      <PlannerCTADark />

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-white/5">
        <div className="container-max">
          <SectionHeader
            eyebrow="What you get"
            title="Everything in one plan."
            description="No more 20 open tabs. One AI. One plan. Built around you."
          />
          <FeaturesGrid />
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/5">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <SectionHeader
              eyebrow="Travel writing"
              title="From the blog"
              description="Real costs, real routes, real talk — written for Indian travelers."
              centered={false}
              className="mb-0"
            />
            <Link
              href="/blog"
              className="flex-shrink-0 self-start sm:self-end inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/20 text-white/70 text-sm font-semibold hover:border-white/35 hover:text-white transition-all duration-200"
            >
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
