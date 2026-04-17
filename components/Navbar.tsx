"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function LogoMark({ size = 36 }: { size?: number }) {
  const id = `navGrad-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Passport stamp outer ring */}
      <circle cx="18" cy="18" r="16.5" stroke={`url(#${id})`} strokeWidth="1.5" />
      {/* Dashed inner ring */}
      <circle cx="18" cy="18" r="12.5" stroke={`url(#${id})`} strokeWidth="0.75" strokeDasharray="2.5 3" opacity="0.5" />
      {/* Globe: equator curve */}
      <path d="M7 18 Q12 14 18 18 Q24 22 29 18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      {/* Globe: upper latitude curve */}
      <path d="M10 12 Q14 9.5 18 11 Q22 9.5 26 12" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      {/* Globe: central meridian */}
      <path d="M18 5.5 Q14.5 11 14.5 18 Q14.5 25 18 30.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <path d="M18 5.5 Q21.5 11 21.5 18 Q21.5 25 18 30.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      {/* North star / pin dot */}
      <circle cx="18" cy="18" r="1.2" fill={`url(#${id})`} />
      <defs>
        <linearGradient id={id} x1="3" y1="3" x2="33" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
            ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6 flex-shrink-0">
                <LogoMark size={34} />
              </div>
              <div className="flex flex-col leading-none gap-[2px]">
                <span className="text-[9px] font-light tracking-[0.38em] uppercase text-white/55 group-hover:text-white/75 transition-colors duration-200">
                  Weary
                </span>
                <span className="text-[13px] font-black text-white tracking-[-0.02em] leading-none group-hover:text-white transition-colors duration-200">
                  PASSPORTS
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-white/65 hover:text-white hover:bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex">
              <Link href="/planner" className="btn-gradient text-sm">
                Plan Your Trip
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/20 text-white/75 hover:bg-white/10 hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0f0f0f] border-l border-white/8 z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/8">
                <Link href="/" className="flex items-center gap-2.5">
                  <LogoMark size={30} />
                  <div className="flex flex-col leading-none gap-[2px]">
                    <span className="text-[8px] font-light tracking-[0.35em] uppercase text-white/50">Weary</span>
                    <span className="text-[12px] font-black text-white tracking-[-0.02em] leading-none">PASSPORTS</span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-white/10 text-white"
                          : "text-white/65 hover:bg-white/8 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-white/8">
                <Link href="/planner" className="btn-gradient w-full justify-center">
                  Plan Your Trip
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
