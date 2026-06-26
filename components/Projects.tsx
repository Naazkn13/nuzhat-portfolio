'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Smartphone, Globe } from 'lucide-react'
import { GithubIcon as Github } from './icons/GithubIcon'
import ProjectCard from './ProjectCard'

const projects = [
  {
    title: 'Compulse',
    tag: 'Enterprise · UAT',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    description:
      'Enterprise compliance platform built at Infomatics Services. Co-built with a colleague, currently in UAT with a leading financial institution. Handles SEBI regulatory requirements for the BFSI sector.',
    stack: ['FastAPI', 'React', 'Docker', 'Ubuntu 22', 'PostgreSQL'],
    links: [],
    note: 'Client confidential — not publicly accessible',
  },
  {
    title: 'Biometric Attendance System',
    tag: 'Live · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description:
      'Full biometric attendance system built solo for Ashu Laser Vision, an eye hospital in Mumbai. ZKTeco hardware integration, attendance correction, full salary calculation engine — 30-day pay cycles, PL addition, overtime & deduction logic.',
    stack: ['FastAPI', 'React', 'Supabase', 'Railway', 'Vercel', 'Expo', 'Android APK'],
    links: [
      { label: 'Web App', url: 'https://attendance-sigma-one.vercel.app/', icon: Globe, note: 'Login required' },
    ],
    note: 'Web + Android app. Login required.',
  },
  {
    title: 'NSA Sports Platform',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    description:
      'Sports management platform built and deployed. Handles registrations, events and player management for NSA. Live and running.',
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
