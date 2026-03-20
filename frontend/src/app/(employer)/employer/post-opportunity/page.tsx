"use client";

import { useState } from "react";

type OpportunityType = "Job" | "Learnership" | "Internship" | "Bursary";
type NQFLevel = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export default function PostOpportunityPage() {
  const [form, setForm] = useState({
    title: "",
    type: "Job" as OpportunityType,
    sector: "",
    location: "",
    nqfLevel: "" as NQFLevel | "",
    description: "",
    requirements: "",
    closingDate: "",
    stipend: "",
    spots: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputCls = "border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-emerald-400";

  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">Post Opportunity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details below — candidates will be AI-matched automatically.</p>
      </div>

      <div className="max-w-3xl">
        <div className="bg-white border border-gray-200 rounded p-5 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Opportunity Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. IT Support Learnership"
              className={inputCls}
            />
          </div>

          {/* Type + NQF Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Type *</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className={inputCls}
              >
                <option>Job</option>
                <option>Learnership</option>
                <option>Internship</option>
                <option>Bursary</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">NQF Level *</label>
              <select
                value={form.nqfLevel}
                onChange={(e) => handleChange("nqfLevel", e.target.value)}
                className={inputCls}
              >
                <option value="">Select NQF level</option>
                {(["1","2","3","4","5","6","7","8"] as NQFLevel[]).map((n) => (
                  <option key={n} value={n}>NQF {n}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sector + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Sector *</label>
              <select
                value={form.sector}
                onChange={(e) => handleChange("sector", e.target.value)}
                className={inputCls}
              >
                <option value="">Select sector</option>
                <option>ICT</option>
                <option>Finance</option>
                <option>Engineering</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Agriculture</option>
                <option>Tourism</option>
                <option>Business Services</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Location *</label>
              <select
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={inputCls}
              >
                <option value="">Select location</option>
                <option>Gqeberha (Port Elizabeth)</option>
                <option>East London</option>
                <option>Mthatha</option>
                <option>King William&apos;s Town</option>
                <option>Queenstown</option>
                <option>Remote</option>
                <option>Multiple Locations</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and what candidates can expect..."
              rows={5}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Requirements</label>
            <textarea
              value={form.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="List key requirements, one per line..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Closing Date + Stipend + Spots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Closing Date *</label>
              <input
                type="date"
                value={form.closingDate}
                onChange={(e) => handleChange("closingDate", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Stipend / Salary</label>
              <input
                type="text"
                value={form.stipend}
                onChange={(e) => handleChange("stipend", e.target.value)}
                placeholder="e.g. R3 500/month"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">Spots Available</label>
              <input
                type="number"
                min={1}
                value={form.spots}
                onChange={(e) => handleChange("spots", e.target.value)}
                placeholder="e.g. 5"
                className={inputCls}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              className="px-6 py-2.5 rounded bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Post Opportunity
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded border border-gray-300 text-slate-700 text-sm hover:border-gray-400 transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
