// Government-style top announcement bar with emerald→cyan gradient
export default function AnnouncementBar() {
  return (
    <div
      className="w-full text-slate-900 text-xs py-2 px-4 flex items-center justify-center gap-3 z-50 relative font-semibold"
      style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }}
    >
      <div className="hidden sm:flex items-center gap-1 mr-2">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-900/20" />
        <span className="inline-block w-2 h-2 rounded-full bg-white/50" />
        <span className="inline-block w-2 h-2 rounded-full bg-slate-900/20" />
      </div>
      <span className="uppercase tracking-widest">Official Platform</span>
      <span className="text-slate-900/40">|</span>
      <span className="text-slate-900/70">
        MICT SETA National Skills Challenge 2026 &mdash; Eastern Cape
      </span>
      <span className="text-slate-900/40 hidden md:inline">|</span>
      <span className="text-slate-900/60 hidden md:inline">
        Nelson Mandela University &middot; Propella Business Incubator, Gqeberha
      </span>
    </div>
  );
}
