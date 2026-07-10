/*
 * Reports — PDF/CSV/JSON export, schedule automation
 * Design: HUD panels, monospace data values, semantic color discipline
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FileText,
  Download,
  Mail,
  Calendar,
  Clock,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus,
  Settings,
} from "lucide-react";

const reportTemplates = [
  { name: "Weekly Threat Summary", format: "PDF", schedule: "Every Monday 09:00", lastRun: "Mon, Jul 6" },
  { name: "Phishing Detection Log", format: "CSV", schedule: "Daily 18:00", lastRun: "Jul 10" },
  { name: "Monthly Compliance Report", format: "PDF", schedule: "1st of month", lastRun: "Jul 1" },
  { name: "Real-time IOC Feed", format: "JSON", schedule: "Continuous", lastRun: "Live" },
];

const exportFormats = [
  { format: "PDF", icon: FileText, description: "Formal report with charts and analysis" },
  { format: "CSV", icon: BarChart3, description: "Raw data for spreadsheet analysis" },
  { format: "JSON", icon: AlertTriangle, description: "Machine-readable format for integrations" },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div>
          <h1 className="font-display text-xl font-bold text-white">Reports</h1>
          <p className="text-xs text-[#5A6078] font-mono mt-0.5">Generate compliance-ready reports and schedule automated delivery</p>
        </div>

        {/* Quick Actions — HUD panels */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Generate Report", icon: FileText, color: "text-cyber-cyan" },
            { label: "Export All", icon: Download, color: "text-neon-purple" },
            { label: "Schedule", icon: Calendar, color: "text-safe-green" },
          ].map((action) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => toast.info("Reports — Feature coming soon")}
              className="hud-panel rounded-lg p-3 border-[rgba(255,255,255,0.04)] text-left hover:border-[rgba(108,92,231,0.2)] transition-colors"
            >
              <action.icon size={18} className={`${action.color} mb-2`} />
              <div className="text-xs text-white font-medium">{action.label}</div>
            </motion.button>
          ))}
        </div>

        {/* Report Templates — HUD panel */}
        <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Scheduled Reports</h3>
            </div>
            <Button size="sm" variant="outline" className="h-7 border-[rgba(255,255,255,0.08)] text-[#5A6078] hover:text-white font-mono text-[10px] uppercase tracking-wider" onClick={() => toast.info("Create report — Feature coming soon")}>
              <Plus size={11} className="mr-1.5" />
              New
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.04)]">
                  <th className="text-left py-2.5 px-3 text-[9px] text-[#5A6078] font-mono uppercase tracking-wider font-medium">Report</th>
                  <th className="text-left py-2.5 px-3 text-[9px] text-[#5A6078] font-mono uppercase tracking-wider font-medium">Format</th>
                  <th className="text-left py-2.5 px-3 text-[9px] text-[#5A6078] font-mono uppercase tracking-wider font-medium">Schedule</th>
                  <th className="text-left py-2.5 px-3 text-[9px] text-[#5A6078] font-mono uppercase tracking-wider font-medium">Last Run</th>
                  <th className="text-right py-2.5 px-3 text-[9px] text-[#5A6078] font-mono uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportTemplates.map((report, i) => (
                  <motion.tr
                    key={report.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <span className="text-white text-[11px] font-medium">{report.name}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <Badge variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#5A6078] font-mono text-[9px]">{report.format}</Badge>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1">
                        <Clock size={9} className="text-[#5A6078]" />
                        <span className="text-[10px] text-[#8B92A8] font-mono">{report.schedule}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] text-[#5A6078] font-mono">{report.lastRun}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-[#5A6078] hover:text-cyber-cyan" onClick={() => toast.info("Run now — Feature coming soon")}>
                          <Download size={11} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-[#5A6078] hover:text-neon-purple" onClick={() => toast.info("Settings — Feature coming soon")}>
                          <Settings size={11} />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Export Formats & Email Delivery */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Export Formats — HUD panel */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Download size={14} className="text-neon-purple" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Export Formats</h3>
            </div>
            <div className="space-y-2">
              {exportFormats.map((fmt, i) => (
                <button
                  key={fmt.format}
                  onClick={() => toast.info(`Export as ${fmt.format} — Feature coming soon`)}
                  className="w-full flex items-center gap-3 p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(108,92,231,0.2)] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-md bg-[rgba(108,92,231,0.08)] border border-[rgba(108,92,231,0.15)] flex items-center justify-center shrink-0">
                    <fmt.icon size={14} className="text-neon-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white font-medium">{fmt.format}</div>
                    <div className="text-[10px] text-[#5A6078]">{fmt.description}</div>
                  </div>
                  <Download size={12} className="text-[#5A6078]" />
                </button>
              ))}
            </div>
          </Card>

          {/* Email Delivery — HUD panel */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Email Delivery</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                <div>
                  <div className="text-xs text-white font-medium">Weekly Summary Delivery</div>
                  <div className="text-[10px] text-[#5A6078] font-mono mt-0.5">admin@phishguard.ai</div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-neon-purple" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                <div>
                  <div className="text-xs text-white font-medium">Alert Notifications</div>
                  <div className="text-[10px] text-[#5A6078] font-mono mt-0.5">security@corp.com</div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-neon-purple" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                <div>
                  <div className="text-xs text-white font-medium">Compliance Reports</div>
                  <div className="text-[10px] text-[#5A6078] font-mono mt-0.5">compliance@corp.com</div>
                </div>
                <Switch className="data-[state=checked]:bg-neon-purple" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
