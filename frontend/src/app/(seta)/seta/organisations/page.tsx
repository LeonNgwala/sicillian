"use client";

import { useState, useCallback } from "react";
import {
  Loader2, CheckCircle2, XCircle, Building2, Clock, BadgeCheck,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { OrganisationProfile } from "@/types";

type Tab = "pending" | "active";

const ORG_TYPE_LABELS: Record<string, string> = {
  employer: "Employer",
  institution: "Institution",
  incubator: "Incubator",
  seta: "SETA",
};
const ORG_TYPE_COLORS: Record<string, string> = {
  employer: "bg-blue-50 text-blue-700 border-blue-200",
  institution: "bg-purple-50 text-purple-700 border-purple-200",
  incubator: "bg-amber-50 text-amber-700 border-amber-200",
  seta: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function OrganisationsPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [actioning, setActioning] = useState<Record<number, "approving" | "rejecting">>({});
  const [done, setDone] = useState<Record<number, "approved" | "rejected">>({});
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: pending, loading: pendingLoading, refetch: refetchPending } =
    useApi<OrganisationProfile[]>("/admin/organisations/pending/");
  const { data: active, loading: activeLoading, refetch: refetchActive } =
    useApi<OrganisationProfile[]>("/organisations/");

  const handleAction = useCallback(async (org: OrganisationProfile, type: "approve" | "reject") => {
    setActioning(prev => ({ ...prev, [org.id]: type === "approve" ? "approving" : "rejecting" }));
    try {
      await api.patch(`/admin/organisations/${org.id}/${type}/`, {});
      setDone(prev => ({ ...prev, [org.id]: type === "approve" ? "approved" : "rejected" }));
      setTimeout(() => { refetchPending(); refetchActive(); }, 1200);
    } catch { /* noop */ } finally {
      setActioning(prev => { const n = { ...prev }; delete n[org.id]; return n; });
    }
  }, [refetchPending, refetchActive]);

  const pendingCount = pending?.length ?? 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Organisations</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review and manage B2B registrations</p>
        </div>
        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> {pendingCount} pending
          </span>
        )}
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {(["pending", "active"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${tab === t ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t === "pending" ? "Pending Approval" : "Approved Orgs"}
            {t === "pending" && pendingCount > 0 && (
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tab === t ? "bg-amber-100 text-amber-700" : "bg-gray-200 text-gray-600"}`}>{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {tab === "pending" && (
        pendingLoading ? <LoadingState /> :
        pendingCount === 0 ? <EmptyState icon={<CheckCircle2 size={32} className="text-emerald-400" />} title="All caught up" sub="No organisations awaiting approval." /> :
        <div className="space-y-3">
          {pending!.map(org => (
            <OrgCard key={org.id} org={org} expanded={expanded === org.id}
              onToggle={() => setExpanded(expanded === org.id ? null : org.id)}
              actionState={actioning[org.id]} doneState={done[org.id]} showActions
              onApprove={() => handleAction(org, "approve")}
              onReject={() => handleAction(org, "reject")} />
          ))}
        </div>
      )}

      {tab === "active" && (
        activeLoading ? <LoadingState /> :
        !active?.length ? <EmptyState icon={<Building2 size={32} className="text-slate-300" />} title="No approved organisations" sub="Approved organisations will appear here." /> :
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {Object.entries(active.reduce<Record<string, number>>((a, o) => ({ ...a, [o.org_type]: (a[o.org_type] ?? 0) + 1 }), {})).map(([type, count]) => (
              <span key={type} className={`text-xs px-2.5 py-1 rounded border font-medium ${ORG_TYPE_COLORS[type] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                {ORG_TYPE_LABELS[type] ?? type}: {count}
              </span>
            ))}
          </div>
          {active.map(org => (
            <OrgCard key={org.id} org={org} expanded={expanded === org.id}
              onToggle={() => setExpanded(expanded === org.id ? null : org.id)} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrgCard({ org, expanded, onToggle, showActions, actionState, doneState, onApprove, onReject }: {
  org: OrganisationProfile; expanded: boolean; onToggle: () => void; showActions: boolean;
  actionState?: "approving" | "rejecting"; doneState?: "approved" | "rejected";
  onApprove?: () => void; onReject?: () => void;
}) {
  const isDone = !!doneState;
  return (
    <div className={`bg-white rounded-lg border transition-colors ${isDone ? "border-emerald-200 opacity-60" : "border-gray-200"}`}>
      <div className="flex items-center gap-3 p-4 cursor-pointer select-none" onClick={onToggle}>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${ORG_TYPE_COLORS[org.org_type] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
          {ORG_TYPE_LABELS[org.org_type] ?? org.org_type}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{org.company_name}</p>
          <p className="text-xs text-slate-400 truncate">{org.user?.email}</p>
        </div>
        {doneState === "approved" && <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium shrink-0"><CheckCircle2 size={14} /> Approved</span>}
        {doneState === "rejected" && <span className="flex items-center gap-1 text-xs text-red-500 font-medium shrink-0"><XCircle size={14} /> Rejected</span>}
        {expanded ? <ChevronUp size={14} className="text-slate-400 shrink-0" /> : <ChevronDown size={14} className="text-slate-400 shrink-0" />}
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <Detail label="Contact person" value={org.contact_person || "—"} />
            <Detail label="Phone" value={org.user?.phone ?? "—"} />
            <Detail label="District" value={org.district || "—"} />
            <Detail label="Reg. number" value={org.registration_number || "—"} />
            {org.institution_type && <Detail label="Institution type" value={org.institution_type} />}
            <Detail label="Registered" value={new Date(org.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} />
            <Detail label="Payment" value={org.payment_status} />
          </div>
          {org.use_case && (
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Use case</p>
              <p className="text-xs text-slate-700 leading-relaxed">{org.use_case}</p>
            </div>
          )}
          {showActions && !isDone && (
            <div className="flex gap-2 pt-1">
              <button onClick={e => { e.stopPropagation(); onApprove?.(); }} disabled={!!actionState}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold text-white disabled:opacity-50"
                style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}>
                {actionState === "approving" ? <Loader2 size={12} className="animate-spin" /> : <BadgeCheck size={13} />}
                {actionState === "approving" ? "Approving…" : "Approve"}
              </button>
              <button onClick={e => { e.stopPropagation(); onReject?.(); }} disabled={!!actionState}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50">
                {actionState === "rejecting" ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={13} />}
                {actionState === "rejecting" ? "Rejecting…" : "Reject"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs text-slate-700 mt-0.5 capitalize">{value}</p>
    </div>
  );
}

function LoadingState() {
  return <div className="flex items-center justify-center py-16 text-slate-400 gap-2"><Loader2 size={18} className="animate-spin" /> Loading…</div>;
}
function EmptyState({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      {icon}
      <div><p className="text-sm font-semibold text-slate-700">{title}</p><p className="text-xs text-slate-400 mt-1">{sub}</p></div>
    </div>
  );
}
