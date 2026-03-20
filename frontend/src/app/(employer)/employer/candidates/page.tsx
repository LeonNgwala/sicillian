import { ArrowUpRight } from "lucide-react";

const candidates = [
  {
    id: 1,
    initials: "AD",
    name: "Amahle Dlamini",
    qualification: "ND: Information Technology",
    nqf: "NQF 6",
    district: "Gqeberha",
    skills: ["JavaScript", "Python", "React"],
    fitScore: 91,
  },
  {
    id: 2,
    initials: "LM",
    name: "Luthando Mbeki",
    qualification: "BSc Computer Science",
    nqf: "NQF 7",
    district: "East London",
    skills: ["Java", "Spring Boot", "Docker"],
    fitScore: 85,
  },
  {
    id: 3,
    initials: "NS",
    name: "Nontobeko Sithole",
    qualification: "ND: Software Development",
    nqf: "NQF 6",
    district: "Gqeberha",
    skills: ["React", "Node.js", "TypeScript"],
    fitScore: 78,
  },
  {
    id: 4,
    initials: "SD",
    name: "Siyabonga Dube",
    qualification: "Cert: Web Development",
    nqf: "NQF 5",
    district: "Mthatha",
    skills: ["HTML/CSS", "JavaScript", "Vue.js"],
    fitScore: 64,
  },
  {
    id: 5,
    initials: "AN",
    name: "Ayanda Ntuli",
    qualification: "BSc Information Systems",
    nqf: "NQF 7",
    district: "East London",
    skills: ["SQL", "Python", "Power BI"],
    fitScore: 58,
  },
  {
    id: 6,
    initials: "TM",
    name: "Thandeka Mokoena",
    qualification: "ND: IT: Systems Development",
    nqf: "NQF 6",
    district: "Gqeberha",
    skills: ["C#", ".NET", "Azure"],
    fitScore: 52,
  },
];

function fitScoreColor(score: number) {
  if (score >= 80) return "text-emerald-700";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

export default function EmployerCandidatesPage() {
  return (
    <div className="bg-[#f7f7f5] min-h-screen p-6 space-y-5">
      {/* Heading */}
      <div className="border-b border-gray-200 pb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MTN SOUTH AFRICA</p>
        <h1 className="text-xl font-bold text-slate-900">Browse Candidates</h1>
        <p className="text-sm text-gray-400 mt-0.5">AI-matched candidate profiles based on your active listings</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-gray-200 rounded overflow-hidden">
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Total Profiles</p>
          <p className="text-2xl font-bold text-slate-900">1,240</p>
          <p className="text-xs text-gray-400">on platform</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">AI Matched to You</p>
          <p className="text-2xl font-bold text-slate-900">23</p>
          <p className="text-xs text-gray-400">this cycle</p>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">New This Week</p>
          <p className="text-2xl font-bold text-slate-900">8</p>
          <p className="text-xs text-gray-400">added profiles</p>
        </div>
      </div>

      {/* Candidate list */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-slate-900">Matched candidates</p>
        </div>
        <div className="divide-y divide-gray-50">
          {candidates.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
                  {c.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.qualification} · {c.district}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{c.nqf}</span>
                    {c.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4 shrink-0">
                <span className={`text-sm font-bold ${fitScoreColor(c.fitScore)}`}>{c.fitScore}%</span>
                <a className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                  View profile <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
