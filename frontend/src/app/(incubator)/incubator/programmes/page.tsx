"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

const programmes = [
  { id: 1, name: "Agri-Tech Startup Accelerator", sector: "Agriculture",       duration: "6 months", enrolled: 9,  spotsLeft: 3, mentor: "Dr. Nadia Osman",  status: "active"  },
  { id: 2, name: "Township Retail Incubator",      sector: "Retail",            duration: "4 months", enrolled: 14, spotsLeft: 0, mentor: "Bongani Khumalo",  status: "active"  },
  { id: 3, name: "ICT Founders Bootcamp",          sector: "ICT",               duration: "3 months", enrolled: 8,  spotsLeft: 2, mentor: "Sipho Mthembu",    status: "active"  },
  { id: 4, name: "Women in Business Programme",    sector: "Business Services", duration: "8 months", enrolled: 12, spotsLeft: 5, mentor: "Nomsa Dlamini",    status: "active"  },
  { id: 5, name: "Green Economy Incubator",        sector: "Sustainability",    duration: "6 months", enrolled: 0,  spotsLeft:10, mentor: "TBD",               status: "pending" },
  { id: 6, name: "Creative Industries Hub",        sector: "Creative Economy",  duration: "5 months", enrolled: 5,  spotsLeft: 4, mentor: "Thandi Nkosi",     status: "active"  },
];

const SECTORS  = ["All sectors", ...Array.from(new Set(programmes.map(p => p.sector))).sort()];
const STATUS_OPTS = ["All", "active", "pending"];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string,string> = { active: "bg-emerald-50 text-emerald-700 border-emerald-200", pending: "bg-amber-50 text-amber-700 border-amber-200" };
  return <span className={`text-xs px-2 py-0.5 rounded border ${map[status] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>{status.charAt(0).toUpperCase()+status.slice(1)}</span>;
}

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            value === o ? "border-emerald-400 text-emerald-700 bg-emerald-50" : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
          }`}>{o}</button>
      ))}
    </div>
  );
}

export default function IncubatorProgrammesPage() {
  const [sector, setSector]   = useState("All sectors");
  const [status, setStatus]   = useState("All");
  const [sortBy, setSortBy]   = useState("Enrolled ↓");
  const [spotsOnly, setSpotsOnly] = useState(false);

  let list = programmes;
  if (sector !== "All sectors")  list = list.filter(p => p.sector === sector);
  if (status !== "All")          list = list.filter(p => p.status === status);
  if (spotsOnly)                 list = list.filter(p => p.spotsLeft > 0);
  list = [...list].sort((a, b) =>
    sortBy === "Enrolled ↓"   ? b.enrolled - a.enrolled :
    sortBy === "Enrolled ↑"   ? a.enrolled - b.enrolled :
    sortBy === "Spots avail." ? b.spotsLeft - a.spotsLeft :
    a.name.localeCompare(b.name)
  );

  const maxEnrolled = Math.max(...programmes.map(p => p.enrolled), 1);

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Propella Business Incubator · Gqeberha</p>
        <h1 className="text-xl font-bold text-slate-900">Programmes</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage incubator programmes and track enrolment</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Active",         val: programmes.filter(p=>p.status==="active").length, sub: "running now"   },
          { label: "Total Enrolled", val: programmes.reduce((s,p)=>s+p.enrolled,0),         sub: "entrepreneurs" },
          { label: "Spots Open",     val: programmes.reduce((s,p)=>s+p.spotsLeft,0),        sub: "across all"    },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Enrolment chart */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Enrolment by programme</p>
        </div>
        <div className="px-4 py-4 space-y-3">
          {[...programmes].filter(p=>p.enrolled>0).sort((a,b)=>b.enrolled-a.enrolled).map(p => (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium truncate max-w-[60%]">{p.name}</span>
                <span className="text-xs text-gray-400">{p.enrolled} enrolled{p.spotsLeft>0 ? ` · ${p.spotsLeft} spots left` : " · Full"}</span>
              </div>
              <div className="flex gap-1 h-3">
                <div className="bg-gray-100 rounded overflow-hidden" style={{ width: `${(p.enrolled/maxEnrolled)*100}%` }}>
                  <div className="h-full rounded" style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)", width: "100%" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All programmes</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Sector:</span>
            <Pills options={SECTORS} value={sector} onChange={setSector} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Status:</span>
            <Pills options={STATUS_OPTS} value={status} onChange={setStatus} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Enrolled ↓", "Enrolled ↑", "Spots avail.", "Name A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={spotsOnly} onChange={e => setSpotsOnly(e.target.checked)}
              className="w-3 h-3 accent-emerald-500" />
            <span className="text-xs text-gray-500">Spots available only</span>
          </label>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No programmes match these filters.</p>
          ) : list.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.sector}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.duration}</span>
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                  <span className="text-xs text-gray-400">{p.spotsLeft > 0 ? `${p.spotsLeft} spots left` : "Full"}</span>
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
