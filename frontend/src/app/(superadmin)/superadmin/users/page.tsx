"use client";

import { useState, useCallback } from "react";
import { Loader2, Search, ShieldOff, Shield } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types";

const STATUS_BADGE: Record<string, string> = {
  active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending:   "bg-amber-50 text-amber-700 border-amber-200",
  suspended: "bg-red-50 text-red-600 border-red-200",
};
const ROLE_BADGE: Record<string, string> = {
  SuperAdmin: "bg-slate-800 text-white border-slate-700",
  SETA:       "bg-cyan-50 text-cyan-700 border-cyan-200",
  Employer:   "bg-blue-50 text-blue-700 border-blue-200",
  Institution:"bg-purple-50 text-purple-700 border-purple-200",
  Incubator:  "bg-amber-50 text-amber-700 border-amber-200",
  Learner:    "bg-gray-100 text-gray-600 border-gray-200",
};

export default function UsersPage() {
  const { user: me } = useAuth();
  const { data: users, loading, refetch } = useApi<User[]>("/users/");
  const [search, setSearch] = useState("");
  const [actioning, setActioning] = useState<Record<number, "suspending" | "activating">>({});

  const handleSuspend = useCallback(async (u: User) => {
    setActioning(prev => ({ ...prev, [u.id]: "suspending" }));
    try { await api.patch(`/superadmin/users/${u.id}/suspend/`, {}); refetch(); }
    catch { /* noop */ }
    finally { setActioning(prev => { const n = { ...prev }; delete n[u.id]; return n; }); }
  }, [refetch]);

  const handleActivate = useCallback(async (u: User) => {
    setActioning(prev => ({ ...prev, [u.id]: "activating" }));
    try { await api.patch(`/superadmin/users/${u.id}/activate/`, {}); refetch(); }
    catch { /* noop */ }
    finally { setActioning(prev => { const n = { ...prev }; delete n[u.id]; return n; }); }
  }, [refetch]);

  if (loading) {
    return <div className="flex items-center justify-center py-16 text-slate-400 gap-2"><Loader2 size={18} className="animate-spin" /> Loading…</div>;
  }

  const filtered = (users ?? []).filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.first_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-slate-900">Users</h1>
        <p className="text-xs text-slate-500 mt-0.5">{users?.length ?? 0} total users</p>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search by name, email or role…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12">No users found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(u => {
              const isSelf = u.id === me?.id;
              const isSuperAdmin = u.role === "SuperAdmin";
              const act = actioning[u.id];
              return (
                <div key={u.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
                    {(u.first_name ?? u.email)[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {u.first_name ?? "—"}
                      {isSelf && <span className="ml-1 text-[10px] text-slate-400">(you)</span>}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{u.email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide shrink-0 ${ROLE_BADGE[u.role] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {u.role}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border capitalize shrink-0 ${STATUS_BADGE[u.account_status] ?? ""}`}>
                    {u.account_status}
                  </span>
                  {!isSelf && !isSuperAdmin && (
                    u.account_status !== "suspended" ? (
                      <button onClick={() => handleSuspend(u)} disabled={!!act} title="Suspend"
                        className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40">
                        {act === "suspending" ? <Loader2 size={14} className="animate-spin" /> : <ShieldOff size={14} />}
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(u)} disabled={!!act} title="Activate"
                        className="p-1.5 rounded text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-colors disabled:opacity-40">
                        {act === "activating" ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
                      </button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
