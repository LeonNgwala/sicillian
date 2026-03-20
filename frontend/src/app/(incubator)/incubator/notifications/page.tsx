const notifications = [
  {
    id: 1,
    dot: "bg-red-500",
    message: "Green Economy Incubator programme requires final approval before launch — 3 days overdue.",
    time: "30 min ago",
    read: false,
  },
  {
    id: 2,
    dot: "bg-amber-400",
    message: "3 new entrepreneurs applied to the ICT Founders Bootcamp. Review applications.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    dot: "bg-emerald-400",
    message: "Bongani Khumalo completed 18 mentor sessions — milestone achieved.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    dot: null,
    message: "Reminder: Pitch Night for Agri-Tech Cohort is on 25 March at 18:00. Confirm venue.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    dot: null,
    message: "Eastern Cape Startup Expo registrations close 10 April 2026. Confirm your incubator slot.",
    time: "4 days ago",
    read: true,
  },
  {
    id: 6,
    dot: null,
    message: "Thandi Nkosi joined as mentor for Creative Industries Hub. Profile is live.",
    time: "1 week ago",
    read: true,
  },
];

export default function IncubatorNotificationsPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">PROPELLA BUSINESS INCUBATOR · GQEBERHA</p>
        <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-gray-400 mt-0.5">Updates on programmes, mentors and entrepreneurs</p>
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
