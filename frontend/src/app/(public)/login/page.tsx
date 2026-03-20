"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen bg-slate-900 flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
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
          <p className="text-slate-400 text-sm mt-2">Connecting skills to opportunity in the Eastern Cape</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-sm p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Sign in to your account</h2>

          <div className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-sm pl-9 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="w-full py-2.5 rounded-sm text-sm font-semibold text-slate-900 mt-2 transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-slate-400 text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
