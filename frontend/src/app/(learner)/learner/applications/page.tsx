"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

const applications = [
  { id: 1, title: "Junior Python Developer",  org: "TechCorp Eastern Cape",   date: "18 Mar 2026", status: "Shortlisted",  statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: 2, title: "IT Support Learnership",   org: "MTN",                      date: "12 Mar 2026", status: "Under review", statusColor: "bg-amber-100 text-amber-700 border-amber-200"    },
  { id: 3, title: "Data Analyst Learnership", org: "TechCorp Eastern Cape",   date: "10 Mar 2026", status: "Shortlisted",  statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: 4, title: "Systems Admin Internship", org: "SITA",                     date: "8 Mar 2026",  status: "Submitted",    statusColor: "bg-slate-100 text-slate-600 border-slate-200"     },
  { id: 5, title: "ICT Learnership",          org: "Vodacom Foundation",       date: "1 Mar 2026",  status: "Submitted",    statusColor: "bg-slate-100 text-slate-600 border-slate-200"     },
  { id: 6, title: "Help Desk Technician",     org: "Buffalo City Municipality",date: "20 Feb 2026", status: "Declined",     statusColor: "bg-red-100 text-red-600 border-red-200"          },
];

const STATUS_OPTS = ["All", "Shortlisted", "Under review", "Submitted", "Declined"];

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

export default function ApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest first");

  let list = applications;
  if (statusFilter !== "All") list = list.filter(a => a.status === statusFilter);
  list = [...list].sort((a, b) =>
    sortBy === "Newest first" ? a.id - b.id : b.id - a.id
  );

  // Status summary counts
  const counts = STATUS_OPTS.slice(1).map(s => ({
    label: s,
    count: applications.filter(a => a.status === s).length,
  }));

  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        {counts.map(c => (
          <button key={c.label} onClick={() => setStatusFilter(statusFilter === c.label ? "All" : c.label)}
            className={`px-3 py-2.5 text-left transition-colors ${statusFilter === c.label ? "bg-emerald-50" : "bg-white hover:bg-gray-50"}`}>
            <p className="text-lg font-bold text-slate-900">{c.count}</p>
            <p className="text-xs text-gray-400 truncate">{c.label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
        <span className="text-xs text-gray-400">Status:</span>
        <Pills options={STATUS_OPTS} value={statusFilter} onChange={setStatusFilter} />
        <span className="text-xs text-gray-400 ml-2">Sort:</span>
        <Pills options={["Newest first", "Oldest first"]} value={sortBy} onChange={setSortBy} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Your applications</p>
        <span className="text-xs text-gray-400">{list.length} shown</span>
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-400">No applications match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((app) => (
            <div key={app.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{app.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{app.org} · Applied {app.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${app.statusColor}`}>
                  {app.status}
                </span>
                <button className="text-gray-400 hover:text-emerald-500 transition-colors">
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
