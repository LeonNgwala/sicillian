"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wifi, WifiOff } from "lucide-react";

const tabs = [
  { label: "My matches",   href: "/learner/matches" },
  { label: "Applications", href: "/learner/applications" },
  { label: "My profile",   href: "/learner/profile" },
  { label: "Skills",       href: "/learner/skills" },
];

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                AD
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm leading-tight">Amahle Dlamini</p>
                <p className="text-xs text-gray-400">IT Support · Nelson Mandela Bay</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 text-amber-600 bg-amber-50 text-xs font-medium">
              <WifiOff size={11} />
              Working offline
            </span>
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
