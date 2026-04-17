export interface Destination {
  name: string;
  country: string;
  tagline: string;
  image: string;
  avgCost: string;
  bestTime: string;
  slug: string;
}

export const destinations: Destination[] = [
  {
    name: "Bali",
    country: "Indonesia",
    tagline: "Temples, rice fields, and golden coastline",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    avgCost: "₹60,000",
    bestTime: "May–Oct",
    slug: "bali",
  },
  {
    name: "Thailand",
    country: "Southeast Asia",
    tagline: "Street food, temples, and island perfection",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    avgCost: "₹55,000",
    bestTime: "Nov–Mar",
    slug: "thailand",
  },
  {
    name: "Dubai",
    country: "UAE",
    tagline: "Desert luxury with skyline drama",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    avgCost: "₹90,000",
    bestTime: "Oct–Apr",
    slug: "dubai",
  },
  {
    name: "Japan",
    country: "East Asia",
    tagline: "Ancient shrines and neon-lit streets",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    avgCost: "₹1,20,000",
    bestTime: "Mar–May",
    slug: "japan",
  },
  {
    name: "Europe",
    country: "Multi-country",
    tagline: "History, architecture, and café culture",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    avgCost: "₹1,80,000",
    bestTime: "Apr–Sep",
    slug: "europe",
  },
  {
    name: "Singapore",
    country: "Southeast Asia",
    tagline: "Urban gardens and effortless efficiency",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    avgCost: "₹75,000",
    bestTime: "Feb–Apr",
    slug: "singapore",
  },
];
