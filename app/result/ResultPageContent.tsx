"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type {
  TripPlan,
  TravelOption,
  PlaceToVisit,
  HotelRecommendation,
  BudgetBreakdown,
  ItineraryDay,
} from "@/data/tripTypes";
import {
  Plane, Hotel, UtensilsCrossed, Activity, Bus, Package,
  ArrowLeft, RefreshCw, Download, MapPin, Calendar, Users,
  Tag, Lightbulb, Info, Loader2, Train, Globe,
  Mountain, Landmark as LandmarkIcon, Building2, TreePine, ShoppingBag, Map,
  ShieldCheck, ShieldAlert, ExternalLink, FileText,
  Heart, AlertTriangle, Sun, Cloud, Moon, ChevronDown,
  Compass, BookOpen,
} from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹", USD: "$", EUR: "€", GBP: "£", AED: "AED ",
};

const budgetItems = [
  { key: "flights"       as const, label: "Flights",         icon: Plane,           color: "#60A5FA", bg: "rgba(96,165,250,0.1)"  },
  { key: "hotels"        as const, label: "Hotels",          icon: Hotel,           color: "#A78BFA", bg: "rgba(167,139,250,0.1)" },
  { key: "food"          as const, label: "Food & Dining",   icon: UtensilsCrossed, color: "#FCD34D", bg: "rgba(252,211,77,0.1)"  },
  { key: "activities"    as const, label: "Activities",      icon: Activity,        color: "#6EE7B7", bg: "rgba(110,231,183,0.1)" },
  { key: "transport"     as const, label: "Local Transport", icon: Bus,             color: "#67E8F9", bg: "rgba(103,232,249,0.1)" },
  { key: "miscellaneous" as const, label: "Miscellaneous",   icon: Package,         color: "#D1D5DB", bg: "rgba(209,213,219,0.1)" },
];

const categoryIcons: Record<string, typeof Mountain> = {
  "Trek/Hike/Trail": Mountain, "Monastery/Temple": LandmarkIcon, "Museum": Building2,
  "Park/Garden": TreePine, "Market/Street": ShoppingBag, "Landmark": LandmarkIcon,
  "Beach": Globe, "Lake": Globe, "Viewpoint": Map,
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

function bookingLinks(hotelName: string, destination: string) {
  const q = encodeURIComponent(`${hotelName} ${destination}`);
  return [
    { platform: "MakeMyTrip", url: `https://www.makemytrip.com/hotels/hotel-search?searchText=${q}` },
    { platform: "Goibibo", url: `https://www.goibibo.com/hotels/search?searchText=${q}` },
    { platform: "Booking.com", url: `https://www.booking.com/searchresults.html?ss=${q}` },
  ];
}

function flightBookingLinks(from: string, to: string) {
  const f = encodeURIComponent(from);
  const t = encodeURIComponent(to);
  return [
    { platform: "MakeMyTrip", url: `https://www.makemytrip.com/flight/search?fromCity=${f}&toCity=${t}` },
    { platform: "Cleartrip", url: `https://www.cleartrip.com/flights?from=${f}&to=${t}` },
    { platform: "Goibibo", url: `https://www.goibibo.com/flights/search?from=${f}&to=${t}` },
  ];
}

/* ── Tab pill component ── */
function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`whitespace-nowrap text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            active === t
              ? "bg-white/12 text-white border border-white/20"
              : "text-white/35 hover:text-white/55 border border-transparent hover:border-white/10"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ── Day card (inline, no accordion import needed) ── */
function DayCard({ day }: { day: ItineraryDay }) {
  const periods = [
    { key: "morning" as const, label: "Morning", icon: Sun, color: "#FCD34D" },
    { key: "afternoon" as const, label: "Afternoon", icon: Cloud, color: "#60A5FA" },
    { key: "evening" as const, label: "Evening", icon: Moon, color: "#A78BFA" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {periods.map(({ key, label, icon: Icon, color }) => {
        const act = day[key];
        return (
          <div key={key} className="flex gap-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${color}12` }}>
              <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold" style={{ color }}>{label}</span>
                <span className="text-xs text-white/25">{act.time}</span>
              </div>
              <p className="font-semibold text-white text-sm mb-1">{act.activity}</p>
              <p className="text-white/45 text-sm leading-relaxed mb-2">{act.description}</p>
              <span className="inline-flex items-center text-xs text-[#6EE7B7] bg-[#6EE7B7]/8 border border-[#6EE7B7]/15 px-2.5 py-1 rounded-full font-medium">
                Est. {act.estimatedCost}
              </span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function ResultPageContent() {
  const params = useSearchParams();
  const pdfRef = useRef<HTMLDivElement>(null);

  const destination  = params.get("destination") || "Bali";
  const days         = parseInt(params.get("days") || "5");
  const travelFrom   = params.get("travelFrom") || "Delhi";
  const travelers    = parseInt(params.get("travelers") || "2");
  const tripType     = params.get("tripType") || "leisure";
  const currency     = params.get("currency") || "INR";
  const budgetStyle  = params.get("budgetStyle") || "mid-range";

  const sym = CURRENCY_SYMBOLS[currency] || currency + " ";

  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [hotelFilter, setHotelFilter] = useState<string>("all");
  const [placeTab, setPlaceTab] = useState<string>("");
  const [dayTab, setDayTab] = useState<number>(1);
  const [tipsTab, setTipsTab] = useState<string>("tips");

  const fetchPlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, travelFrom, days, travelers, tripType, currency, budgetStyle }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate plan");
      }
      const data = await res.json();
      setPlan({
        destination, travelFrom, days, travelers, tripType, currency, budgetStyle,
        bestTimeToVisit: data.bestTimeToVisit || "",
        travelOptions: data.travelOptions || [],
        placesToVisit: data.placesToVisit || [],
        hotels: data.hotels || [],
        visa: data.visa || { required: false, type: "", cost: "", processingTime: "", documents: [], notes: "" },
        daysPlan: data.daysPlan || [],
        budget: data.budget || { flights: 0, hotels: 0, food: 0, activities: 0, transport: 0, miscellaneous: 0 },
        travelTips: data.travelTips || [],
        culturalTips: data.culturalTips || [],
        dosAndDonts: data.dosAndDonts || { dos: [], donts: [] },
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [destination, travelFrom, days, travelers, tripType, currency, budgetStyle]);

  useEffect(() => { fetchPlan(); }, [fetchPlan]);

  useEffect(() => {
    if (!plan) return;
    const cats = Object.keys(
      plan.placesToVisit.reduce<Record<string, boolean>>((a, p) => { a[p.category || "Other"] = true; return a; }, {})
    );
    if (cats.length > 0 && !placeTab) setPlaceTab(cats[0]);
  }, [plan, placeTab]);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;
    setPdfLoading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = pdfRef.current;
      el.classList.add("pdf-capture");
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, backgroundColor: "#ffffff",
        onclone: (doc) => {
          const target = doc.querySelector(".pdf-capture") as HTMLElement;
          if (target) {
            target.style.color = "#111";
            target.style.background = "#fff";
            target.querySelectorAll<HTMLElement>("[class*='text-white']").forEach(e => { e.style.color = "#111"; });
            target.querySelectorAll<HTMLElement>("[class*='text-white/']").forEach(e => { e.style.color = "#555"; });
            target.querySelectorAll<HTMLElement>(".card-dark").forEach(e => { e.style.background = "#f5f5f5"; e.style.borderColor = "#e0e0e0"; });
          }
        },
      });
      el.classList.remove("pdf-capture");

      const imgW = 210;
      const pageH = 297;
      const margin = 12;
      const contentW = imgW - margin * 2;
      const imgH = (canvas.height * contentW) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      // Branding header
      pdf.setFillColor(37, 99, 235);
      pdf.rect(0, 0, 210, 28, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Weary Passports", margin, 14);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text("Personalised travel planning for Indian explorers", margin, 20);
      pdf.text("wearypassports.com", imgW - margin, 14, { align: "right" });
      pdf.text(`Generated ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, imgW - margin, 20, { align: "right" });

      const headerH = 32;
      const footerH = 14;
      const usableH = pageH - headerH - footerH;

      let yPos = 0;
      let page = 0;

      while (yPos < imgH) {
        if (page > 0) {
          pdf.addPage();
          pdf.setFillColor(37, 99, 235);
          pdf.rect(0, 0, 210, 8, "F");
        }
        const sliceTop = page === 0 ? headerH : 12;
        const sliceH = page === 0 ? usableH : pageH - 12 - footerH;
        pdf.addImage(imgData, "JPEG", margin, sliceTop, contentW, imgH, undefined, "FAST", 0);
        pdf.setGState(new (pdf as unknown as { GState: new (o: { opacity: number }) => unknown }).GState({ opacity: 1 }));

        // Clip to page
        if (page > 0) {
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, 210, 12, "F");
        }

        // Footer
        pdf.setFontSize(8);
        pdf.setTextColor(160, 160, 160);
        pdf.text(`Weary Passports · wearypassports.com · Page ${page + 1}`, imgW / 2, pageH - 6, { align: "center" });

        yPos += sliceH;
        page++;
        if (page > 20) break;
      }

      pdf.save(`${destination}-trip-plan.pdf`);
    } catch {
      window.print();
    } finally {
      setPdfLoading(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)]">
              <Loader2 className="w-7 h-7 text-white animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Crafting your {destination} trip</h2>
              <p className="text-white/40 text-sm max-w-md">Finding flights, hotels, places to visit, visa requirements, and local tips…</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              {["flights", "hotels", "places", "visa", "tips"].map((step, i) => (
                <motion.div key={step} className="h-1.5 w-8 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full"
                    initial={{ width: 0 }} animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: i * 0.8, ease: "easeInOut" }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#080808] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-4">
            <AlertTriangle className="w-12 h-12 text-[#FCD34D] mx-auto" />
            <h2 className="text-xl font-bold text-white">Couldn&apos;t generate your plan</h2>
            <p className="text-white/45 text-sm">{error}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={fetchPlan} className="btn-gradient flex items-center gap-2 text-sm"><RefreshCw className="w-3.5 h-3.5" /> Try Again</button>
              <Link href="/planner" className="btn-ghost flex items-center gap-2 text-sm"><ArrowLeft className="w-3.5 h-3.5" /> Back to Planner</Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!plan) return null;

  const totalBudget = Object.values(plan.budget).reduce((a, b) => a + b, 0);

  const travelModeIcon = (mode: string) => {
    const m = mode.toLowerCase();
    if (m.includes("flight") || m.includes("air")) return Plane;
    if (m.includes("train")) return Train;
    return Bus;
  };

  const groupedPlaces = plan.placesToVisit.reduce<Record<string, PlaceToVisit[]>>((acc, place) => {
    const cat = place.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(place);
    return acc;
  }, {});
  const placeCategories = Object.keys(groupedPlaces);
  const activePlaces = groupedPlaces[placeTab] || [];
  const activeDay = plan.daysPlan.find((d) => d.day === dayTab) || plan.daysPlan[0];

  const allTips = [
    ...plan.travelTips.map(t => ({ text: t, type: "tip" as const })),
    ...plan.culturalTips.map(t => ({ text: t, type: "culture" as const })),
    ...plan.dosAndDonts.dos.map(t => ({ text: t, type: "do" as const })),
    ...plan.dosAndDonts.donts.map(t => ({ text: t, type: "dont" as const })),
  ];
  const tipsFiltered = tipsTab === "tips" ? allTips.filter(t => t.type === "tip")
    : tipsTab === "culture" ? allTips.filter(t => t.type === "culture")
    : allTips.filter(t => t.type === "do" || t.type === "dont");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#080808] pt-16">
        {/* Header */}
        <div className="border-b border-white/8 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link href="/planner" className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white transition-colors mb-3">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Planner
                </Link>
                <h1 className="text-3xl font-black text-white tracking-tight">Your {destination} Trip Plan</h1>
                <p className="text-white/35 text-sm mt-1 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#60A5FA]" />
                  Personalised for your travel style
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={fetchPlan} className="btn-ghost flex items-center gap-2 text-sm">
                  <RefreshCw className="w-3.5 h-3.5" /> Regenerate
                </button>
                <button onClick={handleDownloadPDF} disabled={pdfLoading} className="btn-gradient flex items-center gap-2 text-sm disabled:opacity-60">
                  {pdfLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  {pdfLoading ? "Generating…" : "Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={pdfRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Trip overview */}
              <motion.div {...fadeUp(0)} className="card-dark">
                <h2 className="font-bold text-white text-base mb-6">Trip Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {[
                    { icon: MapPin,   label: "Destination", value: destination },
                    { icon: Calendar, label: "Duration",    value: `${days} days` },
                    { icon: Users,    label: "Travelers",   value: `${travelers}` },
                    { icon: Tag,      label: "Trip Type",   value: tripType.charAt(0).toUpperCase() + tripType.slice(1) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center mb-2">
                        <Icon className="w-3.5 h-3.5 text-white/40" strokeWidth={1.75} />
                      </div>
                      <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="font-semibold text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/8 grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                    <p className="label-caps mb-1">Best time to visit</p>
                    <p className="text-sm font-semibold text-white">{plan.bestTimeToVisit}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#D97706]/8 border border-[#D97706]/15">
                    <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#FCD34D]/70 mb-1">Visa Info</p>
                    <p className="text-sm font-semibold text-[#FCD34D]/80 leading-snug">
                      {plan.visa.required ? `${plan.visa.type} — ${plan.visa.cost}` : "No visa required"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Visa details */}
              {plan.visa.required && (
                <motion.div {...fadeUp(0.05)} className="card-dark">
                  <div className="flex items-center gap-2 mb-5">
                    <FileText className="w-5 h-5 text-[#FCD34D]" />
                    <h2 className="font-bold text-white text-base">Visa Details</h2>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "Type", value: plan.visa.type },
                      { label: "Cost", value: plan.visa.cost },
                      { label: "Processing", value: plan.visa.processingTime },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3 rounded-xl bg-white/3 border border-white/8">
                        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-sm font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                  {plan.visa.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {plan.visa.documents.map((doc, i) => (
                        <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-white/60">{doc}</span>
                      ))}
                    </div>
                  )}
                  {plan.visa.notes && <p className="text-sm text-white/40 leading-relaxed">{plan.visa.notes}</p>}
                </motion.div>
              )}

              {/* ── Getting There (redesigned) ── */}
              {plan.travelOptions.length > 0 && (
                <motion.div {...fadeUp(0.1)} className="card-dark">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Plane className="w-5 h-5 text-[#60A5FA]" />
                      <h2 className="font-bold text-white text-base">Getting There</h2>
                    </div>
                    <div className="flex gap-2">
                      {flightBookingLinks(travelFrom, destination).map((link) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/25 text-[#60A5FA] hover:bg-[#2563EB]/25 transition-all font-semibold">
                          {link.platform} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {plan.travelOptions.map((opt: TravelOption, i: number) => {
                      const ModeIcon = travelModeIcon(opt.mode);
                      return (
                        <div key={i} className="p-5 rounded-xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/10 flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-[#60A5FA]/12 flex items-center justify-center flex-shrink-0">
                            <ModeIcon className="w-5 h-5 text-[#60A5FA]" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-white">{opt.provider}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#60A5FA]/10 text-[#60A5FA] font-bold uppercase">{opt.mode}</span>
                            </div>
                            <p className="text-sm text-white/60">{opt.route}</p>
                            {opt.bookingTip && <p className="text-xs text-white/35 mt-1">{opt.bookingTip}</p>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-lg font-black text-white">{opt.estimatedCost}</p>
                            <p className="text-xs text-white/35">{opt.duration}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Places to Visit (tab-based) ── */}
              {placeCategories.length > 0 && (
                <motion.div {...fadeUp(0.15)} className="card-dark">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin className="w-5 h-5 text-[#6EE7B7]" />
                    <h2 className="font-bold text-white text-base">Places to Visit</h2>
                  </div>
                  <TabBar tabs={placeCategories} active={placeTab} onChange={setPlaceTab} />
                  <AnimatePresence mode="wait">
                    <motion.div key={placeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-4 grid sm:grid-cols-2 gap-3">
                      {activePlaces.map((place: PlaceToVisit, i: number) => {
                        const CatIcon = categoryIcons[place.category] || MapPin;
                        return (
                          <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                            <div className="flex items-center gap-2 mb-2">
                              <CatIcon className="w-3.5 h-3.5 text-white/30" />
                              <p className="font-semibold text-white text-sm">{place.name}</p>
                            </div>
                            <p className="text-xs text-white/45 leading-relaxed mb-2">{place.description}</p>
                            <div className="flex items-center gap-3 text-xs text-white/30">
                              <span>{place.estimatedTime}</span>
                              <span>·</span>
                              <span>{place.estimatedCost}</span>
                            </div>
                            {place.tip && <p className="text-xs text-[#6EE7B7]/60 mt-2">{place.tip}</p>}
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── Hotels (compact grid) ── */}
              {plan.hotels.length > 0 && (
                <motion.div {...fadeUp(0.2)} className="card-dark">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-[#A78BFA]" />
                      <h2 className="font-bold text-white text-base">Where to Stay</h2>
                    </div>
                    <TabBar
                      tabs={["all", "budget", "mid-range", "luxury"]}
                      active={hotelFilter}
                      onChange={setHotelFilter}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {plan.hotels
                      .filter((h: HotelRecommendation) => hotelFilter === "all" || h.category === hotelFilter)
                      .map((hotel: HotelRecommendation, i: number) => {
                        const links = bookingLinks(hotel.name, destination);
                        const catColor = hotel.category === "luxury" ? "#FCD34D" : hotel.category === "mid-range" ? "#A78BFA" : "#6EE7B7";
                        return (
                          <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/8">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <p className="font-semibold text-white text-sm leading-tight">{hotel.name}</p>
                              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0"
                                style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}25` }}>
                                {hotel.category}
                              </span>
                            </div>
                            <p className="text-lg font-black text-white mb-0.5">{sym}{hotel.pricePerNight.replace(/[^\d,.-]/g, "")}<span className="text-white/30 text-xs font-normal">/night</span></p>
                            <p className="text-xs text-white/35 mb-2">{hotel.location}</p>
                            <div className="flex items-center gap-1.5">
                              {links.map((link) => (
                                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all font-medium">
                                  {link.platform} <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              )}

              {/* ── Itinerary (tab-based) ── */}
              {plan.daysPlan.length > 0 && (
                <motion.div {...fadeUp(0.25)} className="card-dark">
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar className="w-5 h-5 text-[#67E8F9]" />
                    <h2 className="font-bold text-white text-base">Day-by-Day Itinerary</h2>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-5">
                    {plan.daysPlan.map((d) => (
                      <button key={d.day} onClick={() => setDayTab(d.day)}
                        className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                          dayTab === d.day
                            ? "bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                            : "bg-white/5 border border-white/8 text-white/40 hover:text-white/60 hover:border-white/15"
                        }`}>
                        <span className="text-[10px] font-semibold uppercase">Day</span>
                        <span className="text-base font-black">{d.day}</span>
                      </button>
                    ))}
                  </div>
                  {activeDay && (
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{activeDay.date}</p>
                      <p className="text-xs text-white/40 mb-5">{activeDay.theme}</p>
                      <AnimatePresence mode="wait">
                        <DayCard key={activeDay.day} day={activeDay} />
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Travel Know-How (unified tips section) ── */}
              <motion.div {...fadeUp(0.3)} className="card-dark">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-5 h-5 text-[#FCD34D]" />
                  <h2 className="font-bold text-white text-base">Travel Know-How</h2>
                </div>
                <TabBar
                  tabs={["tips", "culture", "do's & don'ts"]}
                  active={tipsTab}
                  onChange={setTipsTab}
                />
                <AnimatePresence mode="wait">
                  <motion.div key={tipsTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-5">
                    {tipsTab === "do's & don'ts" ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-[#6EE7B7]" />
                            <p className="text-xs font-bold text-[#6EE7B7] uppercase tracking-wider">Do</p>
                          </div>
                          <div className="space-y-2">
                            {plan.dosAndDonts.dos.map((item, i) => (
                              <div key={i} className="flex gap-2.5 text-sm text-white/55">
                                <span className="text-[#6EE7B7] mt-0.5 flex-shrink-0">+</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <ShieldAlert className="w-4 h-4 text-[#F87171]" />
                            <p className="text-xs font-bold text-[#F87171] uppercase tracking-wider">Don&apos;t</p>
                          </div>
                          <div className="space-y-2">
                            {plan.dosAndDonts.donts.map((item, i) => (
                              <div key={i} className="flex gap-2.5 text-sm text-white/55">
                                <span className="text-[#F87171] mt-0.5 flex-shrink-0">&minus;</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {tipsFiltered.map((tip, i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/6">
                            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
                              style={{
                                background: tip.type === "culture" ? "rgba(244,114,182,0.1)" : "rgba(252,211,77,0.1)",
                                color: tip.type === "culture" ? "#F472B6" : "#FCD34D",
                              }}>
                              {tip.type === "culture" ? <Heart className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                            </span>
                            <p className="text-sm text-white/55 leading-relaxed">{tip.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-5">
              <motion.div {...fadeUp(0.15)}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1a2e] to-[#0e0e1f] border border-[#2563EB]/20 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-white/30" />
                  <span className="text-white/40 text-xs font-medium">Estimated total ({budgetStyle})</span>
                </div>
                <p className="text-4xl font-black text-white tracking-tight mb-1">
                  {sym}{totalBudget.toLocaleString("en-IN")}
                </p>
                <p className="text-white/35 text-sm">{travelers} traveller{travelers > 1 ? "s" : ""} · {days} days</p>
                <div className="mt-4 pt-4 border-t border-white/8">
                  <p className="text-white/30 text-xs leading-relaxed">Based on {budgetStyle} travel from {travelFrom}. Actual costs may vary.</p>
                </div>
              </motion.div>

              <div>
                <p className="label-caps mb-4">Budget Breakdown</p>
                <div className="space-y-3">
                  {budgetItems.map(({ key, label, icon: Icon, color, bg }, i) => {
                    const amount = plan.budget[key as keyof BudgetBreakdown];
                    const pct = totalBudget > 0 ? Math.round((amount / totalBudget) * 100) : 0;
                    return (
                      <motion.div key={key} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="card-dark flex items-center gap-4 p-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                          <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-white/40 font-medium">{label}</p>
                            <span className="text-[10px] text-white/25">{pct}%</span>
                          </div>
                          <p className="font-bold text-white text-sm">{sym}{amount.toLocaleString("en-IN")}</p>
                          <div className="mt-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                              className="h-full rounded-full" style={{ background: color }} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Link href="/planner" className="btn-ghost w-full justify-center flex">
                <ArrowLeft className="w-4 h-4" /> Plan Another Trip
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
