"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Building2, School, Landmark, Lightbulb } from "lucide-react";

const roles = [
  {
    icon: GraduationCap,
    role: "Learners",
    tagline: "Find your pathway.",
    description:
      "TVET and university students who need a system that surfaces real jobs, learnerships, internships, and bursaries matched to their actual skills.",
    features: ["AI-matched opportunities", "Skills profile builder", "Application tracker", "Notifications"],
  },
  {
    icon: Building2,
    role: "Employers",
    tagline: "Find the right talent.",
    description:
      "Companies posting opportunities who need access to pre-qualified, skills-matched candidates — without sifting through unrelated CVs.",
    features: ["Post opportunities", "View matched candidates", "Manage applicants", "Skills gap insights"],
  },
  {
    icon: School,
    role: "Institutions",
    tagline: "Track your outcomes.",
    description:
      "TVETs and universities managing learner cohorts — with visibility into how graduates perform in the real employment market.",
    features: ["Cohort management", "Programme listings", "Placement tracking", "Outcome reports"],
  },
  {
    icon: Landmark,
    role: "SETAs",
    tagline: "Govern the pipeline.",
    description:
      "Sector Education and Training Authorities needing live visibility across the Eastern Cape's skills pipeline to coordinate funding.",
    features: ["District pipeline map", "Skill gap alerts", "Funding management", "Compliance tracking"],
  },
  {
    icon: Lightbulb,
    role: "Incubators",
    tagline: "Fuel entrepreneurship.",
    description:
      "Business incubators offering mentorship and startup support — connecting graduates who want to build, not just work.",
    features: ["Programme listings", "Mentor profiles", "Entrepreneur matching", "Opportunity posts"],
  },
];

const GRAD = "linear-gradient(90deg, #34d399, #22d3ee)";
const GRAD_DIAG = "linear-gradient(135deg, #34d399, #22d3ee)";

export default function WhoItsFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="who" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Right gradient stripe */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1"
        style={{ backgroundImage: "linear-gradient(to bottom, #34d399, #22d3ee)" }}
      />

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
            <div className="h-px w-10" style={{ backgroundImage: GRAD }} />
            <span
              className="text-xs font-bold uppercase tracking-widest bg-clip-text text-transparent"
              style={{ backgroundImage: GRAD }}
            >
              Who It&apos;s For
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-[1.1] max-w-lg">
            Built for everyone{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRAD }}>
              in the ecosystem.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-md leading-relaxed">
            Five distinct stakeholder groups — each with their own tailored dashboard and workflow.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, i) => {
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-40px" });

            return (
              <motion.div
                key={role.role}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-transparent transition-all duration-300 flex flex-col group ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Gradient top stripe */}
                <div className="h-1 w-full" style={{ backgroundImage: GRAD }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + role */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundImage: GRAD_DIAG }}
                    >
                      <role.icon size={20} className="text-slate-900" />
                    </div>
                    <div>
                      <div className="font-bold text-[#0f172a] text-sm">{role.role}</div>
                      <div
                        className="text-xs font-medium bg-clip-text text-transparent"
                        style={{ backgroundImage: GRAD }}
                      >
                        {role.tagline}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {role.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {role.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2.5 py-1 rounded-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-100"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
