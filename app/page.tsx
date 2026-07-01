import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import FeaturedAdventures from "@/components/home/FeaturedAdventures";
import JourneyTimeline from "@/components/home/JourneyTimeline";
import HomeStories from "@/components/home/HomeStories";
import WorldMap from "@/components/home/WorldMap";
import Philosophy from "@/components/home/Philosophy";
import AboutStrip from "@/components/home/AboutStrip";

export const metadata: Metadata = {
  title: "Weary Passports — An Interactive Travel Journal",
  description:
    "Field notes, hand-drawn routes and honest budgets for the curious traveller. Plan slow, wander far, and keep the journal open.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <FeaturedAdventures />
        <JourneyTimeline />
        <HomeStories />
        <WorldMap />
        <Philosophy />
        <AboutStrip />
      </main>
      <Footer />
    </>
  );
}
