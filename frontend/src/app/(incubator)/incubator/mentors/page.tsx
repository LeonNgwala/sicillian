import { ArrowUpRight } from "lucide-react";

const mentors = [
  {
    id: 1,
    initials: "NO",
    name: "Dr. Nadia Osman",
    expertise: ["AgriTech", "Business Strategy", "Funding"],
    availability: "active",
    sessions: 24,
  },
  {
    id: 2,
    initials: "BK",
    name: "Bongani Khumalo",
    expertise: ["Retail", "Supply Chain", "SMME Development"],
    availability: "active",
    sessions: 18,
  },
  {
    id: 3,
    initials: "SM",
    name: "Sipho Mthembu",
    expertise: ["Software", "Product Design", "Venture Capital"],
    availability: "active",
    sessions: 31,
  },
  {
    id: 4,
    initials: "ND",
    name: "Nomsa Dlamini",
    expertise: ["Women Entrepreneurship", "Finance", "Marketing"],
    availability: "active",
    sessions: 22,
  },
  {
    id: 5,
    initials: "TN",
    name: "Thandi Nkosi",
    expertise: ["Creative Industries", "Brand Building", "Digital Media"],
    availability: "active",
    sessions: 9,
  },
  {
    id: 6,
    initials: "LJ",
    name: "Luyanda Jacobs",
    expertise: ["Legal", "Compliance", "IP Rights"],
    availability: "pending",
    sessions: 14,
  },
  {
    id: 7,
    initials: "ZM",
    name: "Zanele Mdlalose",
    expertise: ["Manufacturing", "Export", "Quality Assurance"],
    availability: "active",
    sessions: 11,
  },
  {
    id: 8,
    initials: "KN",
    name: "Kwezi Ntombela",
    expertise: ["Tourism", "Hospitality", "Social Enterprise"],
    availability: "active",
    sessions: 7,
  },
];

function AvailabilityBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    closed: "bg-gray-100 text-gray-500 border-gray-200",
  };
  const labelMap: Record<string, string> = {
    active: "Available",
    pending: "On leave",
    closed: "Unavailable",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${cls}`}>
      {labelMap[status] ?? status}
    </span>
  );
}

export default function IncubatorMentorsPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">PROPELLA BUSINESS INCUBATOR · GQEBERHA</p>
        <h1 className="text-xl font-bold text-slate-900">Mentors</h1>
        <p className="text-sm text-gray-400 mt-0.5">Expert mentors supporting incubator entrepreneurs</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Mentors</p>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-gray-400">on roster</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Available Now</p>
          <p className="text-2xl font-bold text-slate-900">8</p>
          <p className="text-xs text-gray-400">accepting sessions</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Sessions This Month</p>
          <p className="text-2xl font-bold text-slate-900">34</p>
          <p className="text-xs text-gray-400">completed</p>
        </div>
      </div>

      {/* Mentor list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All mentors</p>
        </div>
        <div className="divide-y divide-gray-50">
          {mentors.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                  {m.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{m.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.expertise.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <AvailabilityBadge status={m.availability} />
                <span className="text-xs text-gray-400">{m.sessions} sessions</span>
                <a className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View profile <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
