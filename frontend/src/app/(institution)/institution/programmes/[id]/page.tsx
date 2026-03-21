"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const learners = [
  { id: 1, initials: "AD", name: "Amahle Dlamini", district: "Gqeberha", matchScore: 94, status: "active" },
  { id: 2, initials: "TM", name: "Thandeka Mokoena", district: "Gqeberha", matchScore: 72, status: "active" },
  { id: 3, initials: "SC", name: "Sipho Cele", district: "East London", matchScore: 85, status: "pending" },
  { id: 4, initials: "ND", name: "Nomsa Dube", district: "Mthatha", matchScore: 55, status: "pending" },
  { id: 5, initials: "LN", name: "Lungelo Nxumalo", district: "Gqeberha", matchScore: 90, status: "active" },
  { id: 6, initials: "ZN", name: "Zanele Ntanzi", district: "King William's Town", matchScore: 63, status: "active" },
];

function matchColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function barColor(pct: number) {
  if (pct >= 70) return "bg-emerald-400";
  if (pct >= 50) return "bg-amber-400";
  return "bg-red-400";
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function ProgrammeDetailPage() {
  const params = useParams();
  void params.id;

  const stats = [
    { label: "Placed", pct: 74, color: "text-emerald-700", bar: "bg-emerald-400" },
    { label: "In Pipeline", pct: 18, color: "text-amber-600", bar: "bg-amber-400" },
    { label: "No Matches Yet", pct: 8, color: "text-red-500", bar: "bg-red-400" },
  ];

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Back */}
      <Link href="/institution/programmes" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
        ← Back to programmes
      </Link>

      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NELSON MANDELA UNIVERSITY</p>
        <h1 className="text-xl font-bold text-slate-900">Diploma in IT: Systems Development</h1>
        <p className="text-sm text-gray-400 mt-0.5">NQF 6 · 3-year programme · 89 graduates</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.pct}%</p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded overflow-hidden">
              <div className={`h-full rounded ${s.bar}`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Enrolled learners */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Enrolled learners</p>
          <a href="/institution/learners" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {learners.map((l) => (
            <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                  {l.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{l.name}</p>
                  <p className="text-xs text-gray-400">{l.district}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-sm font-bold ${matchColor(l.matchScore)}`}>{l.matchScore}%</span>
                <StatusBadge status={l.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
