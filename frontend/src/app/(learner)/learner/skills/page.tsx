"use client";

import { useState } from "react";
import { Plus, X, Loader2, CheckCircle2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import type { LearnerProfile } from "@/types";

export default function SkillsPage() {
  const { data: profiles, loading, refetch } = useApi<LearnerProfile[]>("/learner-profiles/");
  const profile = (profiles ?? [])[0] ?? null;

  const [input, setInput]     = useState("");
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState("");
  // local additions before save
  const [pending, setPending] = useState<string[]>([]);
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  const baseSkills = (profile?.skills ?? []).filter(s => !removed.has(s));
  const allSkills  = [...baseSkills, ...pending.filter(s => !baseSkills.includes(s))];

  function addSkill() {
    const s = input.trim();
    if (!s || allSkills.includes(s)) { setInput(""); return; }
    setPending(prev => [...prev, s]);
    setInput("");
    setSaved(false);
  }

  function removeSkill(s: string) {
    if ((profile?.skills ?? []).includes(s)) {
      setRemoved(prev => new Set([...prev, s]));
    } else {
      setPending(prev => prev.filter(p => p !== s));
    }
    setSaved(false);
  }

  async function saveSkills() {
    if (!profile) return;
    setSaving(true);
    setError("");
    try {
      await api.patch(`/learner-profiles/${profile.id}/skills/`, { skills: allSkills });
      setSaved(true);
      setPending([]);
      setRemoved(new Set());
      refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save skills");
    } finally {
      setSaving(false);
    }
  }

  const isDirty = pending.length > 0 || removed.size > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
        <Loader2 size={18} className="animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Your skills</p>
        {isDirty && (
          <button
            onClick={saveSkills}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-slate-900 disabled:opacity-60 transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
          >
            {saving ? <><Loader2 size={11} className="animate-spin" /> Saving…</> : "Save changes"}
          </button>
        )}
        {saved && !isDirty && (
          <span className="text-xs text-emerald-600 flex items-center gap-1">
            <CheckCircle2 size={12} /> Saved
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}

      {/* All skills as tags */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {allSkills.length === 0 ? (
          <p className="text-xs text-gray-400 italic mb-3">No skills yet. Add some below.</p>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {allSkills.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200"
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addSkill()}
            placeholder="Type a skill and press Enter…"
            className="flex-1 bg-gray-50 border border-gray-200 rounded text-xs px-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded border text-xs font-medium text-emerald-600 border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <Plus size={12} /> Add
          </button>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        Skills are used by the AI engine to match you to opportunities.
      </p>
    </div>
  );
}
