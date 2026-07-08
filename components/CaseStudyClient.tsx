'use client'
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { ChevronDown, ExternalLink, Globe } from 'lucide-react'
import Link from 'next/link'

type LinkItem = { label: string; url: string; icon: any; note?: string }
type Project = {
  title: string
  tag: string
  tagColor: string
  problem: string
  constraints: string[]
  architecture: string[]
  keyDecisions: string[]
  result: string
  stack: string[]
  links: LinkItem[]
  note?: string
}

const projects: Record<string, Project> = {
  'compulse': {
    title: 'Compulse',
    tag: 'Enterprise · UAT',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    problem: 'Compliance teams manually prepared periodic SEBI reports across heterogeneous source systems.',
    constraints: [
      '67+ report variants in scope',
      'Maker-checker workflow with no single-step approvals',
      'UAT environment with strict change review',
      'Need for traceable corrections and re-submission history',
    ],
    architecture: [
      'FastAPI backend with typed validation layers',
      'React form/report composer with reusable base components',
      'PostgreSQL document store for submissions and versions',
      'Dockerized runtime for dev/qa parity',
    ],
    keyDecisions: [
      'Built shared validation contracts across similar reports to reduce code duplication',
      'Made reviewer queue explicit so UAT sign-off was auditable',
    ],
    result: 'Co-built platform automating 67+ SEBI report types through 43 maker-checker workflows. Currently in successful UAT with a leading financial institution.',
    stack: ['FastAPI', 'React', 'Docker', 'Ubuntu 22', 'PostgreSQL'],
    links: [],
    note: 'Client confidential — not publicly accessible',
  },
  'biometric-attendance-system': {
    title: 'Biometric Attendance System',
    tag: 'Live · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Eye hospital relied on manual staff logging and Excel formulas for attendance, overtime, and salary calculations.',
    constraints: [
      'ZKTeco hardware deployment with SDK constraints',
      'Web + Android access needed for hospital staff',
      '30-day pay cycles with PL accrual rules',
      'Maintenance coverage without an on-site IT team',
    ],
    architecture: [
      'FastAPI backend with Supabase auth/storage',
      'React admin portal with policy rules',
      'Expo Android app for staff check-in/out',
      'ZKTeco SDK integration for biometric events',
      'Railway for worker processes, Vercel for admin web',
    ],
    keyDecisions: [
      'Separated device event ingestion from payroll rules to keep hardware failures from breaking payroll',
      'Used configurable policy rules instead of hard-coded formulas',
    ],
    result: 'Automated salary cycle tracking, PL accrual, overtime, and deductions for 8+ employees with zero downtime since deployment.',
    stack: ['FastAPI', 'React', 'Supabase', 'Railway', 'Vercel', 'Expo', 'Android APK'],
    links: [
      { label: 'Web App', url: 'https://attendance-sigma-one.vercel.app/', icon: Globe, note: 'Login required' },
    ],
    note: 'Web + Android app. Login required.',
  },
  'novus-comply-upsi': {
    title: 'Novus Comply & Novus UPSI',
    tag: 'Enterprise · Production',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    problem: 'BFSI sector required a regulated pathway for trade pre-clearance and UPSI access governance without relying on spreadsheets.',
    constraints: [
      'Multiple SEBI/UPSI workflows with maker-checker stages',
      'Strict audit trail for approval history and access grants',
      'Existing enterprise datasets and downstream ECAS/BENPOS reconciliation',
      'Browser-based usage with no desktop client',
    ],
    architecture: [
      'FastAPI async services with PostgreSQL',
      'React admin/workflow frontends',
      'Dockerized services with Azure DevOps pipelines',
      'RBAC models separating trader/approver/compliance views',
      'Event-style audit logs for access grants and exceptions',
    ],
    keyDecisions: [
      'Chose explicit role gates over open ACLs to reduce reviewer mistakes',
      'Built normalized export formats instead of per-report PDF generators',
    ],
    result: 'Production platform for insider-trading governance and structured digital database for UPSI access at a live enterprise deployment.',
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Docker', 'Azure DevOps'],
    links: [],
    note: 'Client confidential — enterprise deployment',
  },
  'nsa-sports-platform': {
    title: 'NSA Sports Platform',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Fragmented player registration, team assignment, and coach approvals across spreadsheets.',
    constraints: [
      'Role-based access for coaches/players/admins',
      'Configurable season/category rules',
      'Public presence needed for registration',
    ],
    architecture: [
      'React frontend with role-aware routing',
      'Node.js backend with collection-based approval store',
      'MongoDB for flexible seasonal schema changes',
      'Configurable approval workflows using rule definitions',
    ],
    keyDecisions: [
      'Chose document DB to avoid repeating migration rewrites per season',
      'Built role-aware dashboards instead of one admin dashboard to reduce support tickets',
    ],
    result: 'Live in production, managing 50+ active players seamlessly.',
    stack: ['React', 'Node.js', 'MongoDB'],
    links: [
      { label: 'Live Site', url: 'https://nsasports.co.in/', icon: Globe },
    ],
  },
  'hospital-sop-portal': {
    title: 'HospitalSop Portal',
    tag: 'Enterprise · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Manual onboarding and inconsistent staff training across shifts.',
    constraints: [
      'No existing structured training content',
      'Hospital device mix with low-IP devices in use',
      'Shared logins during shift handovers',
    ],
    architecture: [
      'Next.js portal with role-aware course views',
      'PostgreSQL for staff progress and SOP versioning',
      'Tailwind UI optimized for low-connectivity access',
    ],
    keyDecisions: [
      'Chose text + video SOPs instead of long PDFs because staff rarely completed PDF onboarding',
      'Kept visitor/contractor access read-only to reduce support overhead',
    ],
    result: 'Enabled efficient staff training and compliance verification for hospital operations.',
    stack: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS'],
    links: [],
    note: 'Hospital internal system — login required',
  },
  'cas-parser': {
    title: 'CAS Parser',
    tag: 'Desktop App · Client Deployed',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    problem: 'Unstructured CDSL PDF statements made Demat holding and mutual fund extraction tedious and error-prone.',
    constraints: [
      'No API access to CDSL PDFs',
      'Mixed layouts across statement variants',
      'Process repeated by non-technical staff monthly',
      'Output needed to be compatible with Excel automation',
    ],
    architecture: [
      'Python parser using PyMuPDF and tabula-py',
      'Tabular extraction normalized into typed records',
      'Pandas transformations before Excel output',
      'Packaged as Tauri desktop app for client deployment',
    ],
    keyDecisions: [
      'Kept parsing deterministic to minimize hard-to-debug PDF drift',
      'Built Excel export path first because client team sort/filter in spreadsheets',
    ],
    result: 'Desktop executable successfully deployed at the client, converting raw CDSL PDFs into structured Excel reports automatically.',
    stack: ['Python', 'Tauri', 'PyMuPDF', 'tabula-py', 'Pandas'],
    links: [],
    note: 'Internal enterprise tool',
  },
}

export default function CaseStudyClient({ slug }: { slug: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const project = projects[slug]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy text-grey">
        <div className="text-center">
          <h1 className="font-grotesk text-4xl font-bold text-white-soft mb-4">Case study not found</h1>
          <Link href="/case-study" className="text-teal hover:underline">← Back to all case studies</Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative py-24 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <nav className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
          <Link href="/" className="text-sm text-grey hover:text-teal transition-colors font-inter">← Portfolio</Link>
          <span className="text-white/20">/</span>
          <Link href="/case-study" className="text-sm text-grey hover:text-teal transition-colors font-inter">Case Studies</Link>
          <span className="text-white/20">/</span>
          <span className="text-sm text-teal font-inter truncate max-w-xs">{project.title}</span>
        </nav>
        <span className={`text-xs border rounded-full px-3 py-0.5 inline-block font-mono ${project.tagColor}`}>
          {project.tag}
        </span>
        <h1 className="font-grotesk text-5xl md:text-6xl font-bold text-white-soft mt-4 leading-tight">
          {project.title}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Challenge</h3>
          <p className="text-white-soft font-inter leading-relaxed text-base">{project.problem}</p>
        </section>

        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Constraints</h3>
          <ul className="list-none space-y-2">
            {project.constraints.map((item, i) => (
              <li key={i} className="text-grey font-inter text-sm leading-relaxed flex gap-3">
                <span className="text-teal/70 mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Architecture</h3>
          <ul className="list-none space-y-2">
            {project.architecture.map((item, i) => (
              <li key={i} className="text-grey font-inter text-sm leading-relaxed flex gap-3">
                <span className="text-teal/70 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Key Decisions</h3>
          <ul className="list-none space-y-2">
            {project.keyDecisions.map((item, i) => (
              <li key={i} className="text-grey font-inter text-sm leading-relaxed flex gap-3">
                <span className="text-teal/70 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Impact</h3>
          <p className="text-white-soft font-inter leading-relaxed text-base mb-4">{project.result}</p>
          {project.note && (
            <p className="text-grey/60 text-xs font-inter italic">{project.note}</p>
          )}
        </section>

        {project.links.length > 0 && (
          <section className="glass rounded-2xl p-8">
            <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Links</h3>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link: LinkItem, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-teal/30 text-teal px-5 py-2.5 rounded-full text-sm hover:bg-teal/10 transition-all font-inter"
                >
                  <link.icon size={14} />
                  {link.label}
                  {link.note && <span className="text-grey ml-1 text-xs">({link.note})</span>}
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="glass rounded-2xl p-8">
          <h3 className="font-grotesk text-teal text-sm uppercase tracking-widest mb-4">Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="text-xs text-grey border border-white/10 rounded-full px-3 py-1 glass-subtle font-mono hover:text-white-soft hover:border-teal/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  )
}
