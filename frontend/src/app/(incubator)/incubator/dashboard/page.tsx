import { ArrowUpRight } from "lucide-react";

const programmes = [
  { id: 1, name: "Agri-Tech Startup Accelerator", sector: "Agriculture", enrolled: 9, status: "active" },
  { id: 2, name: "Township Retail Incubator", sector: "Retail", enrolled: 14, status: "active" },
  { id: 3, name: "ICT Founders Bootcamp", sector: "ICT", enrolled: 8, status: "active" },
  { id: 4, name: "Women in Business Programme", sector: "Business Services", enrolled: 12, status: "active" },
];

const sessions = [
  { id: 1, title: "Pitch Night — Agri-Tech Cohort", date: "25 Mar 2026", mentor: "Dr. Nadia Osman", type: "Pitch" },
  { id: 2, title: "Mentor Session: Financial Modelling", date: "27 Mar 2026", mentor: "Bongani Khumalo", type: "Workshop" },
  { id: 3, title: "ICT Bootcamp Week 3 Kickoff", date: "1 Apr 2026", mentor: "Sipho Mthembu", type: "Session" },
  { id: 4, title: "Eastern Cape Startup Expo", date: "15 Apr 2026", mentor: "All mentors", type: "Expo" },
];

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

export default function IncubatorDashboard() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">PROPELLA BUSINESS INCUBATOR · GQEBERHA</p>
        <h1 className="text-xl font-bold text-slate-900">Incubator Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Programme activity and upcoming sessions overview</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active Programmes</p>
          <p className="text-2xl font-bold text-slate-900">6</p>
          <p className="text-xs text-gray-400">currently running</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Enrolled Entrepreneurs</p>
          <p className="text-2xl font-bold text-slate-900">48</p>
          <p className="text-xs text-gray-400">across all programmes</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Mentors Available</p>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-gray-400">active on platform</p>
        </div>
      </div>

      {/* Active programmes */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Active programmes</p>
          <a href="/incubator/programmes" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {programmes.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.sector}</span>
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                </div>
              </div>
              <div className="ml-4 shrink-0">
                <StatusBadge status={p.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming sessions */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Upcoming sessions</p>
        </div>
        <div className="divide-y divide-gray-50">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{s.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.date} · {s.mentor}</p>
              </div>
              <div className="ml-4 shrink-0">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
