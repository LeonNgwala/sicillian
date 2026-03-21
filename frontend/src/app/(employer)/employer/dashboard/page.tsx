"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import type { Opportunity, Match, LearnerProfile } from "@/types";

// ── Demo data ───────────────────────────────────────────────────────────────

const EMPLOYER_DEMO_EMAIL = "employer@demo.co.za";

const DEMO_OPPS = [
  { id: 1, title: "Junior Python Developer",  type: "internship",  district: "Nelson Mandela Bay", nqf_required: 6, skills_required: ["Python", "SQL", "Django"], stipend: 8000,  spots_available: 2, status: "open" },
  { id: 2, title: "Data Analyst Learnership", type: "learnership", district: "Nelson Mandela Bay", nqf_required: 5, skills_required: ["SQL", "Excel", "Data Analysis"], stipend: 6000, spots_available: 3, status: "open" },
  { id: 3, title: "IT Support Technician",    type: "job",          district: "Buffalo City",       nqf_required: 4, skills_required: ["Networking", "Windows", "Hardware"], stipend: 12000, spots_available: 1, status: "open" },
];

const DEMO_CANDIDATES = [
  { id: 901, name: "Vuyo Mkhize",    initials: "VM", nqf: "6", district: "Nelson Mandela Bay", fit: 100, opp: "Junior Python Developer",  skills: ["Python", "SQL", "Django", "Excel", "Git"],  highlight: true  },
  { id: 902, name: "Thabo Mokoena", initials: "TM", nqf: "6", district: "Nelson Mandela Bay", fit: 100, opp: "Junior Python Developer",  skills: ["Python", "SQL", "Django", "Git"],            highlight: false },
  { id: 903, name: "Naledi Dlamini",initials: "ND", nqf: "5", district: "Nelson Mandela Bay", fit: 100, opp: "Data Analyst Learnership", skills: ["SQL", "Excel", "Data Analysis", "Power BI"], highlight: false },
  { id: 904, name: "Sipho Ndlovu",  initials: "SN", nqf: "4", district: "Buffalo City",        fit: 100, opp: "IT Support Technician",   skills: ["Networking", "Windows", "Hardware"],         highlight: false },
  { id: 905, name: "Gana Mthembu",  initials: "GM", nqf: "7", district: "Nelson Mandela Bay", fit:  80, opp: "Junior Python Developer",  skills: ["Python", "SQL"],                             highlight: true  },
  { id: 906, name: "Vuyo Mkhize",   initials: "VM", nqf: "6", district: "Nelson Mandela Bay", fit: 100, opp: "Data Analyst Learnership", skills: ["SQL", "Data Analysis", "Excel", "Git"],      highlight: true  },
  { id: 907, name: "Gana Mthembu",  initials: "GM", nqf: "7", district: "Nelson Mandela Bay", fit:  60, opp: "Data Analyst Learnership", skills: ["SQL"],                                       highlight: true  },
  { id: 908, name: "Naledi Dlamini",initials: "ND", nqf: "5", district: "Nelson Mandela Bay", fit:  40, opp: "Junior Python Developer",  skills: ["SQL"],                                       highlight: false },
];

const OPP_TITLES = ["All listings", ...DEMO_OPPS.map(o => o.title)];

// ── Helpers ─────────────────────────────────────────────────────────────────

function fitColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open:    "bg-emerald-50 text-emerald-700 border-emerald-200",
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

function Pills({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map(o => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            value === o
              ? "border-emerald-400 text-emerald-700 bg-emerald-50"
              : "border-gray-200 text-gray-500 bg-white hover:border-gray-300"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function EmployerDashboard() {
  const { user } = useAuth();
  const isDemo = user?.email === EMPLOYER_DEMO_EMAIL;

  const { data: allOpps }     = useApi<Opportunity[]>(isDemo ? null : "/opportunities/");
  const { data: allMatches }  = useApi<Match[]>(isDemo ? null : "/matches/");
  const { data: profiles }    = useApi<LearnerProfile[]>(isDemo ? null : "/learner-profiles/");

  // Filter state
  const [oppFilter, setOppFilter] = useState("All listings");
  const [fitFilter, setFitFilter] = useState("All");
  const [sortDir,   setSortDir]   = useState<"desc" | "asc">("desc");
  const [typeFilter, setTypeFilter] = useState("All");

  // Compute filtered data (before any conditional returns — no hooks inside if)
  let filteredCandidates = DEMO_CANDIDATES as typeof DEMO_CANDIDATES;
  if (oppFilter !== "All listings") filteredCandidates = filteredCandidates.filter(c => c.opp === oppFilter);
  if (fitFilter === "80%+")         filteredCandidates = filteredCandidates.filter(c => c.fit >= 80);
  else if (fitFilter === "60%+")    filteredCandidates = filteredCandidates.filter(c => c.fit >= 60);
  filteredCandidates = [...filteredCandidates].sort((a, b) => sortDir === "desc" ? b.fit - a.fit : a.fit - b.fit);

  const filteredOpps = typeFilter === "All" ? DEMO_OPPS : DEMO_OPPS.filter(o => o.type === typeFilter);

  // ── Demo branch ─────────────────────────────────────────────────────────
  if (isDemo) {

    const avgFit = DEMO_CANDIDATES.length
      ? Math.round(DEMO_CANDIDATES.reduce((s, c) => s + c.fit, 0) / DEMO_CANDIDATES.length)
      : 0;

    return (
      <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
        <div className="border-b border-gray-200 pb-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">TechCorp Eastern Cape</p>
          <h1 className="text-xl font-bold text-slate-900">Candidate Inbox</h1>
          <p className="text-sm text-gray-400 mt-0.5">AI-matched candidates and active listings overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
          {[
            { label: "Active Listings", val: DEMO_OPPS.length, sub: `${DEMO_OPPS.length} total` },
            { label: "AI Matches",      val: DEMO_CANDIDATES.length, sub: "across all listings" },
            { label: "Avg Fit Score",   val: `${avgFit}%`, sub: "AI matched" },
            { label: "Spots Available", val: DEMO_OPPS.reduce((s, o) => s + o.spots_available, 0), sub: "total open spots" },
          ].map(({ label, val, sub }) => (
            <div key={label} className="bg-white px-4 py-3">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{val}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* Active Listings */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Active listings</p>
            <a href="/employer/opportunities" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              Manage <ArrowUpRight size={11} />
            </a>
          </div>
          {/* Listing filter */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-400">Type:</span>
            <Pills
              options={["All", "internship", "learnership", "job"]}
              value={typeFilter}
              onChange={setTypeFilter}
            />
          </div>
          <div className="divide-y divide-gray-50">
            {filteredOpps.map(o => {
              const matchCount = DEMO_CANDIDATES.filter(c => c.opp === o.title).length;
              return (
                <div key={o.id} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{o.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{o.district} · NQF {o.nqf_required}+ · R{o.stipend.toLocaleString()}/mo</p>
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
        </div>

        {/* AI Matched Candidates */}
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900">AI matched candidates</p>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                <Sparkles size={10} /> AI scored
              </span>
            </div>
            <a href="/employer/candidates" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight size={11} />
            </a>
          </div>

          {/* Candidate filters */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Listing:</span>
              <Pills options={OPP_TITLES} value={oppFilter} onChange={setOppFilter} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Min fit:</span>
              <Pills options={["All", "60%+", "80%+"]} value={fitFilter} onChange={setFitFilter} />
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
            {filteredCandidates.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No candidates match these filters.</p>
            ) : filteredCandidates.map(c => (
              <div key={c.id} className={`flex items-center justify-between px-4 py-3 ${c.highlight ? "bg-emerald-50/40" : ""}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0"
                    style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}
                  >
                    {c.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 flex items-center gap-1.5">
                      {c.name}
                      {c.highlight && <Sparkles size={11} className="text-emerald-500" />}
                    </p>
                    <p className="text-xs text-gray-400">NQF {c.nqf} · {c.district} · {c.opp}</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {c.skills.slice(0, 3).map(s => (
                        <span key={s} className="text-[10px] px-1.5 py-0 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <span className={`text-sm font-bold ${fitColor(c.fit)}`}>{c.fit}%</span>
                  <span className="text-xs text-gray-400 hidden sm:block">fit</span>
                </div>
              </div>
            ))}
          </div>
          {filteredCandidates.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-400">{filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""} shown</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Real data branch ─────────────────────────────────────────────────────

  const myOpps = (allOpps ?? []).filter(o => o.employer === user?.id);
  const myOppIds = new Set(myOpps.map(o => o.id));
  const myMatches = (allMatches ?? [])
    .filter(m => myOppIds.has(m.opportunity))
    .sort((a, b) => b.fit_score - a.fit_score);

  const profileMap = new Map((profiles ?? []).map(p => [p.id, p]));
  const oppMap     = new Map(myOpps.map(o => [o.id, o]));
  const openOpps   = myOpps.filter(o => o.status === "open").length;
  const avgFit     = myMatches.length
    ? Math.round(myMatches.reduce((s, m) => s + m.fit_score, 0) / myMatches.length) : 0;
  const orgName = user?.first_name ?? "Your Organisation";

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{orgName}</p>
        <h1 className="text-xl font-bold text-slate-900">Candidate Inbox</h1>
        <p className="text-sm text-gray-400 mt-0.5">AI-matched candidates and active listings overview</p>
      </div>

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
          <p className="text-2xl font-bold text-slate-900">{myOpps.reduce((s, o) => s + o.spots_available, 0)}</p>
          <p className="text-xs text-gray-400">total open spots</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Active listings</p>
          <a href="/employer/opportunities" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">Manage <ArrowUpRight size={11} /></a>
        </div>
        {myOpps.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No listings yet. <a href="/employer/post-opportunity" className="text-emerald-600 hover:underline">Post one</a></p>
        ) : (
          <div className="divide-y divide-gray-50">
            {myOpps.map(o => {
              const matchCount = myMatches.filter(m => m.opportunity === o.id).length;
              return (
                <div key={o.id} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-900">{o.title}</p></div>
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

      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">AI matched candidates</p>
          <a href="/employer/candidates" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">View all <ArrowUpRight size={11} /></a>
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-slate-900 shrink-0" style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{profile?.qualification ?? `Learner #${m.learner}`}</p>
                      <p className="text-xs text-gray-400">{profile ? `NQF ${profile.nqf_level} · ${profile.district}` : ""}{opp ? ` · ${opp.title}` : ""}</p>
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
