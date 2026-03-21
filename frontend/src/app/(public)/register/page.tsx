"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, GraduationCap, Briefcase, BookOpen,
  ShieldCheck, Layers, Phone, MapPin, CheckCircle2, Loader2,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { LearnerRegisterData, OrgRegisterData, Race, Gender, Disability, Nationality } from "@/types";

type RoleOption = { id: string; label: string; description: string; icon: LucideIcon };

const roles: RoleOption[] = [
  { id: "learner",     label: "Learner",     description: "Find opportunities & matches", icon: GraduationCap },
  { id: "employer",   label: "Employer",     description: "Post jobs & find talent",      icon: Briefcase    },
  { id: "institution",label: "Institution",  description: "Manage programmes & learners", icon: BookOpen     },
  { id: "seta",       label: "SETA",         description: "Oversee skills development",   icon: ShieldCheck  },
  { id: "incubator",  label: "Incubator",    description: "Support entrepreneurs",        icon: Layers       },
];

const EC_DISTRICTS = [
  "Nelson Mandela Bay", "Buffalo City", "Amathole", "Chris Hani",
  "Joe Gqabi", "OR Tambo", "Alfred Nzo", "Sarah Baartman",
];

const NQF_LEVELS = ["1","2","3","4","5","6","7","8","9","10"];

const INSTITUTION_TYPES = ["University", "TVET College", "Community College", "FET College", "Other"];

const PROVINCES = [
  "Eastern Cape", "Western Cape", "Northern Cape", "Gauteng",
  "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Free State", "North West",
];

function inputClass(extra = "") {
  return `w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors ${extra}`;
}

function selectClass() {
  return "w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors appearance-none";
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-slate-300 mb-1.5">{children}</label>;
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{children}</div>;
}

export default function RegisterPage() {
  const { registerLearner, registerOrg } = useAuth();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orgSuccess, setOrgSuccess] = useState(false);

  // Common fields
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone]       = useState("");

  // Learner-specific
  const [district, setDistrict]         = useState("");
  const [nqfLevel, setNqfLevel]         = useState("");
  const [qualification, setQual]        = useState("");
  const [skillsRaw, setSkillsRaw]       = useState("");

  // B-BBEE demographics
  const [race, setRace]                 = useState<Race | "">("");
  const [gender, setGender]             = useState<Gender | "">("");
  const [disability, setDisability]     = useState<Disability | "">("");
  const [nationality, setNationality]   = useState<Nationality | "">("");
  const [dob, setDob]                   = useState("");
  const [idNumber, setIdNumber]         = useState("");

  // Org-specific
  const [companyName, setCompanyName]   = useState("");
  const [regNumber, setRegNumber]       = useState("");
  const [contactPerson, setContact]     = useState("");
  const [useCase, setUseCase]           = useState("");
  const [orgDistrict, setOrgDistrict]   = useState("");
  const [province, setProvince]         = useState("");
  const [institutionType, setInstType]  = useState("");

  const isLearner = selectedRole === "learner";
  const isOrg     = selectedRole && selectedRole !== "learner";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRole) { setError("Please select a role."); return; }
    setError("");
    setSubmitting(true);
    try {
      if (isLearner) {
        const skills = skillsRaw.split(",").map(s => s.trim()).filter(Boolean);
        const data: LearnerRegisterData = {
          email, password, first_name: name, phone,
          district, nqf_level: nqfLevel, qualification, skills,
          race: race || null,
          gender: gender || null,
          disability: disability || null,
          nationality: nationality || null,
          date_of_birth: dob || null,
          id_number: idNumber || null,
        };
        await registerLearner(data);
        // AuthContext redirects to /learner/matches on success
      } else {
        const orgTypeMap: Record<string, string> = {
          employer: "employer", institution: "institution",
          incubator: "incubator", seta: "seta",
        };
        const data: OrgRegisterData = {
          email, password, first_name: name, phone,
          org_type: orgTypeMap[selectedRole] as OrgRegisterData["org_type"],
          company_name: companyName,
          registration_number: regNumber,
          contact_person: contactPerson,
          use_case: useCase,
          district: orgDistrict,
          ...(selectedRole === "institution" && institutionType ? { institution_type: institutionType } : {}),
          ...(selectedRole === "seta" && province ? { province } : {}),
        };
        await registerOrg(data);
        setOrgSuccess(true);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orgSuccess) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 border border-slate-700 rounded-sm p-10 max-w-md w-full text-center space-y-4"
        >
          <CheckCircle2 size={48} className="text-emerald-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Application submitted</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your organisation account is <span className="text-amber-400 font-medium">pending verification</span>.
            The SkillsGrid team will review your registration and notify you by email once approved.
          </p>
          <Link
            href="/login"
            className="inline-block mt-2 px-5 py-2.5 rounded-sm text-sm font-semibold text-slate-900"
            style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
          >
            Go to login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded flex justify-center items-center mx-auto mt-4">
            <img src="TransparentLOgo.png" alt="LOGO" className="object-contain w-70 h-70" />
          </div>
          <p className="text-slate-400 text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-sm p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Get started</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const active = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => { setSelectedRole(role.id); setError(""); }}
                      className="flex flex-col items-center gap-2 p-3 rounded-sm border text-center transition-all duration-150"
                      style={active
                        ? { border: "1.5px solid #34d399", background: "rgba(52,211,153,0.08)" }
                        : { border: "1.5px solid #334155", background: "transparent" }}
                    >
                      <Icon size={20} className={active ? "text-emerald-400" : "text-slate-500"} />
                      <span className={`text-xs font-semibold ${active ? "text-emerald-400" : "text-slate-300"}`}>
                        {role.label}
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight">{role.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Common fields — always shown */}
            <div>
              <Label>{isOrg ? "Your full name" : "Full name"}</Label>
              <div className="relative">
                <IconWrap><User size={16} /></IconWrap>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name" className={inputClass()} />
              </div>
            </div>

            <div>
              <Label>Phone</Label>
              <div className="relative">
                <IconWrap><Phone size={16} /></IconWrap>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="0XX XXX XXXX" className={inputClass()} />
              </div>
            </div>

            <div>
              <Label>Email address</Label>
              <div className="relative">
                <IconWrap><Mail size={16} /></IconWrap>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" className={inputClass()} />
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <IconWrap><Lock size={16} /></IconWrap>
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" className={inputClass()} />
              </div>
            </div>

            {/* Learner-specific fields */}
            <AnimatePresence>
              {isLearner && (
                <motion.div
                  key="learner-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <Label>District (Eastern Cape)</Label>
                    <div className="relative">
                      <IconWrap><MapPin size={16} /></IconWrap>
                      <select required value={district} onChange={e => setDistrict(e.target.value)} className={selectClass()}>
                        <option value="">Select district</option>
                        {EC_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>NQF Level</Label>
                    <div className="relative">
                      <IconWrap><GraduationCap size={16} /></IconWrap>
                      <select required value={nqfLevel} onChange={e => setNqfLevel(e.target.value)} className={selectClass()}>
                        <option value="">Select NQF level</option>
                        {NQF_LEVELS.map(l => <option key={l} value={l}>Level {l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Qualification</Label>
                    <div className="relative">
                      <IconWrap><BookOpen size={16} /></IconWrap>
                      <input type="text" required value={qualification} onChange={e => setQual(e.target.value)}
                        placeholder="e.g. BSc Computer Science" className={inputClass()} />
                    </div>
                  </div>

                  <div>
                    <Label>Skills <span className="text-slate-500 font-normal">(comma-separated)</span></Label>
                    <div className="relative">
                      <IconWrap><Layers size={16} /></IconWrap>
                      <input type="text" value={skillsRaw} onChange={e => setSkillsRaw(e.target.value)}
                        placeholder="e.g. Python, SQL, Excel" className={inputClass()} />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">You can add more skills after registration.</p>
                  </div>

                  {/* B-BBEE / Demographics */}
                  <div className="pt-2 border-t border-slate-700">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Demographics <span className="text-slate-600 font-normal normal-case tracking-normal">— for B-BBEE reporting (optional)</span>
                    </p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Race / Population group</Label>
                          <div className="relative">
                            <IconWrap><User size={16} /></IconWrap>
                            <select value={race} onChange={e => setRace(e.target.value as Race | "")} className={selectClass()}>
                              <option value="">Select</option>
                              <option value="black_african">Black African</option>
                              <option value="coloured">Coloured</option>
                              <option value="indian">Indian</option>
                              <option value="asian">Asian</option>
                              <option value="white">White</option>
                              <option value="other">Other</option>
                              <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label>Gender</Label>
                          <div className="relative">
                            <IconWrap><User size={16} /></IconWrap>
                            <select value={gender} onChange={e => setGender(e.target.value as Gender | "")} className={selectClass()}>
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="non_binary">Non-binary</option>
                              <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Disability</Label>
                          <div className="relative">
                            <IconWrap><ShieldCheck size={16} /></IconWrap>
                            <select value={disability} onChange={e => setDisability(e.target.value as Disability | "")} className={selectClass()}>
                              <option value="">Select</option>
                              <option value="no">No</option>
                              <option value="yes">Yes</option>
                              <option value="prefer_not_to_say">Prefer not to say</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Label>Nationality</Label>
                          <div className="relative">
                            <IconWrap><MapPin size={16} /></IconWrap>
                            <select value={nationality} onChange={e => setNationality(e.target.value as Nationality | "")} className={selectClass()}>
                              <option value="">Select</option>
                              <option value="south_african">South African</option>
                              <option value="permanent_resident">Permanent Resident</option>
                              <option value="refugee_permit">Refugee / Asylum Permit</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Date of birth</Label>
                          <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors" />
                        </div>
                        <div>
                          <Label>SA ID number <span className="text-slate-600 font-normal">(optional)</span></Label>
                          <input type="text" value={idNumber} onChange={e => setIdNumber(e.target.value)}
                            placeholder="13-digit ID" maxLength={13}
                            className="w-full bg-slate-900 border border-slate-700 rounded-sm px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Org-specific fields */}
            <AnimatePresence>
              {isOrg && (
                <motion.div
                  key="org-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <Label>Organisation name</Label>
                    <div className="relative">
                      <IconWrap><Briefcase size={16} /></IconWrap>
                      <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)}
                        placeholder="Company / organisation name" className={inputClass()} />
                    </div>
                  </div>

                  <div>
                    <Label>Registration number</Label>
                    <div className="relative">
                      <IconWrap><ShieldCheck size={16} /></IconWrap>
                      <input type="text" value={regNumber} onChange={e => setRegNumber(e.target.value)}
                        placeholder="e.g. 2021/123456/07" className={inputClass()} />
                    </div>
                  </div>

                  <div>
                    <Label>Contact person</Label>
                    <div className="relative">
                      <IconWrap><User size={16} /></IconWrap>
                      <input type="text" value={contactPerson} onChange={e => setContact(e.target.value)}
                        placeholder="HR manager or main contact" className={inputClass()} />
                    </div>
                  </div>

                  <div>
                    <Label>District</Label>
                    <div className="relative">
                      <IconWrap><MapPin size={16} /></IconWrap>
                      <select value={orgDistrict} onChange={e => setOrgDistrict(e.target.value)} className={selectClass()}>
                        <option value="">Select district</option>
                        {EC_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>How will you use SkillsGrid?</Label>
                    <textarea
                      rows={3}
                      value={useCase}
                      onChange={e => setUseCase(e.target.value)}
                      placeholder="Brief description of your hiring or skills development needs..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-sm px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Institution type — only for institution */}
                  {selectedRole === "institution" && (
                    <div>
                      <Label>Institution type</Label>
                      <div className="relative">
                        <IconWrap><BookOpen size={16} /></IconWrap>
                        <select value={institutionType} onChange={e => setInstType(e.target.value)} className={selectClass()}>
                          <option value="">Select type</option>
                          {INSTITUTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Province — only for SETA */}
                  {selectedRole === "seta" && (
                    <div>
                      <Label>Province of jurisdiction</Label>
                      <div className="relative">
                        <IconWrap><MapPin size={16} /></IconWrap>
                        <select value={province} onChange={e => setProvince(e.target.value)} className={selectClass()}>
                          <option value="">Select province</option>
                          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/40 rounded-sm px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !selectedRole}
              className="w-full py-2.5 rounded-sm text-sm font-semibold text-slate-900 mt-2 transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {submitting ? "Creating account…" : isOrg ? "Submit for review" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-slate-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
