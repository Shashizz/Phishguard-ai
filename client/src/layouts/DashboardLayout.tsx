/*
 * DashboardLayout — Persistent sidebar layout for all app pages
 * Design: Cyber-Command HUD — dark sidebar with indigo accent edge, operational states, tactical typography
 */
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Shield,
  Search,
  AlertTriangle,
  BarChart3,
  FileText,
  Settings,
  X,
  Menu,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { path: "/scanner", label: "Email Scanner", icon: Search },
  { path: "/threats", label: "Threat Intel", icon: AlertTriangle },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/settings", label: "Configuration", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-void flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar — HUD style with left indigo accent */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full z-50 w-64 bg-[#0A0A0F] border-r border-[rgba(255,255,255,0.04)] transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo bar — with top accent line */}
        <div className="relative h-16 flex items-center gap-3 px-5 border-b border-[rgba(255,255,255,0.04)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[rgba(108,92,231,0.6)] via-transparent to-[rgba(0,210,255,0.3)]" />
          <img src="/manus-storage/logo_3e8ae906.png" alt="PhishGuard" className="w-8 h-8" />
          <span className="font-display font-bold text-lg text-white tracking-tight">
            PhishGuard <span className="text-cyber-cyan">AI</span>
          </span>
        </div>

        {/* Navigation — sharper active states with neon edge */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path} onClick={closeSidebar}>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? "bg-[rgba(108,92,231,0.12)] text-white border border-[rgba(108,92,231,0.35)] shadow-[0_0_12px_rgba(108,92,231,0.15)]"
                      : "text-[#5A6078] hover:text-[#8B92A8] hover:bg-[rgba(255,255,255,0.02)]"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-neon-purple" : "text-[#5A6078]"} />
                  <span className={isActive ? "text-white" : ""}>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom status — operational readout */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5A6078]">
            <div className="status-dot status-dot-live" />
            <span className="uppercase tracking-wider text-[10px]">System Operational</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-neon-purple to-cyber-cyan flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">Security Admin</div>
              <div className="text-xs text-[#5A6078] font-mono truncate">admin@phishguard.ai</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#5A6078] hover:text-white"
              onClick={() => setSidebarOpen(false)}
              asChild
            >
              <Link href="/settings">
                <Settings size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar — HUD chrome */}
        <header className="relative h-16 border-b border-[rgba(255,255,255,0.04)] bg-[#0A0A0F]/80 backdrop-blur-xl flex items-center px-4 lg:px-6 gap-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[rgba(108,92,231,0.4)] via-transparent to-[rgba(0,210,255,0.2)]" />
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[#5A6078] hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <div className="flex items-center gap-2 text-[#5A6078] text-sm lg:hidden">
            <ShieldCheck size={16} className="text-cyber-cyan" />
            <span className="font-display font-semibold text-white">PhishGuard AI</span>
          </div>

          {/* Search bar — operational search */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0 hidden sm:block">
            <button
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-sm text-[#5A6078] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
            >
              <Search size={14} className="text-[#5A6078]" />
              <span>Search operations, threats, configs...</span>
              <kbd className="ml-auto text-xs bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded text-[#5A6078] font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Right actions — alert + notifications */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#5A6078] hover:text-white relative"
              onClick={() => {
                /* toast */
              }}
            >
              <AlertTriangle size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-threat-red animate-pulse" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#5A6078] hover:text-white relative"
              onClick={() => {
                /* toast */
              }}
            >
              <Zap size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
            </Button>
          </div>
        </header>

        {/* Page content — grid-bg for tactical feel */}
        <main className="flex-1 overflow-auto">
          <div className="grid-bg min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
