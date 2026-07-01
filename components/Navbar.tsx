"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Plan a Trip" },
  { href: "/blog", label: "Field Notes" },
  { href: "/about", label: "About" },
];

function CompassMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="#1F4D36" />
      <circle cx="20" cy="20" r="18" stroke="#E8B23A" strokeWidth="1" strokeDasharray="1.5 3" opacity="0.7" />
      {/* compass needle */}
      <path d="M20 8 L24 20 L20 32 L16 20 Z" fill="#FAF9F5" opacity="0.9" />
      <path d="M20 8 L24 20 L20 20 Z" fill="#E8B23A" />
      <circle cx="20" cy="20" r="2.2" fill="#FAF9F5" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-paper/85 backdrop-blur-md border-b border-[color:var(--line-soft)] shadow-soft"
            : "bg-transparent"
        )}
      >
        <div className="wrap-wide">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="transition-transform duration-500 group-hover:rotate-[30deg]">
                <CompassMark size={34} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[1.15rem] font-semibold text-ink tracking-tight leading-none">
                  Weary Passports
                </span>
                <span className="text-[0.6rem] font-semibold tracking-[0.32em] uppercase text-forest-700 mt-1">
                  Field Journal
                </span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-[0.9rem] font-medium transition-all duration-200",
                    pathname === link.href
                      ? "text-forest-800 bg-forest-800/8"
                      : "text-text-2 hover:text-forest-800 hover:bg-forest-800/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex">
              <Link href="/planner" className="btn-forest !py-2.5 !px-5 !text-sm">
                Start Wandering
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[color:var(--line)] text-forest-800"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[78%] max-w-sm paper-deep-texture border-l border-[color:var(--line)] z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5">
                <CompassMark size={30} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-forest-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 px-5 pt-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3.5 rounded-2xl font-serif text-2xl transition-colors",
                        pathname === link.href ? "text-forest-800" : "text-text-2 hover:text-forest-800"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-5">
                <Link href="/planner" className="btn-forest w-full">Start Wandering</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
