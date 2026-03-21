"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WifiOff, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const tabs = [
  { label: "My matches",   href: "/learner/matches" },
  { label: "Opportunities",href: "/learner/opportunities" },
  { label: "Applications", href: "/learner/applications" },
  { label: "My profile",   href: "/learner/profile" },
  { label: "Skills",       href: "/learner/skills" },
];

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const initials = user?.first_name ? user.first_name.slice(0, 2).toUpperCase() : "??";

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* User header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-0">
        <div className="max-w-4xl mx-auto">
          {/* Top row: avatar + name + offline badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #34d399, #22d3ee)" }}
              >
                {initials}
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm leading-tight">{user?.first_name ?? "Learner"}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 text-amber-600 bg-amber-50 text-xs font-medium">
                <WifiOff size={11} />
                Working offline
              </span>
              <button
                onClick={logout}
                title="Sign out"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 bg-white text-xs font-medium transition-colors"
              >
                <LogOut size={11} />
                Sign out
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors duration-150 whitespace-nowrap ${
                    isActive
                      ? "border-emerald-400 text-emerald-600"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-4xl mx-auto px-6 py-5">
        {children}
      </div>
    </div>
  );
}
