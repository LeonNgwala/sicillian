"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, GraduationCap, Briefcase, BookOpen, ShieldCheck, Layers } from "lucide-react";
import { LucideIcon } from "lucide-react";

type RoleOption = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const roles: RoleOption[] = [
  { id: "learner", label: "Learner", description: "Find opportunities & matches", icon: GraduationCap },
  { id: "employer", label: "Employer", description: "Post jobs & find talent", icon: Briefcase },
  { id: "institution", label: "Institution", description: "Manage programmes & learners", icon: BookOpen },
  { id: "seta", label: "SETA", description: "Oversee skills development", icon: ShieldCheck },
  { id: "incubator", label: "Incubator", description: "Support entrepreneurs", icon: Layers },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <span
            className="text-3xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(90deg, #34d399, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SkillsGrid
          </span>
          <p className="text-slate-400 text-sm mt-2">Create your account</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-sm p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Get started</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">I am a...</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-sm border text-center transition-all duration-150"
                      style={
                        isSelected
                          ? { border: "1.5px solid #34d399", background: "rgba(52,211,153,0.08)" }
                          : { border: "1.5px solid #334155", background: "transparent" }
                      }
                    >
                      <Icon size={20} className={isSelected ? "text-emerald-400" : "text-slate-500"} />
                      <span className={`text-xs font-semibold ${isSelected ? "text-emerald-400" : "text-slate-300"}`}>
                        {role.label}
                      </span>
                      <span className="text-[10px] text-slate-500 leading-tight">{role.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              className="w-full py-2.5 rounded-sm text-sm font-semibold text-slate-900 mt-2 transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
            >
              Create Account
            </button>
          </div>

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
