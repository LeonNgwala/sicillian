import { ArrowUpRight } from "lucide-react";

const listings = [
  { id: 1, title: "IT Support Learnership", type: "Learnership", nqf: "NQF 4", spotsLeft: 5, status: "active", applicants: 12 },
  { id: 2, title: "Junior Software Developer", type: "Job", nqf: "NQF 6", spotsLeft: 2, status: "active", applicants: 18 },
  { id: 3, title: "Graduate Intern — Data Analysis", type: "Internship", nqf: "NQF 7", spotsLeft: 3, status: "pending", applicants: 6 },
];

const applicants = [
  { id: 1, initials: "AD", name: "Amahle Dlamini", qualification: "ND: Information Technology", district: "Gqeberha", fitScore: 91, status: "active" },
  { id: 2, initials: "LM", name: "Luthando Mbeki", qualification: "BSc Computer Science", district: "East London", fitScore: 85, status: "pending" },
  { id: 3, initials: "NS", name: "Nontobeko Sithole", qualification: "ND: Software Development", district: "Gqeberha", fitScore: 78, status: "pending" },
  { id: 4, initials: "SD", name: "Siyabonga Dube", qualification: "Cert: Web Development", district: "Mthatha", fitScore: 64, status: "active" },
  { id: 5, initials: "AN", name: "Ayanda Ntuli", qualification: "BSc Information Systems", district: "East London", fitScore: 52, status: "closed" },
];

function fitScoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    open: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    review: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-gray-100 text-gray-500 border-gray-200",
    declined: "bg-gray-100 text-gray-500 border-gray-200",
    rejected: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function EmployerDashboard() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">Candidate Inbox</h1>
        <p className="text-sm text-gray-400 mt-0.5">AI-matched candidates and active listings overview</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active Listings</p>
          <p className="text-2xl font-bold text-slate-900">3</p>
          <p className="text-xs text-gray-400">2 closing soon</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">New Applicants</p>
          <p className="text-2xl font-bold text-slate-900">14</p>
          <p className="text-xs text-gray-400">this week</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Avg Fit Score</p>
          <p className="text-2xl font-bold text-slate-900">81%</p>
          <p className="text-xs text-gray-400">AI matched</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Placed This Year</p>
          <p className="text-2xl font-bold text-slate-900">6</p>
          <p className="text-xs text-gray-400">5 retained</p>
        </div>
      </div>

      {/* Active Listings */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Active listings</p>
          <a href="/employer/opportunities" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            Manage <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {listings.map((l) => (
            <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{l.title}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0 flex-wrap justify-end">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.type}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.spotsLeft} spots left</span>
                <StatusBadge status={l.status} />
                <span className="text-xs text-gray-400">{l.applicants} applicants</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Recent applicants</p>
          <a href="/employer/candidates" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {applicants.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                  {a.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.qualification} · {a.district}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-sm font-bold ${fitScoreColor(a.fitScore)}`}>{a.fitScore}%</span>
                <StatusBadge status={a.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
