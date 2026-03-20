"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageWrapper from "@/components/dashboard/PageWrapper";
import { Sparkles, CheckCircle2, Bell, AlertCircle, MessageSquare } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: Sparkles,
    iconColor: "text-cyan-500",
    iconBg: "bg-cyan-50",
    message: "3 new AI matches found — check your matches tab.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    message: "Your application to TechAfrica Solutions has been received.",
    time: "Yesterday at 10:30",
    read: false,
  },
  {
    id: 3,
    icon: MessageSquare,
    iconColor: "text-slate-500",
    iconBg: "bg-slate-100",
    message: "Telkom Foundation has viewed your profile.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    icon: AlertCircle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    message: "The ICT Learnership closing date is in 10 days — don't miss it!",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    icon: Bell,
    iconColor: "text-slate-400",
    iconBg: "bg-slate-100",
    message: "Welcome to SkillsGrid! Complete your profile to improve your matches.",
    time: "5 days ago",
    read: true,
  },
];

export default function LearnerNotificationsPage() {
  return (
    <>
      <DashboardHeader title="Notifications" userName="Amahle Dlamini" notificationCount={2} />
      <PageWrapper>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500 mt-0.5">Stay up to date with your applications and matches</p>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`bg-white border rounded-sm p-4 flex items-start gap-4 transition-colors ${
                  n.read ? "border-slate-200" : "border-emerald-200 bg-emerald-50/30"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.iconBg}`}>
                  <Icon size={16} className={n.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? "text-slate-600" : "text-slate-900 font-medium"}`}>
                    {n.message}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>
      </PageWrapper>
    </>
  );
}
