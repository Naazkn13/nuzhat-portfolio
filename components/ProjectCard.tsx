'use client'
import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function ProjectCard({ project, i, inView }: { project: any, i: number, inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  
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
        className="group p-7 rounded-2xl border border-teal-border bg-navy-2/50 hover:border-teal/40 hover:bg-navy-2 transition-colors duration-300 h-full relative"
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
              {project.links.map((link: any, j: number) => (
                <a
                  key={j}
                  href={link.url}
                  target="_blank"
                  className="flex items-center gap-1.5 text-teal border border-teal-border px-4 py-1.5 rounded-full text-xs hover:bg-teal-dim transition-all"
                >
                  <link.icon size={12} />
                  {link.label}
                  {'note' in link && link.note && (
                    <span className="text-grey ml-1">({link.note})</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <p className="text-grey font-inter text-sm leading-relaxed mb-5 flex-grow pointer-events-auto">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="text-xs text-grey border border-white/10 rounded-full px-3 py-1 bg-white/5 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.note && (
            <p className="text-grey/50 text-xs mt-4 font-inter italic pointer-events-auto">{project.note}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
