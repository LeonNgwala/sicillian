"use client";

import { useState, useCallback } from "react";
import { Loader2, CheckCircle2, XCircle, Clock, BadgeCheck, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { OrganisationProfile } from "@/types";

type Tab = "seta" | "orgs" | "all";

const ORG_TYPE_LABELS: Record<string, string> = {
  employer: "Employer", institution: "Institution", incubator: "Incubator", seta: "SETA",
};
const ORG_TYPE_COLORS: Record<string, string> = {
  employer: "bg-blue-50 text-blue-700 border-blue-200",
  institution: "bg-purple-50 text-purple-700 border-purple-200",
  incubator: "bg-amber-50 text-amber-700 border-amber-200",
  seta: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function SuperAdminOrganisationsPage() {
  const [tab, setTab] = useState<Tab>("seta");
  const [actioning, setActioning] = useState<Record<number, "approving" | "rejecting">>({});
  const [done, setDone] = useState<Record<number, "approved" | "rejected">>({});
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: pendingSeta, loading: setaLoading, refetch: refetchSeta } =
    useApi<OrganisationProfile[]>("/superadmin/seta/pending/");
  const { data: pendingOrgs, loading: orgsLoading, refetch: refetchOrgs } =
    useApi<OrganisationProfile[]>("/admin/organisations/pending/");
  const { data: allOrgs, loading: allLoading } =
    useApi<OrganisationProfile[]>("/organisations/");

  const action = useCallback(async (org: OrganisationProfile, type: "approve" | "reject") => {
    const endpoint = org.org_type === "seta"
      ? `/superadmin/seta/${org.id}/${type}/`
      : `/admin/organisations/${org.id}/${type}/`;
    setActioning(prev => ({ ...prev, [org.id]: type === "approve" ? "approving" : "rejecting" }));
    try {
      await api.patch(endpoint, {});
      setDone(prev => ({ ...prev, [org.id]: type === "approve" ? "approved" : "rejected" }));
      setTimeout(() => { refetchSeta(); refetchOrgs(); }, 1200);
    } catch { /* noop */ } finally {
      setActioning(prev => { const n = { ...prev }; delete n[org.id]; return n; });
    }
  }, [refetchSeta, refetchOrgs]);

  const setaCount = pendingSeta?.length ?? 0;
  const orgsCount = pendingOrgs?.length ?? 0;

  const tabs: { key: Tab; label: string; count?: number; icon?: React.ReactNode }[] = [
    { key: "seta", label: "Pending SETAs", count: setaCount, icon: <ShieldCheck size={11} /> },
    { key: "orgs", label: "Pending B2B", count: orgsCount },
    { key: "all", label: "All Approved" },
  ];

  const loading = tab === "seta" ? setaLoading : tab === "orgs" ? orgsLoading : allLoading;
  const items = tab === "seta" ? pendingSeta : tab === "orgs" ? pendingOrgs : allOrgs;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Organisations</h1>
          <p className="text-xs text-slate-500 mt-0.5">Approve registrations and manage all orgs</p>
        </div>
        {(setaCount + orgsCount) > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> {setaCount + orgsCount} pending
          </span>
        )}
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded text-xs font-semibold transition-all flex items-center gap-1.5 ${tab === t.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t.icon}{t.label}
            {t.count != null && t.count > 0 && (
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${tab === t.key ? "bg-amber-100 text-amber-700" : "bg-gray-200 text-gray-600"}`}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : !items?.length ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <CheckCircle2 size={32} className="text-emerald-400" />
          <p className="text-sm font-semibold text-slate-700">Nothing here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(org => (
            <OrgCard key={org.id} org={org} expanded={expanded === org.id}
              onToggle={() => setExpanded(expanded === org.id ? null : org.id)}
              actionState={actioning[org.id]} doneState={done[org.id]}
              showActions={tab !== "all"}
              onApprove={() => action(org, "approve")}
              onReject={() => action(org, "reject")} />
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
            <Detail label="Contact" value={org.contact_person || "—"} />
            <Detail label="Phone" value={org.user?.phone ?? "—"} />
            <Detail label="Province" value={org.user?.province ?? "—"} />
            <Detail label="District" value={org.district || "—"} />
            <Detail label="Reg. number" value={org.registration_number || "—"} />
            <Detail label="Payment" value={org.payment_status} />
            {org.institution_type && <Detail label="Institution type" value={org.institution_type} />}
            <Detail label="Registered" value={new Date(org.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })} />
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
