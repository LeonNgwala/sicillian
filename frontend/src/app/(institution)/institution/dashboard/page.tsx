import { ArrowUpRight } from "lucide-react";

const programmes = [
  { id: 1, name: "ND: Information Technology", nqf: "NQF 6", duration: "3 years", placementPct: 74 },
  { id: 2, name: "BSc Computer Science", nqf: "NQF 7", duration: "4 years", placementPct: 68 },
  { id: 3, name: "ND: Accounting", nqf: "NQF 6", duration: "3 years", placementPct: 58 },
  { id: 4, name: "ND: Civil Engineering", nqf: "NQF 6", duration: "3 years", placementPct: 62 },
];

const alerts = [
  { id: 1, message: "8 final-year IT graduates have no employer matches yet — review profiles.", urgent: true },
  { id: 2, message: "SETA compliance report due in 14 days. Ensure all learner records are submitted.", urgent: true },
  { id: 3, message: "ND: Accounting placement rate dropped 4% since last quarter.", urgent: false },
];

function placementColor(pct: number) {
  if (pct >= 70) return "text-emerald-700";
  if (pct >= 55) return "text-amber-600";
  return "text-red-500";
}

export default function InstitutionDashboard() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NELSON MANDELA UNIVERSITY</p>
        <h1 className="text-xl font-bold text-slate-900">Institution Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Graduate pipeline and employment outcomes overview</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Graduates on Platform</p>
          <p className="text-2xl font-bold text-slate-900">342</p>
          <p className="text-xs text-gray-400">2024 cohort</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Employment Rate</p>
          <p className="text-2xl font-bold text-slate-900">61%</p>
          <p className="text-xs text-gray-400">Up 8% from 2023</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Actively Matched</p>
          <p className="text-2xl font-bold text-slate-900">128</p>
          <p className="text-xs text-gray-400">In pipeline now</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Avg Time to Placement</p>
          <p className="text-2xl font-bold text-slate-900">43d</p>
          <p className="text-xs text-gray-400">Down from 91d</p>
        </div>
      </div>

      {/* Programme outcomes */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Programme outcomes — 2024 cohort</p>
          <a href="/institution/programmes" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            All programmes <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {programmes.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.nqf}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 shrink-0">
                <div className="text-right">
                  <p className={`text-lg font-bold ${placementColor(p.placementPct)}`}>{p.placementPct}%</p>
                  <p className="text-xs text-gray-400">placed</p>
                </div>
                <div className="w-24">
                  <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full rounded ${p.placementPct >= 70 ? "bg-emerald-400" : p.placementPct >= 55 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${p.placementPct}%` }}
                    />
                  </div>
                </div>
                <a href={`/institution/programmes/${p.id}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View graduates <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent alerts */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Recent alerts</p>
        </div>
        <div className="divide-y divide-gray-50">
          {alerts.map((a) => (
            <div key={a.id} className="flex items-start gap-3 px-4 py-2.5">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.urgent ? "bg-red-500" : "bg-amber-400"}`} />
              <p className="text-sm text-slate-700">{a.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
