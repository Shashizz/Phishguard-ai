/*
 * Settings — Account, security, notifications, appearance
 * Design: HUD panels, monospace data values, operational copy
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import {
  Bell,
  Key,
  User,
  Shield as ShieldIcon,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2,
  Save,
  Moon,
  Sun,
  Monitor,
  Mail,
  Lock,
} from "lucide-react";

function ProfileSection() {
  return (
    <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
      <div className="flex items-center gap-2 mb-4">
        <User size={14} className="text-cyber-cyan" />
        <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Profile Configuration</h3>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-purple to-cyber-cyan flex items-center justify-center text-xl text-white font-bold shrink-0">
          U
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Full Name", value: "Security Admin" },
              { label: "Email", value: "admin@phishguard.ai" },
              { label: "Organization", value: "PhishGuard Inc." },
              { label: "Role", value: "Security Administrator" },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <Label className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider">{field.label}</Label>
                <Input defaultValue={field.value} className="h-8 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-white text-xs font-mono" />
              </div>
            ))}
          </div>
          <Button className="bg-gradient-to-r from-neon-purple to-cyber-cyan text-white border-0 h-8 text-xs hover:opacity-90 font-mono uppercase tracking-wider">
            <Save size={12} className="mr-1.5" />
            Save Configuration
          </Button>
        </div>
      </div>
    </Card>
  );
}

function SecuritySection() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Key size={14} className="text-neon-purple" />
          <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">API Keys</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Production Key", key: "pk_live_8f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c", lastUsed: "2h ago" },
            { label: "Development Key", key: "pk_test_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d", lastUsed: "1d ago" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-white font-medium">{item.label}</div>
                  <div className="text-[9px] text-[#5A6078] font-mono mt-0.5">Last used: {item.lastUsed}</div>
                </div>
                <Badge className="bg-[rgba(0,230,118,0.1)] text-safe-green border-[rgba(0,230,118,0.2)] text-[8px] font-mono uppercase">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={showKey ? item.key : item.key.slice(0, 8) + "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                  readOnly
                  className="h-8 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-white text-xs font-mono flex-1"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5A6078] hover:text-white" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#5A6078] hover:text-white" onClick={() => toast.success("Key copied")}>
                  <Copy size={13} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-threat-red hover:bg-[rgba(255,59,59,0.1)]">
                  <Trash2 size={13} />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full h-8 border-[rgba(255,255,255,0.06)] text-[#5A6078] hover:text-white font-mono text-[10px] uppercase tracking-wider" onClick={() => toast.info("Generate key — Feature coming soon")}>
            <Plus size={11} className="mr-1.5" />
            Generate New Key
          </Button>
        </div>
      </Card>

      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldIcon size={14} className="text-cyber-cyan" />
          <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Security Controls</h3>
        </div>
        <div className="space-y-2">
          {[
            { label: "Two-Factor Authentication", desc: "Require 2FA for all login attempts", enabled: true },
            { label: "IP Whitelisting", desc: "Restrict API access to specific IP ranges", enabled: false },
            { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
            { label: "Login Alerts", desc: "Receive alert when account is accessed", enabled: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
              <div>
                <div className="text-xs text-white">{item.label}</div>
                <div className="text-[9px] text-[#5A6078]">{item.desc}</div>
              </div>
              <Switch defaultChecked={item.enabled} className="data-[state=checked]:bg-neon-purple" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NotificationsSection() {
  return (
    <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell size={14} className="text-cyber-cyan" />
        <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Notification Preferences</h3>
      </div>
      <div className="space-y-2">
        {[
          { label: "Critical Threat Alerts", desc: "Immediate notification for high-severity detections", enabled: true },
          { label: "Daily Summary", desc: "Daily digest of all detected threats", enabled: true },
          { label: "Weekly Reports", desc: "Automated weekly security reports via email", enabled: true },
          { label: "API Quota Warnings", desc: "Alert when approaching API usage limits", enabled: false },
          { label: "New Campaign Detection", desc: "Notify when new phishing campaigns are identified", enabled: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
            <div>
              <div className="text-xs text-white">{item.label}</div>
              <div className="text-[9px] text-[#5A6078]">{item.desc}</div>
            </div>
            <Switch defaultChecked={item.enabled} className="data-[state=checked]:bg-neon-purple" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function AppearanceSection() {
  return (
    <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Moon size={14} className="text-neon-purple" />
        <h3 className="font-display font-semibold text-white text-[10px] uppercase tracking-wider">Theme Configuration</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Dark", icon: Moon, active: true },
          { label: "Light", icon: Sun, active: false },
          { label: "System", icon: Monitor, active: false },
        ].map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.label}
              className={`p-3 rounded-md border transition-all ${
                theme.active
                  ? "border-[rgba(108,92,231,0.4)] bg-[rgba(108,92,231,0.12)]"
                  : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.12)]"
              }`}
              onClick={() => toast.info(`${theme.label} mode — Feature coming soon`)}
            >
              <Icon size={16} className={`mx-auto mb-1.5 ${theme.active ? "text-neon-purple" : "text-[#5A6078]"}`} />
              <div className={`text-xs text-center font-mono ${theme.active ? "text-white" : "text-[#5A6078]"}`}>{theme.label}</div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-4">
        <div>
          <h1 className="font-display text-xl font-bold text-white">Configuration</h1>
          <p className="text-xs text-[#5A6078] font-mono mt-0.5">Manage account, security controls, and system preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] mb-4 w-full">
            <TabsTrigger value="profile" className="flex-1 font-mono text-[10px] uppercase tracking-wider data-[state=active]:bg-[rgba(108,92,231,0.15)] data-[state=active]:text-white">
              <User size={11} className="mr-1" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex-1 font-mono text-[10px] uppercase tracking-wider data-[state=active]:bg-[rgba(108,92,231,0.15)] data-[state=active]:text-white">
              <ShieldIcon size={11} className="mr-1" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 font-mono text-[10px] uppercase tracking-wider data-[state=active]:bg-[rgba(108,92,231,0.15)] data-[state=active]:text-white">
              <Bell size={11} className="mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1 font-mono text-[10px] uppercase tracking-wider data-[state=active]:bg-[rgba(108,92,231,0.15)] data-[state=active]:text-white">
              <Moon size={11} className="mr-1" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile"><ProfileSection /></TabsContent>
          <TabsContent value="security"><SecuritySection /></TabsContent>
          <TabsContent value="notifications"><NotificationsSection /></TabsContent>
          <TabsContent value="appearance"><AppearanceSection /></TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
