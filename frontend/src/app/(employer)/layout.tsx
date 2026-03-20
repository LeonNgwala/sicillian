import Sidebar from "@/components/dashboard/Sidebar";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="employer" userName="Sipho Ndlovu" userEmail="sipho@techafrica.co.za" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
