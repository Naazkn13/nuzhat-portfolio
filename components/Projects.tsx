'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Smartphone, Globe } from 'lucide-react'
import { GithubIcon as Github } from './icons/GithubIcon'
import ProjectCard from './ProjectCard'

const projects = [
  {
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
    links: [
      { label: 'Case Study', url: '/case-study/novus-comply-upsi', icon: ExternalLink },
    ],
    note: 'Client confidential — enterprise deployment',
    caseStudy: 'novus-comply-upsi',
  },
  {
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
    links: [
      { label: 'Case Study', url: '/case-study/compulse', icon: ExternalLink },
    ],
    note: 'Client confidential — not publicly accessible',
    caseStudy: 'compulse',
  },
  {
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
    links: [
      { label: 'Case Study', url: '/case-study/cas-parser', icon: ExternalLink },
    ],
    note: 'Internal enterprise tool',
    caseStudy: 'cas-parser',
  },
  {
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
      { label: 'Case Study', url: '/case-study/biometric-attendance-system', icon: ExternalLink },
    ],
    note: 'Web + Android app. Login required.',
    caseStudy: 'biometric-attendance-system',
  },
  {
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
    links: [
      { label: 'Case Study', url: '/case-study/hospital-sop-portal', icon: ExternalLink },
    ],
    note: 'Hospital internal system — login required',
    caseStudy: 'hospital-sop-portal',
  },
  {
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
      { label: 'Case Study', url: '/case-study/nsa-sports-platform', icon: ExternalLink },
    ],
    caseStudy: 'nsa-sports-platform',
  },
  {
    title: 'FashionGallery',
    tag: 'AI · In Progress',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    problem: 'Fashion search requires understanding visual similarity, not just text matching.',
    constraints: [
      'Need both image and text-based search',
      'Visual similarity requires embedding-based approach',
      'Must be explainable — why did this item match?',
    ],
    architecture: [
      'CLIP embeddings for image-based similarity',
      'Qdrant vector database for fast retrieval',
      'RAG-style retrieval over fashion content',
      'FastAPI backend, React/Next.js frontend',
    ],
    keyDecisions: [
      'Used CLIP for zero-shot fashion understanding without custom training',
      'Added RAG to explain matches, not just return results',
    ],
    result: 'AI-powered fashion search demonstrating practical RAG + embeddings application.',
    stack: ['Python', 'FastAPI', 'React', 'Next.js', 'CLIP', 'Qdrant', 'RAG', 'Docker'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Naazkn13/FashionGallery', icon: Github },
    ],
    caseStudy: 'fashion-gallery',
  },
  {
    title: 'Job Search System',
    tag: 'Live · Full Stack',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Tracking MNC applications, tailoring resumes, and preparing for interviews across 30+ companies is chaotic.',
    constraints: [
      'Need role-specific resume versions (Python, AI, Java)',
      'Must track full application lifecycle',
      'Interview prep must link to actual projects',
    ],
    architecture: [
      'Next.js frontend with 7 screens (dashboard, tracker, resume tailor, prep, showcase)',
      'Python/FastAPI backend with resume generation',
      'Supabase database for applications, companies, projects',
      'Role-based resume tailoring with JD input',
    ],
    keyDecisions: [
      'Built resume tailoring that reads JD and emphasizes matching skills',
      'Linked interview prep directly to real project stories',
    ],
    result: 'Complete job search OS — tracker, resume generator, interview prep, project showcase.',
    stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Supabase', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Naazkn13/job-search', icon: Github },
    ],
    caseStudy: 'job-search-system',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-inter">What I've built</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2">Projects</h2>
      </motion.div>

      <div className="grid gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} i={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
