"use client";

import { ArrowUpRight } from "lucide-react";

const districts = [
  { name: "Nelson Mandela Bay", sub: "Gqeberha / Port Elizabeth", learners: 312, employers: 28, placed: 89,  topGap: "Software Development",   severity: "medium" },
  { name: "Buffalo City",       sub: "East London / King William's Town", learners: 241, employers: 19, placed: 64,  topGap: "Plumbing & Waterworks",  severity: "medium" },
  { name: "OR Tambo",           sub: "Mthatha / Lusikisiki",    learners: 198, employers: 11, placed: 27,  topGap: "Software Development",   severity: "high" },
  { name: "Amathole",           sub: "Bisho / Komani",          learners: 147, employers: 9,  placed: 31,  topGap: "Healthcare (Nursing)",    severity: "high" },
  { name: "Chris Hani",         sub: "Queenstown / Cofimvaba",  learners: 123, employers: 8,  placed: 22,  topGap: "ICT Infrastructure",      severity: "medium" },
  { name: "Sarah Baartman",     sub: "Graaff-Reinet / Uitenhage", learners: 89, employers: 7, placed: 18,  topGap: "Electrical Engineering",  severity: "medium" },
  { name: "Alfred Nzo",         sub: "Mount Ayliff / Kokstad",  learners: 76,  employers: 5,  placed: 9,   topGap: "Construction & Civil",    severity: "high" },
  { name: "Joe Gqabi",          sub: "Aliwal North / Barkly East", learners: 54, employers: 4, placed: 7,  topGap: "Agriculture & Farming",   severity: "high" },
];

export default function SetaDistrictsPage() {
  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">

      {/* Page heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">District Pipeline</h1>
        <p className="text-sm text-gray-400 mt-0.5">Skills data across all 8 district municipalities</p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total learners",  value: districts.reduce((a, d) => a + d.learners, 0).toLocaleString() },
          { label: "Total employers", value: districts.reduce((a, d) => a + d.employers, 0).toString() },
          { label: "Critical districts", value: districts.filter(d => d.severity === "high").length.toString(), alert: true },
        ].map((s) => (
          <div key={s.label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold leading-none ${s.alert ? "text-red-600" : "text-slate-900"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Districts list — card style matching student */}
      <div className="space-y-3">
        {districts.map((d) => {
          const rate = Math.round((d.placed / d.learners) * 100);
          return (
            <div key={d.name} className="bg-white border border-gray-200 rounded p-4 space-y-3">

              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{d.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.sub}</p>
                </div>
                {/* Severity indicator */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${
                  d.severity === "high"
                    ? "bg-red-50 text-red-600 border-red-200"
                    : "bg-amber-50 text-amber-600 border-amber-200"
                }`}>
                  {d.severity === "high" ? "Critical gap" : "Moderate gap"}
                </span>
              </div>

              {/* Stats row — plain tags like student page */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                  {d.learners} learners
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                  {d.employers} employers
                </span>
                <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                  rate >= 40
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : rate >= 20
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {rate}% placed
                </span>
              </div>

              {/* Skill gap row */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-gray-500">Top skill gap:</span> {d.topGap}
                </p>
                <button className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View detail <ArrowUpRight size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
