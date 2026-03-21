"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        role="superadmin"
        userName={user?.first_name ?? "Admin"}
        userEmail={user?.email ?? ""}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
