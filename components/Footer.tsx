import Link from "next/link";
import { Compass } from "lucide-react";

const cols = {
  Product: [
    { label: "AI Planner", href: "/planner" },
    { label: "Destinations", href: "/#destinations" },
    { label: "Budget Tool", href: "/planner" },
  ],
  Blog: [
    { label: "All Stories", href: "/blog" },
    { label: "Budget Travel", href: "/blog" },
    { label: "Itineraries", href: "/blog" },
    { label: "Honeymoon", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-sm">Weary Passports</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-[200px]">
              AI-powered travel planning for Indian explorers.
            </p>
          </div>

          {/* Links */}
          {Object.entries(cols).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Weary Passports. All rights reserved.
          </p>
          <p className="text-xs text-white/35 tracking-wider">
            BUILT FOR TRAVELERS WHO PLAN SMARTER
          </p>
        </div>
      </div>
    </footer>
  );
}
