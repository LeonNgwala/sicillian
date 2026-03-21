"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Opportunity } from "@/types";

const EC_DISTRICTS = [
  "Nelson Mandela Bay", "Buffalo City", "Amathole", "Chris Hani",
  "Joe Gqabi", "OR Tambo", "Alfred Nzo", "Sarah Baartman",
];

const OPP_TYPES = [
  { label: "Job",         value: "job"         },
  { label: "Learnership", value: "learnership" },
  { label: "Internship",  value: "internship"  },
];

export default function PostOpportunityPage() {
  const { user } = useAuth();
  const router   = useRouter();

  const [form, setForm] = useState({
    title:       "",
    type:        "internship",
    district:    "",
    nqf_required: "",
    skills_raw:  "",
    stipend:     "",
    spots:       "1",
    closes_at:   "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const inputCls = "border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-emerald-400 bg-white";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.district || !form.nqf_required) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const skills_required = form.skills_raw
        .split(/[\n,]+/)
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        title:         form.title,
        type:          form.type,
        district:      form.district,
        nqf_required:  parseInt(form.nqf_required),
        skills_required,
        stipend:       form.stipend ? parseInt(form.stipend.replace(/\D/g, "")) : null,
        spots_available: parseInt(form.spots) || 1,
        closes_at:     form.closes_at ? form.closes_at : null,
      };

      await api.post<Opportunity>("/opportunities/", payload);
      router.push("/employer/opportunities");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to post opportunity");
    } finally {
      setSubmitting(false);
    }
  }

  const orgName = user?.first_name ?? "Your Organisation";

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{orgName}</p>
        <h1 className="text-xl font-bold text-slate-900">Post Opportunity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Candidates will be AI-matched automatically once posted.</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded p-5 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => set("title", e.target.value)}
              placeholder="e.g. IT Support Learnership"
              className={inputCls}
            />
          </div>

          {/* Type + NQF */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Type *</label>
              <select value={form.type} onChange={e => set("type", e.target.value)} className={inputCls}>
                {OPP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">NQF Level required *</label>
              <select required value={form.nqf_required} onChange={e => set("nqf_required", e.target.value)} className={inputCls}>
                <option value="">Select NQF level</option>
                {["1","2","3","4","5","6","7","8","9","10"].map(n => (
                  <option key={n} value={n}>NQF {n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* District */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">District *</label>
            <select required value={form.district} onChange={e => set("district", e.target.value)} className={inputCls}>
              <option value="">Select district</option>
              {EC_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Skills required */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Skills required</label>
            <textarea
              value={form.skills_raw}
              onChange={e => set("skills_raw", e.target.value)}
              placeholder="e.g. Python, SQL, Django  (comma or newline separated)"
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Closing date + Stipend + Spots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Closing date</label>
              <input
                type="date"
                value={form.closes_at}
                onChange={e => set("closes_at", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Stipend (R/month)</label>
              <input
                type="number"
                min={0}
                value={form.stipend}
                onChange={e => set("stipend", e.target.value)}
                placeholder="e.g. 5000"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Spots available</label>
              <input
                type="number"
                min={1}
                value={form.spots}
                onChange={e => set("spots", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-60 transition-colors"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {submitting ? "Posting…" : "Post Opportunity"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded border border-gray-300 text-slate-700 text-sm hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
