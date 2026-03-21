"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/97 backdrop-blur-md shadow-lg border-b border-[#34d399]/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          {/* SA flag stripe accent */}
          <div className="flex flex-col gap-0.5">
            <div className="w-1 h-1.5 bg-[#34d399] rounded-full" />
            <div className="w-1 h-1.5 bg-[#67e8f9] rounded-full" />
            <div className="w-1 h-1.5 bg-[#22d3ee] rounded-full" />
          </div>
          <div className="w-8 h-8 rounded bg-[#FFF] flex items-center justify-center border border-[#67e8f9]/30">
            <img src="TransparentLOgo.png" alt="LOGO"/> 
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            Skills<span className="text-[#67e8f9]">Grid</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }} className="px-4 py-2 rounded-sm text-slate-900 text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-90"
          >
            login
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f172a] border-t border-[#34d399]/30"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2 rounded bg-[#34d399] text-white text-sm font-semibold text-center"
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
