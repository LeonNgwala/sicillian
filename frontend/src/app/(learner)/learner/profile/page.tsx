"use client";

import { Pencil } from "lucide-react";

const skills = [
  "Network Support", "Linux Basics", "A+ Coursework",
  "Help Desk", "Windows Server", "TCP/IP", "Hardware Repair",
];

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      {/* Profile strength */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-slate-700">Profile strength</p>
          <span className="text-sm font-bold text-emerald-600">74%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "74%", background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Add your CV to reach 90%+</p>
      </div>

      {/* Personal info */}
      <Section title="Personal info">
        <Row label="Full name" value="Amahle Dlamini" />
        <Row label="Location" value="Nelson Mandela Bay, Eastern Cape" />
        <Row label="Phone" value="+27 71 234 5678" />
        <Row label="Email" value="amahle@example.com" />
      </Section>

      {/* Qualifications */}
      <Section title="Qualifications">
        <Row label="Highest" value="N6 Certificate — IT Systems Support" />
        <Row label="Institution" value="Port Elizabeth TVET College" />
        <Row label="Year" value="2025" />
        <Row label="NQF Level" value="NQF 5" />
      </Section>

      {/* Skills */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-900">Skills</p>
          <button className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
            <Pencil size={11} /> Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <Section title="Availability">
        <Row label="Status" value="Available immediately" />
        <Row label="Type" value="Learnership, Internship, Permanent" />
        <Row label="Travel" value="Up to 300km" />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <button className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
          <Pencil size={11} /> Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-gray-400 shrink-0 w-24">{label}</span>
      <span className="text-xs text-slate-700 text-right">{value}</span>
    </div>
  );
}
