import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
}

export default function StatCard({ icon: Icon, label, value, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-5 flex items-start gap-4">
      <div
        className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
      >
        <Icon size={20} className="text-slate-900" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
        {change && (
          <p className={`text-xs font-medium mt-1 ${changeType === "positive" ? "text-emerald-600" : "text-red-500"}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
