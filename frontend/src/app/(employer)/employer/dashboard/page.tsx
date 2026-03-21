"use client";

import { ArrowUpRight } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import type { Opportunity, Match, LearnerProfile } from "@/types";

function fitColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    active:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    closed:  "bg-gray-100 text-gray-500 border-gray-200",
    filled:  "bg-gray-100 text-gray-500 border-gray-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${map[status] ?? "bg-gray-100 text-gray-500 border-gray-200"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { data: allOpps }     = useApi<Opportunity[]>("/opportunities/");
  const { data: allMatches }  = useApi<Match[]>("/matches/");
  const { data: profiles }    = useApi<LearnerProfile[]>("/learner-profiles/");

  // Filter to this employer's opportunities
  const myOpps = (allOpps ?? []).filter(o => o.employer === user?.id);
  const myOppIds = new Set(myOpps.map(o => o.id));

  // Matches for this employer's opportunities
  const myMatches = (allMatches ?? [])
    .filter(m => myOppIds.has(m.opportunity))
    .sort((a, b) => b.fit_score - a.fit_score);

  const profileMap = new Map((profiles ?? []).map(p => [p.id, p]));
  const oppMap     = new Map(myOpps.map(o => [o.id, o]));

  const openOpps  = myOpps.filter(o => o.status === "open").length;
  const avgFit    = myMatches.length
    ? Math.round(myMatches.reduce((s, m) => s + m.fit_score, 0) / myMatches.length)
    : 0;

  const orgName = user?.first_name ?? "Your Organisation";

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{orgName}</p>
        <h1 className="text-xl font-bold text-slate-900">Candidate Inbox</h1>
        <p className="text-sm text-gray-400 mt-0.5">AI-matched candidates and active listings overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active Listings</p>
          <p className="text-2xl font-bold text-slate-900">{openOpps}</p>
          <p className="text-xs text-gray-400">{myOpps.length} total</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">AI Matches</p>
          <p className="text-2xl font-bold text-slate-900">{myMatches.length}</p>
          <p className="text-xs text-gray-400">across all listings</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Avg Fit Score</p>
          <p className="text-2xl font-bold text-slate-900">{avgFit > 0 ? `${avgFit}%` : "—"}</p>
          <p className="text-xs text-gray-400">AI matched</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Spots Available</p>
          <p className="text-2xl font-bold text-slate-900">
            {myOpps.reduce((s, o) => s + o.spots_available, 0)}
          </p>
          <p className="text-xs text-gray-400">total open spots</p>
        </div>
      </div>

      {/* Active Listings */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Active listings</p>
          <a href="/employer/opportunities" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            Manage <ArrowUpRight size={11} />
          </a>
        </div>
        {myOpps.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No listings yet. <a href="/employer/post-opportunity" className="text-emerald-600 hover:underline">Post one</a></p>
        ) : (
          <div className="divide-y divide-gray-50">
            {myOpps.map(o => {
              const matchCount = myMatches.filter(m => m.opportunity === o.id).length;
              return (
                <div key={o.id} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{o.title}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0 flex-wrap justify-end">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200 capitalize">{o.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{o.spots_available} spots</span>
                    <StatusBadge status={o.status} />
                    <span className="text-xs text-gray-400">{matchCount} match{matchCount !== 1 ? "es" : ""}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Matched Candidates */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">AI matched candidates</p>
          <a href="/employer/candidates" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={11} />
          </a>
        </div>
        {myMatches.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No matches yet. Post a listing to start getting matched candidates.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {myMatches.slice(0, 8).map(m => {
              const profile = profileMap.get(m.learner);
              const opp     = oppMap.get(m.opportunity);
              const initials = profile
                ? profile.qualification.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
                : "?";
              return (
                <div key={m.id} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                      style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {profile?.qualification ?? `Learner #${m.learner}`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {profile ? `NQF ${profile.nqf_level} · ${profile.district}` : ""}
                        {opp ? ` · ${opp.title}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className={`text-sm font-bold ${fitColor(m.fit_score)}`}>{m.fit_score}%</span>
                    <span className="text-xs text-gray-400 hidden sm:block">fit</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
