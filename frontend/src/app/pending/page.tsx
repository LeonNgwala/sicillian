"use client";

import { ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PendingPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-sm p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-5">
          <ShieldCheck size={26} className="text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Verification pending</h2>
        <p className="text-slate-400 text-sm mb-1">
          Hi {user?.first_name ?? "there"}, your account is under review.
        </p>
        <p className="text-slate-500 text-sm mb-6">
          Our team will verify your organisation details and notify you once approved. This usually takes 1–2 business days.
        </p>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}
