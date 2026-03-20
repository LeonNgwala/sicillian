"use client";

import { AlertTriangle, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Registered learners", value: "1,240", sub: "+87 this quarter" },
  { label: "Active employers",    value: "89",    sub: "+6 this month" },
  { label: "Skill gap alerts",    value: "14",    sub: "3 new this week",  alert: true },
  { label: "Funding disbursed",   value: "R2.4M", sub: "+R400k vs last Q" },
];

const gapAlerts = [
  { district: "Amathole",       skill: "Healthcare (Nursing)",    severity: "high",   count: 201 },
  { district: "OR Tambo",       skill: "Software Development",    severity: "high",   count: 142 },
  { district: "Mthatha",        skill: "Electrical Engineering",  severity: "high",   count: 87 },
  { district: "Buffalo City",   skill: "Plumbing & Waterworks",   severity: "medium", count: 64 },
  { district: "Joe Gqabi",      skill: "Agriculture & Farming",   severity: "medium", count: 53 },
];

const districtStats = [
  { district: "Nelson Mandela Bay", learners: 312, employers: 28, placed: 89 },
  { district: "Buffalo City",       learners: 241, employers: 19, placed: 64 },
  { district: "OR Tambo",           learners: 198, employers: 11, placed: 27 },
  { district: "Amathole",           learners: 147, employers: 9,  placed: 31 },
  { district: "Chris Hani",         learners: 123, employers: 8,  placed: 22 },
  { district: "Sarah Baartman",     learners: 89,  employers: 7,  placed: 18 },
  { district: "Alfred Nzo",         learners: 76,  employers: 5,  placed: 9  },
  { district: "Joe Gqabi",          learners: 54,  employers: 4,  placed: 7  },
];

export default function SetaDashboard() {
  return (
    <div className="p-6 space-y-6 bg-[#f7f7f5] min-h-screen">

      {/* Page heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA — Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">Skills Development Overview</h1>
      </div>

      {/* Stats strip — same pattern as student */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-4 py-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold leading-none mb-1 ${s.alert ? "text-red-600" : "text-slate-900"}`}>
              {s.value}
            </p>
            <p className={`text-xs ${s.alert ? "text-red-400" : "text-gray-400"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Gap alerts */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Skill gap alerts</p>
            <a href="/seta/reports" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              Full report <ArrowUpRight size={11} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {gapAlerts.map((alert) => (
              <div key={alert.district} className="flex items-center gap-3 px-4 py-3">
                {/* Severity dot */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${alert.severity === "high" ? "bg-red-500" : "bg-amber-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium truncate">{alert.skill}</p>
                  <p className="text-xs text-gray-400">{alert.district}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-slate-700">{alert.count}</p>
                  <p className="text-xs text-gray-400">gap</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* District table */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">District pipeline</p>
            <a href="/seta/districts" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-4 px-4 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-medium text-gray-400 col-span-2">District</p>
            <p className="text-xs font-medium text-gray-400 text-right">Learners</p>
            <p className="text-xs font-medium text-gray-400 text-right">Placed</p>
          </div>

          <div className="divide-y divide-gray-50">
            {districtStats.map((d) => {
              const rate = Math.round((d.placed / d.learners) * 100);
              return (
                <div key={d.district} className="grid grid-cols-4 items-center px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  <p className="text-sm text-slate-700 col-span-2 truncate">{d.district}</p>
                  <p className="text-sm text-slate-700 text-right font-medium">{d.learners}</p>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${rate >= 40 ? "text-emerald-600" : rate >= 20 ? "text-amber-600" : "text-red-500"}`}>
                      {rate}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
