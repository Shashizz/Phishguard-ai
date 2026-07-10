/*
 * CommandPalette — Ctrl/Cmd+K command palette for global navigation
 * Design: Instant response (no animation), HUD-style, monospace labels
 */
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  Search,
  AlertTriangle,
  BarChart3,
  FileText,
  Settings,
  Home,
} from "lucide-react";

const commands = [
  { path: "/", label: "Home", shortcut: "H", icon: Home },
  { path: "/dashboard", label: "Command Center", shortcut: "D", icon: LayoutDashboard },
  { path: "/scanner", label: "Email Scanner", shortcut: "S", icon: Search },
  { path: "/threats", label: "Threat Intel", shortcut: "T", icon: AlertTriangle },
  { path: "/analytics", label: "Analytics", shortcut: "A", icon: BarChart3 },
  { path: "/reports", label: "Reports", shortcut: "R", icon: FileText },
  { path: "/settings", label: "Configuration", shortcut: "C", icon: Settings },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search operations..." className="font-mono text-sm" />
      <CommandList>
        <CommandEmpty className="font-mono text-xs text-[#5A6078]">No operations found.</CommandEmpty>
        <CommandGroup heading="Operations" className="font-mono text-[10px] uppercase tracking-wider text-[#5A6078]">
          {commands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <CommandItem
                key={cmd.path}
                value={cmd.label}
                onSelect={() => {
                  setLocation(cmd.path);
                  setOpen(false);
                }}
                className="font-mono text-xs"
              >
                <Icon size={14} className="mr-2 text-cyber-cyan" />
                {cmd.label}
                <kbd className="ml-auto text-[9px] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 rounded text-[#5A6078] font-mono">
                  {cmd.shortcut}
                </kbd>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
