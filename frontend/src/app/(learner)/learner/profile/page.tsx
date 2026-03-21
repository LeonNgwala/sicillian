"use client";

import { useRef, useState } from "react";
import { Pencil, Upload, CheckCircle2, FileText, User, MapPin, Phone, Mail, GraduationCap, Calendar, Flag, ShieldCheck } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";
import type { LearnerProfile } from "@/types";

// ── Vuyo demo data ─────────────────────────────────────────────────────────

const VUYO_EMAIL = "vuyo@demo.co.za";

const VUYO_PROFILE = {
  district:     "Nelson Mandela Bay",
  nqf_level:    "6",
  qualification: "BSc Information Technology",
  skills:       ["Python", "SQL", "Django", "Data Analysis", "Excel", "Git"],
  race:         "black_african" as const,
  gender:       "male" as const,
  disability:   "no" as const,
  nationality:  "south_african" as const,
  date_of_birth: "1999-03-14",
  id_number:    null,
};

// ── Progress calculation ───────────────────────────────────────────────────

function calcStrength(profile: LearnerProfile | null, user: ReturnType<typeof useAuth>["user"], cvUploaded: boolean) {
  if (!profile || !user) return 0;
  const checks = [
    !!user.first_name,
    !!user.phone,
    !!user.email,
    !!profile.district,
    !!profile.nqf_level,
    !!profile.qualification,
    profile.skills.length > 0,
    !!profile.race || !!profile.gender || !!profile.nationality,
    cvUploaded,
  ];
  const weights = [8, 8, 8, 10, 12, 12, 14, 8, 20];
  return checks.reduce((sum, ok, i) => sum + (ok ? weights[i] : 0), 0);
}

function strengthLabel(pct: number) {
  if (pct >= 90) return { text: "Excellent", color: "text-emerald-600" };
  if (pct >= 70) return { text: "Good",      color: "text-cyan-600"    };
  if (pct >= 40) return { text: "Fair",       color: "text-amber-500"  };
  return           { text: "Incomplete",      color: "text-red-500"    };
}

// ── Helpers ────────────────────────────────────────────────────────────────

const RACE_LABELS: Record<string, string> = {
  black_african: "Black African", coloured: "Coloured", indian: "Indian",
  asian: "Asian", white: "White", other: "Other", prefer_not_to_say: "Prefer not to say",
};
const GENDER_LABELS: Record<string, string> = {
  male: "Male", female: "Female", non_binary: "Non-binary", prefer_not_to_say: "Prefer not to say",
};
const DISABILITY_LABELS: Record<string, string> = {
  yes: "Yes", no: "No", prefer_not_to_say: "Prefer not to say",
};
const NATIONALITY_LABELS: Record<string, string> = {
  south_african: "South African", permanent_resident: "Permanent Resident",
  refugee_permit: "Refugee / Asylum Permit", other: "Other",
};

function fmt(val: string | null | undefined, map: Record<string, string>) {
  if (!val) return null;
  return map[val] ?? val;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm font-semibold text-slate-900 mb-3">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon?: React.ElementType; label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon size={14} className={`mt-0.5 shrink-0 ${value ? "text-gray-400" : "text-gray-200"}`} />}
      <span className="text-xs text-gray-400 shrink-0 w-28">{label}</span>
      {value
        ? <span className="text-xs text-slate-700">{value}</span>
        : <span className="text-xs text-gray-300 italic">Not provided</span>}
    </div>
  );
}


// ── Page ──────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const isVuyo = user?.email === VUYO_EMAIL;

  const { data: profiles } = useApi<LearnerProfile[]>(isVuyo ? null : "/learner-profiles/");
  const dbProfile = (profiles ?? [])[0] ?? null;

  // For Vuyo: merge the hardcoded demo data with a null-safe profile shape
  const profile = isVuyo
    ? { ...VUYO_PROFILE, id: 0, user: 0, institution: null, status: "searching" as const, updated_at: "" }
    : dbProfile;

  const [extraSkills, setExtraSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    setExtraSkills(prev => prev.includes(s) ? prev : [...prev, s]);
    setSkillInput("");
  }

  const [cvUploaded, setCvUploaded] = useState(() => {
    if (typeof window !== "undefined") return !!localStorage.getItem("cv_filename");
    return false;
  });
  const [cvName, setCvName] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("cv_filename") ?? "";
    return "";
  });
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    localStorage.setItem("cv_filename", file.name);
    setCvName(file.name);
    setCvUploaded(true);
  }

  const strength = isVuyo
    ? (cvUploaded ? 100 : 80)
    : calcStrength(profile, user, cvUploaded);
  const { text: strengthText, color: strengthColor } = strengthLabel(strength);

  return (
    <div className="space-y-4">

      {/* ── Profile strength ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-slate-700">Profile strength</p>
          <span className={`text-sm font-bold ${strengthColor}`}>{strength}% · {strengthText}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${strength}%`, background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
          />
        </div>
        {!cvUploaded && (
          <p className="text-xs text-gray-400 mt-2">
            {isVuyo ? "Upload your CV below to reach 100%" : "Upload your CV below to unlock the full 20% boost"}
          </p>
        )}
      </div>

      {/* ── Personal info ── */}
      <Section title="Personal info">
        <Row icon={User}  label="Full name" value={user?.first_name} />
        <Row icon={Mail}  label="Email"     value={user?.email} />
        <Row icon={Phone} label="Phone"     value={user?.phone} />
        <Row icon={MapPin} label="District" value={profile?.district} />
      </Section>

      {/* ── Demographics / B-BBEE ── */}
      <Section title="Demographics · B-BBEE">
        <Row icon={Flag}        label="Race / group"  value={fmt(profile?.race, RACE_LABELS)} />
        <Row icon={User}        label="Gender"        value={fmt(profile?.gender, GENDER_LABELS)} />
        <Row icon={Flag}        label="Nationality"   value={fmt(profile?.nationality, NATIONALITY_LABELS)} />
        <Row icon={ShieldCheck} label="Disability"    value={fmt(profile?.disability, DISABILITY_LABELS)} />
        <Row icon={Calendar}    label="Date of birth" value={profile?.date_of_birth} />
        <Row icon={ShieldCheck} label="SA ID number"  value={profile?.id_number} />
        <p className="text-[10px] text-gray-400 pt-1">
          Used solely for B-BBEE candidate reporting. Never shared without your consent.
        </p>
      </Section>

      {/* ── Qualifications ── */}
      <Section title="Qualifications">
        <Row icon={GraduationCap} label="Qualification" value={profile?.qualification} />
        <Row icon={GraduationCap} label="NQF level"     value={profile?.nqf_level ? `NQF ${profile.nqf_level}` : null} />
      </Section>

      {/* ── Skills ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-900">Skills</p>
          <a href="/learner/skills" className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
            <Pencil size={11} /> Edit
          </a>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {[...(profile?.skills ?? []), ...extraSkills].length === 0 ? (
            <p className="text-xs text-gray-400 italic">No skills added yet.</p>
          ) : (
            [...(profile?.skills ?? []), ...extraSkills].map(s => (
              <span key={s} className="text-xs px-2.5 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">{s}</span>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addSkill()}
            placeholder="Add a skill…"
            className="flex-1 bg-gray-50 border border-gray-200 rounded text-xs px-3 py-1.5 text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
          />
          <button
            onClick={addSkill}
            className="px-3 py-1.5 rounded text-xs font-semibold text-slate-900 transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
          >
            Add
          </button>
        </div>
      </div>

      {/* ── CV upload ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-slate-900">Curriculum Vitae</p>
          {cvUploaded && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> Uploaded
            </span>
          )}
        </div>

        {cvUploaded ? (
          <div className="flex items-center justify-between p-3 rounded bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-emerald-600 shrink-0" />
              <span className="text-xs text-slate-700 font-medium truncate max-w-[200px]">{cvName}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("cv_filename");
                setCvUploaded(false);
                setCvName("");
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-3 shrink-0"
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
            className={`flex flex-col items-center justify-center gap-2 py-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${
              dragging ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
            }`}
          >
            <Upload size={20} className="text-gray-400" />
            <p className="text-sm text-slate-600 font-medium">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-400">PDF, DOC, DOCX — max 5 MB</p>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {!cvUploaded && (
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }} />
            Uploading your CV adds <span className="text-emerald-600 font-semibold ml-0.5">+20%</span> to your profile strength
          </p>
        )}
      </div>

    </div>
  );
}
