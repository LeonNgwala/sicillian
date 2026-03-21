export default function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Solutions", href: "#solutions" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Who It's For", href: "#who" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#0f172a] border-t border-white/10">
      {/* Gradient stripe */}
      <div
        className="h-1 w-full"
        style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee, white, #22d3ee, #34d399)" }}
      />

      <div className="max-w-7xl mx-auto px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center"
              style={{ backgroundImage: "linear-gradient(135deg, #34d399, #22d3ee)" }}
            >
              <span className="text-slate-900 font-black text-xs">SG</span>
            </div>
            <span className="text-white font-semibold">
              Skills
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee)" }}
              >
                Grid
              </span>
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-white/80 text-xs uppercase tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-white/25 text-xs text-center">
            © {year} SkillsGrid · Team GambitX
            <br />
            MICT SETA · NMU · Bay Software · Gqeberha
          </p>
        </div>
      </div>
    </footer>
  );
}
