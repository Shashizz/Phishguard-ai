/*
 * FloatingNav — Floating action panel with AI Chat, scroll-to-top, and quick scan
 * Design: HUD-style button with neon glow, glass expansion, operational labels
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { Bot, ChevronUp, Scan, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const appPages = ["/dashboard", "/scanner", "/threats", "/analytics", "/reports", "/settings"];

export function FloatingNav() {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState(false);
  const isApp = appPages.includes(location);

  if (!isApp) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-14 right-0 flex flex-col gap-2"
          >
            {/* Quick Scan */}
            <a href="/scanner" className="flex items-center gap-2">
              <Button
                className="h-9 w-9 rounded-lg bg-[#0A0A0F] border border-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(108,92,231,0.15)] hover:border-[rgba(108,92,231,0.3)] shadow-lg shadow-black/30"
                size="icon"
                onClick={() => setExpanded(false)}
              >
                <Scan size={15} />
              </Button>
              <span className="hidden sm:inline text-[10px] text-[#5A6078] font-mono px-2 py-1 rounded bg-[#0A0A0F]/80 border border-[rgba(255,255,255,0.04)]">Quick Scan</span>
            </a>

            {/* Scroll to Top */}
            <Button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setExpanded(false);
              }}
              className="h-9 w-9 rounded-lg bg-[#0A0A0F] border border-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(108,92,231,0.15)] hover:border-[rgba(108,92,231,0.3)] shadow-lg shadow-black/30"
              size="icon"
            >
              <ChevronUp size={15} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setExpanded(!expanded)}
        className="h-12 w-12 rounded-lg bg-gradient-to-br from-neon-purple to-cyber-cyan text-white shadow-lg shadow-[rgba(108,92,231,0.3)] hover:shadow-[rgba(108,92,231,0.5)] transition-shadow duration-200 border-0"
        size="icon"
      >
        <Bot size={18} />
      </Button>
    </div>
  );
}
