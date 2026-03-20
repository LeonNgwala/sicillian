const notifications = [
  {
    id: 1,
    dot: "bg-red-500",
    message: "8 final-year IT graduates have no employer match — action required before cohort review.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    dot: "bg-amber-400",
    message: "SETA compliance report due in 14 days. Ensure all learner records are submitted.",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    dot: "bg-emerald-400",
    message: "Amahle Dlamini matched to MTN IT Support Learnership — fit score 94%.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    dot: null,
    message: "ND: Information Technology programme placement rate reached 74% — up from 68% in 2023.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    dot: null,
    message: "Programme submission deadline for new BSc Honours track is 30 April 2026.",
    time: "4 days ago",
    read: true,
  },
  {
    id: 6,
    dot: null,
    message: "New SETA funding round open — applications close 30 April 2026. Review eligibility.",
    time: "6 days ago",
    read: true,
  },
];

export default function InstitutionNotificationsPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">NELSON MANDELA UNIVERSITY</p>
        <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-gray-400 mt-0.5">Institutional alerts, learner matches and compliance reminders</p>
      </div>

      {/* Notification list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="divide-y divide-gray-50">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 px-4 py-3">
              <div className="mt-1.5 shrink-0">
                {n.dot ? (
                  <div className={`w-2 h-2 rounded-full ${n.dot}`} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${n.read ? "text-gray-500" : "text-slate-900 font-medium"}`}>
                  {n.message}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
