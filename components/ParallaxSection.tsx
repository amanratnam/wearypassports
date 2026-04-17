"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ParallaxSectionProps {
  image: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  cta?: string;
  ctaHref?: string;
  align?: "left" | "right" | "center";
  overlay?: string;
}

export default function ParallaxSection({
  image,
  eyebrow,
  headline,
  subtext,
  cta,
  ctaHref = "/planner",
  align = "left",
  overlay = "from-black/75 via-black/40 to-black/10",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const alignClass =
    align === "right"
      ? "items-end text-right"
      : align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div ref={ref} className="relative h-[85vh] min-h-[500px] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-15%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          y: bgY,
          willChange: "transform",
        }}
      />
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${overlay}`} />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className={`relative h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 ${alignClass}`}
      >
        <div className="max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-5"
          >
            {eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-[-0.03em] mb-6"
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/65 text-lg leading-relaxed mb-8"
          >
            {subtext}
          </motion.p>

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-3 text-white font-semibold text-sm border-b border-white/40 pb-1 hover:border-white transition-colors duration-200"
              >
                {cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
