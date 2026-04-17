"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({
  destination,
  index = 0,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/planner?destination=${destination.name}`}
        className="group block relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 to-[#7C3AED]/0 group-hover:from-[#2563EB]/20 group-hover:to-[#7C3AED]/20 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-white text-xl leading-tight">
                  {destination.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-white/70" />
                  <span className="text-white/70 text-xs">{destination.country}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 translate-x-2">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                From {destination.avgCost}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/80 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3" />
                {destination.bestTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
