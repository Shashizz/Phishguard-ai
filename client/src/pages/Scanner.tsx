/*
 * Scanner — Email Scanner with paste/upload, AI analysis results
 * Design: HUD panels, monospace data values, semantic color discipline
 * Red = phishing/threat, Green = safe/verified, Cyan/Indigo = intelligence
 */
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import {
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
  Link as LinkIcon,
  Globe,
  Eye,
  Brain,
  ChevronRight,
  Copy,
  XCircle,
  Terminal,
} from "lucide-react";

interface AnalysisResult {
  isPhishing: boolean;
  confidence: number;
  riskLevel: "critical" | "high" | "medium" | "low" | "safe";
  senderRisk: number;
  domainRisk: number;
  urlRisk: number;
  contentRisk: number;
  details: {
    from: string;
    subject: string;
    urls: string[];
    suspiciousHeaders: string[];
    indicators: string[];
  };
}

const mockPhishingResult: AnalysisResult = {
  isPhishing: true,
  confidence: 96.8,
  riskLevel: "critical",
  senderRisk: 89,
  domainRisk: 95,
  urlRisk: 92,
  contentRisk: 78,
  details: {
    from: "security@amaz0n-security.com",
    subject: "URGENT: Your Amazon Account Has Been Suspended",
    urls: ["http://amaz0n-verify.net/account/confirm", "http://bit.ly/3xK9pQ"],
    suspiciousHeaders: ["SPF Fail", "DKIM Mismatch", "No DMARC Policy"],
    indicators: [
      "Domain registered 3 days ago",
      "Typosquatting detected (amaz0n vs amazon)",
      "URL shortener masking destination",
      "Urgency language and threat of account closure",
      "Mismatched sender display name",
    ],
  },
};

const mockSafeResult: AnalysisResult = {
  isPhishing: false,
  confidence: 98.2,
  riskLevel: "safe",
  senderRisk: 5,
  domainRisk: 3,
  urlRisk: 8,
  contentRisk: 12,
  details: {
    from: "noreply@github.com",
    subject: "Your weekly digest for Oct 15 — GitHub",
    urls: ["https://github.com/notifications", "https://github.com/settings"],
    suspiciousHeaders: [],
    indicators: [
      "Verified sender with valid SPF/DKIM/DMARC",
      "Domain reputation: excellent",
      "No suspicious URL patterns detected",
      "Content matches expected format",
    ],
  },
};

function RiskMeter({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#5A6078] font-mono uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function AnalysisResults({ result }: { result: AnalysisResult }) {
  const riskColors: Record<string, string> = {
    critical: "#FF3B3B",
    high: "#FF6D00",
    medium: "#FFD600",
    low: "#00E676",
    safe: "#00E676",
  };
  const color = riskColors[result.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      {/* Verdict Banner — HUD-style with left accent border */}
      <div
        className={`rounded-lg p-4 border-l-2 ${
          result.isPhishing
            ? "hud-alert border-l-threat-red"
            : "hud-verified border-l-safe-green"
        }`}
      >
        <div className="flex items-center gap-3">
          {result.isPhishing ? (
            <ShieldAlert size={22} className="text-threat-red shrink-0" />
          ) : (
            <ShieldCheck size={22} className="text-safe-green shrink-0" />
          )}
          <div>
            <div className="text-base font-display font-bold text-white">
              {result.isPhishing ? "THREAT DETECTED" : "EMAIL VERIFIED SAFE"}
            </div>
            <div className="text-[10px] text-[#5A6078] mt-0.5 font-mono uppercase tracking-wider">
              Confidence: {result.confidence}% — {result.isPhishing ? "Immediate action recommended" : "No action required"}
            </div>
          </div>
          <div className="ml-auto text-right shrink-0">
            <div className="text-2xl font-display font-bold data-value" style={{ color }}>
              {result.confidence}%
            </div>
            <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider">Confidence</div>
          </div>
        </div>
      </div>

      {/* Email Details — HUD panel */}
      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Mail size={12} className="text-cyber-cyan" />
          <h4 className="text-[10px] font-semibold text-white font-mono uppercase tracking-wider">Email Metadata</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider">From</div>
            <div className="text-white font-mono text-xs mt-0.5">{result.details.from}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider">Subject</div>
            <div className="text-white text-xs mt-0.5">{result.details.subject}</div>
          </div>
        </div>
      </Card>

      {/* Risk Meters — HUD panel */}
      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={12} className="text-neon-purple" />
          <h4 className="text-[10px] font-semibold text-white font-mono uppercase tracking-wider">Risk Analysis</h4>
        </div>
        <div className="space-y-2.5">
          <RiskMeter value={result.senderRisk} label="Sender Risk" color={color} />
          <RiskMeter value={result.domainRisk} label="Domain Risk" color={color} />
          <RiskMeter value={result.urlRisk} label="URL Risk" color={color} />
          <RiskMeter value={result.contentRisk} label="Content Risk" color={color} />
        </div>
      </Card>

      {/* URLs — HUD panel */}
      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon size={12} className="text-cyber-cyan" />
          <h4 className="text-[10px] font-semibold text-white font-mono uppercase tracking-wider">URL Analysis</h4>
        </div>
        <div className="space-y-2">
          {result.details.urls.map((url) => (
            <div key={url} className="flex items-center gap-2 p-2.5 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
              <Globe size={12} className="text-[#5A6078] shrink-0" />
              <span className="text-xs text-white font-mono flex-1 truncate">{url}</span>
              {result.isPhishing ? (
                <XCircle size={12} className="text-threat-red shrink-0" />
              ) : (
                <CheckCircle size={12} className="text-safe-green shrink-0" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Indicators — HUD panel */}
      <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
        <div className="flex items-center gap-2 mb-3">
          {result.isPhishing ? (
            <AlertTriangle size={12} className="text-risk-orange" />
          ) : (
            <CheckCircle size={12} className="text-safe-green" />
          )}
          <h4 className="text-[10px] font-semibold text-white font-mono uppercase tracking-wider">
            {result.isPhishing ? "Suspicious Indicators" : "Verification Checks"}
          </h4>
        </div>
        <div className="space-y-2">
          {result.details.indicators.map((indicator, i) => (
            <div key={i} className="flex items-start gap-2">
              {result.isPhishing ? (
                <XCircle size={10} className="text-threat-red mt-1 shrink-0" />
              ) : (
                <CheckCircle size={10} className="text-safe-green mt-1 shrink-0" />
              )}
              <span className="text-xs text-[#8B92A8]">{indicator}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Suspicious Headers — red alert panel */}
      {result.details.suspiciousHeaders.length > 0 && (
        <Card className="hud-alert rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info size={12} className="text-threat-red" />
            <h4 className="text-[10px] font-semibold text-white font-mono uppercase tracking-wider">Suspicious Headers</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.details.suspiciousHeaders.map((header) => (
              <Badge key={header} className="bg-[rgba(255,59,59,0.12)] text-threat-red border-[rgba(255,59,59,0.25)] font-mono text-[10px]">
                {header}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
}

export default function Scanner() {
  const [activeTab, setActiveTab] = useState("paste");
  const [emailContent, setEmailContent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!emailContent.trim()) {
      toast.error("Paste email content to begin analysis");
      return;
    }
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const isPhishing = emailContent.toLowerCase().includes("urgent") ||
        emailContent.toLowerCase().includes("suspended") ||
        emailContent.toLowerCase().includes("verify") ||
        emailContent.toLowerCase().includes("click here");
      setResult(isPhishing ? mockPhishingResult : mockSafeResult);
      setAnalyzing(false);
      toast.success(isPhishing ? "Threat detected — review findings below" : "Email verified safe");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-white">Email Scanner</h1>
            <p className="text-xs text-[#5A6078] font-mono mt-0.5">Paste email content for AI-powered phishing analysis</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] mb-4 w-full">
                  <TabsTrigger value="paste" className="flex-1 font-mono text-[10px] uppercase tracking-wider">
                    <FileText size={12} className="mr-1.5" />
                    Paste
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex-1 font-mono text-[10px] uppercase tracking-wider">
                    <Upload size={12} className="mr-1.5" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="paste" className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-[10px] text-[#5A6078] font-mono uppercase tracking-wider">Email Content</label>
                    <Textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      placeholder={`Paste email headers, body text, or full .eml content here...`}
                      className="min-h-[180px] bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] text-white font-mono text-xs resize-none focus:border-[rgba(108,92,231,0.4)]"
                    />
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-gradient-to-r from-neon-purple to-cyber-cyan text-white border-0 h-10 hover:opacity-90 font-mono text-xs uppercase tracking-wider"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 size={14} className="mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Terminal size={14} className="mr-2" />
                        Analyze Email
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="upload">
                  <div className="border border-dashed border-[rgba(255,255,255,0.08)] rounded-lg p-6 text-center">
                    <Upload size={28} className="mx-auto mb-3 text-[#5A6078]" />
                    <p className="text-sm text-white mb-1 font-mono text-xs">Drop .eml or .msg file here</p>
                    <p className="text-[10px] text-[#5A6078] font-mono mb-3">Supported formats: .eml, .msg</p>
                    <Button variant="outline" className="border-[rgba(255,255,255,0.08)] text-[#5A6078] hover:text-white font-mono text-[10px] uppercase tracking-wider" onClick={() => toast.info("File upload — Feature coming soon")}>
                      Browse Files
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quick Samples */}
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)]">
                <p className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider mb-2">Quick samples:</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-[rgba(255,59,59,0.15)] text-risk-orange hover:text-threat-red hover:border-[rgba(255,59,59,0.3)] text-[9px] font-mono uppercase"
                    onClick={() => {
                      setEmailContent(
                        `From: security@amaz0n-security.com\nSubject: URGENT: Your Amazon Account Has Been Suspended\n\nDear Customer,\nWe have detected unusual activity on your account. Please verify your identity by clicking the link below within 24 hours or your account will be permanently closed.\n\nClick here: http://amaz0n-verify.net/account/confirm\n\nAmazon Security Team`
                      );
                    }}
                  >
                    <AlertTriangle size={10} className="mr-1" />
                    Phishing Sample
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-[rgba(0,230,118,0.15)] text-safe-green hover:border-[rgba(0,230,118,0.3)] text-[9px] font-mono uppercase"
                    onClick={() => {
                      setEmailContent(
                        `From: noreply@github.com\nSubject: Your weekly digest for Oct 15 — GitHub\n\nHere's a summary of your activity this week on GitHub. You reviewed 3 pull requests and merged 2 branches. Your repositories have 12 new stars.\n\nView your activity: https://github.com/notifications\n\nGitHub Team`
                      );
                    }}
                  >
                    <CheckCircle size={10} className="mr-1" />
                    Safe Sample
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {analyzing ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="hud-panel rounded-lg border-[rgba(108,92,231,0.2)] p-8 text-center">
                    <Brain size={40} className="mx-auto mb-3 text-neon-purple animate-pulse" />
                    <h3 className="text-base font-display font-semibold text-white mb-2">Neural Network Analyzing</h3>
                    <p className="text-xs text-[#5A6078] font-mono mb-4">Examining sender reputation, domain patterns, URL safety, and content signals...</p>
                    <div className="max-w-xs mx-auto">
                      <Progress value={65} className="h-1.5 bg-[rgba(255,255,255,0.04)]" />
                    </div>
                  </Card>
                </motion.div>
              ) : result ? (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AnalysisResults result={result} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="hud-panel rounded-lg border-[rgba(255,255,255,0.04)] p-8 text-center">
                    <Shield size={40} className="mx-auto mb-3 text-[#5A6078]" />
                    <h3 className="text-base font-display font-semibold text-white mb-2">Ready to Analyze</h3>
                    <p className="text-xs text-[#5A6078] font-mono max-w-sm mx-auto">
                      Paste an email or upload a file to begin AI-powered phishing detection. Our system analyzes sender reputation, domain patterns, URL safety, and content signals.
                    </p>
                    <div className="grid grid-cols-3 gap-3 mt-5 max-w-sm mx-auto">
                      {[
                        { label: "Sender", icon: Mail },
                        { label: "Domain", icon: Globe },
                        { label: "Content", icon: Eye },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                          <item.icon size={14} className="mx-auto mb-1.5 text-cyber-cyan" />
                          <div className="text-[9px] text-[#5A6078] font-mono uppercase tracking-wider">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
