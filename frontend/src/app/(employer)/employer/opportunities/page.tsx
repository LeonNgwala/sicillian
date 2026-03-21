"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

const listings = [
  { id: 1, title: "Junior Python Developer",          type: "Internship",  nqf: "NQF 6", applicants: 18, closing: "30 Apr 2026", status: "active"  },
  { id: 2, title: "Data Analyst Learnership",          type: "Learnership", nqf: "NQF 5", applicants: 12, closing: "30 Apr 2026", status: "active"  },
  { id: 3, title: "IT Support Technician",             type: "Job",         nqf: "NQF 4", applicants:  6, closing: "15 May 2026", status: "active"  },
  { id: 4, title: "Graduate Intern — Data Analysis",   type: "Internship",  nqf: "NQF 7", applicants:  6, closing: "30 Apr 2026", status: "active"  },
  { id: 5, title: "Finance Learnership",               type: "Learnership", nqf: "NQF 5", applicants:  0, closing: "25 Apr 2026", status: "pending" },
  { id: 6, title: "Operations Manager",                type: "Job",         nqf: "NQF 7", applicants: 31, closing: "28 Feb 2026", status: "closed"  },
];

const STATUS_OPTS = ["All", "active", "pending", "closed"];
const TYPE_OPTS   = ["All", "Job", "Learnership", "Internship"];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    closed:  "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${map[status] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
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

export default function EmployerOpportunitiesPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter,   setTypeFilter]   = useState("All");
  const [sortBy,       setSortBy]       = useState("Applicants ↓");

  let list = listings;
  if (statusFilter !== "All") list = list.filter(l => l.status === statusFilter);
  if (typeFilter   !== "All") list = list.filter(l => l.type   === typeFilter);
  list = [...list].sort((a, b) =>
    sortBy === "Applicants ↓" ? b.applicants - a.applicants :
    sortBy === "Applicants ↑" ? a.applicants - b.applicants :
    a.title.localeCompare(b.title)
  );

  const active     = listings.filter(l => l.status === "active").length;
  const totalApps  = listings.reduce((s, l) => s + l.applicants, 0);
  const filled     = listings.filter(l => l.status === "closed").length;

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">TechCorp Eastern Cape</p>
        <h1 className="text-xl font-bold text-slate-900">My Listings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your posted opportunities</p>
      </div>

      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        {[
          { label: "Active",          val: active,    sub: "currently live" },
          { label: "Total Applicants", val: totalApps, sub: "across all listings" },
          { label: "Closed",          val: filled,    sub: "this cycle" },
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
          <p className="text-sm font-semibold text-slate-900">All listings</p>
          <a href="/employer/post-opportunity" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            Post new <ArrowUpRight size={11} />
          </a>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Status:</span>
            <Pills options={STATUS_OPTS} value={statusFilter} onChange={setStatusFilter} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Type:</span>
            <Pills options={TYPE_OPTS} value={typeFilter} onChange={setTypeFilter} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort:</span>
            <Pills options={["Applicants ↓", "Applicants ↑", "Title A–Z"]} value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No listings match these filters.</p>
          ) : list.map((l) => (
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
                <span className="text-xs text-gray-400">{l.applicants} applicant{l.applicants !== 1 ? "s" : ""}</span>
                <StatusBadge status={l.status} />
                <a href={`/employer/opportunities/${l.id}`} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View applicants <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400">{list.length} listing{list.length !== 1 ? "s" : ""} shown</p>
        </div>
      </div>
    </div>
  );
}
