"use client";

import { ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Matches found",   value: "7",   sub: "3 new this week" },
  { label: "Applications",    value: "2",   sub: "1 under review" },
  { label: "Profile strength",value: "74%", sub: "Add CV to improve" },
];

const matches = [
  {
    title: "IT Support Learnership",
    org: "MTN",
    location: "East London",
    fit: 92,
    tags: ["NQF 4", "12 months", "R3 500/month stipend", "287km away"],
    reason: "Your networking and hardware skills match 9 of 10 required competencies. Stipend covers transport from Mthatha.",
  },
  {
    title: "Systems Admin Internship",
    org: "SITA",
    location: "Remote",
    fit: 85,
    tags: ["NQF 5", "6 months", "Remote", "SETA funded"],
    reason: "Remote role — no travel needed. Linux basics from your TVET coursework directly applicable.",
  },
  {
    title: "Help Desk Technician",
    org: "Buffalo City Municipality",
    location: "East London",
    fit: 71,
    tags: ["NQF 4", "Permanent", "East London"],
    reason: "Strong skills match. Recommend completing A+ certification first to hit 90%+ fit.",
  },
  {
    title: "ICT Support Learnership",
    org: "Vodacom Foundation",
    location: "Port Elizabeth",
    fit: 68,
    tags: ["NQF 4", "18 months", "R2 800/month", "SETA funded"],
    reason: "Good qualification match. Location is manageable. Applying early improves selection odds.",
  },
];

function FitBadge({ score }: { score: number }) {
  const color =
    score >= 85
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : score >= 70
      ? "bg-cyan-100 text-cyan-700 border-cyan-200"
      : "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${color}`}>
      {score}% fit
    </span>
  );
}

export default function MatchesPage() {
  return (
    <div className="space-y-4">
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#f7f7f5] px-3 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Section heading */}
      <p className="text-sm font-medium text-slate-700">Top matches for you</p>

      {/* Match cards */}
      <div className="space-y-3">
        {matches.map((m) => (
          <div
            key={m.title}
            className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
          >
            {/* Title + fit */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900 text-sm leading-snug">{m.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {m.org} — {m.location}
                </p>
              </div>
              <FitBadge score={m.fit} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {m.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* AI reason */}
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-medium text-gray-500">AI reason:</span> {m.reason}
            </p>

            {/* Apply button */}
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
              {m.fit >= 80 ? "Apply now" : "View details"} <ArrowUpRight size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
