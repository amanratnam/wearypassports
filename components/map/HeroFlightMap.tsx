"use client";

import { useEffect, useState } from "react";
import { HUB, FLIGHT_CITIES, geoToXY, arcPath, MAP_W, MAP_H, prefersReducedMotion } from "./geo";

/* Routes fanning out from the Delhi hub — some outbound, some inbound, so
   planes appear to take off from many points across the map. */
const ROUTES = FLIGHT_CITIES.map((c, i) => {
  const a: [number, number] = [HUB.lon, HUB.lat];
  const b: [number, number] = [c.lon, c.lat];
  const outbound = i % 2 === 0;
  return {
    key: c.name,
    d: arcPath(outbound ? a : b, outbound ? b : a, 0.2 + (i % 3) * 0.05),
    dur: 9 + (i % 4) * 2.5,
    begin: -(i * 1.7),
  };
});

const CITY_POINTS = [HUB, ...FLIGHT_CITIES].map((c) => {
  const [x, y] = geoToXY(c.lon, c.lat);
  return { name: c.name, x, y };
});

function Plane() {
  return (
    <g>
      {/* glowing trail — drawn behind, always trails since the group rotates */}
      <path d="M -4 0 L -60 -2.4 L -60 2.4 Z" fill="url(#trailGrad)" />
      {/* paper plane pointing +x */}
      <path d="M 12 0 L -7 -6 L -2 0 L -7 6 Z" fill="#E8B23A" stroke="#C9902A" strokeWidth="0.6" />
    </g>
  );
}

export default function HeroFlightMap() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(!prefersReducedMotion()), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* real world map, faint */}
      <img
        src="/world-map.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.13]"
        style={{ objectPosition: "center 42%" }}
      />

      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ objectPosition: "center 42%" }}
      >
        <defs>
          <linearGradient id="trailGrad" x1="-60" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8B23A" stopOpacity="0" />
            <stop offset="100%" stopColor="#E8B23A" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* dotted flight routes */}
        {ROUTES.map((r) => (
          <path key={r.key} d={r.d} fill="none" stroke="#335C45" strokeWidth="1.4"
            strokeDasharray="1 7" strokeLinecap="round" opacity="0.35" />
        ))}

        {/* city dots */}
        {CITY_POINTS.map((c) => (
          <g key={c.name}>
            {animate && (
              <circle cx={c.x} cy={c.y} r="4" fill="#C56B4A" opacity="0.35">
                <animate attributeName="r" values="4;12;4" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="3.2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={c.x} cy={c.y} r="3.4" fill="#C56B4A" />
            <circle cx={c.x} cy={c.y} r="1.4" fill="#FAF9F5" />
          </g>
        ))}

        {/* planes leaving trails, perpetual */}
        {animate && ROUTES.map((r) => (
          <g key={`p-${r.key}`}>
            <Plane />
            <animateMotion dur={`${r.dur}s`} begin={`${r.begin}s`} repeatCount="indefinite" rotate="auto" path={r.d} />
          </g>
        ))}
      </svg>
    </div>
  );
}
