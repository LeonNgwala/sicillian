"use client";

import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const districts = [
  { name: "Nelson Mandela Bay", sub: "Gqeberha / Port Elizabeth",       learners: 312, employers: 28, placed: 89, topGap: "Software Development",  severity: "medium" },
  { name: "Buffalo City",       sub: "East London / King William's Town",learners: 241, employers: 19, placed: 64, topGap: "Plumbing & Waterworks",  severity: "medium" },
  { name: "OR Tambo",           sub: "Mthatha / Lusikisiki",             learners: 198, employers: 11, placed: 27, topGap: "Software Development",   severity: "high"   },
  { name: "Amathole",           sub: "Bisho / Komani",                   learners: 147, employers:  9, placed: 31, topGap: "Healthcare (Nursing)",   severity: "high"   },
  { name: "Chris Hani",         sub: "Queenstown / Cofimvaba",           learners: 123, employers:  8, placed: 22, topGap: "ICT Infrastructure",     severity: "medium" },
  { name: "Sarah Baartman",     sub: "Graaff-Reinet / Uitenhage",        learners:  89, employers:  7, placed: 18, topGap: "Electrical Engineering",  severity: "medium" },
  { name: "Alfred Nzo",         sub: "Mount Ayliff / Kokstad",           learners:  76, employers:  5, placed:  9, topGap: "Construction & Civil",   severity: "high"   },
  { name: "Joe Gqabi",          sub: "Aliwal North / Barkly East",       learners:  54, employers:  4, placed:  7, topGap: "Agriculture & Farming",  severity: "high"   },
];

const maxLearners = Math.max(...districts.map(d => d.learners));

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

export default function SetaDistrictsPage() {
  const [search,   setSearch]   = useState("");
  const [severity, setSeverity] = useState("All");
  const [sortBy,   setSortBy]   = useState("Learners ↓");

  let list = districts;
  if (search.trim())        list = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.topGap.toLowerCase().includes(search.toLowerCase()));
  if (severity !== "All")   list = list.filter(d => (severity === "Critical" ? d.severity === "high" : d.severity === "medium"));
  list = [...list].sort((a, b) => {
    const rA = a.placed / a.learners, rB = b.placed / b.learners;
    if (sortBy === "Learners ↓")     return b.learners - a.learners;
    if (sortBy === "Placement % ↓")  return rB - rA;
    if (sortBy === "Placement % ↑")  return rA - rB;
    if (sortBy === "Gap ↓")          return (b.learners-b.placed) - (a.learners-a.placed);
    return a.name.localeCompare(b.name);
  });

  const totalL = districts.reduce((s,d) => s+d.learners, 0);
  const totalE = districts.reduce((s,d) => s+d.employers, 0);
  const critical = districts.filter(d => d.severity === "high").length;

  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">District Pipeline</h1>
        <p className="text-sm text-gray-400 mt-0.5">Skills data across all 8 district municipalities</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total learners",    value: totalL.toLocaleString(), alert: false },
          { label: "Total employers",   value: totalE.toString(),        alert: false },
          { label: "Critical districts",value: critical.toString(),      alert: true  },
        ].map(s => (
          <div key={s.label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold leading-none ${s.alert ? "text-red-600" : "text-slate-900"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Learner distribution chart */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Learner distribution by district</p>
          <p className="text-xs text-gray-400">Bar width = learner count relative to largest district</p>
        </div>
        <div className="px-4 py-4 space-y-2.5">
          {[...districts].sort((a,b) => b.learners - a.learners).map(d => {
            const rate = Math.round((d.placed / d.learners) * 100);
            return (
              <div key={d.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-700 font-medium w-44 truncate">{d.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{d.learners} learners</span>
                    <span className={`text-xs font-semibold w-10 text-right ${rate >= 30 ? "text-emerald-600" : rate >= 20 ? "text-amber-600" : "text-red-500"}`}>{rate}%</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                    <div className="h-full rounded transition-all duration-500"
                      style={{ width: `${(d.learners/maxLearners)*100}%`, background: "linear-gradient(90deg,#34d399,#22d3ee)" }} />
                  </div>
                  <div className="w-24 h-3 bg-gray-100 rounded overflow-hidden">
                    <div className="h-full rounded transition-all duration-500"
                      style={{ width: `${rate}%`, background: rate >= 30 ? "linear-gradient(90deg,#34d399,#22d3ee)" : rate >= 20 ? "linear-gradient(90deg,#fbbf24,#f97316)" : "linear-gradient(90deg,#f87171,#ef4444)" }} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end gap-6 pt-1">
            <span className="text-[10px] text-gray-400">■ Learner count</span>
            <span className="text-[10px] text-gray-400">■ Placement rate</span>
          </div>
        </div>
      </div>

      {/* Filters + district cards */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Districts</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search district or skill gap…"
              className="w-full bg-gray-50 border border-gray-200 rounded text-xs pl-8 pr-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Severity:</span>
            <Pills options={["All", "Critical", "Moderate"]} value={severity} onChange={setSeverity} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Learners ↓", "Placement % ↓", "Placement % ↑", "Gap ↓", "Name A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No districts match.</p>
          ) : list.map((d) => {
            const rate = Math.round((d.placed / d.learners) * 100);
            return (
              <div key={d.name} className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{d.sub}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                    d.severity === "high" ? "bg-red-50 text-red-600 border-red-200" : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>{d.severity === "high" ? "Critical gap" : "Moderate gap"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{d.learners} learners</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{d.employers} employers</span>
                  <span className={`text-xs px-2 py-0.5 rounded border font-medium ${rate>=40?"bg-emerald-50 text-emerald-700 border-emerald-200":rate>=20?"bg-amber-50 text-amber-700 border-amber-200":"bg-red-50 text-red-700 border-red-200"}`}>{rate}% placed</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{d.learners-d.placed} unplaced</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                  <div className="h-full rounded transition-all duration-500"
                    style={{ width: `${rate}%`, background: rate>=40?"linear-gradient(90deg,#34d399,#22d3ee)":rate>=20?"linear-gradient(90deg,#fbbf24,#f97316)":"linear-gradient(90deg,#f87171,#ef4444)" }} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400"><span className="font-medium text-gray-500">Top skill gap:</span> {d.topGap}</p>
                  <button className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">View detail <ArrowUpRight size={11} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
