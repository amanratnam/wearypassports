"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./geo";

/* Generic decorative flight band — dotted arcs with paper planes leaving
   trails, sweeping across. Perpetual, reduced-motion aware. */
const ARCS = [
  { d: "M -40 210 Q 260 60 540 150 T 1040 90", dur: 13, begin: 0, w: 1 },
  { d: "M -40 120 Q 300 250 620 140 T 1040 200", dur: 17, begin: -6, w: 0.85 },
  { d: "M -40 60 Q 360 140 700 70 T 1040 120", dur: 21, begin: -11, w: 0.7 },
];

function Plane({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M -3 0 L -46 -1.8 L -46 1.8 Z" fill="url(#fpTrail)" />
      <path d="M 11 0 L -6 -5 L -1.5 0 L -6 5 Z" fill="#E8B23A" stroke="#C9902A" strokeWidth="0.5" />
    </g>
  );
}

export default function FlyingPlanes({ className = "" }: { className?: string }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(!prefersReducedMotion()), []);

  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="fpTrail" x1="-46" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8B23A" stopOpacity="0" />
          <stop offset="100%" stopColor="#E8B23A" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {ARCS.map((a, i) => (
        <path key={i} d={a.d} fill="none" stroke="#335C45" strokeWidth="1.4" strokeDasharray="1 7" strokeLinecap="round" opacity="0.3" />
      ))}
      {animate && ARCS.map((a, i) => (
        <g key={`p${i}`}>
          <Plane s={a.w} />
          <animateMotion dur={`${a.dur}s`} begin={`${a.begin}s`} repeatCount="indefinite" rotate="auto" path={a.d} />
        </g>
      ))}
    </svg>
  );
}
