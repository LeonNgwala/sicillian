"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

// ── Demo data ───────────────────────────────────────────────────────────────

const DEMO_LEARNERS = [
  { id: 1,  name: "Vuyo Mkhize",    initials: "VM", qualification: "BSc Information Technology",  nqf: "6", district: "Nelson Mandela Bay", status: "searching", skills: ["Python","SQL","Django","Excel","Git"]         },
  { id: 2,  name: "Thabo Mokoena", initials: "TM", qualification: "BSc Computer Science",         nqf: "6", district: "Nelson Mandela Bay", status: "placed",    skills: ["Python","SQL","Django","Git"]                  },
  { id: 3,  name: "Naledi Dlamini",initials: "ND", qualification: "National Diploma IT",          nqf: "5", district: "Nelson Mandela Bay", status: "placed",    skills: ["SQL","Excel","Data Analysis","Power BI"]       },
  { id: 4,  name: "Sipho Ndlovu",  initials: "SN", qualification: "NCV IT",                       nqf: "4", district: "Buffalo City",        status: "searching", skills: ["Networking","Windows","Hardware"]              },
  { id: 5,  name: "Aisha Petersen",initials: "AP", qualification: "BSc Information Technology",  nqf: "6", district: "Nelson Mandela Bay", status: "placed",    skills: ["React","TypeScript","Node.js"]                 },
  { id: 6,  name: "Lebo Sithole",  initials: "LS", qualification: "ND Business Analysis",        nqf: "5", district: "East London",          status: "placed",    skills: ["SQL","Excel","Power BI","Tableau"]            },
  { id: 7,  name: "Zola Mfeka",    initials: "ZM", qualification: "NCV Electrical Engineering",  nqf: "4", district: "Buffalo City",         status: "searching", skills: ["AutoCAD","Wiring","Safety"]                   },
  { id: 8,  name: "Kwame Boateng", initials: "KB", qualification: "BSc Computer Science",        nqf: "6", district: "Nelson Mandela Bay",  status: "searching", skills: ["Java","Python","Algorithms"]                  },
  { id: 9,  name: "Yolanda Adams", initials: "YA", qualification: "National Diploma IT",         nqf: "5", district: "Nelson Mandela Bay",  status: "placed",    skills: ["SQL","Excel","Data Analysis"]                 },
  { id: 10, name: "Rethabile Moea",initials: "RM", qualification: "National Diploma IT",         nqf: "5", district: "East London",          status: "searching", skills: ["Linux","Networking","Python"]                 },
];

// ── Helpers ─────────────────────────────────────────────────────────────────

function placementColor(pct: number) {
  if (pct >= 70) return "text-emerald-700";
  if (pct >= 45) return "text-amber-600";
  return "text-red-500";
}
function barColor(pct: number) {
  if (pct >= 70) return "from-emerald-400 to-cyan-400";
  if (pct >= 45) return "from-amber-400 to-orange-300";
  return "from-red-400 to-rose-300";
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            value === o ? "border-emerald-400 text-emerald-700 bg-emerald-50" : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
          }`}
        >{o}</button>
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function InstitutionDashboard() {
  // Programme filters
  const [nqfFilter,    setNqfFilter]    = useState("All");
  const [progSort,     setProgSort]     = useState("Placement %");

  // Learner filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [nqfL,         setNqfL]         = useState("All");
  const [districtFilter, setDistrictFilter] = useState("All");

  // ── Stats ─────────────────────────────────────────────────────────────
  const total    = DEMO_LEARNERS.length;
  const placed   = DEMO_LEARNERS.filter(l => l.status === "placed").length;
  const searching = total - placed;
  const placementRate = Math.round((placed / total) * 100);

  // ── Programme outcomes ────────────────────────────────────────────────
  const qualMap = new Map<string, { count: number; placed: number; nqf: string }>();
  for (const l of DEMO_LEARNERS) {
    const prev = qualMap.get(l.qualification) ?? { count: 0, placed: 0, nqf: l.nqf };
    qualMap.set(l.qualification, { count: prev.count + 1, placed: prev.placed + (l.status === "placed" ? 1 : 0), nqf: prev.nqf });
  }
  let programmes = [...qualMap.entries()].map(([name, d]) => ({
    name, nqf: d.nqf,
    count: d.count,
    placementPct: Math.round((d.placed / d.count) * 100),
  }));
  if (nqfFilter !== "All") programmes = programmes.filter(p => p.nqf === nqfFilter);
  programmes = programmes.sort((a, b) =>
    progSort === "Placement %" ? b.placementPct - a.placementPct : b.count - a.count
  );

  // ── Learner table ─────────────────────────────────────────────────────
  const districts = ["All", ...Array.from(new Set(DEMO_LEARNERS.map(l => l.district))).sort()];
  let learners = DEMO_LEARNERS as typeof DEMO_LEARNERS;
  if (statusFilter !== "All")   learners = learners.filter(l => l.status === statusFilter);
  if (nqfL !== "All")           learners = learners.filter(l => l.nqf === nqfL);
  if (districtFilter !== "All") learners = learners.filter(l => l.district === districtFilter);

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NMU — Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">Institution Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Graduate pipeline and employment outcomes overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Learners on Platform", val: total,            sub: "registered" },
          { label: "Placement Rate",        val: `${placementRate}%`, sub: `${placed} placed` },
          { label: "AI Matched",            val: 9,               sub: "in pipeline now" },
          { label: "Searching",             val: searching,       sub: "active job seekers" },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Programme outcomes */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Programme outcomes</p>
          <a href="/institution/learners" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            All learners <ArrowUpRight size={11} />
          </a>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">NQF:</span>
            <Pills options={["All", "4", "5", "6"]} value={nqfFilter} onChange={setNqfFilter} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Placement %", "Learner count"]} value={progSort} onChange={setProgSort} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {programmes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No programmes match this filter.</p>
          ) : programmes.map(p => (
            <div key={p.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">NQF {p.nqf}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.count} learner{p.count !== 1 ? "s" : ""}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 shrink-0">
                <div className="text-right">
                  <p className={`text-lg font-bold ${placementColor(p.placementPct)}`}>{p.placementPct}%</p>
                  <p className="text-xs text-gray-400">placed</p>
                </div>
                <div className="w-24">
                  <div className="h-1.5 bg-gray-100 rounded overflow-hidden">
                    <div className={`h-full rounded bg-gradient-to-r ${barColor(p.placementPct)}`} style={{ width: `${p.placementPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learner table */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Learners</p>
          <span className="text-xs text-gray-400">{learners.length} shown</span>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Status:</span>
            <Pills options={["All", "searching", "placed"]} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">NQF:</span>
            <Pills options={["All", "4", "5", "6"]} value={nqfL} onChange={setNqfL} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">District:</span>
            <Pills options={districts} value={districtFilter} onChange={setDistrictFilter} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {learners.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No learners match these filters.</p>
          ) : learners.map(l => (
            <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                  style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}
                >
                  {l.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{l.name}</p>
                  <p className="text-xs text-gray-400">{l.qualification} · NQF {l.nqf} · {l.district}</p>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {l.skills.slice(0, 3).map(s => (
                      <span key={s} className="text-[10px] px-1.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                l.status === "placed"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}>
                {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
