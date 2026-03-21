"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

// ── Chart data ───────────────────────────────────────────────────────────────

const SKILLS_DEMAND = [
  { label: "Software Development", value: 312, color: "linear-gradient(90deg,#34d399,#22d3ee)" },
  { label: "Healthcare (Nursing)", value: 201, color: "linear-gradient(90deg,#34d399,#22d3ee)" },
  { label: "ICT Infrastructure",   value: 198, color: "linear-gradient(90deg,#34d399,#22d3ee)" },
  { label: "Electrical Eng.",       value: 145, color: "linear-gradient(90deg,#34d399,#22d3ee)" },
  { label: "Construction & Civil",  value:  98, color: "linear-gradient(90deg,#fbbf24,#f97316)" },
  { label: "Agriculture & Farming", value:  67, color: "linear-gradient(90deg,#fbbf24,#f97316)" },
];

const PLACEMENT_RATES = [
  { label: "Nelson Mandela Bay", value: 29, total: 312 },
  { label: "Buffalo City",       value: 27, total: 241 },
  { label: "Chris Hani",         value: 18, total: 123 },
  { label: "Amathole",           value: 21, total: 147 },
  { label: "OR Tambo",           value: 14, total: 198 },
  { label: "Sarah Baartman",     value: 20, total:  89 },
  { label: "Alfred Nzo",         value: 12, total:  76 },
  { label: "Joe Gqabi",          value: 13, total:  54 },
];

const FUNDING = [
  { label: "Disbursed",   value: 2400, total: 3200, color: "linear-gradient(90deg,#34d399,#22d3ee)" },
  { label: "In review",   value:  480, total: 3200, color: "linear-gradient(90deg,#fbbf24,#f97316)" },
  { label: "Unallocated", value:  320, total: 3200, color: "linear-gradient(90deg,#94a3b8,#cbd5e1)" },
];

const EMPLOYER_DEMAND = [
  { label: "Total listings",     value: 89, max: 89 },
  { label: "With AI matching",   value: 67, max: 89 },
  { label: "Unfilled > 60 days", value: 23, max: 89 },
  { label: "New this month",     value: 14, max: 89 },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const maxSkill = Math.max(...SKILLS_DEMAND.map(s => s.value));

function rColor(v: number) { return v >= 25 ? "text-emerald-600" : v >= 18 ? "text-amber-600" : "text-red-500"; }
function rBar(v: number)   { return v >= 25 ? "linear-gradient(90deg,#34d399,#22d3ee)" : v >= 18 ? "linear-gradient(90deg,#fbbf24,#f97316)" : "linear-gradient(90deg,#f87171,#ef4444)"; }

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            value === o ? "border-emerald-400 text-emerald-700 bg-emerald-50" : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
          }`}>{o}</button>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SetaReportsPage() {
  const [skillSort, setSkillSort]     = useState("Demand ↓");
  const [rateSort,  setRateSort]      = useState("Rate ↓");
  const [showAll,   setShowAll]       = useState(false);

  const sortedSkills = [...SKILLS_DEMAND].sort((a, b) =>
    skillSort === "Demand ↓" ? b.value - a.value : a.label.localeCompare(b.label)
  );

  const sortedRates = [...PLACEMENT_RATES].sort((a, b) =>
    rateSort === "Rate ↓"    ? b.value - a.value :
    rateSort === "Rate ↑"    ? a.value - b.value :
    rateSort === "Learners ↓"? b.total - a.total :
    a.label.localeCompare(b.label)
  );
  const visibleRates = showAll ? sortedRates : sortedRates.slice(0, 5);

  const totalFund = FUNDING.reduce((s, f) => s + f.value, 0);

  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA</p>
        <h1 className="text-xl font-bold text-slate-900">Analytics &amp; Reports</h1>
        <p className="text-sm text-gray-400 mt-0.5">Provincial skills intelligence — Q1 2026</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total vacancies",      val: "843",  sub: "Eastern Cape Q1 2026" },
          { label: "Overall placement",    val: "21%",  sub: "across all districts" },
          { label: "Budget disbursed",     val: "75%",  sub: "R2.4M of R3.2M" },
          { label: "AI match coverage",    val: "75%",  sub: "of active listings" },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Skills demand chart */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Top Skills in Demand</p>
            <p className="text-xs text-gray-400">Q1 2026 · Eastern Cape — vacancy count</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={12} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Demand ↓", "Name A–Z"]} value={skillSort} onChange={setSkillSort} />
          </div>
          <div className="px-4 py-4 space-y-3">
            {sortedSkills.map(s => (
              <div key={s.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700 font-medium">{s.label}</span>
                  <span className="text-xs font-semibold text-slate-700">{s.value} vacancies</span>
                </div>
                <div className="h-3 bg-gray-100 rounded overflow-hidden">
                  <div className="h-full rounded transition-all duration-500"
                    style={{ width: `${(s.value/maxSkill)*100}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement rates by district */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Placement Rates by District</p>
            <p className="text-xs text-gray-400">Cumulative 2025–2026</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={12} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Rate ↓", "Rate ↑", "Learners ↓", "Name A–Z"]} value={rateSort} onChange={setRateSort} />
          </div>
          <div className="px-4 py-4 space-y-3">
            {visibleRates.map(r => (
              <div key={r.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700 font-medium w-40 truncate">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{r.total} learners</span>
                    <span className={`text-xs font-bold ${rColor(r.value)}`}>{r.value}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded overflow-hidden">
                  <div className="h-full rounded transition-all duration-500"
                    style={{ width: `${r.value}%`, background: rBar(r.value) }} />
                </div>
              </div>
            ))}
          </div>
          {sortedRates.length > 5 && (
            <div className="px-4 pb-3 border-t border-gray-100">
              <button onClick={() => setShowAll(v => !v)}
                className="text-xs text-emerald-600 hover:underline font-medium">
                {showAll ? "Show less" : `Show all ${sortedRates.length} districts`}
              </button>
            </div>
          )}
        </div>

        {/* Funding utilisation */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Funding Utilisation</p>
            <p className="text-xs text-gray-400">Budget year 2025–2026 · Total: R3.2M</p>
          </div>
          {/* Stacked bar */}
          <div className="px-4 pt-4 pb-2">
            <div className="h-5 flex rounded overflow-hidden gap-px">
              {FUNDING.map(f => (
                <div key={f.label} className="h-full transition-all duration-500"
                  style={{ width: `${(f.value/totalFund)*100}%`, background: f.color }} />
              ))}
            </div>
          </div>
          <div className="px-4 pb-4 space-y-2.5 mt-1">
            {FUNDING.map(f => {
              const pct = Math.round((f.value / totalFund) * 100);
              return (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded shrink-0" style={{ background: f.color }} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs text-slate-700">{f.label}</span>
                    <span className="text-xs font-semibold text-slate-700">R{(f.value/1000).toFixed(1)}M · {pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 pb-4 space-y-2">
            {FUNDING.map(f => {
              const pct = Math.round((f.value / f.total) * 100);
              return (
                <div key={f.label} className="space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">{f.label} of total budget</span>
                    <span className="text-xs font-medium text-slate-700">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${pct}%`, background: f.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Employer demand */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Employer Demand</p>
            <p className="text-xs text-gray-400">Active listings · March 2026</p>
          </div>
          <div className="px-4 py-4 space-y-3">
            {EMPLOYER_DEMAND.map(e => {
              const pct = Math.round((e.value / e.max) * 100);
              return (
                <div key={e.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">{e.label}</span>
                    <span className="text-xs font-semibold text-slate-700">{e.value}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded overflow-hidden">
                    <div className="h-full rounded transition-all duration-500"
                      style={{ width: `${pct}%`, background: "linear-gradient(90deg,#34d399,#22d3ee)" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 pb-4 pt-1 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              <span className="font-medium text-emerald-600">75%</span> of listings have AI matching enabled ·{" "}
              <span className="font-medium text-red-500">26%</span> unfilled beyond 60 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
