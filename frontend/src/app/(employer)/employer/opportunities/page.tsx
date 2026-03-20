import { ArrowUpRight } from "lucide-react";

const listings = [
  { id: 1, title: "IT Support Learnership", type: "Learnership", nqf: "NQF 4", applicants: 12, closing: "30 Apr 2026", status: "active" },
  { id: 2, title: "Junior Software Developer", type: "Job", nqf: "NQF 6", applicants: 18, closing: "15 Apr 2026", status: "active" },
  { id: 3, title: "Graduate Intern — Data Analysis", type: "Internship", nqf: "NQF 7", applicants: 6, closing: "30 Apr 2026", status: "active" },
  { id: 4, title: "Finance Learnership", type: "Learnership", nqf: "NQF 5", applicants: 0, closing: "25 Apr 2026", status: "pending" },
  { id: 5, title: "Operations Manager", type: "Job", nqf: "NQF 7", applicants: 31, closing: "28 Feb 2026", status: "closed" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    open: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    review: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-gray-100 text-gray-500 border-gray-200",
    declined: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${cls}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function EmployerOpportunitiesPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">My Listings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your posted opportunities</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active</p>
          <p className="text-2xl font-bold text-slate-900">3</p>
          <p className="text-xs text-gray-400">currently live</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Applicants</p>
          <p className="text-2xl font-bold text-slate-900">47</p>
          <p className="text-xs text-gray-400">across all listings</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Filled</p>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-xs text-gray-400">this year</p>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All listings</p>
          <a href="/employer/post-opportunity" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            Post new <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {listings.map((l) => (
            <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{l.title}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.type}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{l.nqf}</span>
                  <span className="text-xs text-gray-400">Closes {l.closing}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className="text-xs text-gray-400">{l.applicants} applicants</span>
                <StatusBadge status={l.status} />
                <a
                  href={`/employer/opportunities/${l.id}`}
                  className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  View applicants <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
