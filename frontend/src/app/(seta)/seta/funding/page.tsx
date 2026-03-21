"use client";

import { ArrowUpRight } from "lucide-react";

const funding = [
  { programme: "IT Support Learnership — OR Tambo",     sector: "ICT",           amount: "R3 500/m", spots: 15, status: "Open",   statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { programme: "Network Support — Buffalo City",        sector: "ICT",           amount: "R2 800/m", spots: 12, status: "Open",   statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { programme: "Healthcare Auxiliary — Amathole",       sector: "Health",        amount: "R4 200/m", spots: 20, status: "Open",   statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { programme: "Civil Construction — Alfred Nzo",       sector: "Construction",  amount: "R3 000/m", spots: 10, status: "Review", statusColor: "bg-amber-50 text-amber-700 border-amber-200" },
  { programme: "Agricultural Tech — Joe Gqabi",         sector: "Agriculture",   amount: "R2 500/m", spots: 8,  status: "Review", statusColor: "bg-amber-50 text-amber-700 border-amber-200" },
  { programme: "Electrical Engineering — Sarah Baartman", sector: "Engineering", amount: "R3 800/m", spots: 6,  status: "Closed", statusColor: "bg-gray-100 text-gray-500 border-gray-200" },
];

export default function SetaFundingPage() {
  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA</p>
        <h1 className="text-xl font-bold text-slate-900">Funding Opportunities</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total budget",   value: "R2.4M" },
          { label: "Open programmes", value: funding.filter(f => f.status === "Open").length.toString() },
          { label: "Spots available", value: funding.filter(f => f.status === "Open").reduce((a, f) => a + f.spots, 0).toString() },
        ].map((s) => (
          <div key={s.label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Funding list */}
      <div className="space-y-3">
        {funding.map((f) => (
          <div key={f.programme} className="bg-white border border-gray-200 rounded p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-slate-900 text-sm leading-snug">{f.programme}</p>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${f.statusColor}`}>
                {f.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{f.sector}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{f.amount} stipend</span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{f.spots} spots</span>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                Manage <ArrowUpRight size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
