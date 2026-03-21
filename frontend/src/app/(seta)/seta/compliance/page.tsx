"use client";

import { ArrowUpRight } from "lucide-react";

const institutions = [
  { name: "Port Elizabeth TVET College",   district: "Nelson Mandela Bay", lastReport: "10 Mar 2026", score: 94, status: "Compliant" },
  { name: "East London TVET College",      district: "Buffalo City",       lastReport: "8 Mar 2026",  score: 88, status: "Compliant" },
  { name: "Umsobomvu TVET College",        district: "Chris Hani",         lastReport: "1 Mar 2026",  score: 71, status: "Review" },
  { name: "Ingwe TVET College",            district: "Alfred Nzo",         lastReport: "15 Feb 2026", score: 63, status: "Review" },
  { name: "King Hintsa TVET College",      district: "OR Tambo",           lastReport: "2 Feb 2026",  score: 45, status: "Non-compliant" },
  { name: "Lovedale TVET College",         district: "Amathole",           lastReport: "28 Jan 2026", score: 82, status: "Compliant" },
  { name: "Ikhala TVET College",           district: "Joe Gqabi",          lastReport: "20 Jan 2026", score: 58, status: "Review" },
];

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function statusStyle(status: string) {
  if (status === "Compliant")     return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "Review")        return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

export default function SetaCompliancePage() {
  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA</p>
        <h1 className="text-xl font-bold text-slate-900">Compliance Monitoring</h1>
        <p className="text-sm text-gray-400 mt-0.5">Reporting status across Eastern Cape institutions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Compliant",      value: institutions.filter(i => i.status === "Compliant").length.toString() },
          { label: "Under review",   value: institutions.filter(i => i.status === "Review").length.toString() },
          { label: "Non-compliant",  value: institutions.filter(i => i.status === "Non-compliant").length.toString(), alert: true },
        ].map((s) => (
          <div key={s.label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.alert ? "text-red-600" : "text-slate-900"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Institution list */}
      <div className="space-y-3">
        {institutions.map((inst) => (
          <div key={inst.name} className="bg-white border border-gray-200 rounded p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{inst.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{inst.district}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${statusStyle(inst.status)}`}>
                {inst.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                Last report: {inst.lastReport}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded border bg-white font-semibold ${scoreColor(inst.score)} border-gray-200`}>
                Score: {inst.score}%
              </span>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                View report <ArrowUpRight size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
