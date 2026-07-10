/*
 * LandingPage — Cyber-Command theme
 * Full-bleed dark sections, glassmorphism cards, neon accents, smooth animations
 * Brand voice: decisive, technical, operational — no generic marketing fluff
 */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Shield,
  Zap,
  Eye,
  Brain,
  ShieldCheck,
  Activity,
  Lock,
  Globe,
  ChevronRight,
  BarChart3,
  Mail,
  AlertTriangle,
  Clock,
  Target,
  Terminal,
  Radar,
} from "lucide-react";

const navItems = [
  { label: "Platform", href: "#" },
  { label: "Detection Engine", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Documentation", href: "#" },
];

const stats = [
  { value: "99.7%", label: "Detection Rate", icon: ShieldCheck },
  { value: "0.3s", label: "Analysis Speed", icon: Zap },
  { value: "2.4M+", label: "Emails Scanned Daily", icon: Activity },
  { value: "147", label: "Countries Covered", icon: Globe },
];

const features = [
  {
    icon: Brain,
    title: "Neural Detection Engine",
    description: "Transformer models trained on millions of phishing samples detect threats invisible to traditional filters — including zero-day campaigns.",
  },
  {
    icon: Eye,
    title: "Continuous Surveillance",
    description: "Real-time inbox monitoring with instant alerts when threats are detected across your organization's email infrastructure.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Infrastructure",
    description: "SOC 2 Type II certified with end-to-end encryption, zero data retention policy, and 99.99% uptime SLA.",
  },
  {
    icon: Globe,
    title: "Global Threat Intelligence",
    description: "MITRE ATT&CK mapped threat feed with campaign tracking, predictive analysis, and automated IOCs.",
  },
  {
    icon: BarChart3,
    title: "Operational Analytics",
    description: "Interactive dashboards with detection history, risk trends, and compliance-ready report generation.",
  },
  {
    icon: Lock,
    title: "Zero Trust Architecture",
    description: "Multi-layered verification: domain reputation scoring, SPF/DKIM/DMARC analysis, URL sandboxing, and sender fingerprinting.",
  },
];

const trustedLogos = ["Microsoft", "Google", "Amazon", "Meta", "Salesforce", "Slack"];

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.04)] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src="/manus-storage/logo_3e8ae906.png" alt="PhishGuard" className="w-8 h-8" />
          <span className="font-display font-bold text-lg text-white tracking-tight">
            PhishGuard <span className="text-cyber-cyan">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[#5A6078] hover:text-[#8B92A8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-[#5A6078] hover:text-white hidden sm:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-neon-purple to-cyber-cyan text-white border-0 hover:opacity-90 transition-opacity">
              Deploy Now
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/manus-storage/hero-bg_5e3e277a.png"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/90 via-[#0A0A0F]/60 to-[#0A0A0F]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <Badge className="mb-6 bg-[rgba(108,92,231,0.12)] text-neon-purple border-[rgba(108,92,231,0.3)] text-xs font-mono">
            <Zap size={12} className="mr-1" />
            AI-POWERED THREAT DETECTION
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Your Inbox,{" "}
            <span className="bg-gradient-to-r from-neon-purple to-cyber-cyan bg-clip-text text-transparent">
              Fortified.
            </span>
          </h1>
          <p className="text-lg text-[#8B92A8] max-w-lg mb-8 leading-relaxed">
            PhishGuard AI neutralizes phishing attacks in 0.3 seconds. Neural networks analyze sender reputation, domain patterns, URL safety, and content signals — before the threat reaches your inbox.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/scanner">
              <Button size="lg" className="bg-gradient-to-r from-neon-purple to-cyber-cyan text-white border-0 h-12 px-8 hover:opacity-90 transition-opacity shadow-lg shadow-[rgba(108,92,231,0.3)]">
                Analyze Threat
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-[rgba(255,255,255,0.1)] text-[#8B92A8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.2)] transition-all"
              >
                <Terminal size={16} className="mr-2" />
                View Operations
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-neon-purple/20 to-cyber-cyan/20 rounded-2xl blur-2xl" />
            <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
              <img
                src="/manus-storage/ai-scanning_0c34e98d.png"
                alt="AI Email Analysis"
                className="w-full rounded-lg"
              />
              {/* Floating operational readouts */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="glass rounded-md px-3 py-2 flex items-center gap-2 border border-[rgba(255,255,255,0.12)]">
                  <div className="w-2 h-2 rounded-full bg-safe-green animate-pulse" />
                  <span className="text-xs text-white font-mono">SCANNING...</span>
                </div>
                <div className="glass rounded-md px-3 py-2 flex items-center gap-2 border border-[rgba(255,255,255,0.12)]">
                  <span className="text-xs text-cyber-cyan font-mono font-semibold">99.7% CONFIDENCE</span>
                </div>
                <div className="glass rounded-md px-3 py-2 flex items-center gap-2 border border-[rgba(255,59,59,0.2)]">
                  <span className="text-xs text-threat-red font-mono font-semibold">PHISHING DETECTED</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-20 bg-[#0A0A0F] border-t border-b border-[rgba(255,255,255,0.04)]">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[rgba(108,92,231,0.08)] border border-[rgba(108,92,231,0.15)] mb-4">
                  <Icon size={22} className="text-cyber-cyan" />
                </div>
                <div className="font-display text-3xl lg:text-4xl font-bold text-white mb-1 data-value">{stat.value}</div>
                <div className="text-sm text-[#5A6078] font-medium uppercase tracking-wider text-[11px]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 noise-bg opacity-50" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[rgba(0,210,255,0.08)] text-cyber-cyan border-[rgba(0,210,255,0.2)] font-mono text-[10px] uppercase tracking-wider">
            Detection Engine
          </Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Built for <span className="bg-gradient-to-r from-neon-purple to-cyber-cyan bg-clip-text text-transparent">Security Operations</span>
          </h2>
          <p className="text-[#8B92A8] max-w-2xl mx-auto">
            Every component of PhishGuard AI is engineered for speed, accuracy, and enterprise reliability. No compromises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group glass-card rounded-lg p-6 hover:border-[rgba(108,92,231,0.25)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(108,92,231,0.12)] border border-[rgba(108,92,231,0.2)] flex items-center justify-center mb-4 group-hover:bg-[rgba(108,92,231,0.2)] transition-colors">
                  <Icon size={20} className="text-neon-purple" />
                </div>
                <h3 className="font-display text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8B92A8] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustedSection() {
  return (
    <section className="py-16 border-t border-[rgba(255,255,255,0.04)]">
      <div className="container">
        <p className="text-center text-[10px] text-[#5A6078] mb-8 tracking-[0.2em] uppercase font-mono">
          Deployed across enterprise security teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {trustedLogos.map((company) => (
            <div
              key={company}
              className="text-xl lg:text-2xl font-display font-bold text-[#5A6078]/30 hover:text-[#5A6078]/60 transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/8 to-cyber-cyan/8" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Deploy <span className="text-glow text-cyber-cyan">Zero-Trust</span> Email Defense
          </h2>
          <p className="text-[#8B92A8] mb-8 text-lg">
            Join thousands of organizations that trust PhishGuard AI to protect their most valuable asset — their inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/scanner">
              <Button size="lg" className="bg-gradient-to-r from-neon-purple to-cyber-cyan text-white border-0 h-12 px-8 hover:opacity-90 shadow-lg shadow-[rgba(108,92,231,0.3)]">
                Start Protecting Now
                <ShieldCheck size={16} className="ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 border-[rgba(255,255,255,0.1)] text-[#8B92A8] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
            >
              <Terminal size={16} className="mr-2" />
              Request Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-[rgba(255,255,255,0.04)] bg-[#0A0A0F]">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/manus-storage/logo_3e8ae906.png" alt="PhishGuard" className="w-7 h-7" />
              <span className="font-display font-bold text-white">PhishGuard <span className="text-cyber-cyan">AI</span></span>
            </div>
            <p className="text-sm text-[#5A6078] leading-relaxed">
              AI-powered email security for enterprise organizations. Detecting threats before they reach your inbox.
            </p>
          </div>
          {[
            { title: "Platform", links: ["Command Center", "Scanner", "Analytics", "Reports"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Changelog", "Status"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#5A6078] hover:text-[#8B92A8] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#5A6078] font-mono text-xs">
            &copy; 2026 PhishGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#5A6078] hover:text-[#8B92A8] transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[#5A6078] hover:text-[#8B92A8] transition-colors">Terms</a>
            <a href="#" className="text-xs text-[#5A6078] hover:text-[#8B92A8] transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white">
      <LandingNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TrustedSection />
      <CTASection />
      <Footer />
    </div>
  );
}
