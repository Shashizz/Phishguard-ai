/*
 * Dashboard — SOC-style cybersecurity dashboard
 * Design: HUD panels, monospace data values, disciplined color semantics
 * Red = threat, Green = safe, Cyan/Indigo = intelligence, Orange/Yellow = risk severity
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Mail,
  AlertTriangle,
  CheckCircle,
  MailX,
  Activity,
  TrendingUp,
  TrendingDown,
  Globe,
  Cpu,
  Clock,
  Zap,
  Radar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data — threat (red) and safe (green) only
const detectionTrendData = [
  { day: "Mon", phishing: 12, safe: 340 },
  { day: "Tue", phishing: 8, safe: 380 },
  { day: "Wed", phishing: 15, safe: 320 },
  { day: "Thu", phishing: 6, safe: 410 },
  { day: "Fri", phishing: 18, safe: 290 },
  { day: "Sat", phishing: 3, safe: 150 },
  { day: "Sun", phishing: 5, safe: 180 },
];

const riskDistribution = [
  { name: "Low", value: 45, color: "#00E676" },
  { name: "Medium", value: 30, color: "#FFD600" },
  { name: "High", value: 15, color: "#FF6D00" },
  { name: "Critical", value: 10, color: "#FF3B3B" },
];

const threatTimeline = [
  { time: "08:42", event: "Phishing campaign detected — spoofed Microsoft login", severity: "high" },
  { time: "09:15", event: "Suspicious URL sandboxed — malware payload blocked", severity: "critical" },
  { time: "09:48", event: "New phishing domain added to blocklist", severity: "medium" },
  { time: "10:22", event: "AI model updated with 2,847 new samples", severity: "info" },
  { time: "11:03", event: "Threat feed: 3 new campaigns from Eastern Europe", severity: "high" },
  { time: "11:47", event: "Automated response: 156 emails quarantined", severity: "medium" },
];

const recentActivities = [
  { user: "admin@corp.com", action: "Scanned 45 emails", time: "2 min ago", status: "completed" },
  { user: "security@corp.com", action: "Updated threat rules", time: "15 min ago", status: "completed" },
  { user: "api-service", action: "Batch analysis: 1,200 emails", time: "1 hour ago", status: "completed" },
  { user: "it@corp.com", action: "Exported weekly report", time: "2 hours ago", status: "completed" },
];

const severityColors: Record<string, string> = {
  critical: "bg-[rgba(255,59,59,0.15)] text-threat-red border-[rgba(255,59,59,0.3)]",
  high: "bg-[rgba(255,109,0,0.15)] text-risk-orange border-[rgba(255,109,0,0.3)]",
  medium: "bg-[rgba(255,214,0,0.12)] text-risk-yellow border-[rgba(255,214,0,0.25)]",
  low: "bg-[rgba(0,230,118,0.12)] text-safe-green border-[rgba(0,230,118,0.25)]",
  info: "bg-[rgba(0,210,255,0.1)] text-cyber-cyan border-[rgba(0,210,255,0.25)]",
};

const severityDotColors: Record<string, string> = {
  critical: "#FF3B3B",
  high: "#FF6D00",
  medium: "#FFD600",
  low: "#00E676",
  info: "#00D2FF",
};

const statCards = [
  {
    title: "Threat Score",
    value: "87",
    max: "100",
    icon: Shield,
    color: "text-neon-purple",
    bg: "bg-[rgba(108,92,231,0.08)]",
    border: "border-[rgba(108,92,231,0.15)]",
  },
  {
    title: "Detection Accuracy",
    value: "99.7%",
    icon: ShieldCheck,
    color: "text-cyber-cyan",
    bg: "bg-[rgba(0,210,255,0.08)]",
    border: "border-[rgba(0,210,255,0.15)]",
  },
  {
    title: "Emails Scanned Today",
    value: "1,247",
    icon: Mail,
    color: "text-white",
    bg: "bg-[rgba(255,255,255,0.04)]",
    border: "border-[rgba(255,255,255,0.06)]",
  },
  {
    title: "Active Threats",
    value: "12",
    icon: AlertTriangle,
    color: "text-threat-red",
    bg: "bg-[rgba(255,59,59,0.08)]",
    border: "border-[rgba(255,59,59,0.15)]",
  },
  {
    title: "Safe Emails",
    value: "1,198",
    icon: CheckCircle,
    color: "text-safe-green",
    bg: "bg-[rgba(0,230,118,0.08)]",
    border: "border-[rgba(0,230,118,0.15)]",
  },
  {
    title: "Phishing Detected",
    value: "37",
    icon: MailX,
    color: "text-threat-red",
    bg: "bg-[rgba(255,59,59,0.08)]",
    border: "border-[rgba(255,59,59,0.15)]",
  },
];

function StatCard({ title, value, max, icon: Icon, color, bg, border }: typeof statCards[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`hud-panel rounded-lg p-4 border ${border}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-md ${bg} flex items-center justify-center`}>
          <Icon size={16} className={color} />
        </div>
        <span className="text-[10px] text-[#5A6078] font-mono uppercase tracking-wider">LIVE</span>
      </div>
      <div className="font-display text-xl font-bold text-white data-value">{value}</div>
      <div className="text-[11px] text-[#5A6078] mt-1 font-medium uppercase tracking-wider">{title}</div>
      {max && (
        <Progress value={87} className="mt-3 h-1 bg-[rgba(255,255,255,0.04)]" />
      )}
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Command Center</h1>
            <p className="text-xs text-[#5A6078] font-mono mt-0.5">Real-time threat monitoring and analysis — all systems operational</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[rgba(0,230,118,0.12)] text-safe-green border-[rgba(0,230,118,0.25)] font-mono text-[10px] uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-safe-green animate-pulse mr-1.5" />
              All Systems Normal
            </Badge>
            <Badge variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#5A6078] font-mono text-[10px]">
              <Clock size={11} className="mr-1" />
              Updated 2m ago
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Detection Trends — red for phishing, green for safe ONLY */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radar size={14} className="text-cyber-cyan" />
                <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Detection Trends</h3>
              </div>
              <Badge variant="outline" className="text-[#5A6078] border-[rgba(255,255,255,0.08)] text-[10px] font-mono">7 DAYS</Badge>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={detectionTrendData}>
                <defs>
                  <linearGradient id="phishingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3B3B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FF3B3B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="safeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E676" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00E676" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <YAxis stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="phishing" stroke="#FF3B3B" fill="url(#phishingGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="safe" stroke="#00E676" fill="url(#safeGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Distribution — semantic: green=low, yellow=medium, orange=high, red=critical */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-neon-purple" />
              <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Risk Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-[#5A6078] font-mono">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Threat Timeline */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-cyber-cyan" />
                <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Threat Feed</h3>
              </div>
            </div>
            <div className="space-y-2.5">
              {threatTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: severityDotColors[item.severity] || "#00D2FF" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono text-[#5A6078]">{item.time}</span>
                      <Badge className={`text-[9px] border font-mono ${severityColors[item.severity] || severityColors.info}`}>
                        {item.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#8B92A8]">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-neon-purple" />
                <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">Operations Log</h3>
              </div>
            </div>
            <div className="space-y-2.5">
              {recentActivities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                >
                  <div className="w-7 h-7 rounded-md bg-gradient-to-br from-neon-purple/30 to-cyber-cyan/30 flex items-center justify-center text-[10px] text-white font-bold shrink-0 font-mono">
                    {item.user[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#5A6078]">{item.user}</span>
                      <span className="text-[10px] text-[#5A6078] font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-white truncate">{item.action}</p>
                  </div>
                  <Badge className="bg-[rgba(0,230,118,0.1)] text-safe-green border-[rgba(0,230,118,0.25)] text-[9px] font-mono">
                    {item.status.toUpperCase()}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Confidence & World Map */}
        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="hud-panel rounded-lg border-[rgba(108,92,231,0.15)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">AI Confidence</h3>
            </div>
            <div className="text-center py-3">
              <div className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyber-cyan data-value">
                97.3%
              </div>
              <p className="text-[10px] text-[#5A6078] mt-1 font-mono">Average confidence across all detections</p>
              <Progress value={97.3} className="mt-3 h-1.5 bg-[rgba(255,255,255,0.04)]" />
            </div>
          </Card>

          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-neon-purple" />
              <h3 className="font-display font-semibold text-white text-xs uppercase tracking-wider">World Attack Map</h3>
            </div>
            <div className="relative h-36 rounded-md overflow-hidden">
              <img
                src="/manus-storage/threat-map_619ad4ba.png"
                alt="World Attack Map"
                className="w-full h-full object-cover rounded-md opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass rounded-md px-4 py-2 border border-[rgba(255,255,255,0.12)]">
                  <span className="text-xs text-white font-mono">Interactive map — Feature coming soon</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
