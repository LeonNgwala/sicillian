"use client";

const notifications = [
  { id: 1, message: "OR Tambo district flagged — 0 employer matches for 47 job-ready IT learners.", time: "2h ago",  read: false, severity: "high" },
  { id: 2, message: "Alfred Nzo: 3 Buffalo City employers have open learnerships — learners unaware.", time: "5h ago",  read: false, severity: "high" },
  { id: 3, message: "King Hintsa TVET compliance score dropped below 50%. Report overdue.", time: "1d ago",  read: false, severity: "high" },
  { id: 4, message: "Nelson Mandela Bay: 112 learners ready for placement. Demand exceeds supply.", time: "1d ago",  read: true,  severity: "info" },
  { id: 5, message: "Remote IT Support Learnership approved for OR Tambo — 15 spots available.", time: "2d ago",  read: true,  severity: "info" },
  { id: 6, message: "Q1 2026 provincial report is ready for download.", time: "3d ago",  read: true,  severity: "info" },
];

export default function SetaNotificationsPage() {
  return (
    <div className="p-6 space-y-5 bg-[#f7f7f5] min-h-screen">
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MERSETA</p>
        <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-gray-400 mt-0.5">{notifications.filter(n => !n.read).length} unread</p>
      </div>

      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white border rounded p-4 flex items-start gap-3 ${
              !n.read ? "border-gray-300" : "border-gray-100"
            }`}
          >
            {/* Dot */}
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
              !n.read
                ? n.severity === "high" ? "bg-red-500" : "bg-emerald-400"
                : "bg-gray-200"
            }`} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm leading-relaxed ${!n.read ? "text-slate-800 font-medium" : "text-gray-500"}`}>
                {n.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
