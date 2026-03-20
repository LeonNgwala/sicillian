import { ArrowUpRight } from "lucide-react";

const programmes = [
  {
    id: 1,
    name: "Agri-Tech Startup Accelerator",
    sector: "Agriculture",
    duration: "6 months",
    enrolled: 9,
    spotsLeft: 3,
    mentor: "Dr. Nadia Osman",
    status: "active",
  },
  {
    id: 2,
    name: "Township Retail Incubator",
    sector: "Retail",
    duration: "4 months",
    enrolled: 14,
    spotsLeft: 0,
    mentor: "Bongani Khumalo",
    status: "active",
  },
  {
    id: 3,
    name: "ICT Founders Bootcamp",
    sector: "ICT",
    duration: "3 months",
    enrolled: 8,
    spotsLeft: 2,
    mentor: "Sipho Mthembu",
    status: "active",
  },
  {
    id: 4,
    name: "Women in Business Programme",
    sector: "Business Services",
    duration: "8 months",
    enrolled: 12,
    spotsLeft: 5,
    mentor: "Nomsa Dlamini",
    status: "active",
  },
  {
    id: 5,
    name: "Green Economy Incubator",
    sector: "Sustainability",
    duration: "6 months",
    enrolled: 0,
    spotsLeft: 10,
    mentor: "TBD",
    status: "pending",
  },
  {
    id: 6,
    name: "Creative Industries Hub",
    sector: "Creative Economy",
    duration: "5 months",
    enrolled: 5,
    spotsLeft: 4,
    mentor: "Thandi Nkosi",
    status: "active",
  },
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

export default function IncubatorProgrammesPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">PROPELLA BUSINESS INCUBATOR · GQEBERHA</p>
        <h1 className="text-xl font-bold text-slate-900">Programmes</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage incubator programmes and track enrolment</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active</p>
          <p className="text-2xl font-bold text-slate-900">6</p>
          <p className="text-xs text-gray-400">running now</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Enrolled</p>
          <p className="text-2xl font-bold text-slate-900">48</p>
          <p className="text-xs text-gray-400">entrepreneurs</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-2xl font-bold text-slate-900">23</p>
          <p className="text-xs text-gray-400">all time</p>
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
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.sector}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.duration}</span>
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                  {p.spotsLeft > 0 ? (
                    <span className="text-xs text-gray-400">{p.spotsLeft} spots left</span>
                  ) : (
                    <span className="text-xs text-gray-400">Full</span>
                  )}
                  <span className="text-xs text-gray-400">Mentor: {p.mentor}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <StatusBadge status={p.status} />
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
