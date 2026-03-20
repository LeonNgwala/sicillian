import Sidebar from "@/components/dashboard/Sidebar";

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="institution" userName="Dr. Noxolo Mthembu" userEmail="nmthembu@ufh.ac.za" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
