"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, LayoutDashboard, Sparkles, Briefcase, UserCircle,
  ClipboardList, Bell, PlusCircle, Users, GraduationCap, BookOpen,
  Map, Banknote, ShieldCheck, BarChart3, Layers, LucideIcon,
} from "lucide-react";

type Role = "learner" | "employer" | "institution" | "seta" | "incubator";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NAV_CONFIG: Record<Role, NavItem[]> = {
  learner: [
    { label: "Dashboard",     href: "/learner/dashboard",     icon: LayoutDashboard },
    { label: "My Matches",    href: "/learner/matches",       icon: Sparkles },
    { label: "Opportunities", href: "/learner/opportunities", icon: Briefcase },
    { label: "My Profile",    href: "/learner/profile",       icon: UserCircle },
    { label: "Applications",  href: "/learner/applications",  icon: ClipboardList },
    { label: "Notifications", href: "/learner/notifications", icon: Bell },
  ],
  employer: [
    { label: "Dashboard",       href: "/employer/dashboard",        icon: LayoutDashboard },
    { label: "Post Opportunity",href: "/employer/post-opportunity", icon: PlusCircle },
    { label: "My Listings",     href: "/employer/opportunities",    icon: Briefcase },
    { label: "Candidates",      href: "/employer/candidates",       icon: Users },
    { label: "Notifications",   href: "/employer/notifications",    icon: Bell },
  ],
  institution: [
    { label: "Dashboard",     href: "/institution/dashboard",    icon: LayoutDashboard },
    { label: "Learners",      href: "/institution/learners",     icon: GraduationCap },
    { label: "Programmes",    href: "/institution/programmes",   icon: BookOpen },
    { label: "Notifications", href: "/institution/notifications",icon: Bell },
  ],
  seta: [
    { label: "Dashboard",     href: "/seta/dashboard",     icon: LayoutDashboard },
    { label: "Districts",     href: "/seta/districts",     icon: Map },
    { label: "Funding",       href: "/seta/funding",       icon: Banknote },
    { label: "Compliance",    href: "/seta/compliance",    icon: ShieldCheck },
    { label: "Reports",       href: "/seta/reports",       icon: BarChart3 },
    { label: "Notifications", href: "/seta/notifications", icon: Bell },
  ],
  incubator: [
    { label: "Dashboard",     href: "/incubator/dashboard",     icon: LayoutDashboard },
    { label: "Programmes",    href: "/incubator/programmes",    icon: Layers },
    { label: "Mentors",       href: "/incubator/mentors",       icon: Users },
    { label: "Notifications", href: "/incubator/notifications", icon: Bell },
  ],
};

interface SidebarProps {
  role: Role;
  userName: string;
  userEmail: string;
}

export default function Sidebar({ role, userName, userEmail }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = NAV_CONFIG[role];

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <span
          className="text-xl font-bold tracking-tight"
          style={{
            background: "linear-gradient(90deg, #34d399, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SkillsGrid
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(52,211,153,0.15), rgba(34,211,238,0.1))",
                      borderLeft: "2px solid #34d399",
                    }
                  : {}
              }
            >
              <Icon size={18} className={isActive ? "text-emerald-400" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role badge */}
      <div className="px-5 py-4 border-t border-slate-800">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold text-slate-900 rounded-full capitalize"
          style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
        >
          {role}
        </span>
      </div>

      {/* User */}
      <div className="px-5 py-4 border-t border-slate-800 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-900 text-xs font-bold shrink-0"
          style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-slate-500 truncate">{userEmail}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-slate-800 rounded-sm text-white border border-slate-700"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed left-0 top-0 h-full w-64 z-50 lg:hidden"
            >
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
                >
                  <X size={20} />
                </button>
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
