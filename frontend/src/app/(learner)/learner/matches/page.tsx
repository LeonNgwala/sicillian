"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import type { Match, Opportunity } from "@/types";

// ── Vuyo demo data ─────────────────────────────────────────────────────────

const VUYO_EMAIL = "vuyo@demo.co.za";

const VUYO_MATCHES = [
  {
    id: 901,
    opportunity: 1,
    fit_score: 100,
    ai_reason: "Matches all 3 required skills: Python, SQL, Django. Located in the same district (Nelson Mandela Bay). NQF Level 6 meets or exceeds requirements.",
    matched_at: new Date().toISOString(),
    opp: {
      id: 1,
      title: "Junior Python Developer",
      type: "internship",
      district: "Nelson Mandela Bay",
      nqf_required: 6,
      skills_required: ["Python", "SQL", "Django"],
      stipend: 8000,
      spots_available: 2,
      status: "open",
    },
  },
  {
    id: 902,
    opportunity: 2,
    fit_score: 100,
    ai_reason: "Matches all 3 required skills: SQL, Excel, Data Analysis. Located in the same district (Nelson Mandela Bay). NQF Level 6 meets or exceeds requirements.",
    matched_at: new Date().toISOString(),
    opp: {
      id: 2,
      title: "Data Analyst Learnership",
      type: "learnership",
      district: "Nelson Mandela Bay",
      nqf_required: 5,
      skills_required: ["SQL", "Excel", "Data Analysis"],
      stipend: 6000,
      spots_available: 3,
      status: "open",
    },
  },
  {
    id: 903,
    opportunity: 3,
    fit_score: 60,
    ai_reason: "No direct skill matches for Networking, Windows, Hardware. Located in Nelson Mandela Bay (Opportunity is in Buffalo City). NQF Level 6 meets requirements.",
    matched_at: new Date().toISOString(),
    opp: {
      id: 3,
      title: "IT Support Technician",
      type: "job",
      district: "Buffalo City",
      nqf_required: 4,
      skills_required: ["Networking", "Windows", "Hardware"],
      stipend: 12000,
      spots_available: 1,
      status: "open",
    },
  },
];

// ── Components ─────────────────────────────────────────────────────────────

function FitBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? "bg-emerald-100 text-emerald-700 border-emerald-200"
    : score >= 70 ? "bg-cyan-100 text-cyan-700 border-cyan-200"
    : "bg-amber-100 text-amber-700 border-amber-200";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${color}`}>
      {score}% fit
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function MatchesPage() {
  const { user } = useAuth();
  const isVuyo = user?.email === VUYO_EMAIL;

  // Only hit the API for non-Vuyo users
  const { data: matches, loading, refetch } = useApi<Match[]>(isVuyo ? null : "/matches/");
  const { data: opportunities } = useApi<Opportunity[]>(isVuyo ? null : "/opportunities/");

  const [running, setRunning] = useState(false);
  const [runMsg, setRunMsg] = useState("");

  async function runMatching() {
    setRunning(true);
    setRunMsg("");
    try {
      const res = await api.post<{ matches_found: number; message: string }>("/matches/run/", {});
      setRunMsg(`${res.matches_found} match${res.matches_found !== 1 ? "es" : ""} found`);
      refetch();
    } catch (e) {
      setRunMsg(e instanceof Error ? e.message : "Failed to run matching");
    } finally {
      setRunning(false);
    }
  }

  // ── Vuyo branch ──────────────────────────────────────────────────────────
  if (isVuyo) {
    const sorted = VUYO_MATCHES;
    const avgFit = Math.round(sorted.reduce((s, m) => s + m.fit_score, 0) / sorted.length);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
          <div className="bg-[#f7f7f5] px-3 py-3">
            <p className="text-xs text-gray-400 mb-1">Matches found</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{sorted.length}</p>
            <p className="text-xs text-gray-400">AI matched</p>
          </div>
          <div className="bg-[#f7f7f5] px-3 py-3">
            <p className="text-xs text-gray-400 mb-1">Avg fit score</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{avgFit}%</p>
            <p className="text-xs text-gray-400">across all matches</p>
          </div>
          <div className="bg-[#f7f7f5] px-3 py-3">
            <p className="text-xs text-gray-400 mb-1">Top match</p>
            <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{sorted[0].fit_score}%</p>
            <p className="text-xs text-gray-400">best fit score</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Top matches for you</p>
        </div>

        <div className="space-y-3">
          {sorted.map((m) => (
            <div key={m.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{m.opp.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {m.opp.type.charAt(0).toUpperCase() + m.opp.type.slice(1)} · {m.opp.district}
                  </p>
                </div>
                <FitBadge score={m.fit_score} />
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                  NQF {m.opp.nqf_required}+
                </span>
                {m.opp.stipend && (
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                    R{m.opp.stipend.toLocaleString()}/month
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                  {m.opp.spots_available} spot{m.opp.spots_available !== 1 ? "s" : ""} left
                </span>
                {m.opp.skills_required.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                ))}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-medium text-gray-500">AI reason: </span>
                {m.ai_reason}
              </p>

              <a
                href="/learner/opportunities"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
              >
                {m.fit_score >= 80 ? "Apply now" : "View details"} <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Real data branch ─────────────────────────────────────────────────────
  const oppMap = new Map(opportunities?.map(o => [o.id, o]) ?? []);
  const sorted = [...(matches ?? [])].sort((a, b) => b.fit_score - a.fit_score);
  const avgFit = sorted.length
    ? Math.round(sorted.reduce((s, m) => s + m.fit_score, 0) / sorted.length)
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-lg overflow-hidden">
        <div className="bg-[#f7f7f5] px-3 py-3">
          <p className="text-xs text-gray-400 mb-1">Matches found</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{loading ? "—" : sorted.length}</p>
          <p className="text-xs text-gray-400">AI matched</p>
        </div>
        <div className="bg-[#f7f7f5] px-3 py-3">
          <p className="text-xs text-gray-400 mb-1">Avg fit score</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">{loading ? "—" : `${avgFit}%`}</p>
          <p className="text-xs text-gray-400">across all matches</p>
        </div>
        <div className="bg-[#f7f7f5] px-3 py-3">
          <p className="text-xs text-gray-400 mb-1">Top match</p>
          <p className="text-2xl font-bold text-slate-900 leading-none mb-1">
            {loading ? "—" : sorted[0] ? `${sorted[0].fit_score}%` : "—"}
          </p>
          <p className="text-xs text-gray-400">best fit score</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Top matches for you</p>
        <button
          onClick={runMatching}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white disabled:opacity-60 transition-opacity"
          style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
        >
          {running
            ? <><Loader2 size={12} className="animate-spin" /> Running…</>
            : <><RefreshCw size={12} /> Run matching</>}
        </button>
      </div>

      {runMsg && (
        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
          <Sparkles size={12} /> {runMsg}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 size={18} className="animate-spin" /> Loading matches…
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Sparkles size={32} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">No matches yet</p>
          <p className="text-xs text-slate-400">Tap "Run matching" to find opportunities that fit your profile.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((m) => {
            const opp = oppMap.get(m.opportunity);
            return (
              <div key={m.id} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm leading-snug">
                      {opp?.title ?? `Opportunity #${m.opportunity}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {opp ? `${opp.type.charAt(0).toUpperCase() + opp.type.slice(1)} · ${opp.district}` : ""}
                    </p>
                  </div>
                  <FitBadge score={m.fit_score} />
                </div>
                {opp && (
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">NQF {opp.nqf_required}+</span>
                    {opp.stipend && <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">R{opp.stipend.toLocaleString()}/month</span>}
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{opp.spots_available} spot{opp.spots_available !== 1 ? "s" : ""} left</span>
                    {opp.skills_required.slice(0, 3).map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="font-medium text-gray-500">AI reason: </span>{m.ai_reason}
                </p>
                <a href="/learner/opportunities" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-gray-300 text-xs font-medium text-slate-700 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
                  {m.fit_score >= 80 ? "Apply now" : "View details"} <ArrowUpRight size={12} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
