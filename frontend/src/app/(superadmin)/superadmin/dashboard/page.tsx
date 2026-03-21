"use client";

import { useApi } from "@/hooks/useApi";
import { Loader2, Users, Building2, BookOpen, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import type { User, OrganisationProfile, LearnerProfile, GapAlert, Tenant } from "@/types";

export default function SuperAdminDashboard() {
  const { data: users, loading } = useApi<User[]>("/users/");
  const { data: orgs } = useApi<OrganisationProfile[]>("/organisations/");
  const { data: pendingAll } = useApi<OrganisationProfile[]>("/admin/organisations/pending/");
  const { data: pendingSeta } = useApi<OrganisationProfile[]>("/superadmin/seta/pending/");
  const { data: learners } = useApi<LearnerProfile[]>("/learner-profiles/");
  const { data: alerts } = useApi<GapAlert[]>("/gap-alerts/");
  const { data: tenants } = useApi<Tenant[]>("/tenants/");

  if (loading) {
    return <div className="flex items-center justify-center py-16 text-slate-400 gap-2"><Loader2 size={18} className="animate-spin" /> Loading…</div>;
  }

  const activeUsers = users?.filter(u => u.account_status === "active").length ?? 0;
  const pendingUsers = users?.filter(u => u.account_status === "pending").length ?? 0;
  const suspendedUsers = users?.filter(u => u.account_status === "suspended").length ?? 0;
  const openAlerts = alerts?.filter(a => a.status === "open").length ?? 0;
  const activeTenants = tenants?.filter(t => t.is_active).length ?? 0;
  const totalPending = (pendingAll?.length ?? 0) + (pendingSeta?.length ?? 0);

  const stats = [
    { label: "Total Users",      value: users?.length ?? 0,  icon: Users,         color: "text-blue-600",   bg: "bg-blue-50"    },
    { label: "Active Users",     value: activeUsers,          icon: CheckCircle2,  color: "text-emerald-600",bg: "bg-emerald-50" },
    { label: "Pending Approval", value: totalPending,         icon: Clock,         color: "text-amber-600",  bg: "bg-amber-50"   },
    { label: "Organisations",    value: orgs?.length ?? 0,   icon: Building2,     color: "text-purple-600", bg: "bg-purple-50"  },
    { label: "Learners",         value: learners?.length ?? 0,icon: BookOpen,      color: "text-cyan-600",   bg: "bg-cyan-50"    },
    { label: "Open Gap Alerts",  value: openAlerts,           icon: AlertTriangle, color: "text-red-600",    bg: "bg-red-50"     },
  ];

  const roleCounts = users?.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1; return acc;
  }, {}) ?? {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900">Platform Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">SkillsGrid — Super Admin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className={`w-8 h-8 rounded ${s.bg} flex items-center justify-center mb-3`}>
                <Icon size={16} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm font-semibold text-slate-900 mb-3">Users by role</p>
          <div className="space-y-2">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{role}</span>
                <span className="text-xs font-semibold text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm font-semibold text-slate-900 mb-3">Account status</p>
          <div className="space-y-2">
            {[["Active", activeUsers, "text-emerald-600"], ["Pending", pendingUsers, "text-amber-600"], ["Suspended", suspendedUsers, "text-red-500"]].map(([label, count, color]) => (
              <div key={label as string} className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{label}</span>
                <span className={`text-xs font-semibold ${color}`}>{count}</span>
              </div>
            ))}
          </div>
          {activeTenants > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-slate-500">Active provinces: <span className="font-semibold text-slate-700">{activeTenants}</span></p>
            </div>
          )}
        </div>
      </div>

      {totalPending > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Action required</p>
            <p className="text-xs text-amber-700 mt-0.5">
              {pendingAll?.length ?? 0} B2B org{(pendingAll?.length ?? 0) !== 1 ? "s" : ""} and {pendingSeta?.length ?? 0} SETA{(pendingSeta?.length ?? 0) !== 1 ? "s" : ""} awaiting approval.{" "}
              <a href="/superadmin/organisations" className="underline font-medium">Review now</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
