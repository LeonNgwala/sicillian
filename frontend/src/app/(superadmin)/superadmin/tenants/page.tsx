"use client";

import { useState } from "react";
import { Plus, Loader2, ToggleLeft, ToggleRight, MapPin } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { Tenant } from "@/types";

export default function TenantsPage() {
  const { data: tenants, loading, refetch } = useApi<Tenant[]>("/tenants/");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function createTenant() {
    if (!name.trim() || !code.trim()) return;
    setCreating(true); setError("");
    try {
      await api.post("/tenants/", { name: name.trim(), province_code: code.trim().toUpperCase() });
      setName(""); setCode(""); refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create tenant");
    } finally { setCreating(false); }
  }

  async function toggleTenant(t: Tenant) {
    try { await api.patch(`/tenants/${t.id}/`, { is_active: !t.is_active }); refetch(); }
    catch { /* noop */ }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-bold text-slate-900">Tenants</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage province / region instances</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Create tenant</p>
        <div className="flex gap-2 flex-wrap">
          <input type="text" placeholder="Province name (e.g. Eastern Cape)" value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 min-w-48 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400" />
          <input type="text" placeholder="Code (e.g. EC)" value={code} maxLength={10}
            onChange={e => setCode(e.target.value)}
            className="w-28 bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-400" />
          <button onClick={createTenant} disabled={creating || !name.trim() || !code.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold text-white disabled:opacity-50"
            style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}>
            {creating ? <Loader2 size={12} className="animate-spin" /> : <Plus size={13} />}
            {creating ? "Creating…" : "Create"}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2"><Loader2 size={18} className="animate-spin" /> Loading…</div>
      ) : !tenants?.length ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <MapPin size={32} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">No tenants yet</p>
          <p className="text-xs text-slate-400">Create the first province instance above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
          {tenants.map(t => (
            <div key={t.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">
                {t.province_code}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">Created {new Date(t.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded border ${t.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                {t.is_active ? "Active" : "Inactive"}
              </span>
              <button onClick={() => toggleTenant(t)} title={t.is_active ? "Deactivate" : "Activate"}
                className="text-slate-400 hover:text-slate-600 transition-colors">
                {t.is_active ? <ToggleRight size={20} className="text-emerald-500" /> : <ToggleLeft size={20} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
