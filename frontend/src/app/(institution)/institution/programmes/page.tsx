"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

const programmes = [
  { id: 1, name: "ND: Information Technology", nqf: "NQF 6", duration: "3 years", enrolled: 87,  placementPct: 74 },
  { id: 2, name: "BSc Computer Science",        nqf: "NQF 7", duration: "4 years", enrolled: 54,  placementPct: 68 },
  { id: 3, name: "ND: Accounting",              nqf: "NQF 6", duration: "3 years", enrolled: 112, placementPct: 58 },
  { id: 4, name: "ND: Civil Engineering",       nqf: "NQF 6", duration: "3 years", enrolled: 89,  placementPct: 62 },
  { id: 5, name: "BSc Information Systems",     nqf: "NQF 7", duration: "4 years", enrolled: 41,  placementPct: 71 },
];

const maxEnrolled = Math.max(...programmes.map(p => p.enrolled));

function pColor(pct: number) {
  return pct >= 70 ? "text-emerald-700" : pct >= 55 ? "text-amber-600" : "text-red-500";
}
function barGrad(pct: number) {
  return pct >= 70 ? "linear-gradient(90deg,#34d399,#22d3ee)" : pct >= 55 ? "linear-gradient(90deg,#fbbf24,#f97316)" : "linear-gradient(90deg,#f87171,#ef4444)";
}

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

export default function InstitutionProgrammesPage() {
  const [nqfFilter, setNqfFilter] = useState("All");
  const [sortBy,    setSortBy]    = useState("Placement ↓");

  let list = programmes;
  if (nqfFilter !== "All") list = list.filter(p => p.nqf === nqfFilter);
  list = [...list].sort((a, b) =>
    sortBy === "Placement ↓" ? b.placementPct - a.placementPct :
    sortBy === "Placement ↑" ? a.placementPct - b.placementPct :
    sortBy === "Enrolled ↓"  ? b.enrolled - a.enrolled :
    a.name.localeCompare(b.name)
  );

  const avgPlacement = Math.round(programmes.reduce((s, p) => s + p.placementPct, 0) / programmes.length);

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Nelson Mandela University</p>
        <h1 className="text-xl font-bold text-slate-900">Programmes</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of all registered programmes and placement performance</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Active Programmes", val: programmes.length, sub: "currently running" },
          { label: "Total Enrolled",    val: programmes.reduce((s,p) => s+p.enrolled,0), sub: "2024 cohort" },
          { label: "Avg Placement Rate",val: `${avgPlacement}%`, sub: "across all programmes" },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart — placement by programme */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Placement rate by programme</p>
          <p className="text-xs text-gray-400">Width = placement %, bar height = relative enrolment</p>
        </div>
        <div className="px-4 py-4 space-y-3">
          {[...programmes].sort((a,b) => b.placementPct - a.placementPct).map(p => (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium truncate max-w-[60%]">{p.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                  <span className={`text-xs font-bold ${pColor(p.placementPct)}`}>{p.placementPct}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full overflow-hidden" style={{ height: `${6 + Math.round((p.enrolled/maxEnrolled)*8)}px` }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.placementPct}%`, background: barGrad(p.placementPct) }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programme list with filters */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All programmes</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">NQF:</span>
            <Pills options={["All", "NQF 6", "NQF 7"]} value={nqfFilter} onChange={setNqfFilter} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Placement ↓", "Placement ↑", "Enrolled ↓", "Name A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No programmes match this filter.</p>
          ) : list.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.nqf}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.duration}</span>
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 shrink-0">
                <div className="text-right">
                  <p className={`text-lg font-bold ${pColor(p.placementPct)}`}>{p.placementPct}%</p>
                  <p className="text-xs text-gray-400">placed</p>
                </div>
                <div className="w-20">
                  <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${p.placementPct}%`, background: barGrad(p.placementPct) }} />
                  </div>
                </div>
                <a href={`/institution/programmes/${p.id}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
