const notifications = [
  {
    id: 1,
    dot: "bg-red-500",
    message: "Luthando Mbeki withdrew their application for Junior Software Developer.",
    time: "35 min ago",
    read: false,
  },
  {
    id: 2,
    dot: "bg-amber-400",
    message: "AI match score updated: Amahle Dlamini now scores 91% for IT Support Learnership.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    dot: "bg-emerald-400",
    message: "3 new applicants submitted for Graduate Intern — Data Analysis.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    dot: null,
    message: "Nontobeko Sithole accepted your interview invitation for IT Support Learnership.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    dot: null,
    message: "Your listing 'Finance Learnership' is under review and will be live within 24 hours.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 6,
    dot: null,
    message: "Reminder: 'Junior Software Developer' closes in 7 days. Review remaining applications.",
    time: "5 days ago",
    read: true,
  },
];

export default function EmployerNotificationsPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        <p className="text-sm text-gray-400 mt-0.5">Updates on listings, applicants and your account</p>
      </div>

      {/* Notification list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="divide-y divide-gray-50">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 ${!n.read ? "bg-white" : ""}`}
            >
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
