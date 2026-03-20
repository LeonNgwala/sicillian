"use client";

import { Bell } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  userName: string;
  notificationCount?: number;
}

export default function DashboardHeader({ title, userName, notificationCount = 3 }: DashboardHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold text-slate-900 flex items-center justify-center"
              style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}>
              {notificationCount}
            </span>
          )}
        </button>
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 text-xs font-bold"
          style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
