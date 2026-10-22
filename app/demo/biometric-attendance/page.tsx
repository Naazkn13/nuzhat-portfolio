import type { Metadata } from 'next'
import Link from 'next/link'
import BiometricSimulator from '@/components/BiometricSimulator'
import { ArrowLeft, ExternalLink, ShieldCheck, Download, Code2, Server, Database, Smartphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biometric Attendance & Payroll Engine Demo — Nuzhat Khan',
  description: 'Interactive simulation of the hardware-integrated ZKTeco ADMS biometric attendance and automated 30-day payroll calculation engine built with FastAPI and Supabase.',
}

export default function BiometricDemoPage() {
  return (
    <div className="min-h-screen bg-[#080E1A] text-white-soft py-12 px-4 sm:px-6 md:px-8 relative selection:bg-teal selection:text-navy">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <main className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Top Navigation */}
        <nav className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-grey hover:text-teal transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              Portfolio
            </Link>
            <span className="text-white/20">/</span>
            <Link
              href="/case-study/biometric-attendance-system"
              className="text-grey hover:text-teal transition-colors"
            >
              Case Study
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-teal">Interactive Demo</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume-python.pdf"
              download
              className="flex items-center gap-1.5 bg-teal/15 hover:bg-teal/25 text-teal border border-teal/30 px-3 py-1.5 rounded-full transition-all"
            >
              <Download size={13} />
              Python Resume (PDF)
            </a>
          </div>
        </nav>

        {/* Hero Banner */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-teal/10 text-teal border border-teal/30 uppercase tracking-widest">
              Live Interactive Prototype
            </span>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest">
              Production Deployed · 12+ Staff
            </span>
          </div>
          <h1 className="font-grotesk font-bold text-3xl sm:text-4xl md:text-5xl text-white-soft">
            Biometric Attendance & 30-Day Payroll Engine
          </h1>
          <p className="text-grey font-inter text-base sm:text-lg max-w-3xl leading-relaxed">
            Experience the real-time event pipeline built for an eye hospital in Mumbai. 
            Simulate hardware fingerprint scans over the ZKTeco ADMS protocol, trigger automated payroll policy evaluations, and preview dynamically generated hospital salary slips.
          </p>
        </header>

        {/* Interactive Simulator Component */}
        <section aria-label="Interactive Simulator Sandbox">
          <BiometricSimulator />
        </section>

        {/* Technical Architecture Deep Dive */}
        <section className="grid md:grid-cols-3 gap-6 pt-6">
          <div className="glass rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2.5 text-teal">
              <Server size={20} />
              <h3 className="font-grotesk font-bold text-base text-white-soft">ZKTeco ADMS Ingestion</h3>
            </div>
            <p className="text-grey font-inter text-xs leading-relaxed">
              Implemented an asynchronous HTTP server endpoint matching ZKTeco&apos;s proprietary ADMS specification (<code className="text-teal font-mono">POST /iclock/cdata</code>). Receives real-time push events, verifies biometric packet checksums, and dispatches ACK acknowledgments with sub-200ms latency.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2.5 text-teal">
              <Database size={20} />
              <h3 className="font-grotesk font-bold text-base text-white-soft">FastAPI Policy Engine</h3>
            </div>
            <p className="text-grey font-inter text-xs leading-relaxed">
              Automates complex clinical shift rules: 15-minute grace windows, dynamic overtime accumulation (1.5x multiplier), monthly paid-leave accruals, and statutory Provident Fund &amp; Professional Tax calculations across 12+ healthcare staff.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2.5 text-teal">
              <Smartphone size={20} />
              <h3 className="font-grotesk font-bold text-base text-white-soft">Expo Android &amp; Web App</h3>
            </div>
            <p className="text-grey font-inter text-xs leading-relaxed">
              Provides dual access: an administrative dashboard for hospital management to audit rosters and approve leave, paired with an Expo Android APK for staff on-site check-in verification and digital payslip downloads.
            </p>
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-grey font-inter">
            <ShieldCheck size={16} className="text-teal" />
            <span>Tested and deployed in production. Candidate experience: ~14 months (June 2025 – 24 July 2026).</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/case-study/biometric-attendance-system"
              className="text-xs font-mono text-teal border border-teal/30 hover:bg-teal/10 px-4 py-2 rounded-xl transition-all"
            >
              Read Full Case Study →
            </Link>
            <Link
              href="/"
              className="text-xs font-mono bg-teal text-navy font-semibold px-4 py-2 rounded-xl hover:bg-teal/90 transition-all"
            >
              Back to Portfolio
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
