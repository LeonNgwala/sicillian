"use client";

import { ArrowUpRight } from "lucide-react";

const reports = [
  {
    title: "Top Skills in Demand",
    sub: "Q1 2026 · Eastern Cape",
    stats: [
      { label: "Software Development", value: "312 vacancies" },
      { label: "ICT Infrastructure",   value: "198 vacancies" },
      { label: "Healthcare (Nursing)", value: "201 vacancies" },
      { label: "Electrical Eng.",      value: "145 vacancies" },
    ],
  },
  {
    title: "Placement Rates by District",
    sub: "Cumulative 2025–2026",
    stats: [
      { label: "Nelson Mandela Bay", value: "29% placed" },
      { label: "Buffalo City",       value: "27% placed" },
      { label: "OR Tambo",           value: "14% placed" },
      { label: "Joe Gqabi",          value: "13% placed" },
    ],
  },
  {
    title: "Funding Utilisation",
    sub: "Budget year 2025–2026",
    stats: [
      { label: "Total budget",     value: "R3.2M" },
      { label: "Disbursed",        value: "R2.4M (75%)" },
      { label: "In review",        value: "R480k (15%)" },
      { label: "Unallocated",      value: "R320k (10%)" },
    ],
  },
  {
    title: "Employer Demand",
    sub: "Active listings · March 2026",
    stats: [
      { label: "Total listings",     value: "89 active" },
      { label: "With AI matching",   value: "67 matched" },
      { label: "Unfilled > 60 days", value: "23 listings" },
      { label: "New this month",     value: "14 listings" },
    ],
  },
];

export default function SetaReportsPage() {
  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA</p>
        <h1 className="text-xl font-bold text-slate-900">Analytics &amp; Reports</h1>
        <p className="text-sm text-gray-400 mt-0.5">Provincial skills intelligence — Q1 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="bg-white border border-gray-200 rounded">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-slate-900">{r.title}</p>
                <p className="text-xs text-gray-400">{r.sub}</p>
              </div>
              <button className="text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Data rows */}
            <div className="divide-y divide-gray-50">
              {r.stats.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-4 py-2.5">
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
