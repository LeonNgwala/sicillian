"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const INCUBATOR_DEMO_EMAIL = "incubator@demo.co.za";

// ── Demo data ───────────────────────────────────────────────────────────────

const DEMO_PROGRAMMES = [
  { id: 1, name: "Agri-Tech Startup Accelerator", sector: "Agriculture",       enrolled: 9,  spotsLeft: 3,  mentor: "Dr. Nadia Osman",  status: "active"  },
  { id: 2, name: "Township Retail Incubator",      sector: "Retail",            enrolled: 14, spotsLeft: 0,  mentor: "Bongani Khumalo",  status: "active"  },
  { id: 3, name: "ICT Founders Bootcamp",          sector: "ICT",               enrolled: 8,  spotsLeft: 2,  mentor: "Sipho Mthembu",    status: "active"  },
  { id: 4, name: "Women in Business Programme",    sector: "Business Services", enrolled: 12, spotsLeft: 5,  mentor: "Nomsa Dlamini",    status: "active"  },
  { id: 5, name: "Green Economy Incubator",        sector: "Sustainability",    enrolled: 0,  spotsLeft: 10, mentor: "TBD",               status: "pending" },
  { id: 6, name: "Creative Industries Hub",        sector: "Creative Economy",  enrolled: 5,  spotsLeft: 4,  mentor: "Thandi Nkosi",     status: "active"  },
];

const DEMO_SESSIONS = [
  { id: 1, title: "Pitch Night — Agri-Tech Cohort",        date: "25 Mar 2026", mentor: "Dr. Nadia Osman",  type: "Pitch"    },
  { id: 2, title: "Mentor Session: Financial Modelling",   date: "27 Mar 2026", mentor: "Bongani Khumalo",  type: "Workshop" },
  { id: 3, title: "ICT Bootcamp Week 3 Kickoff",           date: "1 Apr 2026",  mentor: "Sipho Mthembu",    type: "Session"  },
  { id: 4, title: "Eastern Cape Startup Expo",             date: "15 Apr 2026", mentor: "All mentors",      type: "Expo"     },
];

const DEMO_METRICS = [
  { label: "Entrepreneurs graduated", value: 47, sub: "all-time completions" },
  { label: "Active businesses",       value: 31, sub: "post-programme" },
  { label: "Jobs created",            value: 94, sub: "by alumni" },
  { label: "Avg revenue growth",      value: "38%", sub: "6 months post-programme" },
];

const maxEnrolled = Math.max(...DEMO_PROGRAMMES.map(p => p.enrolled));

// ── Helpers ──────────────────────────────────────────────────────────────────

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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function IncubatorDashboard() {
  const { user } = useAuth();
  const isDemo = user?.email === INCUBATOR_DEMO_EMAIL;

  const activeProgs  = DEMO_PROGRAMMES.filter(p => p.status === "active");
  const totalEnrolled = DEMO_PROGRAMMES.reduce((s, p) => s + p.enrolled, 0);
  const totalSpots   = DEMO_PROGRAMMES.reduce((s, p) => s + p.spotsLeft, 0);

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          {isDemo ? "Propella Business Incubator · Gqeberha" : (user?.first_name ?? "Incubator")}
        </p>
        <h1 className="text-xl font-bold text-slate-900">Incubator Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Programme activity and upcoming sessions overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Active Programmes</p>
          <p className="text-2xl font-bold text-slate-900">{activeProgs.length}</p>
          <p className="text-xs text-gray-400">currently running</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Enrolled Entrepreneurs</p>
          <p className="text-2xl font-bold text-slate-900">{totalEnrolled}</p>
          <p className="text-xs text-gray-400">across all programmes</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Open Spots</p>
          <p className="text-2xl font-bold text-slate-900">{totalSpots}</p>
          <p className="text-xs text-gray-400">available now</p>
        </div>
      </div>

      {/* Impact metrics — demo only */}
      {isDemo && (
        <div className="bg-white border border-gray-200 rounded">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-900">Impact metrics</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              <Sparkles size={10} /> All-time
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
            {DEMO_METRICS.map(m => (
              <div key={m.label} className="bg-white px-4 py-3">
                <p className="text-2xl font-bold text-slate-900">{m.value}</p>
                <p className="text-xs font-medium text-slate-700 mt-0.5">{m.label}</p>
                <p className="text-xs text-gray-400">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enrolment chart */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Enrolment by programme</p>
        </div>
        <div className="px-4 py-4 space-y-3">
          {DEMO_PROGRAMMES.map(p => (
            <div key={p.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium truncate max-w-[55%]">{p.name}</span>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{p.enrolled} enrolled</span>
                  {p.spotsLeft > 0
                    ? <span className="text-emerald-600 font-medium">{p.spotsLeft} spots left</span>
                    : <span className="text-red-500 font-medium">Full</span>}
                </div>
              </div>
              <div className="flex gap-1 h-2.5">
                {p.enrolled > 0 && (
                  <div className="rounded-l overflow-hidden transition-all duration-500"
                    style={{ width: `${(p.enrolled / (p.enrolled + p.spotsLeft)) * 100}%`, background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
                  />
                )}
                {p.spotsLeft > 0 && (
                  <div className="bg-gray-100 rounded-r flex-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active programmes list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Active programmes</p>
          <a href="/incubator/programmes" className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={11} />
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {activeProgs.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{p.sector}</span>
                  <span className="text-xs text-gray-400">{p.enrolled} enrolled</span>
                  <span className="text-xs text-gray-400">Mentor: {p.mentor}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <StatusBadge status={p.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming sessions */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Upcoming sessions</p>
        </div>
        <div className="divide-y divide-gray-50">
          {DEMO_SESSIONS.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{s.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.date} · {s.mentor}</p>
              </div>
              <div className="ml-4 shrink-0">
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
