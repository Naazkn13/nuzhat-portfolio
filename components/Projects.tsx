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
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> BFSI sector required strict SEBI compliance for insider trading and UPSI access governance.</div>
        <div><strong className="text-white-soft">Solution:</strong> Built a comprehensive platform handling trade pre-clearance, multi-tier approvals, and ECAS/BENPOS reconciliation.</div>
        <div><strong className="text-white-soft">Result:</strong> Enabled secure structural digital database for UPSI access governance in a live enterprise deployment.</div>
      </>
    ),
    stack: ['FastAPI', 'React', 'PostgreSQL', 'Docker', 'Azure DevOps'],
    links: [],
    note: 'Client confidential — enterprise deployment',
  },
  {
    title: 'Compulse',
    tag: 'Enterprise · UAT',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> Need for automated compliance reporting to handle multiple SEBI report types.</div>
        <div><strong className="text-white-soft">Solution:</strong> Co-built an enterprise compliance reporting platform automating 67+ SEBI report types across 43 maker-checker workflows.</div>
        <div><strong className="text-white-soft">Result:</strong> Currently in successful UAT with a leading financial institution.</div>
      </>
    ),
    stack: ['FastAPI', 'React', 'Docker', 'Ubuntu 22', 'PostgreSQL'],
    links: [],
    note: 'Client confidential — not publicly accessible',
  },
  {
    title: 'CAS Parser',
    tag: 'Desktop App · Client Deployed',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> Unstructured CDSL PDF statements made Demat holding and mutual fund extraction tedious.</div>
        <div><strong className="text-white-soft">Solution:</strong> Built a Python/Tauri desktop application using PyMuPDF and tabula-py to extract and process financial data into Pandas.</div>
        <div><strong className="text-white-soft">Result:</strong> Desktop executable successfully deployed at the client, outputting clean Excel reports automatically.</div>
      </>
    ),
    stack: ['Python', 'Tauri', 'PyMuPDF', 'tabula-py', 'Pandas'],
    links: [],
    note: 'Internal enterprise tool',
  },
  {
    title: 'Biometric Attendance System',
    tag: 'Live · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> Eye hospital relied on manual staff logging of machine times into Excel and error-prone formula-based salary calculations.</div>
        <div><strong className="text-white-soft">Solution:</strong> Built a solo end-to-end biometric system integrating ZKTeco hardware SDK, with web and Android apps.</div>
        <div><strong className="text-white-soft">Result:</strong> Automated 30-day pay cycles, PL accrual, overtime, and deductions for 8+ employees with zero downtime since deployment.</div>
      </>
    ),
    stack: ['FastAPI', 'React', 'Supabase', 'Railway', 'Vercel', 'Expo', 'Android APK'],
    links: [
      { label: 'Web App', url: 'https://attendance-sigma-one.vercel.app/', icon: Globe, note: 'Login required' },
    ],
    note: 'Web + Android app. Login required.',
  },
  {
    title: 'HospitalSop Portal',
    tag: 'Enterprise · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> Manual onboarding and lack of centralized staff training protocols.</div>
        <div><strong className="text-white-soft">Solution:</strong> Developed a Next.js management portal hosting organized SOP video walkthroughs.</div>
        <div><strong className="text-white-soft">Result:</strong> Enabled efficient staff training and compliance verification for hospital operations.</div>
      </>
    ),
    stack: ['Next.js', 'React', 'PostgreSQL', 'Tailwind CSS'],
    links: [],
    note: 'Hospital internal system — login required',
  },
  {
    title: 'NSA Sports Platform',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description: (
      <>
        <div><strong className="text-white-soft">Challenge:</strong> Fragmented player registration and team management.</div>
        <div><strong className="text-white-soft">Solution:</strong> Built a role-based sports operations platform with configurable CMS for automated approval workflows.</div>
        <div><strong className="text-white-soft">Result:</strong> Live in production, managing 50+ active players seamlessly.</div>
      </>
    ),
    stack: ['React', 'Node.js', 'MongoDB'],
    links: [
      { label: 'Live Site', url: 'https://nsasports.co.in/', icon: Globe },
    ],
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
