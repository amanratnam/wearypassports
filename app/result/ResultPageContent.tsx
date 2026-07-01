"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PassportStamp } from "@/components/clay/SceneElements";
import type {
  TripPlan, TravelOption, PlaceToVisit, HotelRecommendation, BudgetBreakdown, ItineraryDay,
} from "@/data/tripTypes";
import {
  Plane, Hotel, UtensilsCrossed, Activity, Bus, Package,
  ArrowLeft, RefreshCw, Download, MapPin, Calendar, Users,
  Tag, Lightbulb, Info, Loader2, Train, Globe,
  Mountain, Landmark as LandmarkIcon, Building2, TreePine, ShoppingBag, Map,
  ShieldCheck, ShieldAlert, ExternalLink, FileText,
  Heart, AlertTriangle, Sun, Cloud, Moon, Compass, BookOpen,
} from "lucide-react";

const CURRENCY_SYMBOLS: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£", AED: "AED " };

/* Earthy accent palette */
const FOREST = "#335C45", FOREST5 = "#5C8A5B", SUN = "#E8B23A", RIVER = "#5B8FA3", TERRA = "#C56B4A";

const budgetItems = [
  { key: "flights"       as const, label: "Flights",         icon: Plane,           color: RIVER },
  { key: "hotels"        as const, label: "Hotels",          icon: Hotel,           color: FOREST5 },
  { key: "food"          as const, label: "Food & Dining",   icon: UtensilsCrossed, color: SUN },
  { key: "activities"    as const, label: "Activities",      icon: Activity,        color: FOREST },
  { key: "transport"     as const, label: "Local Transport", icon: Bus,             color: RIVER },
  { key: "miscellaneous" as const, label: "Miscellaneous",   icon: Package,         color: TERRA },
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
  const f = encodeURIComponent(from), t = encodeURIComponent(to);
  return [
    { platform: "MakeMyTrip", url: `https://www.makemytrip.com/flight/search?fromCity=${f}&toCity=${t}` },
    { platform: "Cleartrip", url: `https://www.cleartrip.com/flights?from=${f}&to=${t}` },
    { platform: "Goibibo", url: `https://www.goibibo.com/flights/search?from=${f}&to=${t}` },
  ];
}

/* ── Tab pill ── */
function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)}
          className={`whitespace-nowrap text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
            active === t ? "bg-forest-800 text-paper" : "text-text-3 hover:text-forest-800 border border-[color:var(--line-soft)]"
          }`}>
          {t}
        </button>
      ))}
    </div>
  );
}

/* ── Day card ── */
function DayCard({ day }: { day: ItineraryDay }) {
  const periods = [
    { key: "morning" as const, label: "Morning", icon: Sun, color: SUN },
    { key: "afternoon" as const, label: "Afternoon", icon: Cloud, color: RIVER },
    { key: "evening" as const, label: "Evening", icon: Moon, color: FOREST5 },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
      {periods.map(({ key, label, icon: Icon, color }) => {
        const act = day[key];
        return (
          <div key={key} className="flex gap-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}1f` }}>
              <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold" style={{ color }}>{label}</span>
                <span className="text-xs text-text-4">{act.time}</span>
              </div>
              <p className="font-serif text-ink text-base mb-1">{act.activity}</p>
              <p className="text-text-2 text-sm leading-relaxed mb-2">{act.description}</p>
              <span className="chip">Est. {act.estimatedCost}</span>
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

  const destination = params.get("destination") || "Bali";
  const days = parseInt(params.get("days") || "5");
  const travelFrom = params.get("travelFrom") || "Delhi";
  const travelers = parseInt(params.get("travelers") || "2");
  const tripType = params.get("tripType") || "leisure";
  const currency = params.get("currency") || "INR";
  const budgetStyle = params.get("budgetStyle") || "mid-range";

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
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, travelFrom, days, travelers, tripType, currency, budgetStyle }),
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Failed to generate plan"); }
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
    const cats = Object.keys(plan.placesToVisit.reduce<Record<string, boolean>>((a, p) => { a[p.category || "Other"] = true; return a; }, {}));
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
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#FAF9F5" });
      el.classList.remove("pdf-capture");

      const imgW = 210, pageH = 297, margin = 12;
      const contentW = imgW - margin * 2;
      const imgH = (canvas.height * contentW) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      pdf.setFillColor(31, 77, 54);
      pdf.rect(0, 0, 210, 28, "F");
      pdf.setTextColor(250, 249, 245);
      pdf.setFontSize(18); pdf.setFont("helvetica", "bold");
      pdf.text("Weary Passports", margin, 14);
      pdf.setFontSize(9); pdf.setFont("helvetica", "normal");
      pdf.text("A field journal for curious travellers", margin, 20);
      pdf.text("wearypassports.com", imgW - margin, 14, { align: "right" });
      pdf.text(`Drawn ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, imgW - margin, 20, { align: "right" });

      const headerH = 32, footerH = 14, usableH = pageH - headerH - footerH;
      let yPos = 0, page = 0;
      while (yPos < imgH) {
        if (page > 0) { pdf.addPage(); pdf.setFillColor(31, 77, 54); pdf.rect(0, 0, 210, 8, "F"); }
        const sliceTop = page === 0 ? headerH : 12;
        const sliceH = page === 0 ? usableH : pageH - 12 - footerH;
        pdf.addImage(imgData, "JPEG", margin, sliceTop, contentW, imgH, undefined, "FAST", 0);
        if (page > 0) { pdf.setFillColor(250, 249, 245); pdf.rect(0, 0, 210, 12, "F"); }
        pdf.setFontSize(8); pdf.setTextColor(150, 150, 140);
        pdf.text(`Weary Passports · wearypassports.com · Page ${page + 1}`, imgW / 2, pageH - 6, { align: "center" });
        yPos += sliceH; page++;
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
        <main className="min-h-screen paper-texture flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <div className="w-20 mx-auto"><PassportStamp label="PLOTTING" sub="ROUTE" color={TERRA} /></div>
            <div>
              <h2 className="font-serif text-2xl text-ink mb-2">Drawing your {destination} route</h2>
              <p className="text-text-2 text-sm max-w-md">Finding flights, beds, places to wander, visa notes, and honest costs…</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              {["flights", "hotels", "places", "visa", "tips"].map((step, i) => (
                <div key={step} className="h-1.5 w-8 rounded-full bg-paper-shadow overflow-hidden">
                  <motion.div className="h-full bg-forest-800 rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: i * 0.8, ease: "easeInOut" }} />
                </div>
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
        <main className="min-h-screen paper-texture flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md px-4">
            <AlertTriangle className="w-12 h-12 text-terracotta mx-auto" />
            <h2 className="font-serif text-2xl text-ink">The route wouldn&apos;t draw</h2>
            <p className="text-text-2 text-sm">{error}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={fetchPlan} className="btn-forest !py-2.5 !px-5 !text-sm"><RefreshCw className="w-3.5 h-3.5" /> Try Again</button>
              <Link href="/planner" className="btn-outline !py-2.5 !px-5 !text-sm"><ArrowLeft className="w-3.5 h-3.5" /> Back to Planner</Link>
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
    (acc[cat] ||= []).push(place);
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
      <main className="min-h-screen paper-texture pt-[68px]">
        {/* Header */}
        <div className="border-b border-[color:var(--line)] paper-deep-texture">
          <div className="wrap-wide py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link href="/planner" className="inline-flex items-center gap-1.5 text-sm text-text-3 hover:text-forest-800 transition-colors mb-3">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Planner
                </Link>
                <h1 className="font-serif text-4xl text-ink">Your {destination} journey</h1>
                <p className="text-text-3 text-sm mt-1 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-forest-700" /> Drawn for your travel style
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={fetchPlan} className="btn-outline !py-2.5 !px-5 !text-sm"><RefreshCw className="w-3.5 h-3.5" /> Redraw</button>
                <button onClick={handleDownloadPDF} disabled={pdfLoading} className="btn-forest !py-2.5 !px-5 !text-sm disabled:opacity-60">
                  {pdfLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  {pdfLoading ? "Preparing…" : "Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div ref={pdfRef} className="wrap-wide section !py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Trip overview */}
              <motion.div {...fadeUp(0)} className="card p-6">
                <h2 className="font-serif text-xl text-ink mb-6">Trip overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  {[
                    { icon: MapPin, label: "Destination", value: destination },
                    { icon: Calendar, label: "Duration", value: `${days} days` },
                    { icon: Users, label: "Travellers", value: `${travelers}` },
                    { icon: Tag, label: "Trip Type", value: tripType.charAt(0).toUpperCase() + tripType.slice(1) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="w-9 h-9 rounded-xl bg-paper-deep border border-[color:var(--line-soft)] flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4 text-forest-700" strokeWidth={1.75} />
                      </div>
                      <p className="text-[0.65rem] text-text-3 font-semibold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="font-semibold text-ink text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-[color:var(--line-soft)] grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)]">
                    <p className="eyebrow mb-1">Best time to visit</p>
                    <p className="text-sm font-semibold text-ink">{plan.bestTimeToVisit}</p>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: `${SUN}18`, border: `1px solid ${SUN}40` }}>
                    <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "#9A7420" }}>Visa Info</p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#7A5C18" }}>
                      {plan.visa.required ? `${plan.visa.type} — ${plan.visa.cost}` : "No visa required"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Visa details */}
              {plan.visa.required && (
                <motion.div {...fadeUp(0.05)} className="card p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <FileText className="w-5 h-5 text-sun" />
                    <h2 className="font-serif text-xl text-ink">Visa details</h2>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    {[{ label: "Type", value: plan.visa.type }, { label: "Cost", value: plan.visa.cost }, { label: "Processing", value: plan.visa.processingTime }].map(({ label, value }) => (
                      <div key={label} className="p-3 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)]">
                        <p className="text-[0.65rem] text-text-3 font-semibold uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-sm font-semibold text-ink">{value}</p>
                      </div>
                    ))}
                  </div>
                  {plan.visa.documents.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {plan.visa.documents.map((doc, i) => <span key={i} className="chip">{doc}</span>)}
                    </div>
                  )}
                  {plan.visa.notes && <p className="text-sm text-text-2 leading-relaxed">{plan.visa.notes}</p>}
                </motion.div>
              )}

              {/* Getting There */}
              {plan.travelOptions.length > 0 && (
                <motion.div {...fadeUp(0.1)} className="card p-6">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <div className="flex items-center gap-2"><Plane className="w-5 h-5 text-river" /><h2 className="font-serif text-xl text-ink">Getting there</h2></div>
                    <div className="flex gap-2 flex-wrap">
                      {flightBookingLinks(travelFrom, destination).map((link) => (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-forest-800/8 border border-forest-800/15 text-forest-700 hover:bg-forest-800/15 transition-all font-semibold">
                          {link.platform} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {plan.travelOptions.map((opt: TravelOption, i: number) => {
                      const ModeIcon = travelModeIcon(opt.mode);
                      return (
                        <div key={i} className="p-5 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)] flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${RIVER}1f` }}>
                            <ModeIcon className="w-5 h-5 text-river" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-bold text-ink">{opt.provider}</span>
                              <span className="text-[0.6rem] px-2 py-0.5 rounded-full font-bold uppercase" style={{ background: `${RIVER}1f`, color: RIVER }}>{opt.mode}</span>
                            </div>
                            <p className="text-sm text-text-2">{opt.route}</p>
                            {opt.bookingTip && <p className="text-xs text-text-3 mt-1">{opt.bookingTip}</p>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-serif text-lg text-ink">{opt.estimatedCost}</p>
                            <p className="text-xs text-text-3">{opt.duration}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Places to Visit */}
              {placeCategories.length > 0 && (
                <motion.div {...fadeUp(0.15)} className="card p-6">
                  <div className="flex items-center gap-2 mb-5"><MapPin className="w-5 h-5 text-forest-700" /><h2 className="font-serif text-xl text-ink">Places to wander</h2></div>
                  <TabBar tabs={placeCategories} active={placeTab} onChange={setPlaceTab} />
                  <AnimatePresence mode="wait">
                    <motion.div key={placeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-4 grid sm:grid-cols-2 gap-3">
                      {activePlaces.map((place: PlaceToVisit, i: number) => {
                        const CatIcon = categoryIcons[place.category] || MapPin;
                        return (
                          <div key={i} className="p-4 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)]">
                            <div className="flex items-center gap-2 mb-2"><CatIcon className="w-3.5 h-3.5 text-text-3" /><p className="font-semibold text-ink text-sm">{place.name}</p></div>
                            <p className="text-xs text-text-2 leading-relaxed mb-2">{place.description}</p>
                            <div className="flex items-center gap-3 text-xs text-text-3"><span>{place.estimatedTime}</span><span>·</span><span>{place.estimatedCost}</span></div>
                            {place.tip && <p className="text-xs text-forest-700 mt-2 italic-serif">{place.tip}</p>}
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Hotels */}
              {plan.hotels.length > 0 && (
                <motion.div {...fadeUp(0.2)} className="card p-6">
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <div className="flex items-center gap-2"><Hotel className="w-5 h-5 text-forest-500" /><h2 className="font-serif text-xl text-ink">Where to stay</h2></div>
                    <TabBar tabs={["all", "budget", "mid-range", "luxury"]} active={hotelFilter} onChange={setHotelFilter} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {plan.hotels.filter((h: HotelRecommendation) => hotelFilter === "all" || h.category === hotelFilter).map((hotel: HotelRecommendation, i: number) => {
                      const links = bookingLinks(hotel.name, destination);
                      const catColor = hotel.category === "luxury" ? SUN : hotel.category === "mid-range" ? FOREST5 : FOREST;
                      return (
                        <div key={i} className="p-4 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)]">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <p className="font-semibold text-ink text-sm leading-tight">{hotel.name}</p>
                            <span className="text-[0.55rem] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0"
                              style={{ color: catColor, background: `${catColor}1f`, border: `1px solid ${catColor}40` }}>{hotel.category}</span>
                          </div>
                          <p className="font-serif text-lg text-ink mb-0.5">{sym}{hotel.pricePerNight.replace(/[^\d,.-]/g, "")}<span className="text-text-3 text-xs font-sans">/night</span></p>
                          <p className="text-xs text-text-3 mb-2">{hotel.location}</p>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {links.map((link) => (
                              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[0.6rem] px-2 py-1 rounded-lg bg-paper border border-[color:var(--line)] text-text-2 hover:text-forest-800 hover:border-forest-500 transition-all font-medium">
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

              {/* Itinerary */}
              {plan.daysPlan.length > 0 && (
                <motion.div {...fadeUp(0.25)} className="card p-6">
                  <div className="flex items-center gap-2 mb-5"><Calendar className="w-5 h-5 text-river" /><h2 className="font-serif text-xl text-ink">Day by day</h2></div>
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                    {plan.daysPlan.map((d) => (
                      <button key={d.day} onClick={() => setDayTab(d.day)}
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                          dayTab === d.day ? "bg-forest-800 text-paper shadow-soft-md" : "bg-paper-deep border border-[color:var(--line-soft)] text-text-3 hover:text-forest-800"
                        }`}>
                        <span className="text-[0.6rem] font-semibold uppercase">Day</span>
                        <span className="font-serif text-lg">{d.day}</span>
                      </button>
                    ))}
                  </div>
                  {activeDay && (
                    <div>
                      <p className="text-sm font-bold text-ink mb-1">{activeDay.date}</p>
                      <p className="text-xs text-text-3 mb-5 italic-serif">{activeDay.theme}</p>
                      <AnimatePresence mode="wait"><DayCard key={activeDay.day} day={activeDay} /></AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Travel Know-How */}
              <motion.div {...fadeUp(0.3)} className="card p-6">
                <div className="flex items-center gap-2 mb-5"><BookOpen className="w-5 h-5 text-sun" /><h2 className="font-serif text-xl text-ink">Travel know-how</h2></div>
                <TabBar tabs={["tips", "culture", "do's & don'ts"]} active={tipsTab} onChange={setTipsTab} />
                <AnimatePresence mode="wait">
                  <motion.div key={tipsTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="mt-5">
                    {tipsTab === "do's & don'ts" ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-forest-700" /><p className="text-xs font-bold text-forest-700 uppercase tracking-wider">Do</p></div>
                          <div className="space-y-2">
                            {plan.dosAndDonts.dos.map((item, i) => (
                              <div key={i} className="flex gap-2.5 text-sm text-text-2"><span className="text-forest-700 mt-0.5 flex-shrink-0">+</span><span>{item}</span></div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3"><ShieldAlert className="w-4 h-4 text-terracotta" /><p className="text-xs font-bold text-terracotta uppercase tracking-wider">Don&apos;t</p></div>
                          <div className="space-y-2">
                            {plan.dosAndDonts.donts.map((item, i) => (
                              <div key={i} className="flex gap-2.5 text-sm text-text-2"><span className="text-terracotta mt-0.5 flex-shrink-0">&minus;</span><span>{item}</span></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {tipsFiltered.map((tip, i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-2xl bg-paper-deep border border-[color:var(--line-soft)]">
                            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: tip.type === "culture" ? `${TERRA}1f` : `${SUN}1f`, color: tip.type === "culture" ? TERRA : "#9A7420" }}>
                              {tip.type === "culture" ? <Heart className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                            </span>
                            <p className="text-sm text-text-2 leading-relaxed">{tip.text}</p>
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
              <motion.div {...fadeUp(0.15)} className="rounded-4xl overflow-hidden p-6 text-paper relative" style={{ background: "linear-gradient(135deg,#1F4D36,#12281C)" }}>
                <PassportStamp label="BUDGET" sub="TOTAL" color={SUN} className="absolute -top-2 right-2 w-16 opacity-60" />
                <div className="flex items-center gap-2 mb-2 relative">
                  <Info className="w-4 h-4" style={{ color: "rgba(250,249,245,0.6)" }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(250,249,245,0.7)" }}>Estimated total ({budgetStyle})</span>
                </div>
                <p className="font-serif text-4xl text-paper mb-1 relative">{sym}{totalBudget.toLocaleString("en-IN")}</p>
                <p className="text-sm relative" style={{ color: "rgba(250,249,245,0.7)" }}>{travelers} traveller{travelers > 1 ? "s" : ""} · {days} days</p>
                <div className="mt-4 pt-4 relative" style={{ borderTop: "1px solid rgba(250,249,245,0.15)" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(250,249,245,0.55)" }}>Based on {budgetStyle} travel from {travelFrom}. Actual costs may vary.</p>
                </div>
              </motion.div>

              <div>
                <p className="eyebrow mb-4">Budget breakdown</p>
                <div className="space-y-3">
                  {budgetItems.map(({ key, label, icon: Icon, color }, i) => {
                    const amount = plan.budget[key as keyof BudgetBreakdown];
                    const pct = totalBudget > 0 ? Math.round((amount / totalBudget) * 100) : 0;
                    return (
                      <motion.div key={key} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }} className="card flex items-center gap-4 p-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}1f` }}>
                          <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-text-2 font-medium">{label}</p>
                            <span className="text-[0.65rem] text-text-3">{pct}%</span>
                          </div>
                          <p className="font-bold text-ink text-sm">{sym}{amount.toLocaleString("en-IN")}</p>
                          <div className="mt-1.5 h-1 bg-paper-shadow rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                              className="h-full rounded-full" style={{ background: color }} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Link href="/planner" className="btn-outline w-full"><ArrowLeft className="w-4 h-4" /> Plan Another Trip</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
