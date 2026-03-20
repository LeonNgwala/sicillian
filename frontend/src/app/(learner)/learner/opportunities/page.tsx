"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageWrapper from "@/components/dashboard/PageWrapper";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { Search, Building2, MapPin, Calendar } from "lucide-react";

const opportunities = [
  {
    id: "opp-1",
    title: "Junior Software Developer",
    organisation: "TechAfrica Solutions",
    location: "Port Elizabeth",
    type: "Job",
    sector: "ICT",
    closing: "15 Apr 2026",
    status: "active" as const,
  },
  {
    id: "opp-2",
    title: "ICT Learnership (NQF 4)",
    organisation: "Telkom Foundation",
    location: "East London",
    type: "Learnership",
    sector: "ICT",
    closing: "30 Apr 2026",
    status: "active" as const,
  },
  {
    id: "opp-3",
    title: "Data Analyst Internship",
    organisation: "Eastern Cape Development Corp",
    location: "Port Elizabeth",
    type: "Internship",
    sector: "Finance",
    closing: "20 Apr 2026",
    status: "active" as const,
  },
  {
    id: "opp-4",
    title: "NSFAS Bursary — Engineering",
    organisation: "NSFAS",
    location: "Remote",
    type: "Bursary",
    sector: "Education",
    closing: "31 May 2026",
    status: "active" as const,
  },
  {
    id: "opp-5",
    title: "Marketing Coordinator",
    organisation: "Border Kei Chamber of Business",
    location: "East London",
    type: "Job",
    sector: "Business",
    closing: "10 Apr 2026",
    status: "closed" as const,
  },
  {
    id: "opp-6",
    title: "Civil Engineering Internship",
    organisation: "SANRAL Eastern Cape",
    location: "Port Elizabeth",
    type: "Internship",
    sector: "Infrastructure",
    closing: "25 Apr 2026",
    status: "active" as const,
  },
];

export default function LearnerOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const filtered = opportunities.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.organisation.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || o.type === typeFilter;
    const matchLocation = locationFilter === "All" || o.location === locationFilter;
    return matchSearch && matchType && matchLocation;
  });

  return (
    <>
      <DashboardHeader title="Opportunities" userName="Amahle Dlamini" notificationCount={3} />
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-sm px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-400"
          >
            <option value="All">All Types</option>
            <option>Job</option>
            <option>Learnership</option>
            <option>Internship</option>
            <option>Bursary</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-sm px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-emerald-400"
          >
            <option value="All">All Locations</option>
            <option>Port Elizabeth</option>
            <option>East London</option>
            <option>Remote</option>
          </select>
        </div>

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
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building2 size={11} /> {opp.organisation}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin size={11} /> {opp.location}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Calendar size={11} /> Closes {opp.closing}
                </p>
              </div>
              <a
                href={`/learner/opportunities/${opp.id}`}
                className="w-full text-center py-2 rounded-sm text-xs font-semibold border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                View Details
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No opportunities match your search.</p>
          </div>
        )}
      </PageWrapper>
    </>
  );
}
