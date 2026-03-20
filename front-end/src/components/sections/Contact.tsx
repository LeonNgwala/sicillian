"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, Github } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Backend integration pending — form data will POST to Django API
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[#0D9488] text-sm font-semibold uppercase tracking-widest">
            Get in Touch
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight">
            Interested in SkillsGrid?
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Whether you&apos;re a SETA, institution, employer, or incubator —
            reach out and we&apos;ll connect you to the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[#1B2A4A] mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#0D9488]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">Email</div>
                    <div className="text-[#1B2A4A] font-medium">
                      team@skillsgrid.co.za
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#0D9488]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">Location</div>
                    <div className="text-[#1B2A4A] font-medium">
                      Propella Business Incubator
                      <br />
                      Walmer, Port Elizabeth
                      <br />
                      Eastern Cape, South Africa
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <Github size={18} className="text-[#0D9488]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-0.5">
                      Open Source
                    </div>
                    <a
                      href="https://github.com/GambitX-01/sicillian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0D9488] font-medium hover:underline"
                    >
                      github.com/GambitX-01/sicillian
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="p-6 rounded-2xl bg-[#1B2A4A] text-white">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Built by
              </p>
              <p className="text-[#0D9488] font-bold text-lg mb-4">Team GambitX</p>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold">Bantu-Bethu Beya</div>
                  <div className="text-[#0D9488] text-sm">
                    Backend & API — Django + AI Integration
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Lutho Ngwala</div>
                  <div className="text-[#0D9488] text-sm">
                    Frontend & UI — Next.js
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Acxellent Mthombeni</div>
                  <div className="text-[#0D9488] text-sm">
                    Team GambitX
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Thapelo Sithole</div>
                  <div className="text-[#0D9488] text-sm">
                    Team GambitX
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 text-white/40 text-xs">
                  Nelson Mandela University · GambitX · Gqeberha
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 rounded-2xl bg-white border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-[#0D9488]/10 flex items-center justify-center mb-4">
                  <Send className="text-[#0D9488]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-[#1B2A4A] mb-2">
                  Message received!
                </h3>
                <p className="text-gray-500">
                  We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5 shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@organisation.co.za"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Organisation / Institution
                  </label>
                  <input
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    placeholder="e.g. MERSETA, Buffalo City TVET, Bay Software"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how you'd like to use SkillsGrid, or ask us anything..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0D9488] hover:bg-[#0f766e] text-white font-semibold transition-colors duration-200"
                >
                  Send Message <Send size={16} />
                </button>

                <p className="text-center text-xs text-gray-400">
                  Backend integration coming soon. Form data will be sent via
                  Django API.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
