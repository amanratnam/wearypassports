import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogEditorialGrid from "@/components/BlogEditorialGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Travel Stories — Weary Passports",
  description:
    "Real itineraries. Honest budgets. Routes tried and tested by Indian travelers.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">
        {/* Editorial header */}
        <section className="relative overflow-hidden bg-[#080808] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/40 to-[#080808]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/60" />
          </div>
          <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                Weary Passports · Travel Writing
              </p>
              <h1 className="text-[13vw] sm:text-[8.5vw] lg:text-[6.5vw] font-black text-white leading-[0.88] tracking-[-0.03em] mb-8">
                REAL
                <br />
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
                  STORIES.
                </span>
              </h1>
              <p className="text-white/65 text-lg max-w-sm leading-relaxed">
                No fluff. No recycled listicles. Just what it actually costs,
                feels like, and takes — from travelers who went and came back honest.
              </p>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3 pb-2">
              {[
                { stat: "50+", label: "Destinations" },
                { stat: "₹0", label: "Paywalled content" },
                { stat: "100%", label: "Indian traveler POV" },
                { stat: "Real", label: "Budget breakdowns" },
              ].map(({ stat, label }) => (
                <div key={label} className="p-4 rounded-2xl bg-white/4 border border-white/8 backdrop-blur-sm">
                  <p className="text-2xl font-black text-white mb-0.5">{stat}</p>
                  <p className="text-xs text-white/40 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarqueeStrip dark />

        {/* Editorial grid */}
        <BlogEditorialGrid posts={blogPosts} />

        <Footer />
      </main>
    </>
  );
}
