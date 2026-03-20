type Status = "pending" | "approved" | "rejected" | "matched" | "active" | "closed";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200" },
  approved: { label: "Approved", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-600 border-red-200" },
  matched: { label: "Matched", className: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  closed: { label: "Closed", className: "bg-slate-100 text-slate-500 border-slate-200" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${config.className}`}>
      {config.label}
    </span>
  );
}
