"use client";

import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const learners = [
  { id: 1, initials: "AD", name: "Amahle Dlamini",    programme: "ND: Information Technology", nqf: "NQF 6", district: "Gqeberha",          matchScore: 94, status: "active"  },
  { id: 2, initials: "AN", name: "Ayanda Ntuli",       programme: "BSc Information Systems",    nqf: "NQF 7", district: "East London",         matchScore: 91, status: "active"  },
  { id: 3, initials: "LM", name: "Luthando Mbeki",     programme: "BSc Computer Science",       nqf: "NQF 7", district: "East London",         matchScore: 88, status: "active"  },
  { id: 4, initials: "SC", name: "Siphamandla Cele",   programme: "BSc Computer Science",       nqf: "NQF 7", district: "East London",         matchScore: 85, status: "pending" },
  { id: 5, initials: "NS", name: "Nontobeko Sithole",  programme: "ND: Accounting",             nqf: "NQF 6", district: "Gqeberha",          matchScore: 76, status: "pending" },
  { id: 6, initials: "TM", name: "Thandeka Mokoena",   programme: "ND: Information Technology", nqf: "NQF 6", district: "Gqeberha",          matchScore: 72, status: "active"  },
  { id: 7, initials: "SD", name: "Siyabonga Dube",     programme: "ND: Civil Engineering",      nqf: "NQF 6", district: "Mthatha",            matchScore: 65, status: "active"  },
  { id: 8, initials: "ND", name: "Nomvula Dlamini",    programme: "ND: Accounting",             nqf: "NQF 6", district: "King William's Town", matchScore: 60, status: "active"  },
];

const NQF_OPTS      = ["All NQF", "NQF 6", "NQF 7"];
const STATUS_OPTS   = ["All", "active", "pending"];
const DISTRICT_OPTS = ["All districts", ...Array.from(new Set(learners.map(l => l.district))).sort()];
const PROG_OPTS     = ["All programmes", ...Array.from(new Set(learners.map(l => l.programme))).sort()];

function matchColor(s: number) { return s >= 80 ? "text-emerald-700" : s >= 60 ? "text-amber-600" : "text-red-500"; }

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

export default function InstitutionLearnersPage() {
  const [search,   setSearch]   = useState("");
  const [nqf,      setNqf]      = useState("All NQF");
  const [status,   setStatus]   = useState("All");
  const [district, setDistrict] = useState("All districts");
  const [prog,     setProg]     = useState("All programmes");
  const [sortBy,   setSortBy]   = useState("Match ↓");

  let list = learners;
  if (search.trim())          list = list.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
  if (nqf !== "All NQF")      list = list.filter(l => l.nqf === nqf);
  if (status !== "All")       list = list.filter(l => l.status === status);
  if (district !== "All districts") list = list.filter(l => l.district === district);
  if (prog !== "All programmes")    list = list.filter(l => l.programme === prog);
  list = [...list].sort((a, b) =>
    sortBy === "Match ↓" ? b.matchScore - a.matchScore :
    sortBy === "Match ↑" ? a.matchScore - b.matchScore :
    a.name.localeCompare(b.name)
  );

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Nelson Mandela University</p>
        <h1 className="text-xl font-bold text-slate-900">Learners</h1>
        <p className="text-sm text-gray-400 mt-0.5">Enrolled learner profiles and matching status</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total Enrolled",        val: 342,  sub: "2024 cohort" },
          { label: "In Matching Pipeline",  val: 128,  sub: "actively matched" },
          { label: "Placed",                val: 67,   sub: "this year" },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All learners</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full bg-gray-50 border border-gray-200 rounded text-xs pl-8 pr-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Status:</span>
            <Pills options={STATUS_OPTS} value={status} onChange={setStatus} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">NQF:</span>
            <Pills options={NQF_OPTS} value={nqf} onChange={setNqf} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">District:</span>
            <Pills options={DISTRICT_OPTS} value={district} onChange={setDistrict} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Programme:</span>
            <Pills options={PROG_OPTS} value={prog} onChange={setProg} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Match ↓", "Match ↑", "Name A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No learners match these filters.</p>
          ) : list.map((l) => (
            <div key={l.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                  style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
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
