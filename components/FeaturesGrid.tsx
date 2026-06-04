"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── SVG Vector Illustrations ─── */
const ItinerarySVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Map path */}
    <path d="M20 55 Q28 32 40 28 Q52 24 60 42" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 2"/>
    {/* Pin markers */}
    <circle cx="20" cy="55" r="4" fill={color} opacity="0.9"/>
    <circle cx="40" cy="28" r="3" fill={color} opacity="0.6"/>
    <circle cx="60" cy="42" r="4.5" fill={color}/>
    <path d="M60 42 L60 34 Q60 30 56 30 Q52 30 52 34 L52 42 Q52 46 60 52 Q68 46 68 42 L68 34 Q68 30 64 30 Q60 30 60 34Z" fill={color} opacity="0.15"/>
    {/* Calendar lines */}
    <rect x="22" y="20" width="16" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M25 17v6M35 17v6M22 26h16" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const BudgetSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Wallet body */}
    <rect x="16" y="28" width="44" height="30" rx="4" stroke={color} strokeWidth="2" fill={`${color}10`}/>
    <path d="M16 36h44" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    {/* Coin slot */}
    <rect x="46" y="36" width="14" height="12" rx="3" fill={`${color}20`} stroke={color} strokeWidth="1.5"/>
    <circle cx="53" cy="42" r="3" fill={color} opacity="0.7"/>
    {/* Coins stack */}
    <ellipse cx="32" cy="24" rx="8" ry="3.5" fill={color} opacity="0.25"/>
    <ellipse cx="32" cy="21" rx="8" ry="3.5" fill={color} opacity="0.4"/>
    <ellipse cx="32" cy="18" rx="8" ry="3.5" fill={color} opacity="0.6"/>
    <text x="29" y="21" fontSize="6" fill={color} fontWeight="700" opacity="0.9">₹</text>
  </svg>
);

const CalendarSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Sun */}
    <circle cx="56" cy="22" r="8" fill={color} opacity="0.2"/>
    <circle cx="56" cy="22" r="5" fill={color} opacity="0.5"/>
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i} x1={56+Math.cos(a*Math.PI/180)*7} y1={22+Math.sin(a*Math.PI/180)*7}
        x2={56+Math.cos(a*Math.PI/180)*10} y2={22+Math.sin(a*Math.PI/180)*10}
        stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    ))}
    {/* Calendar */}
    <rect x="16" y="30" width="34" height="30" rx="3" stroke={color} strokeWidth="2" fill={`${color}08`}/>
    <path d="M16 40h34" stroke={color} strokeWidth="1.2" opacity="0.4"/>
    <path d="M25 27v6M41 27v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    {/* Date dots */}
    {[0,1,2,3,4].map(i => <circle key={i} cx={22+i*6} cy={47} r="2" fill={color} opacity={i===2?"0.9":"0.3"}/>)}
    {[0,1,2].map(i => <circle key={i} cx={22+i*6} cy={54} r="2" fill={color} opacity="0.3"/>)}
  </svg>
);

const PassportSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Passport book */}
    <rect x="22" y="18" width="28" height="38" rx="3" fill={`${color}15`} stroke={color} strokeWidth="2"/>
    <rect x="22" y="18" width="8" height="38" rx="2" fill={color} opacity="0.2"/>
    {/* Globe on cover */}
    <circle cx="40" cy="33" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M40 26 Q44 33 40 40 Q36 33 40 26Z" fill={color} opacity="0.2"/>
    <path d="M33 33h14" stroke={color} strokeWidth="1" opacity="0.5"/>
    <path d="M34 29h12M34 37h12" stroke={color} strokeWidth="0.8" opacity="0.3"/>
    {/* Stamp */}
    <rect x="28" y="45" width="16" height="8" rx="1.5" stroke={color} strokeWidth="1.2" fill={`${color}12`} strokeDasharray="2 1"/>
    <text x="30.5" y="52" fontSize="5.5" fill={color} opacity="0.8" fontWeight="600">VISA</text>
  </svg>
);

const HotelSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Building */}
    <rect x="24" y="24" width="28" height="34" rx="2" fill={`${color}12`} stroke={color} strokeWidth="2"/>
    {/* Entrance */}
    <rect x="34" y="44" width="8" height="14" rx="1" fill={color} opacity="0.2"/>
    {/* Windows */}
    {[0,1,2].map(row => [0,1,2].map(col => (
      <rect key={`${row}-${col}`} x={28+col*8} y={28+row*7} width="4" height="4" rx="0.5"
        fill={color} opacity={row===0 && col===1 ? "0.7" : "0.25"}/>
    )))}
    {/* Flag on top */}
    <path d="M40 14v10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M40 14l7 3.5-7 3.5Z" fill={color} opacity="0.6"/>
    {/* Stars */}
    {[0,1,2,3,4].map(i => (
      <path key={i} d={`M${16+i*10} 62 l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z`}
        fill={color} opacity="0.3" transform={`scale(0.5) translate(${10+i*20} 60)`}/>
    ))}
    <path d="M14 62h48" stroke={color} strokeWidth="1" opacity="0.2"/>
    {[...Array(5)].map((_, i) => <text key={i} x={17+i*10} y={67} fontSize="6" fill={color} opacity="0.5">★</text>)}
  </svg>
);

const EditSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
    <circle cx="40" cy="40" r="38" fill={`${color}10`} stroke={`${color}25`} strokeWidth="1"/>
    {/* Document */}
    <rect x="20" y="18" width="30" height="38" rx="3" fill={`${color}10`} stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <path d="M26 28h18M26 35h18M26 42h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    {/* Pencil */}
    <g transform="translate(44 36) rotate(-45)">
      <rect x="-3" y="-14" width="6" height="18" rx="1" fill={color} opacity="0.9"/>
      <path d="M-3 4 L0 10 L3 4Z" fill={color} opacity="0.7"/>
      <rect x="-3" y="-16" width="6" height="4" rx="1" fill={color} opacity="0.4"/>
    </g>
    {/* Sparkles */}
    {[[62,22,6],[68,32,4],[58,16,4]].map(([x,y,s],i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={s/2} fill={color} opacity="0.6"/>
        <path d={`M${x-s} ${y} L${x+s} ${y} M${x} ${y-s} L${x} ${y+s}`} stroke={color} strokeWidth="1" opacity="0.4"/>
      </g>
    ))}
  </svg>
);

const features = [
  { SVG: ItinerarySVG,  title: "Day-by-Day Itinerary",    description: "Tailored plans built around your style, interests, and trip length — generated in seconds.",  accent: "#60A5FA", bg: "from-[#1e3a5f]/60 to-[#0f1a2e]/40" },
  { SVG: BudgetSVG,     title: "Budget Breakdown",         description: "Real cost estimates for flights, hotels, food, activities, and local transport — in your currency.", accent: "#A78BFA", bg: "from-[#2d1b5e]/60 to-[#150d30]/40" },
  { SVG: CalendarSVG,   title: "Best Time to Visit",       description: "Exact months to go — weather windows, peak vs. off-season, local festivals factored in.",         accent: "#34D399", bg: "from-[#0d3d2e]/60 to-[#061e17]/40" },
  { SVG: PassportSVG,   title: "Visa Guidance",            description: "Up-to-date entry requirements for Indian passport holders, with processing tips.",                 accent: "#FBBF24", bg: "from-[#3d2e00]/60 to-[#1e1700]/40" },
  { SVG: HotelSVG,      title: "Hotel Suggestions",        description: "Neighbourhood-smart stays matched to your budget, travel style, and vibe.",                       accent: "#F472B6", bg: "from-[#3d0d26]/60 to-[#1e0613]/40" },
  { SVG: EditSVG,       title: "Editable Plans",           description: "Your itinerary is a starting point, not a contract. Adjust anything — it's all yours.",           accent: "#67E8F9", bg: "from-[#0a2d35]/60 to-[#05161a]/40" },
];

export default function FeaturesGrid() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive(a => (a - 1 + features.length) % features.length);
  const next = () => setActive(a => (a + 1) % features.length);

  // Visible cards: show 3 at a time on desktop, 1 on mobile
  const visible = [
    features[(active) % features.length],
    features[(active + 1) % features.length],
    features[(active + 2) % features.length],
  ];

  return (
    <div className="relative">
      {/* Desktop: 3-card carousel */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-5" ref={trackRef}>
          <AnimatePresence mode="popLayout">
            {visible.map((feat, i) => {
              const { SVG, title, description, accent, bg } = feat;
              return (
                <motion.div
                  key={`${active}-${i}`}
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative rounded-3xl overflow-hidden bg-gradient-to-br ${bg} border border-white/8 p-7 cursor-default hover:border-white/18 transition-all duration-300`}
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl" style={{ background: accent }} />

                  {/* SVG illustration */}
                  <div className="w-20 h-20 mb-5">
                    <SVG color={accent} />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2.5 leading-snug tracking-tight">
                    {title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{description}</p>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${accent}08, transparent 70%)` }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i >= active && i < active + 3
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: single card swipe */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {[features[active]].map(({ SVG, title, description, accent, bg }) => (
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${bg} border border-white/8 p-6`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl" style={{ background: accent }} />
              <div className="w-16 h-16 mb-4"><SVG color={accent} /></div>
              <h3 className="font-bold text-white text-base mb-2">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-2">
            {features.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/20"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
