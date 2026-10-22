'use client'
import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronDown, ExternalLink, Globe, ShieldCheck, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export type LinkItem = {
  label: string
  url: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  note?: string
  isCaseStudy?: boolean
}

export type Project = {
  title: string
  tag: string
  tagColor: string
  problem: string
  built: string
  result: string
  stack: string[]
  links: LinkItem[]
  constraints?: string[]
  architecture?: string[]
  keyDecisions?: string[]
  note?: string
  caseStudy?: string
}

type ProjectCardProps = { project: Project; i: number; inView: boolean }

const DeepDiveSection = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-teal/90">{label}</span>
        <ChevronDown className={`w-4 h-4 text-teal transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 py-3 text-xs text-grey font-inter leading-relaxed space-y-2 border-t border-white/5">
          {children}
        </div>
      )}
    </div>
  )
}

const BulletList = ({ items, prefix = '•' }: { items: string[]; prefix?: string }) => (
  <ul className="space-y-1.5">
    {items.map((item, idx) => (
      <li key={idx} className="text-xs text-grey font-inter leading-relaxed flex gap-2">
        <span className="text-teal font-mono">{prefix}</span>
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / rect.width - 0.5)
    y.set(mouseY / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
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
        className="group p-6 sm:p-8 rounded-2xl glass hover:bg-teal/5 transition-all duration-300 border border-white/10 hover:border-teal/30 relative flex flex-col justify-between"
      >
        <div style={{ transform: 'translateZ(15px)' }} className="space-y-5">
          {/* Top Card Row */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[10px] border rounded-full px-2.5 py-0.5 font-mono ${project.tagColor}`}>
                  {project.tag}
                </span>
                {project.caseStudy && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20">
                    Case Study Included
                  </span>
                )}
              </div>
              <h3 className="font-grotesk text-2xl font-bold text-white-soft group-hover:text-teal transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Quick Links in Header */}
            <div className="flex flex-wrap gap-2">
              {project.caseStudy && (
                <Link
                  href={`/case-study/${project.caseStudy}`}
                  className="flex items-center gap-1.5 text-navy bg-teal px-3.5 py-1.5 rounded-full text-xs font-grotesk font-semibold hover:bg-teal/90 transition-all shadow-sm"
                >
                  Case Study
                  <ArrowRight size={12} />
                </Link>
              )}
              {project.links.map((link: LinkItem, j: number) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={j}
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-teal border border-teal/30 bg-teal/5 px-3 py-1.5 rounded-full text-xs font-inter hover:bg-teal/15 transition-all"
                  >
                    <IconComponent size={12} />
                    <span>{link.label}</span>
                    {link.note && <span className="text-grey/80 text-[10px]">({link.note})</span>}
                  </a>
                )
              })}
            </div>
          </div>

          {/* 5-Point Recruiter Content Grid */}
          <div className="space-y-3 font-inter text-xs sm:text-sm">
            {/* 1. Problem */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal block">
                1. Problem
              </span>
              <p className="text-grey leading-relaxed">{project.problem}</p>
            </div>

            {/* 2. What I Built */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal block">
                2. What I Built
              </span>
              <p className="text-white-soft leading-relaxed">{project.built}</p>
            </div>

            {/* 3. Result / Outcome */}
            <div className="p-3.5 rounded-xl bg-teal/[0.04] border border-teal/15 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                3. Result &amp; Production Outcome
              </span>
              <p className="text-emerald-200 font-medium leading-relaxed">{project.result}</p>
            </div>
          </div>

          {/* 4. Tech Stack Tags */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-grey/70 block mb-2">
              4. Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="text-xs text-grey border border-white/10 rounded-lg px-2.5 py-1 glass-subtle font-mono hover:text-white-soft hover:border-teal/30 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Deep Dive & Action Links */}
          {(project.constraints || project.architecture || project.keyDecisions) && (
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-xs font-mono uppercase tracking-widest text-teal/90 hover:text-teal flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{expanded ? '▲ Hide Technical Deep Dive' : '▼ View Architecture & Key Decisions'}</span>
              </button>

              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2.5 mt-3"
                >
                  {project.constraints && (
                    <DeepDiveSection label="Engineering Constraints">
                      <BulletList items={project.constraints} prefix="—" />
                    </DeepDiveSection>
                  )}
                  {project.architecture && (
                    <DeepDiveSection label="Architectural Decisions">
                      <BulletList items={project.architecture} prefix="•" />
                    </DeepDiveSection>
                  )}
                  {project.keyDecisions && (
                    <DeepDiveSection label="Trade-Offs & Key Decisions">
                      <BulletList items={project.keyDecisions} prefix="•" />
                    </DeepDiveSection>
                  )}
                  {project.note && (
                    <p className="text-grey/60 text-xs font-inter italic pt-1">{project.note}</p>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
