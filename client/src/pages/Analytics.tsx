/*
 * Analytics — Interactive charts with disciplined color semantics
 * Red = threat, Green = safe, Cyan/Indigo = intelligence, Orange/Yellow = risk severity
 * Monospace for all operational data values
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Radar,
  Activity,
  Shield,
  Zap,
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

const monthlyData = [
  { month: "Jan", detected: 420, safe: 12400, accuracy: 99.2 },
  { month: "Feb", detected: 380, safe: 11800, accuracy: 99.3 },
  { month: "Mar", detected: 510, safe: 13200, accuracy: 99.4 },
  { month: "Apr", detected: 470, safe: 12900, accuracy: 99.5 },
  { month: "May", detected: 620, safe: 14100, accuracy: 99.6 },
  { month: "Jun", detected: 580, safe: 13800, accuracy: 99.7 },
  { month: "Jul", detected: 540, safe: 14500, accuracy: 99.7 },
];

const threatCategories = [
  { name: "Credential Harvesting", value: 35, color: "#FF3B3B" },
  { name: "Malware Distribution", value: 25, color: "#FF6D00" },
  { name: "BEC / Whaling", value: 18, color: "#FFD600" },
  { name: "Quishing (QR)", value: 12, color: "#00D2FF" },
  { name: "Invoice Scam", value: 10, color: "#6C5CE7" },
];

const weeklyVolume = [
  { day: "Mon", volume: 1850 },
  { day: "Tue", volume: 2100 },
  { day: "Wed", volume: 1920 },
  { day: "Thu", volume: 2340 },
  { day: "Fri", volume: 1680 },
  { day: "Sat", volume: 820 },
  { day: "Sun", volume: 650 },
];

const accuracyTrend = [
  { month: "Jan", accuracy: 99.2 },
  { month: "Feb", accuracy: 99.3 },
  { month: "Mar", accuracy: 99.4 },
  { month: "Apr", accuracy: 99.5 },
  { month: "May", accuracy: 99.6 },
  { month: "Jun", accuracy: 99.7 },
  { month: "Jul", accuracy: 99.7 },
];

const riskTrend = [
  { month: "Jan", low: 42, medium: 28, high: 20, critical: 10 },
  { month: "Feb", low: 45, medium: 26, high: 19, critical: 10 },
  { month: "Mar", low: 40, medium: 30, high: 20, critical: 10 },
  { month: "Apr", low: 43, medium: 27, high: 20, critical: 10 },
  { month: "May", low: 38, medium: 32, high: 20, critical: 10 },
  { month: "Jun", low: 44, medium: 28, high: 18, critical: 10 },
  { month: "Jul", low: 45, medium: 30, high: 15, critical: 10 },
];

const customTooltipStyle = {
  background: "rgba(10,10,15,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  color: "#fff",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "12px",
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Analytics</h1>
            <p className="text-xs text-[#5A6078] font-mono mt-0.5">Detection history, threat categories, and risk trends</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#5A6078] font-mono text-[10px]">
              <Calendar size={11} className="mr-1" />
              JUL 2026
            </Badge>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[10px] text-[#5A6078] font-mono uppercase tracking-wider hover:text-white transition-colors"
            >
              <Download size={11} />
              Export
            </button>
          </div>
        </div>

        {/* Quick Stats — HUD panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total Scanned", value: "92.7K", change: "+12%", up: true, icon: Radar },
            { label: "Threats Blocked", value: "3,520", change: "+8%", up: false, icon: Shield },
            { label: "Accuracy Rate", value: "99.7%", change: "+0.1%", up: true, icon: TrendingUp },
            { label: "Avg Response", value: "0.3s", change: "-15%", up: true, icon: Zap },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hud-panel rounded-lg p-3 border-[rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={13} className="text-[#5A6078]" />
                <span className={`text-[9px] font-mono font-medium ${stat.change.startsWith("+") && !stat.up ? "text-threat-red" : "text-safe-green"}`}>
                  {stat.change}
                </span>
              </div>
              <div className="font-display text-xl font-bold text-white data-value">{stat.value}</div>
              <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Detection History — red for detected threats */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Radar size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Detection History</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3B3B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#FF3B3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <YAxis stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip contentStyle={customTooltipStyle} />
                <Area type="monotone" dataKey="detected" stroke="#FF3B3B" fill="url(#detGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Threat Categories — semantic colors only */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={14} className="text-neon-purple" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Threat Categories</h3>
            </div>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={threatCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {threatCategories.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {threatCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[10px] text-[#5A6078] font-mono flex-1">{cat.name}</span>
                    <span className="text-[10px] text-white font-mono">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Email Volume — indigo/cyan gradient for intelligence data */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Email Volume (Weekly)</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <YAxis stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip contentStyle={customTooltipStyle} />
                <Bar dataKey="volume" fill="url(#volumeGrad)" radius={[3, 3, 0, 0]} />
                <defs>
                  <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C5CE7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#00D2FF" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Accuracy Metrics — green for safe/verified */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-safe-green" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Accuracy Metrics</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="month" stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <YAxis domain={[98, 100]} stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#00E676"
                  strokeWidth={2}
                  dot={{ fill: "#00E676", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Risk Trends — semantic: green=low, yellow=medium, orange=high, red=critical */}
        <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown size={14} className="text-risk-orange" />
            <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Risk Distribution Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={riskTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
              <YAxis stroke="#5A6078" fontSize={11} fontFamily="'JetBrains Mono', monospace" />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="critical" stackId="a" fill="#FF3B3B" radius={[0, 0, 0, 0]} />
              <Bar dataKey="high" stackId="a" fill="#FF6D00" radius={[0, 0, 0, 0]} />
              <Bar dataKey="medium" stackId="a" fill="#FFD600" radius={[0, 0, 0, 0]} />
              <Bar dataKey="low" stackId="a" fill="#00E676" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-3">
            {[
              { label: "Critical", color: "#FF3B3B" },
              { label: "High", color: "#FF6D00" },
              { label: "Medium", color: "#FFD600" },
              { label: "Low", color: "#00E676" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-[#5A6078] font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
