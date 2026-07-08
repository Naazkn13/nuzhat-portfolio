'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const caseStudies = [
  {
    slug: 'compulse',
    title: 'Compulse',
    tag: 'Enterprise · UAT',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    description: 'Automating 67+ SEBI report types through 43 maker-checker workflows. UAT stage with a leading financial institution.',
    stack: ['FastAPI', 'React', 'Docker', 'PostgreSQL'],
  },
  {
    slug: 'biometric-attendance-system',
    title: 'Biometric Attendance System',
    tag: 'Live · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: 'Live at a Mumbai eye hospital — automated salary cycles, PL accrual, overtime, and biometric hardware integration.',
    stack: ['FastAPI', 'React', 'Supabase', 'Expo', 'ZKTeco SDK'],
  },
  {
    slug: 'novus-comply-upsi',
    title: 'Novus Comply & Novus UPSI',
    tag: 'Enterprise · Production',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    description: 'Production insider-trading governance and UPSI access platform with maker-checker RBAC and Azure DevOps CI/CD.',
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Docker', 'Azure DevOps'],
  },
  {
    slug: 'nsa-sports-platform',
    title: 'NSA Sports Platform',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: 'Role-aware sports management platform for NSA with configurable seasons, approvals, and live registration.',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    slug: 'hospital-sop-portal',
    title: 'HospitalSOP Portal',
    tag: 'Enterprise · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: 'Staff onboarding via optimized SOP modules for a hospital, compliant across shifts and devices.',
    stack: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'cas-parser',
    title: 'CAS Parser',
    tag: 'Desktop · Deployed',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    description: 'Local-first desktop app that parses CDSL PDFs into structured Excel with deterministic PyMuPDF + tabula-py extraction.',
    stack: ['Python', 'Tauri', 'PyMuPDF', 'tabula-py', 'Pandas'],
  },
]

export default function CaseStudiesIndex() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <nav className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
          <Link href="/" className="text-sm text-grey hover:text-teal transition-colors font-inter">← Portfolio</Link>
          <span className="text-white/20">/</span>
          <span className="text-sm text-teal font-inter">All Case Studies</span>
        </nav>
        <span className="text-teal text-xs tracking-widest uppercase font-inter">Deep dives</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2">Case Studies</h2>
        <p className="text-grey font-inter mt-4 max-w-2xl">
          Problem → constraints → architecture → key decisions → impact. These are my flagship projects
          worth a deeper read.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((cs, i) => (
          <motion.a
            key={cs.slug}
            href={`/case-study/${cs.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group glass rounded-2xl p-8 hover:bg-teal/5 transition-all flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`text-xs border rounded-full px-3 py-0.5 font-mono ${cs.tagColor}`}>
                {cs.tag}
              </span>
              <ExternalLink size={14} className="text-teal/50 group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" />
            </div>
            <h3 className="font-grotesk text-2xl font-bold text-white-soft mb-3 group-hover:text-teal transition-colors">
              {cs.title}
            </h3>
            <p className="text-grey font-inter text-sm leading-relaxed flex-grow">
              {cs.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {cs.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] text-grey border border-white/10 rounded-full px-2.5 py-1 glass-subtle font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
