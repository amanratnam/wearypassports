import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogEditorialGrid from "@/components/BlogEditorialGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import { blogPosts } from "@/data/blogPosts";
import { DriftingClouds, BirdFlock } from "@/components/clay/SceneElements";

export const metadata: Metadata = {
  title: "Field Notes — Weary Passports",
  description: "Real itineraries. Honest budgets. Routes tried and tested, written by hand.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="paper-texture pt-[68px]">
        {/* Editorial header */}
        <section className="relative overflow-hidden pt-20 pb-16 section !py-0">
          <DriftingClouds />
          <div className="absolute right-[12%] top-[24%]"><BirdFlock /></div>
          <div className="wrap relative z-10 pt-16 grid md:grid-cols-2 gap-10 items-end">
            <div>
              <p className="eyebrow mb-6">The journal · Field notes</p>
              <h1 className="d-hero text-ink mb-6">Real<br /><span className="italic-serif text-forest-800">stories.</span></h1>
              <p className="body-lg text-text-2 max-w-sm">
                No fluff, no recycled listicles. Just what it actually costs, feels like, and
                takes — from people who went and came back honest.
              </p>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3 pb-2">
              {[
                { s: "50+", l: "Destinations" },
                { s: "₹0", l: "Paywalled" },
                { s: "100%", l: "Traveller POV" },
                { s: "Real", l: "Budget breakdowns" },
              ].map((x) => (
                <div key={x.l} className="card p-5 paper-deep-texture">
                  <p className="font-serif text-3xl text-forest-800 mb-0.5">{x.s}</p>
                  <p className="text-xs text-text-3 font-semibold">{x.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarqueeStrip />
        <BlogEditorialGrid posts={blogPosts} />
        <Footer />
      </main>
    </>
  );
}
