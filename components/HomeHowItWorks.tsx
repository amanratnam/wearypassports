"use client";

import { motion } from "framer-motion";
import { FormInput, Cpu, Plane } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    step: "01",
    icon: FormInput,
    title: "Enter trip details",
    description: "Tell us where you're going, how long, who's coming, and your budget style. Takes 30 seconds.",
    accent: "#60A5FA",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Generate your custom plan",
    description: "Our AI builds a day-by-day itinerary with realistic budget breakdowns, tailored to your inputs.",
    accent: "#A78BFA",
  },
  {
    step: "03",
    icon: Plane,
    title: "Book and travel smarter",
    description: "Use your personalized plan to book flights, hotels, and activities with full cost clarity.",
    accent: "#34D399",
  },
];

export default function HomeHowItWorks() {
  return (
    <section className="section-padding bg-[#080808]">
      <div className="container-max">
        <SectionHeader
          eyebrow="How it works"
          title="From idea to itinerary"
          titleHighlight="in 3 steps"
          description="No travel agents. No research rabbit holes. Just your plan, ready in seconds."
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#60A5FA]/20 via-[#A78BFA]/20 to-[#34D399]/20" />

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map(({ step, icon: Icon, title, description, accent }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 z-10 transition-all duration-300 group-hover:scale-105"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} strokeWidth={1.75} />
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${accent}cc, ${accent}88)` }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base mb-3 tracking-tight">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
