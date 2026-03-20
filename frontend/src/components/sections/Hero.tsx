"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

// Abstract network graphic — represents the SkillsGrid ecosystem connections
function EcosystemGraphic() {
  const nodes = [
    { cx: 260, cy: 120, r: 28, label: "Learner" },
    { cx: 420, cy: 60, r: 22, label: "TVET" },
    { cx: 500, cy: 180, r: 32, label: "Employer" },
    { cx: 360, cy: 270, r: 20, label: "SETA" },
    { cx: 180, cy: 240, r: 24, label: "Incubator" },
    { cx: 440, cy: 330, r: 18, label: "University" },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [2, 3], [3, 4], [3, 5],
    [2, 5],
  ];

  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="#34d399"
          strokeWidth="1"
          strokeOpacity="0.25"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.08 }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={i}>
          {/* Pulse ring */}
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={node.r + 10}
            stroke="#34d399"
            strokeWidth="1"
            strokeOpacity="0.15"
            fill="none"
            animate={{ r: [node.r + 8, node.r + 18, node.r + 8], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          />
          {/* Node bg */}
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="#0f172a"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring" }}
          />
          {/* Label */}
          <motion.text
            x={node.cx}
            y={node.cy + 4}
            textAnchor="middle"
            fill="#67e8f9"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            {node.label}
          </motion.text>
        </g>
      ))}

      {/* Central AI hub */}
      <motion.circle
        cx={340}
        cy={190}
        r={36}
        fill="#34d399"
        fillOpacity="0.12"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ opacity: { delay: 1 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
      />
      <motion.text
        x={340}
        y={186}
        textAnchor="middle"
        fill="#34d399"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        AI
      </motion.text>
      <motion.text
        x={340}
        y={198}
        textAnchor="middle"
        fill="#34d399"
        fontSize="7"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        MATCH
      </motion.text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0f172a 0%, #0f172a 50%, #1e293b 100%)" }}
    >
      {/* Subtle dot grid — aesthetic not busy */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Left gradient stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: "linear-gradient(to bottom, #34d399, #22d3ee, #22d3ee)" }}
      />

      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-cyan-300/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32">

        {/* LEFT — text */}
        <div>
          {/* Gov label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#67e8f9]/30 bg-[#67e8f9]/8 text-[#67e8f9] text-xs font-bold uppercase tracking-widest mb-8 rounded-sm"
          >
            <Shield size={11} />
            MICT SETA · Eastern Cape · 2026
          </motion.div>

          {/* Headline — left-aligned, concise */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6"
          >
            Where Skills
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }}
            >
              Meet Opportunity.
            </span>
          </motion.h1>

          {/* Subline — one sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/55 text-base leading-relaxed max-w-md mb-10"
          >
            An AI-powered platform connecting Eastern Cape learners, institutions,
            employers, SETAs, and incubators — built for the people, not the pipeline.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-slate-900 text-sm font-bold transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }}
            >
              See What We Solve <ArrowRight size={14} />
            </a>
            <a
              href="#about"
              className="text-white/50 hover:text-white text-sm font-medium transition-colors underline-offset-4 hover:underline"
            >
              Learn more
            </a>
          </motion.div>

          {/* Stats — minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-14 flex items-center gap-8 border-t border-white/8 pt-8"
          >
            {[
              { value: "5", label: "Stakeholder types" },
              { value: "3", label: "Problems solved" },
              { value: "EC", label: "Eastern Cape" },
            ].map((s) => (
              <div key={s.label}>
                <div
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }}
              >{s.value}</div>
                <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — network graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block w-full aspect-[3/2]"
        >
          <EcosystemGraphic />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-10 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gradient-to-b from-[#34d399]/60 to-transparent"
        />
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
