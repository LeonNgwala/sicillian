"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Wifi, Network } from "lucide-react";

const problems = [
  {
    number: "02",
    icon: Briefcase,
    title: "Trained but unemployed.",
    body: "Thousands of Eastern Cape youth graduate from TVETs and universities with real qualifications — but there's no system connecting them to jobs, learnerships, and bursaries that already exist.",
    solution: "SkillsGrid's AI engine (Gemini 2.0 Flash) analyses learner profiles and surfaces ranked, reasoned matches to real opportunities — automatically.",
    accent: "#34d399",
    stripe: "#34d399",
  },
  {
    number: "04",
    icon: Wifi,
    title: "Digital exclusion in rural areas.",
    body: "Most platforms are built for urban, high-bandwidth users. Rural Eastern Cape communities lack reliable connectivity, making conventional web apps inaccessible for the learners who need them most.",
    solution: "A Progressive Web App built for low-bandwidth and offline use — structured for ICASA zero-rating under a .co.za domain on SA-hosted infrastructure.",
    accent: "#67e8f9",
    stripe: "#67e8f9",
  },
  {
    number: "05",
    icon: Network,
    title: "Stakeholders operating in silos.",
    body: "SETAs, institutions, employers, and incubators each operate independently with no shared visibility. Funding gaps go undetected. Skill shortages are identified too late.",
    solution: "A centralised coordination dashboard with a live Eastern Cape district map, stakeholder profiles, and automated gap alerts for SETAs.",
    accent: "#22d3ee",
    stripe: "#22d3ee",
  },
];

function ProblemCard({ problem, index }: { problem: (typeof problems)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300"
    >
      {/* Colour stripe */}
      <div style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} className="h-1.5 w-full" />

      <div className="p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-sm flex items-center justify-center"
            style={{ background: `${problem.accent}15` }}
          >
            <problem.icon size={20} style={{ color: problem.accent }} />
          </div>
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
            style={{ background: `${problem.accent}10`, color: problem.accent }}
          >
            Problem {problem.number}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#0f172a] leading-snug mb-3">
          {problem.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{problem.body}</p>

        {/* Solution */}
        <div className="pt-5 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Our Solution
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">{problem.solution}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Problems() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="solutions" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* SA flag right stripe */}
      <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundImage: "linear-gradient(to bottom, #34d399, #22d3ee)" }} />

      <div className="relative max-w-7xl mx-auto px-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} />
            <span className="text-[#34d399] text-xs font-bold uppercase tracking-widest">
              What We&apos;re Solving
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-[1.1] max-w-lg">
            Three problems.{" "}
            <span className="text-[#34d399]">One platform.</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-md leading-relaxed">
            We address three MICT SETA challenge statements simultaneously — not as separate
            features, but as a unified ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <ProblemCard key={p.number} problem={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
