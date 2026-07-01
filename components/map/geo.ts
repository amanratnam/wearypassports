/**
 * Shared geometry for the real-world map (public/world-map.svg).
 * The map is equirectangular in a 950×620 viewBox, so lon/lat → x/y is linear.
 * Marker/route coordinates live in this same 950×620 space; overlays that use
 * the same viewBox + preserveAspectRatio stay pixel-aligned with the map image.
 */
export const MAP_W = 950;
export const MAP_H = 620;

export function geoToXY(lon: number, lat: number): [number, number] {
  const x = ((lon + 180) / 360) * MAP_W;
  const y = ((90 - lat) / 180) * MAP_H;
  return [x, y];
}

/** Quadratic arc between two geo points, bowed toward the pole for a flight feel. */
export function arcPath(
  [lon1, lat1]: [number, number],
  [lon2, lat2]: [number, number],
  bend = 0.22
): string {
  const [x1, y1] = geoToXY(lon1, lat1);
  const [x2, y2] = geoToXY(lon2, lat2);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  // perpendicular offset, always bowing "up" (toward smaller y)
  const nx = -dy / (dist || 1);
  const ny = dx / (dist || 1);
  const off = dist * bend * (ny < 0 ? 1 : -1);
  const cx = mx + nx * off;
  const cy = my + ny * off;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export type City = { name: string; lon: number; lat: number };

/** Delhi hub + destinations the brand keeps returning to. */
export const HUB: City = { name: "Delhi", lon: 77, lat: 28.6 };

export const FLIGHT_CITIES: City[] = [
  { name: "London", lon: -0.1, lat: 51.5 },
  { name: "New York", lon: -74, lat: 40.7 },
  { name: "Tokyo", lon: 139.7, lat: 35.7 },
  { name: "Sydney", lon: 151.2, lat: -33.9 },
  { name: "Cape Town", lon: 18.4, lat: -33.9 },
  { name: "Rio", lon: -43.2, lat: -22.9 },
  { name: "Bali", lon: 115.2, lat: -8.7 },
  { name: "Reykjavik", lon: -21.9, lat: 64.1 },
];

export type Marker = {
  name: string;
  country: string;
  lon: number;
  lat: number;
  note: string;
  cost: string;
};

/** Atlas markers for the interactive world-map section. */
export const ATLAS: Marker[] = [
  { name: "Ladakh", country: "India", lon: 77.6, lat: 34.2, note: "Roof of the world", cost: "from ₹22k" },
  { name: "Kerala", country: "India", lon: 76.3, lat: 9.9, note: "Backwater mornings", cost: "from ₹18k" },
  { name: "Bali", country: "Indonesia", lon: 115.2, lat: -8.7, note: "Temples & terraces", cost: "from ₹60k" },
  { name: "Japan", country: "Tokyo", lon: 139.7, lat: 35.7, note: "Shrines & neon", cost: "from ₹1.2L" },
  { name: "Santorini", country: "Greece", lon: 25.4, lat: 36.4, note: "Blue & white", cost: "from ₹1.5L" },
  { name: "Iceland", country: "Reykjavik", lon: -21.9, lat: 64.1, note: "Fire & ice", cost: "from ₹1.8L" },
  { name: "Peru", country: "Cusco", lon: -71.9, lat: -13.5, note: "Andes trails", cost: "from ₹2L" },
];

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
