import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Weary Passports — AI-Powered Travel Planning",
    template: "%s | Weary Passports",
  },
  description:
    "Plan better trips with AI. Create personalized itineraries, realistic budgets, and day-wise travel plans in seconds. Free to use, no signup required.",
  keywords: ["travel planner", "AI travel", "itinerary", "trip planning", "budget travel"],
  authors: [{ name: "Weary Passports" }],
  openGraph: {
    title: "Weary Passports — AI-Powered Travel Planning",
    description: "Plan better trips with AI. Create personalized itineraries in seconds.",
    url: "https://wearypassports.com",
    siteName: "Weary Passports",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weary Passports — AI-Powered Travel Planning",
    description: "Plan better trips with AI. Create personalized itineraries in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
