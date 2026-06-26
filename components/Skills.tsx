'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = {
  'Languages': ['Python', 'TypeScript', 'JavaScript', 'Go', 'SQL', 'Java'],
  'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Expo'],
  'Backend': ['FastAPI', 'Node.js', 'REST APIs', 'WebSockets'],
  'Data & DB': ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis'],
  'DevOps': ['Docker', 'Linux (Ubuntu/Fedora)', 'Railway', 'Vercel', 'Azure DevOps'],
  'AI / ML': ['Python ML', 'LLM Integration', 'ElevenLabs', 'LatentSync'],
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-inter">My toolkit</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2">Skills</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-xl glass hover:bg-teal/5 transition-all group"
          >
            <h4 className="font-grotesk font-semibold text-teal text-sm mb-4 tracking-wide">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-grey border border-white/10 rounded-full px-3 py-1 glass-subtle font-mono hover:text-white-soft hover:border-teal/30 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
