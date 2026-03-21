"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef   = useRef<number | null>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Clear any ongoing animation
    if (timerRef.current) clearTimeout(timerRef.current);
    if (rafRef.current)   cancelAnimationFrame(rafRef.current);

    // Start bar
    setWidth(0);
    setVisible(true);

    // Quickly jump to 80%, then complete on next tick
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      // Ease out: fast at start, slow near 80%
      const progress = Math.min(80, (elapsed / 400) * 80);
      setWidth(progress);
      if (progress < 80) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);

    // Complete after short delay
    timerRef.current = setTimeout(() => {
      setWidth(100);
      timerRef.current = setTimeout(() => setVisible(false), 300);
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="progress"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
          style={{ background: "transparent" }}
        >
          <div
            className="h-full transition-all duration-200 ease-out"
            style={{
              width: `${width}%`,
              background: "linear-gradient(90deg, #34d399, #22d3ee)",
              boxShadow: "0 0 8px rgba(52,211,153,0.6)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
