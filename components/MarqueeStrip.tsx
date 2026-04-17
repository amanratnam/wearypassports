"use client";

const destinations = [
  "Bali", "Rajasthan", "Tokyo", "Goa", "Thailand", "Ladakh",
  "Santorini", "Singapore", "Manali", "Dubai", "Vietnam", "Kerala",
  "Japan", "Andaman", "Maldives", "Paris", "Spiti Valley", "Indonesia",
];

const dots = destinations.map((d) => `${d}  ·  `);

interface MarqueeStripProps {
  dark?: boolean;
  slow?: boolean;
}

export default function MarqueeStrip({ dark = false, slow = false }: MarqueeStripProps) {
  const text = dots.join("");

  return (
    <div
      className={`w-full overflow-hidden py-4 border-y ${
        dark
          ? "bg-transparent border-white/8"
          : "bg-[#F8FAFC] border-[#E5E7EB]"
      }`}
    >
      <div className={`flex whitespace-nowrap ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className={`text-sm font-medium tracking-widest uppercase pr-4 ${
              dark ? "text-white/30" : "text-[#9CA3AF]"
            }`}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
