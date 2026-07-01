import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Weary Passports — An Interactive Travel Journal",
    template: "%s | Weary Passports",
  },
  description:
    "Field notes, hand-drawn routes and honest budgets for the curious traveller. Plan slow, wander far, and keep the journal open.",
  keywords: ["travel journal", "slow travel", "itinerary", "trip planning", "field notes"],
  authors: [{ name: "Weary Passports" }],
  openGraph: {
    title: "Weary Passports — An Interactive Travel Journal",
    description: "Field notes, hand-drawn routes and honest budgets for the curious traveller.",
    url: "https://wearypassports.com",
    siteName: "Weary Passports",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weary Passports — An Interactive Travel Journal",
    description: "Field notes, hand-drawn routes and honest budgets for the curious traveller.",
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
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
