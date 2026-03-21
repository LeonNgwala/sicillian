"use client";

import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

const mentors = [
  { id: 1, initials: "SM", name: "Sipho Mthembu",    expertise: ["Software", "Product Design", "Venture Capital"],    availability: "active",  sessions: 31 },
  { id: 2, initials: "NO", name: "Dr. Nadia Osman",  expertise: ["AgriTech", "Business Strategy", "Funding"],         availability: "active",  sessions: 24 },
  { id: 3, initials: "ND", name: "Nomsa Dlamini",     expertise: ["Women Entrepreneurship", "Finance", "Marketing"],   availability: "active",  sessions: 22 },
  { id: 4, initials: "BK", name: "Bongani Khumalo",  expertise: ["Retail", "Supply Chain", "SMME Development"],       availability: "active",  sessions: 18 },
  { id: 5, initials: "LJ", name: "Luyanda Jacobs",   expertise: ["Legal", "Compliance", "IP Rights"],                 availability: "pending", sessions: 14 },
  { id: 6, initials: "ZM", name: "Zanele Mdlalose",  expertise: ["Manufacturing", "Export", "Quality Assurance"],     availability: "active",  sessions: 11 },
  { id: 7, initials: "TN", name: "Thandi Nkosi",     expertise: ["Creative Industries", "Brand Building", "Digital"], availability: "active",  sessions: 9  },
  { id: 8, initials: "KN", name: "Kwezi Ntombela",   expertise: ["Tourism", "Hospitality", "Social Enterprise"],      availability: "active",  sessions: 7  },
];

const maxSessions = Math.max(...mentors.map(m => m.sessions));

function AvailabilityBadge({ status }: { status: string }) {
  const map: Record<string,string> = { active: "bg-emerald-50 text-emerald-700 border-emerald-200", pending: "bg-amber-50 text-amber-700 border-amber-200" };
  const labels: Record<string,string> = { active: "Available", pending: "On leave" };
  return <span className={`text-xs px-2 py-0.5 rounded border ${map[status] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>{labels[status] ?? status}</span>;
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

export default function IncubatorMentorsPage() {
  const [search,       setSearch]       = useState("");
  const [availability, setAvailability] = useState("All");
  const [sortBy,       setSortBy]       = useState("Sessions ↓");

  let list = mentors;
  if (search.trim())           list = list.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.expertise.some(e => e.toLowerCase().includes(search.toLowerCase())));
  if (availability !== "All")  list = list.filter(m => (availability === "Available" ? m.availability === "active" : m.availability === "pending"));
  list = [...list].sort((a, b) =>
    sortBy === "Sessions ↓" ? b.sessions - a.sessions :
    sortBy === "Sessions ↑" ? a.sessions - b.sessions :
    a.name.localeCompare(b.name)
  );

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Propella Business Incubator · Gqeberha</p>
        <h1 className="text-xl font-bold text-slate-900">Mentors</h1>
        <p className="text-sm text-gray-400 mt-0.5">Expert mentors supporting incubator entrepreneurs</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Total Mentors",        val: mentors.length,                                           sub: "on roster" },
          { label: "Available Now",        val: mentors.filter(m=>m.availability==="active").length,      sub: "accepting sessions" },
          { label: "Sessions This Month",  val: mentors.reduce((s,m)=>s+m.sessions,0),                   sub: "completed" },
        ].map(({ label, val, sub }) => (
          <div key={label} className="bg-white px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{val}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Sessions chart */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Sessions by mentor</p>
        </div>
        <div className="px-4 py-4 space-y-2.5">
          {[...mentors].sort((a,b) => b.sessions - a.sessions).map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="text-xs text-slate-700 w-36 truncate shrink-0">{m.name}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden">
                <div className="h-full rounded transition-all duration-500"
                  style={{ width: `${(m.sessions/maxSessions)*100}%`, background: m.availability === "active" ? "linear-gradient(90deg,#34d399,#22d3ee)" : "linear-gradient(90deg,#fbbf24,#f97316)" }} />
              </div>
              <span className="text-xs font-semibold text-slate-700 w-6 text-right">{m.sessions}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">All mentors</p>
          <span className="text-xs text-gray-400">{list.length} shown</span>
        </div>

        {/* Search */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or expertise…"
              className="w-full bg-gray-50 border border-gray-200 rounded text-xs pl-8 pr-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Availability:</span>
            <Pills options={["All", "Available", "On leave"]} value={availability} onChange={setAvailability} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Sessions ↓", "Sessions ↑", "Name A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No mentors match these filters.</p>
          ) : list.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                  style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
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
