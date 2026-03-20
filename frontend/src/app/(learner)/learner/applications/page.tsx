"use client";

import { ArrowUpRight } from "lucide-react";

const applications = [
  {
    title: "IT Support Learnership",
    org: "MTN",
    date: "12 Mar 2026",
    status: "Under review",
    statusColor: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    title: "Systems Admin Internship",
    org: "SITA",
    date: "8 Mar 2026",
    status: "Shortlisted",
    statusColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    title: "ICT Learnership",
    org: "Vodacom Foundation",
    date: "1 Mar 2026",
    status: "Submitted",
    statusColor: "bg-slate-100 text-slate-600 border-slate-200",
  },
  {
    title: "Help Desk Technician",
    org: "Buffalo City Municipality",
    date: "20 Feb 2026",
    status: "Declined",
    statusColor: "bg-red-100 text-red-600 border-red-200",
  },
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Your applications</p>
        <span className="text-xs text-gray-400">{applications.length} total</span>
      </div>

      <div className="space-y-3">
        {applications.map((app) => (
          <div
            key={app.title}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between gap-4"
          >
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
    </div>
  );
}
