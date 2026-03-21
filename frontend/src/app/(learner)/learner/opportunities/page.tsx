"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageWrapper from "@/components/dashboard/PageWrapper";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, Building2, MapPin, Calendar, MessageSquare, CheckCircle2, X } from "lucide-react";

const ALL_OPPORTUNITIES = [
  { id: "opp-1", title: "Junior Software Developer",    organisation: "TechAfrica Solutions",            location: "Port Elizabeth", type: "Job",         sector: "ICT",            closing: "15 Apr 2026", status: "active" as const },
  { id: "opp-2", title: "ICT Learnership (NQF 4)",      organisation: "Telkom Foundation",               location: "East London",    type: "Learnership", sector: "ICT",            closing: "30 Apr 2026", status: "active" as const },
  { id: "opp-3", title: "Data Analyst Internship",      organisation: "Eastern Cape Development Corp",   location: "Port Elizabeth", type: "Internship",  sector: "Finance",        closing: "20 Apr 2026", status: "active" as const },
  { id: "opp-4", title: "NSFAS Bursary — Engineering",  organisation: "NSFAS",                           location: "Remote",         type: "Bursary",     sector: "Education",      closing: "31 May 2026", status: "active" as const },
  { id: "opp-5", title: "Marketing Coordinator",        organisation: "Border Kei Chamber of Business",  location: "East London",    type: "Job",         sector: "Business",       closing: "10 Apr 2026", status: "closed" as const },
  { id: "opp-6", title: "Civil Engineering Internship", organisation: "SANRAL Eastern Cape",             location: "Port Elizabeth", type: "Internship",  sector: "Infrastructure", closing: "25 Apr 2026", status: "active" as const },
];

export default function LearnerOpportunitiesPage() {
  const [search,         setSearch]         = useState("");
  const [typeFilter,     setTypeFilter]     = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  // Applied IDs — removes from list
  const [applied,   setApplied]   = useState<Set<string>>(new Set());
  // Modal state
  const [modal,     setModal]     = useState<{ title: string; org: string } | null>(null);

  const opportunities = ALL_OPPORTUNITIES.filter(o => !applied.has(o.id));

  const filtered = opportunities.filter((o) => {
    const matchSearch   = o.title.toLowerCase().includes(search.toLowerCase()) || o.organisation.toLowerCase().includes(search.toLowerCase());
    const matchType     = typeFilter     === "All" || o.type     === typeFilter;
    const matchLocation = locationFilter === "All" || o.location === locationFilter;
    return matchSearch && matchType && matchLocation;
  });

  function handleApply(opp: typeof ALL_OPPORTUNITIES[0]) {
    setApplied(prev => new Set([...prev, opp.id]));
    setModal({ title: opp.title, org: opp.organisation });
  }

  return (
    <>
      <PageWrapper>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Browse Opportunities</h2>
          <p className="text-sm text-slate-500 mt-0.5">Jobs, learnerships, internships and bursaries in the Eastern Cape</p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or organisation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-sm pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-sm px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-400">
            <option value="All">All Types</option>
            <option>Job</option>
            <option>Learnership</option>
            <option>Internship</option>
            <option>Bursary</option>
          </select>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-sm px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-400">
            <option value="All">All Locations</option>
            <option>Port Elizabeth</option>
            <option>East London</option>
            <option>Remote</option>
          </select>
        </div>

        {applied.size > 0 && (
          <p className="text-xs text-emerald-600 font-medium mb-4">
            {applied.size} application{applied.size !== 1 ? "s" : ""} submitted — you'll receive an SMS confirmation.
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((opp) => (
            <div key={opp.id} className="bg-white border border-slate-200 rounded-sm p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  {opp.type}
                </span>
                <StatusBadge status={opp.status} />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-2">{opp.title}</h3>
              <div className="space-y-1 mb-4 flex-1">
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><Building2 size={11} /> {opp.organisation}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5"><MapPin size={11} /> {opp.location}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5"><Calendar size={11} /> Closes {opp.closing}</p>
              </div>
              <div className="flex gap-2">
                <a href={`/learner/opportunities/${opp.id}`}
                  className="flex-1 text-center py-2 rounded-sm text-xs font-semibold border border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors">
                  View Details
                </a>
                {opp.status === "active" && (
                  <button
                    onClick={() => handleApply(opp)}
                    className="flex-1 py-2 rounded-sm text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              {applied.size > 0 && opportunities.length === 0
                ? "You've applied to all available opportunities!"
                : "No opportunities match your search."}
            </p>
          </div>
        )}
      </PageWrapper>

      {/* SMS sent modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(null)} />

          {/* Card */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center text-center gap-4 z-10">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
              <MessageSquare size={28} className="text-white" />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900 mb-1">Application submitted!</p>
              <p className="text-sm text-slate-500">
                Your application for <span className="font-semibold text-slate-700">{modal.title}</span> at{" "}
                <span className="font-semibold text-slate-700">{modal.org}</span> has been received.
              </p>
            </div>

            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-semibold text-emerald-700">SMS confirmation sent</p>
                <p className="text-xs text-emerald-600 mt-0.5">A confirmation SMS has been sent to your registered number.</p>
              </div>
            </div>

            <button
              onClick={() => setModal(null)}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
