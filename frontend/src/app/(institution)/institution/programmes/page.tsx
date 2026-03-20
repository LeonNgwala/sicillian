import { ArrowUpRight } from "lucide-react";

const programmes = [
  { id: 1, name: "ND: Information Technology", nqf: "NQF 6", duration: "3 years", enrolled: 87, placementPct: 74 },
  { id: 2, name: "BSc Computer Science", nqf: "NQF 7", duration: "4 years", enrolled: 54, placementPct: 68 },
  { id: 3, name: "ND: Accounting", nqf: "NQF 6", duration: "3 years", enrolled: 112, placementPct: 58 },
  { id: 4, name: "ND: Civil Engineering", nqf: "NQF 6", duration: "3 years", enrolled: 89, placementPct: 62 },
  { id: 5, name: "BSc Information Systems", nqf: "NQF 7", duration: "4 years", enrolled: 41, placementPct: 71 },
];

function placementColor(pct: number) {
  if (pct >= 70) return "text-emerald-700";
  if (pct >= 55) return "text-amber-600";
  return "text-red-500";
}

function barColor(pct: number) {
  if (pct >= 70) return "bg-emerald-400";
  if (pct >= 55) return "bg-amber-400";
  return "bg-red-400";
}

export default function InstitutionProgrammesPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NELSON MANDELA UNIVERSITY</p>
        <h1 className="text-xl font-bold text-slate-900">Programmes</h1>
        <p className="text-sm text-gray-400 mt-0.5">Overview of all registered programmes and their placement performance</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active Programmes</p>
          <p className="text-2xl font-bold text-slate-900">8</p>
          <p className="text-xs text-gray-400">currently running</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Enrolled</p>
          <p className="text-2xl font-bold text-slate-900">342</p>
          <p className="text-xs text-gray-400">2024 cohort</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Avg Placement Rate</p>
          <p className="text-2xl font-bold text-slate-900">61%</p>
          <p className="text-xs text-gray-400">across all programmes</p>
        </div>
      </div>

      {/* Programme list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All programmes</p>
        </div>
        <div className="divide-y divide-gray-50">
          {programmes.map((p) => (
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
                  <p className={`text-lg font-bold ${placementColor(p.placementPct)}`}>{p.placementPct}%</p>
                  <p className="text-xs text-gray-400">placed</p>
                </div>
                <div className="w-20">
                  <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full rounded ${barColor(p.placementPct)}`}
                      style={{ width: `${p.placementPct}%` }}
                    />
                  </div>
                </div>
                <a href={`/institution/programmes/${p.id}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View programme <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
