"use client";

import { Plus } from "lucide-react";

const skillGroups = [
  {
    category: "Technical",
    skills: ["Network Support", "Linux Basics", "Hardware Repair", "Windows Server", "TCP/IP", "A+ Coursework"],
  },
  {
    category: "Software",
    skills: ["Microsoft Office", "Help Desk Tools", "Remote Desktop", "ticketing systems"],
  },
  {
    category: "Soft Skills",
    skills: ["Communication", "Problem Solving", "Customer Service", "Time Management"],
  },
];

export default function SkillsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">Your skills</p>
        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium text-emerald-600 border-emerald-300 hover:bg-emerald-50 transition-colors"
        >
          <Plus size={12} /> Add skill
        </button>
      </div>

      {skillGroups.map((group) => (
        <div key={group.category} className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {group.category}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-center text-gray-400">
        Skills are used by the AI engine to match you to opportunities.
      </p>
    </div>
  );
}
