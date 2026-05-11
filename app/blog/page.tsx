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
        <section className="relative overflow-hidden bg-[#080808] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/60 via-transparent to-[#080808]" />
            <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-[#2563EB]/8 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[#7C3AED]/8 blur-[80px] rounded-full" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <p className="text-white/50 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
              Weary Passports · Travel Writing
            </p>
            <h1 className="text-[12vw] sm:text-[9vw] lg:text-[7vw] font-black text-white leading-[0.88] tracking-[-0.03em] mb-6">
              TRAVEL
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
                STORIES.
              </span>
            </h1>
            <p className="text-white/65 text-lg max-w-md leading-relaxed">
              Real costs, real routes, real talk — for Indian travelers going
              anywhere from Ladakh to Lisbon.
            </p>
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
