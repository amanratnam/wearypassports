"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import PlacesAutocomplete from "./PlacesAutocomplete";

const tripTypes    = ["leisure", "adventure", "honeymoon", "business", "family", "solo"];
const budgetStyles = ["budget", "mid-range", "luxury"];
const currencies   = [
  { label: "₹ INR", value: "INR" },
  { label: "$ USD", value: "USD" },
  { label: "€ EUR", value: "EUR" },
  { label: "£ GBP", value: "GBP" },
  { label: "AED", value: "AED" },
];

interface Props {
  dark?: boolean;
  prefilledDestination?: string;
}

/* Shared styles for inline form elements */
const inlineInput = `
  bg-transparent border-b-2 border-[color:var(--forest-500)] text-forest-800 font-semibold
  placeholder:text-text-4 focus:outline-none focus:border-[color:var(--forest-800)]
  transition-colors duration-200 text-base leading-tight
  min-w-0 w-auto
`.replace(/\n/g, " ").trim();

const inlineSelect = `
  bg-transparent border-b-2 border-[color:var(--forest-500)] text-forest-800 font-semibold
  focus:outline-none focus:border-[color:var(--forest-800)] transition-colors duration-200
  appearance-none cursor-pointer text-base leading-tight
  pr-4 bg-[length:10px_6px]
`.replace(/\n/g, " ").trim();

export default function PlannerForm({ prefilledDestination = "" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destination:  prefilledDestination,
    travelFrom:   "",
    days:         "5",
    travelers:    "2",
    tripType:     "leisure",
    budgetStyle:  "mid-range",
    nationality:  "Indian",
    currency:     "INR",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.destination || !form.travelFrom) return;
    setLoading(true);
    const p = new URLSearchParams({
      destination: form.destination,
      days:        form.days,
      travelFrom:  form.travelFrom,
      travelers:   form.travelers,
      tripType:    form.tripType,
      currency:    form.currency,
      budgetStyle: form.budgetStyle,
    });
    setTimeout(() => router.push(`/result?${p.toString()}`), 900);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Sentences */}
      <div className="space-y-5 text-[1.15rem] leading-[2.2] text-text-2 font-medium">

        {/* Line 1 */}
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span>I&apos;m planning a trip to</span>
          <PlacesAutocomplete
            value={form.destination}
            onChange={v => set("destination", v)}
            placeholder="Bali, Ladakh, Japan…"
            className={`${inlineInput} w-[160px] sm:w-[180px]`}
            types={["(cities)"]}
            required
          />
          <span>from</span>
          <PlacesAutocomplete
            value={form.travelFrom}
            onChange={v => set("travelFrom", v)}
            placeholder="Delhi, Mumbai…"
            className={`${inlineInput} w-[150px] sm:w-[170px]`}
            types={["(cities)"]}
            required
          />
          <span>.</span>
        </p>

        {/* Line 2 */}
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span>The trip will be</span>
          <input
            type="number" min="1" max="30"
            value={form.days}
            onChange={e => set("days", e.target.value)}
            className={`${inlineInput} w-14 text-center`}
          />
          <span>days long with</span>
          <input
            type="number" min="1" max="20"
            value={form.travelers}
            onChange={e => set("travelers", e.target.value)}
            className={`${inlineInput} w-12 text-center`}
          />
          <span>of us traveling.</span>
        </p>

        {/* Line 3 */}
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span>We want a</span>
          <select
            value={form.tripType}
            onChange={e => set("tripType", e.target.value)}
            className={`${inlineSelect} w-auto`}
          >
            {tripTypes.map(t => (
              <option key={t} value={t} className="bg-paper text-ink">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <span>trip on a</span>
          <select
            value={form.budgetStyle}
            onChange={e => set("budgetStyle", e.target.value)}
            className={`${inlineSelect} w-auto`}
          >
            {budgetStyles.map(b => (
              <option key={b} value={b} className="bg-paper text-ink">
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </option>
            ))}
          </select>
          <span>budget.</span>
        </p>

        {/* Line 4 */}
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span>We are</span>
          <input
            type="text"
            value={form.nationality}
            onChange={e => set("nationality", e.target.value)}
            placeholder="Indian"
            className={`${inlineInput} w-[90px]`}
          />
          <span>travelers paying in</span>
          <select
            value={form.currency}
            onChange={e => set("currency", e.target.value)}
            className={`${inlineSelect} w-auto`}
          >
            {currencies.map(c => (
              <option key={c.value} value={c.value} className="bg-paper text-ink">
                {c.label}
              </option>
            ))}
          </select>
          <span>.</span>
        </p>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.015 }}
        whileTap={{ scale: 0.97 }}
        className="btn-forest mt-8 w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Drawing your route…</>
        ) : (
          <>Draw My Journey →</>
        )}
      </motion.button>
    </form>
  );
}
