/*
 * ThreatIntelligence — MITRE ATT&CK mapped threat feed
 * Design: HUD panels, monospace data values, semantic color discipline
 * Red = active threat, Green = mitigated, Cyan/Indigo = intelligence
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Globe,
  Shield,
  Activity,
  ExternalLink,
  Clock,
  Target,
  Bug,
  Filter,
  Search,
  ShieldCheck,
  XCircle,
  Cpu,
  Radar,
} from "lucide-react";

const campaigns = [
  { name: "DarkGate-42", type: "Credential Harvesting", origin: "Eastern Europe", targets: "Financial institutions", status: "active", severity: "critical", emails: "12,400+", detected: "2h ago" },
  { name: "InvoiceTrap-X", type: "Malware Distribution", origin: "Southeast Asia", targets: "Enterprise employees", status: "mitigated", severity: "high", emails: "8,200+", detected: "5h ago" },
  { name: "WhaleHunter-7", type: "Business Email Compromise", origin: "West Africa", targets: "Accounting departments", status: "active", severity: "critical", emails: "5,800+", detected: "8h ago" },
  { name: "QRPhish-19", type: "Quishing (QR Phishing)", origin: "South America", targets: "Mobile users", status: "monitoring", severity: "medium", emails: "3,100+", detected: "12h ago" },
];

const dangerousDomains = [
  { domain: "amaz0n-security.com", type: "Typosquatting", firstSeen: "2 days ago", reports: 847 },
  { domain: "microsoft-verify.net", type: "Impersonation", firstSeen: "4 days ago", reports: 623 },
  { domain: "paypal-resolve.org", type: "Typosquatting", firstSeen: "1 week ago", reports: 512 },
  { domain: "apple-id-update.com", type: "Impersonation", firstSeen: "1 week ago", reports: 489 },
  { domain: "google-drive-share.net", type: "Social Engineering", firstSeen: "10 days ago", reports: 356 },
];

const suspiciousIPs = [
  { ip: "185.220.101.42", location: "DE", type: "Tor Exit Node", reports: 1240 },
  { ip: "45.134.26.178", location: "RU", type: "C2 Server", reports: 892 },
  { ip: "103.224.182.55", location: "CN", type: "Phishing Host", reports: 756 },
  { ip: "198.235.24.101", location: "US", type: "Bulletproof Hosting", reports: 634 },
];

const severityBadge: Record<string, string> = {
  critical: "bg-[rgba(255,59,59,0.12)] text-threat-red border-[rgba(255,59,59,0.25)]",
  high: "bg-[rgba(255,109,0,0.12)] text-risk-orange border-[rgba(255,109,0,0.25)]",
  medium: "bg-[rgba(255,214,0,0.1)] text-risk-yellow border-[rgba(255,214,0,0.2)]",
  low: "bg-[rgba(0,230,118,0.1)] text-safe-green border-[rgba(0,230,118,0.2)]",
};

const statusColors: Record<string, string> = {
  active: "bg-[rgba(255,59,59,0.12)] text-threat-red border-[rgba(255,59,59,0.2)]",
  mitigated: "bg-[rgba(0,230,118,0.1)] text-safe-green border-[rgba(0,230,118,0.2)]",
  monitoring: "bg-[rgba(0,210,255,0.1)] text-cyber-cyan border-[rgba(0,210,255,0.2)]",
};

const statusDotColors: Record<string, string> = {
  active: "#FF3B3B",
  mitigated: "#00E676",
  monitoring: "#00D2FF",
};

const mitreTactics = [
  { id: "TA0001", name: "Initial Access", technique: "T1566 - Phishing", description: "Adversaries send malicious communications to trick recipients" },
  { id: "TA0002", name: "Execution", technique: "T1059 - Command and Scripting", description: "Malicious scripts executed via email attachments" },
  { id: "TA0003", name: "Persistence", technique: "T1136 - Create Account", description: "Creating accounts for persistent access" },
  { id: "TA0006", name: "Credential Access", technique: "T1078 - Valid Accounts", description: "Phishing to obtain valid user credentials" },
  { id: "TA0008", name: "Lateral Movement", technique: "T1550 - Use Alternate Authentication", description: "Using stolen credentials to move through network" },
  { id: "TA0009", name: "Collection", technique: "T1005 - Data from Local System", description: "Exfiltrating data after compromise" },
];

export default function ThreatIntelligence() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Threat Intelligence</h1>
            <p className="text-xs text-[#5A6078] font-mono mt-0.5">Live threat feeds, campaign tracking, and MITRE ATT&CK mapping</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 border-[rgba(255,255,255,0.08)] text-[#5A6078] hover:text-white font-mono text-[10px] uppercase tracking-wider">
              <Filter size={11} className="mr-1.5" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 border-[rgba(255,255,255,0.08)] text-[#5A6078] hover:text-white font-mono text-[10px] uppercase tracking-wider">
              <Search size={11} className="mr-1.5" />
              Search
            </Button>
          </div>
        </div>

        {/* Stats Row — HUD panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Active Threats", value: "4", icon: AlertTriangle, color: "text-threat-red", bg: "bg-[rgba(255,59,59,0.08)]" },
            { label: "Dangerous Domains", value: "12.8K", icon: Globe, color: "text-cyber-cyan", bg: "bg-[rgba(0,210,255,0.08)]" },
            { label: "Suspicious IPs", value: "3.3K", icon: Target, color: "text-neon-purple", bg: "bg-[rgba(108,92,231,0.08)]" },
            { label: "IOC Entries", value: "1,847", icon: Cpu, color: "text-cyber-cyan", bg: "bg-[rgba(0,210,255,0.08)]" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hud-panel rounded-lg p-3 border-[rgba(255,255,255,0.04)]"
            >
              <div className={`w-8 h-8 rounded-md ${stat.bg} flex items-center justify-center mb-2`}>
                <stat.icon size={14} className={stat.color} />
              </div>
              <div className="font-display text-xl font-bold text-white data-value">{stat.value}</div>
              <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Phishing Campaigns — HUD panel */}
        <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-threat-red" />
            <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Active Campaigns</h3>
          </div>
          <div className="space-y-2">
            {campaigns.map((campaign, i) => (
              <motion.div
                key={campaign.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
              >
                <div className={`w-2 h-2 rounded-full shrink-0`} style={{ backgroundColor: statusDotColors[campaign.status] }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white font-mono text-[11px]">{campaign.name}</span>
                    <Badge className={`text-[9px] border font-mono ${severityBadge[campaign.severity]}`}>{campaign.severity.toUpperCase()}</Badge>
                    <Badge className={`text-[9px] border font-mono ${statusColors[campaign.status]}`}>
                      <div className="w-1 h-1 rounded-full mr-1" style={{ backgroundColor: statusDotColors[campaign.status] }} />
                      {campaign.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-[#5A6078] font-mono">
                    <span>{campaign.type}</span>
                    <span className="text-[rgba(255,255,255,0.1)]">|</span>
                    <span>{campaign.origin}</span>
                    <span className="text-[rgba(255,255,255,0.1)]">|</span>
                    <span>{campaign.emails} emails</span>
                    <span className="text-[rgba(255,255,255,0.1)]">|</span>
                    <span className="flex items-center gap-1"><Clock size={9} />{campaign.detected}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Dangerous Domains — HUD panel */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-cyber-cyan" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Dangerous Domains</h3>
            </div>
            <div className="space-y-2">
              {dangerousDomains.map((domain, i) => (
                <div key={domain.domain} className="flex items-center gap-3 p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                  <XCircle size={11} className="text-threat-red shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-mono text-[11px]">{domain.domain}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#5A6078] font-mono text-[8px]">{domain.type}</Badge>
                      <span className="text-[9px] text-[#5A6078] font-mono">Seen {domain.firstSeen}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-mono text-[11px] font-semibold">{domain.reports}</span>
                    <div className="text-[9px] text-[#5A6078] font-mono">reports</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suspicious IPs — HUD panel */}
          <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-neon-purple" />
              <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Suspicious IPs</h3>
            </div>
            <div className="space-y-2">
              {suspiciousIPs.map((ip, i) => (
                <div key={ip.ip} className="flex items-center gap-3 p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-mono text-[11px]">{ip.ip}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className="text-[8px] border font-mono bg-[rgba(108,92,231,0.12)] text-neon-purple border-[rgba(108,92,231,0.25)]">{ip.location}</Badge>
                      <Badge className="text-[8px] border font-mono bg-[rgba(255,59,59,0.12)] text-threat-red border-[rgba(255,59,59,0.25)]">{ip.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-mono text-[11px] font-semibold">{ip.reports}</span>
                    <div className="text-[9px] text-[#5A6078] font-mono">reports</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* MITRE ATT&CK Mapping — HUD panel */}
        <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-cyber-cyan" />
            <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">MITRE ATT&CK Mapping</h3>
            <Badge className="text-[9px] font-mono bg-[rgba(0,210,255,0.1)] text-cyber-cyan border-[rgba(0,210,255,0.2)]">FRAMEWORK</Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {mitreTactics.map((tactic) => (
              <div key={tactic.id} className="p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(108,92,231,0.2)] transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge className="text-[8px] font-mono bg-[rgba(108,92,231,0.12)] text-neon-purple border-[rgba(108,92,231,0.25)]">{tactic.id}</Badge>
                  <Bug size={10} className="text-[#5A6078]" />
                </div>
                <div className="text-xs font-semibold text-white mb-0.5">{tactic.name}</div>
                <div className="text-[10px] text-cyber-cyan font-mono mb-1">{tactic.technique}</div>
                <p className="text-[10px] text-[#5A6078] leading-relaxed">{tactic.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights — HUD panel with indigo accent */}
        <Card className="hud-panel rounded-lg border-[rgba(108,92,231,0.15)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={14} className="text-neon-purple" />
            <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">AI-Powered Insights</h3>
          </div>
          <div className="space-y-2">
            {[
              "Credential harvesting campaigns increased 34% this week, primarily targeting financial sector",
              "New quishing (QR phishing) technique detected — attackers using QR codes to bypass traditional filters",
              "3 new bulletproof hosting providers identified serving phishing infrastructure",
              "AI model confidence improved to 97.3% after processing 2.4M new samples",
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-purple mt-1.5 shrink-0" />
                <span className="text-xs text-[#8B92A8]">{insight}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
