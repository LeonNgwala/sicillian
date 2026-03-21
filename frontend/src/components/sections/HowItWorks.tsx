"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserCircle, Brain, CheckCircle2, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Build your profile.",
    description:
      "Learners complete a structured skills profile — qualifications, experience, location, availability. Employers and institutions set up their listings.",
  },
  {
    icon: Brain,
    title: "AI does the matching.",
    description:
      "Gemini 2.0 Flash analyses your profile against all active opportunities and returns ranked matches with clear reasoning — no guesswork.",
  },
  {
    icon: CheckCircle2,
    title: "Review your matches.",
    description:
      "Opportunities appear ranked on your dashboard. Employers see pre-matched candidates. SETAs see real-time district-level skill gap analytics.",
  },
  {
    icon: Rocket,
    title: "Apply and track.",
    description:
      "Apply directly through SkillsGrid. Track your application status and receive in-app notifications throughout the placement process.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0f172a 0%, #0f172a 60%, #1e293b 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* SA flag left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundImage: "linear-gradient(to bottom, #34d399, #22d3ee)" }} />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#34d399]/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} />
            <span className="text-[#67e8f9] text-xs font-bold uppercase tracking-widest">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] max-w-lg">
            Simple for users.{" "}
            <span className="text-[#34d399]">Powerful underneath.</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#34d399]/15 rounded-sm overflow-hidden border border-[#34d399]/15">
          {steps.map((step, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={step.title}
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0f172a] p-8 flex flex-col gap-5"
              >
                {/* Step number + icon */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-sm bg-[#34d399]/15 flex items-center justify-center border border-[#34d399]/20">
                    <step.icon size={20} className="text-[#34d399]" />
                  </div>
                  <span className="text-4xl font-black text-white/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Bottom accent */}
                <div className="mt-auto h-px w-8" style={{ background: i % 2 === 0 ? "#34d399" : "#67e8f9" }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
