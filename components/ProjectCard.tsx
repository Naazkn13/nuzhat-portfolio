'use client'
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, ExternalLink, Smartphone, Globe } from 'lucide-react'
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
  caseStudy?: string
}
type ProjectCardProps = { project: Project; i: number; inView: boolean }

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
      >
        <span className="text-xs font-inter uppercase tracking-widest text-grey">{label}</span>
        <ChevronDown className={`w-4 h-4 text-teal transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 py-3 text-sm text-grey font-inter leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

const BulletList = ({ items, prefix = '-' }: { items: string[]; prefix?: string }) => (
  <ul className="space-y-1">
    {items.map((item, idx) => (
      <li key={idx} className="text-sm text-grey font-inter leading-relaxed flex gap-2">
        <span className="text-teal/70 mt-0.5 font-mono text-xs">{prefix}</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export default function ProjectCard({ project, i, inView }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 0, rotateY: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group p-7 rounded-2xl glass hover:bg-teal/5 transition-colors duration-300 h-full relative"
      >
        <div style={{ transform: 'translateZ(20px)' }} className="flex flex-col h-full pointer-events-none">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pointer-events-auto">
            <div>
              <h3 className="font-grotesk text-2xl font-bold text-white-soft group-hover:text-teal transition-colors">
                {project.title}
              </h3>
              <span className={`text-xs border rounded-full px-3 py-0.5 mt-2 inline-block font-mono ${project.tagColor}`}>
                {project.tag}
              </span>
            </div>
            <div className="flex gap-3">
              {project.links.map((link: LinkItem, j: number) => (
                <a
                  key={j}
                  href={link.url}
                  className="flex items-center gap-1.5 text-teal border border-teal/20 px-4 py-1.5 rounded-full text-xs hover:bg-teal/10 transition-all"
                >
                  <link.icon size={12} />
                  {link.label}
                  {link.note && <span className="text-grey ml-1 text-[10px]">({link.note})</span>}
                </a>
              ))}
            </div>
          </div>

          <div className="text-grey font-inter text-sm leading-relaxed mb-3 pointer-events-auto flex flex-col gap-2">
            <p>{project.problem}</p>
            <p>{project.result}</p>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-xs font-inter uppercase tracking-widest text-teal/90 hover:text-teal mb-2"
            >
              {expanded ? 'Hide details' : 'Case study'}
            </button>
            {expanded && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mt-3">
                <Section label="Constraints">
                  <BulletList items={project.constraints} />
                </Section>
                <Section label="Architecture">
                  <BulletList items={project.architecture} prefix="•" />
                </Section>
                <Section label="Key decisions">
                  <BulletList items={project.keyDecisions} prefix="•" />
                </Section>
                <div className="text-sm text-grey">
                  <div className="text-xs uppercase tracking-widest text-grey mb-2">Impact</div>
                  <p>{project.result}</p>
                </div>
                {project.note && (
                  <p className="text-grey/60 text-xs font-inter italic">{project.note}</p>
                )}
              </motion.div>
            )}
            {expanded && project.caseStudy && (
              <Link
                href={`/case-study/${project.caseStudy}`}
                className="inline-flex items-center gap-2 mt-4 text-xs font-inter uppercase tracking-widest text-navy bg-teal px-5 py-2.5 rounded-full hover:bg-teal/90 transition-colors font-semibold"
              >
                Read full case study
                <ExternalLink size={12} />
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pointer-events-auto mt-6">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="text-xs text-grey border border-white/10 rounded-full px-3 py-1 glass-subtle font-mono hover:text-white-soft hover:border-teal/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

