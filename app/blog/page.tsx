import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogEditorialGrid from "@/components/BlogEditorialGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import { blogPosts } from "@/data/blogPosts";
import { DriftingClouds, PassportStamp, BirdFlock } from "@/components/clay/SceneElements";
import FlyingPlanes from "@/components/map/FlyingPlanes";

export const metadata: Metadata = {
  title: "Field Notes — Weary Passports",
  description: "Real itineraries. Honest budgets. Routes tried and tested, written by hand.",
};

const stats = [
  { s: "50+", l: "destinations" },
  { s: "₹0", l: "paywalled" },
  { s: "100%", l: "traveller POV" },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="paper-texture">
        {/* Compact, lively hero */}
        <section
          className="relative overflow-hidden text-center"
          style={{ paddingTop: "clamp(6rem,12vw,8rem)", paddingBottom: "clamp(2rem,5vw,3.5rem)", paddingInline: "clamp(1.25rem,4vw,3rem)" }}
        >
          {/* flight band + clouds */}
          <FlyingPlanes className="absolute inset-x-0 top-0 h-full w-full opacity-90" />
          <DriftingClouds />
          <BirdFlock className="absolute left-[10%] top-[26%] scale-90" />
          {/* floating stamps */}
          <div className="absolute left-[6%] top-[34%] w-20 md:w-28 hidden sm:block a-float"><PassportStamp label="STORIES" sub="FIELD" color="#5B8FA3" /></div>
          <div className="absolute right-[7%] top-[30%] w-20 md:w-28 hidden sm:block a-float-2"><PassportStamp label="NOTES" sub="WEARY" color="#C56B4A" /></div>

          <div className="wrap relative z-10">
            <p className="eyebrow mb-4">The journal · Field notes</p>
            <h1 className="d-hero text-ink">Real <span className="italic-serif text-forest-800">stories.</span></h1>
            <p className="body-lg text-text-2 max-w-xl mx-auto mt-5">
              No fluff, no recycled listicles — just what it actually costs, feels like, and takes,
              from people who went and came back honest.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-7">
              {stats.map((x, i) => (
                <div key={x.l} className="flex items-center gap-3">
                  {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-forest-300" />}
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-serif text-2xl text-forest-800">{x.s}</span>
                    <span className="text-sm text-text-3">{x.l}</span>
                  </span>
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
