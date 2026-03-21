"use client";

import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const candidates = [
  { id: 1, initials: "VM", name: "Vuyo Mkhize",    qualification: "BSc Information Technology",  nqf: "NQF 6", district: "Gqeberha", skills: ["Python", "SQL", "Django"],       fitScore: 100 },
  { id: 2, initials: "TM", name: "Thabo Mokoena",  qualification: "BSc Computer Science",         nqf: "NQF 6", district: "Gqeberha", skills: ["Python", "SQL", "Django"],       fitScore: 100 },
  { id: 3, initials: "AD", name: "Amahle Dlamini", qualification: "ND: Information Technology",  nqf: "NQF 6", district: "Gqeberha", skills: ["JavaScript", "Python", "React"], fitScore: 91  },
  { id: 4, initials: "AN", name: "Ayanda Ntuli",   qualification: "BSc Information Systems",      nqf: "NQF 7", district: "East London",skills: ["SQL", "Python", "Power BI"],    fitScore: 88  },
  { id: 5, initials: "LM", name: "Luthando Mbeki", qualification: "BSc Computer Science",         nqf: "NQF 7", district: "East London",skills: ["Java", "Spring Boot", "Docker"],fitScore: 85  },
  { id: 6, initials: "GM", name: "Gana Mthembu",   qualification: "BSc Computer Science",         nqf: "NQF 7", district: "Gqeberha", skills: ["Python", "SQL"],                 fitScore: 80  },
  { id: 7, initials: "NS", name: "Nontobeko Sithole",qualification:"ND: Software Development",   nqf: "NQF 6", district: "Gqeberha", skills: ["React", "Node.js", "TypeScript"],fitScore: 78  },
  { id: 8, initials: "SD", name: "Siyabonga Dube", qualification: "Cert: Web Development",        nqf: "NQF 5", district: "Mthatha",   skills: ["HTML/CSS", "JavaScript"],       fitScore: 64  },
  { id: 9, initials: "TK", name: "Thandeka Mokoena",qualification:"ND: IT Systems Development",  nqf: "NQF 6", district: "Gqeberha", skills: ["C#", ".NET", "Azure"],           fitScore: 52  },
];

const DISTRICTS = ["All districts", ...Array.from(new Set(candidates.map(c => c.district))).sort()];
const NQF_LEVELS = ["All NQF", "NQF 5", "NQF 6", "NQF 7"];

function fitColor(s: number) {
  return s >= 80 ? "text-emerald-700" : s >= 60 ? "text-amber-600" : "text-red-500";
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

export default function EmployerCandidatesPage() {
  const [search, setSearch]       = useState("");
  const [nqf,    setNqf]          = useState("All NQF");
  const [district, setDistrict]   = useState("All districts");
  const [minFit, setMinFit]       = useState("All");
  const [sortDir, setSortDir]     = useState<"desc"|"asc">("desc");

  let list = candidates;
  if (search.trim()) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.qualification.toLowerCase().includes(search.toLowerCase()));
  if (nqf !== "All NQF") list = list.filter(c => c.nqf === nqf);
  if (district !== "All districts") list = list.filter(c => c.district === district);
  if (minFit === "80%+") list = list.filter(c => c.fitScore >= 80);
  else if (minFit === "60%+") list = list.filter(c => c.fitScore >= 60);
  list = [...list].sort((a, b) => sortDir === "desc" ? b.fitScore - a.fitScore : a.fitScore - b.fitScore);

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">TechCorp Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">Browse Candidates</h1>
        <p className="text-sm text-gray-400 mt-0.5">AI-matched candidate profiles based on your active listings</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total Profiles",      val: candidates.length, sub: "on platform" },
          { label: "AI Matched to You",   val: candidates.filter(c => c.fitScore >= 60).length, sub: "this cycle" },
          { label: "Strong Fit (80%+)",   val: candidates.filter(c => c.fitScore >= 80).length, sub: "top matches" },
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
          <p className="text-sm font-semibold text-slate-900">Matched candidates</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or qualification…"
              className="w-full bg-gray-50 border border-gray-200 rounded text-xs pl-8 pr-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">NQF:</span>
            <Pills options={NQF_LEVELS} value={nqf} onChange={setNqf} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">District:</span>
            <Pills options={DISTRICTS} value={district} onChange={setDistrict} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Min fit:</span>
            <Pills options={["All", "60%+", "80%+"]} value={minFit} onChange={setMinFit} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills
              options={["High → Low", "Low → High"]}
              value={sortDir === "desc" ? "High → Low" : "Low → High"}
              onChange={v => setSortDir(v === "High → Low" ? "desc" : "asc")}
            />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No candidates match these filters.</p>
          ) : list.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                  style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
                  {c.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.qualification} · {c.district}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{c.nqf}</span>
                    {c.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-sm font-bold ${fitColor(c.fitScore)}`}>{c.fitScore}%</span>
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
