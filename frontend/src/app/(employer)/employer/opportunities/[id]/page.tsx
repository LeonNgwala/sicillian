"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const applicants = [
  {
    id: 1,
    initials: "AD",
    name: "Amahle Dlamini",
    qualification: "ND: Information Technology",
    location: "Gqeberha",
    fitScore: 94,
    aiSummary: "Strong match on networking and hardware support modules. Completed ICDL certification.",
    status: "pending",
  },
  {
    id: 2,
    initials: "LM",
    name: "Luthando Mbeki",
    qualification: "BSc Computer Science",
    location: "East London",
    fitScore: 88,
    aiSummary: "Excellent academic record with practical exposure in campus IT lab support role.",
    status: "pending",
  },
  {
    id: 3,
    initials: "NS",
    name: "Nontobeko Sithole",
    qualification: "ND: Software Development",
    location: "Gqeberha",
    fitScore: 78,
    aiSummary: "Good technical aptitude; gap in hardware troubleshooting experience noted by AI.",
    status: "pending",
  },
  {
    id: 4,
    initials: "SD",
    name: "Siyabonga Dube",
    qualification: "Cert: Web Development",
    location: "Mthatha",
    fitScore: 64,
    aiSummary: "Limited IT support background but shows strong problem-solving skills in assessments.",
    status: "pending",
  },
  {
    id: 5,
    initials: "AN",
    name: "Ayanda Ntuli",
    qualification: "BSc Information Systems",
    location: "East London",
    fitScore: 52,
    aiSummary: "Profile primarily aligned to data/analytics roles; limited hardware support experience.",
    status: "pending",
  },
];

function fitScoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

export default function EmployerOpportunityDetailPage() {
  const [statuses, setStatuses] = useState<Record<number, string>>({});

  const setStatus = (id: number, status: string) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Back link */}
      <Link href="/employer/opportunities" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
        ← Back to listings
      </Link>

      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">IT Support Learnership</h1>
        <p className="text-sm text-gray-400 mt-0.5">MTN — East London</p>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">NQF 4</span>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">12 months</span>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">R3 500/month</span>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">5 spots left</span>
      </div>

      {/* Applicants */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Applicants — sorted by AI fit score</p>
          <span className="text-xs text-gray-400">5 applicants</span>
        </div>
        <div className="divide-y divide-gray-50">
          {applicants.map((a) => {
            const currentStatus = statuses[a.id] ?? a.status;
            return (
              <div key={a.id} className="px-4 py-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{a.name}</p>
                      <p className="text-xs text-gray-400">{a.qualification} · {a.location}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ml-4 shrink-0 ${fitScoreColor(a.fitScore)}`}>{a.fitScore}%</span>
                </div>
                <p className="text-xs text-gray-400 pl-12">{a.aiSummary}</p>
                <div className="flex items-center gap-2 pl-12 flex-wrap">
                  <button
                    onClick={() => setStatus(a.id, "accepted")}
                    className={`inline-flex items-center gap-1 text-xs border rounded px-2.5 py-1 transition-colors ${
                      currentStatus === "accepted"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "text-gray-500 border-gray-200 hover:text-emerald-600 hover:border-emerald-300"
                    }`}
                  >
                    Accept <ArrowUpRight size={10} />
                  </button>
                  <button className="inline-flex items-center gap-1 text-xs border border-gray-200 rounded px-2.5 py-1 text-gray-500 hover:text-slate-700 transition-colors">
                    View profile
                  </button>
                  <button
                    onClick={() => setStatus(a.id, "declined")}
                    className={`inline-flex items-center gap-1 text-xs border rounded px-2.5 py-1 transition-colors ${
                      currentStatus === "declined"
                        ? "bg-gray-100 text-gray-500 border-gray-200"
                        : "text-gray-400 border-gray-200 hover:text-red-500 hover:border-red-200"
                    }`}
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
