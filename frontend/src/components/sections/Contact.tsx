"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, Github } from "lucide-react";

const team = [
  { name: "Bantu-Bethu Beya", role: "Backend & API · Django + AI" },
  { name: "Lutho Ngwala", role: "Frontend & UI · Next.js" },
  { name: "Acxellent Mthombeni", role: "Team GambitX" },
  { name: "Thapelo Sithole", role: "Team GambitX" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [form, setForm] = useState({ name: "", email: "", organisation: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Backend integration pending — will POST to Django API once published
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0f172a 0%, #0f172a 60%, #1e293b 100%)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, #34d399 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* SA flag left stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundImage: "linear-gradient(to bottom, #34d399, #22d3ee)" }} />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#34d399]/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-10">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} />
            <span className="text-[#67e8f9] text-xs font-bold uppercase tracking-widest">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] max-w-lg">
            Interested in{" "}
            <span className="text-[#34d399]">SkillsGrid?</span>
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-md leading-relaxed">
            Whether you&apos;re a SETA, institution, employer, or incubator — reach out and
            we&apos;ll connect you to the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact details */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "team@skillsgrid.co.za", href: null },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Propella Business Incubator\nWalmer, Port Elizabeth\nEastern Cape, SA",
                  href: null,
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/GambitX-01/sicillian",
                  href: "https://github.com/GambitX-01/sicillian",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-[#34d399]/15 border border-[#34d399]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-[#34d399]" />
                  </div>
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-[#67e8f9] text-sm hover:underline underline-offset-4">
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/75 text-sm whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Team block */}
            <div className="border border-[#34d399]/25 rounded-sm overflow-hidden">
              <div className="px-5 py-3 bg-[#34d399]/10 border-b border-[#34d399]/20">
                <p className="text-[#67e8f9] text-xs font-bold uppercase tracking-widest">
                  Team GambitX
                </p>
              </div>
              <div className="divide-y divide-[#34d399]/15">
                {team.map((member) => (
                  <div key={member.name} className="px-5 py-3.5">
                    <p className="text-white text-sm font-semibold">{member.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{member.role}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-[#34d399]/5 border-t border-[#34d399]/15">
                <p className="text-white/25 text-xs">
                  Nelson Mandela University · Bay Software · Gqeberha
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-[#34d399]/25 rounded-sm bg-[#34d399]/5">
                <div className="w-14 h-14 rounded-sm bg-[#34d399]/20 border border-[#34d399]/30 flex items-center justify-center mb-4">
                  <Send className="text-[#34d399]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message received.</h3>
                <p className="text-white/40 text-sm">We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-[#34d399]/20 rounded-sm bg-[#0f172a]/60 backdrop-blur-sm p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                    { name: "email", label: "Email", placeholder: "you@organisation.co.za", type: "email" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="text-white/50 text-xs font-bold uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-sm bg-white/5 border border-[#34d399]/25 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#34d399]/60 transition"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/50 text-xs font-bold uppercase tracking-wider">
                    Organisation
                  </label>
                  <input
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    placeholder="e.g. MERSETA, Buffalo City TVET, Bay Software"
                    className="w-full px-4 py-2.5 rounded-sm bg-white/5 border border-[#34d399]/25 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#34d399]/60 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/50 text-xs font-bold uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how you'd like to use SkillsGrid..."
                    className="w-full px-4 py-2.5 rounded-sm bg-white/5 border border-[#34d399]/25 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#34d399]/60 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-sm text-slate-900 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
                >
                  Send Message <Send size={14} />
                </button>

                <p className="text-center text-white/20 text-xs">
                  Backend integration pending · Will connect to Django API on publish
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
