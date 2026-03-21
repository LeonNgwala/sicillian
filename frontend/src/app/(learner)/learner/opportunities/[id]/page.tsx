"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageWrapper from "@/components/dashboard/PageWrapper";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { ArrowLeft, Building2, MapPin, Calendar, Briefcase, CheckCircle2, MessageSquare, X } from "lucide-react";

const opportunityData: Record<string, {
  id: string;
  title: string;
  organisation: string;
  location: string;
  type: string;
  sector: string;
  closing: string;
  status: "active" | "closed";
  description: string;
  requirements: string[];
  salary?: string;
}> = {
  "opp-1": {
    id: "opp-1",
    title: "Junior Software Developer",
    organisation: "TechAfrica Solutions",
    location: "Port Elizabeth, Eastern Cape",
    type: "Job",
    sector: "ICT",
    closing: "15 April 2026",
    status: "active",
    salary: "R18 000 – R24 000 per month",
    description:
      "TechAfrica Solutions is seeking a motivated Junior Software Developer to join our growing engineering team in Port Elizabeth. You will work on web applications for local government and enterprise clients across the Eastern Cape, contributing to full-stack features under the guidance of senior developers.",
    requirements: [
      "Diploma or Degree in Computer Science, Information Technology or related field",
      "Proficiency in JavaScript (React or Vue) and/or Python",
      "Familiarity with REST APIs and version control (Git)",
      "Strong problem-solving skills and attention to detail",
      "Ability to work collaboratively in an Agile team environment",
      "South African citizen or valid work permit",
    ],
  },
  "opp-2": {
    id: "opp-2",
    title: "ICT Learnership (NQF 4)",
    organisation: "Telkom Foundation",
    location: "East London, Eastern Cape",
    type: "Learnership",
    sector: "ICT",
    closing: "30 April 2026",
    status: "active",
    description:
      "The Telkom Foundation ICT Learnership is a 12-month accredited programme that combines theoretical study with practical workplace experience. Successful candidates will receive a stipend and earn an NQF Level 4 qualification in IT End User Computing.",
    requirements: [
      "Grade 12 / Matric certificate",
      "Between 18 and 35 years of age",
      "Resident in the Eastern Cape",
      "No prior formal IT qualification required",
      "Good numeracy and literacy skills",
      "Must not be currently employed",
    ],
  },
};

const fallbackOpportunity = {
  id: "opp-default",
  title: "Opportunity Details",
  organisation: "Various",
  location: "Eastern Cape",
  type: "Job",
  sector: "General",
  closing: "30 April 2026",
  status: "active" as const,
  description: "Full details for this opportunity will be available once your profile is verified.",
  requirements: ["Please check back for requirements."],
};

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "opp-1";
  const opp = opportunityData[id] ?? { ...fallbackOpportunity, id };

  const [applied, setApplied] = useState(false);
  const [modal,   setModal]   = useState(false);

  function handleApply() {
    setApplied(true);
    setModal(true);
  }

  return (
    <>
      <PageWrapper>
        <Link href="/learner/opportunities" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft size={15} /> Back to Opportunities
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-sm p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  {opp.type}
                </span>
                <StatusBadge status={opp.status} />
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-3">{opp.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Building2 size={14} /> {opp.organisation}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {opp.location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> Closes {opp.closing}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={14} /> {opp.sector}</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-6">
              <h2 className="font-semibold text-slate-900 mb-3">About this opportunity</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{opp.description}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-sm p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {opp.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar apply card */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-sm p-6 sticky top-20">
              {opp.salary && (
                <div className="mb-4 pb-4 border-b border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Salary / Stipend</p>
                  <p className="text-sm font-semibold text-slate-900">{opp.salary}</p>
                </div>
              )}
              {applied ? (
                <div className="w-full py-3 rounded-sm text-sm font-semibold text-center text-emerald-700 bg-emerald-50 border border-emerald-200 mb-3 flex items-center justify-center gap-2">
                  <CheckCircle2 size={15} /> Applied
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  className="w-full py-3 rounded-sm text-sm font-semibold text-slate-900 mb-3 transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #34d399, #22d3ee)" }}
                >
                  Apply Now
                </button>
              )}
              <button className="w-full py-2.5 rounded-sm text-sm font-medium border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors">
                Save for Later
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">
                Closing date: {opp.closing}
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>

      {/* SMS modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center text-center gap-4 z-10">
            <button onClick={() => setModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)" }}>
              <MessageSquare size={28} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 mb-1">Application submitted!</p>
              <p className="text-sm text-slate-500">
                Your application for <span className="font-semibold text-slate-700">{opp.title}</span> at{" "}
                <span className="font-semibold text-slate-700">{opp.organisation}</span> has been received.
              </p>
            </div>
            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-semibold text-emerald-700">SMS confirmation sent</p>
                <p className="text-xs text-emerald-600 mt-0.5">A confirmation SMS has been sent to your registered number.</p>
              </div>
            </div>
            <button
              onClick={() => setModal(false)}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
