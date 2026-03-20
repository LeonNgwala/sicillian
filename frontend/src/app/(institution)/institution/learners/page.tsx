import { ArrowUpRight } from "lucide-react";

const learners = [
  { id: 1, initials: "AD", name: "Amahle Dlamini", programme: "ND: Information Technology", nqf: "NQF 6", district: "Gqeberha", matchScore: 94, status: "active" },
  { id: 2, initials: "LM", name: "Luthando Mbeki", programme: "BSc Computer Science", nqf: "NQF 7", district: "East London", matchScore: 88, status: "active" },
  { id: 3, initials: "NS", name: "Nontobeko Sithole", programme: "ND: Accounting", nqf: "NQF 6", district: "Gqeberha", matchScore: 76, status: "pending" },
  { id: 4, initials: "SD", name: "Siyabonga Dube", programme: "ND: Civil Engineering", nqf: "NQF 6", district: "Mthatha", matchScore: 65, status: "active" },
  { id: 5, initials: "AN", name: "Ayanda Ntuli", programme: "BSc Information Systems", nqf: "NQF 7", district: "East London", matchScore: 91, status: "active" },
  { id: 6, initials: "TM", name: "Thandeka Mokoena", programme: "ND: Information Technology", nqf: "NQF 6", district: "Gqeberha", matchScore: 72, status: "active" },
  { id: 7, initials: "SC", name: "Siphamandla Cele", programme: "BSc Computer Science", nqf: "NQF 7", district: "East London", matchScore: 85, status: "pending" },
  { id: 8, initials: "ND", name: "Nomvula Dlamini", programme: "ND: Accounting", nqf: "NQF 6", district: "King William's Town", matchScore: 60, status: "active" },
];

function matchColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
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

export default function InstitutionLearnersPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NELSON MANDELA UNIVERSITY</p>
        <h1 className="text-xl font-bold text-slate-900">Learners</h1>
        <p className="text-sm text-gray-400 mt-0.5">Enrolled learner profiles and matching status</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Enrolled</p>
          <p className="text-2xl font-bold text-slate-900">342</p>
          <p className="text-xs text-gray-400">2024 cohort</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">In Matching Pipeline</p>
          <p className="text-2xl font-bold text-slate-900">128</p>
          <p className="text-xs text-gray-400">actively matched</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Placed</p>
          <p className="text-2xl font-bold text-slate-900">67</p>
          <p className="text-xs text-gray-400">this year</p>
        </div>
      </div>

      {/* Learner list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All learners</p>
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
                  <p className="text-xs text-gray-400">{l.programme}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.nqf}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.district}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-sm font-bold ${matchColor(l.matchScore)}`}>{l.matchScore}%</span>
                <StatusBadge status={l.status} />
                <a className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
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
