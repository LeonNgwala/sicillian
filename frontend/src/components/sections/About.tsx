"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, MapPin, Link2 } from "lucide-react";

const GRAD = "linear-gradient(90deg, #34d399, #22d3ee)";

const points = [
  {
    icon: Zap,
    title: "AI-powered matching",
    body: "Gemini 2.0 Flash pairs learners with real jobs, learnerships, and bursaries based on actual skills — not guesswork.",
  },
  {
    icon: MapPin,
    title: "Eastern Cape focused",
    body: "Built specifically for the province — designed to work in rural and low-bandwidth communities as a PWA.",
  },
  {
    icon: Link2,
    title: "One ecosystem, everyone",
    body: "Learners, employers, TVETs, SETAs, and incubators all on one platform — no more silos, no more missed connections.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Left gradient stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundImage: "linear-gradient(to bottom, #34d399, #22d3ee)" }}
      />

      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline + intro */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ backgroundImage: GRAD }} />
              <span
                className="text-xs font-bold uppercase tracking-widest bg-clip-text text-transparent"
                style={{ backgroundImage: GRAD }}
              >
                About
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-[1.1] mb-6">
              Skills exist.
              <br />
              Opportunities exist.
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD }}>
                The bridge doesn&apos;t.
              </span>
            </h2>

            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              SkillsGrid is that bridge — an AI-powered platform built for the Eastern Cape
              that connects the right people to the right opportunities, in real time.
            </p>
          </motion.div>

          {/* Right — 3 clean points */}
          <div className="space-y-5">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="flex gap-4 p-5 rounded-sm border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ backgroundImage: GRAD }}
                >
                  <p.icon size={18} className="text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] text-sm mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
