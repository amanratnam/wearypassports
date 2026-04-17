"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    name: "Bali",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    cost: "₹55K",
    tag: "5 days",
    style: { top: "8%", left: "3%", rotate: -6 },
    delay: 0,
  },
  {
    name: "Rajasthan",
    country: "India",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    cost: "₹18K",
    tag: "7 days",
    style: { top: "5%", right: "4%", rotate: 5 },
    delay: 0.1,
  },
  {
    name: "Tokyo",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    cost: "₹1.2L",
    tag: "8 days",
    style: { top: "38%", left: "1%", rotate: -4 },
    delay: 0.2,
  },
  {
    name: "Santorini",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    cost: "₹1.5L",
    tag: "6 days",
    style: { top: "35%", right: "1%", rotate: 7 },
    delay: 0.15,
  },
  {
    name: "Ladakh",
    country: "India",
    img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    cost: "₹22K",
    tag: "9 days",
    style: { bottom: "12%", left: "5%", rotate: 4 },
    delay: 0.25,
  },
  {
    name: "Dubai",
    country: "UAE",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    cost: "₹90K",
    tag: "4 days",
    style: { bottom: "8%", right: "3%", rotate: -5 },
    delay: 0.05,
  },
  {
    name: "Thailand",
    country: "Southeast Asia",
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
    cost: "₹55K",
    tag: "6 days",
    style: { bottom: "30%", left: "50%", rotate: 3 },
    delay: 0.3,
  },
];

export default function FloatingDestCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {cards.map((card, i) => (
        <CardItem key={card.name} card={card} index={i} smoothX={smoothX} smoothY={smoothY} />
      ))}
    </div>
  );
}

function CardItem({
  card,
  index,
  smoothX,
  smoothY,
}: {
  card: (typeof cards)[0];
  index: number;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
}) {
  const depth = 0.5 + (index % 3) * 0.25;
  const dx = useTransform(smoothX, (v) => v * 22 * depth);
  const dy = useTransform(smoothY, (v) => v * 16 * depth);

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        ...card.style,
        x: dx,
        y: dy,
        rotate: card.style.rotate,
        zIndex: 10 + index,
      }}
      initial={{ opacity: 0, scale: 0.7, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: card.delay + 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.25 },
      }}
    >
      <Link href={`/planner?destination=${card.name}`}>
        <div className="relative w-[140px] sm:w-[160px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.45)] cursor-pointer group">
          <div className="relative h-[190px] sm:h-[210px]">
            <Image
              src={card.img}
              alt={card.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="180px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="font-bold text-white text-sm leading-tight">{card.name}</p>
            <p className="text-white/60 text-[10px] mt-0.5">{card.country}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] font-semibold text-white bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {card.cost}
              </span>
              <span className="text-[10px] text-white/60">{card.tag}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
