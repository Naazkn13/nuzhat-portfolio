'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Briefcase, Code2 } from 'lucide-react'

const timeline = [
  {
    icon: GraduationCap,
    year: '2024',
    title: 'BSc IT — Bhavan\'s College',
    desc: 'Mumbai University. Graduated with a focus on software development.',
  },
  {
    icon: Briefcase,
    year: '2025',
    title: 'Joined Infomatics Services',
    desc: 'Working on enterprise compliance platforms for the BFSI sector. Compulse — currently in UAT with a leading financial institution.',
  },
  {
    icon: Code2,
    year: 'Now',
    title: 'Building & Shipping',
    desc: 'Biometric systems, sports platforms, AI pipelines. Real products, real deployments.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-inter">Who I am</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2">
          About Me
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 space-y-5 text-grey font-inter leading-relaxed"
        >
          <p>
            I'm a <span className="text-white-soft">fullstack developer</span> based in Mumbai,
            currently working at Infomatics Services where I build enterprise compliance software
            for the BFSI sector.
          </p>
          <p>
            I don't just write code — I own projects end to end. From architecture to deployment,
            from database design to mobile APK distribution. I work across the stack and I
            <span className="text-white-soft"> make sure things ship.</span>
          </p>
          <p>
            Outside of work, I build my own products — a biometric attendance system running live
            at a hospital in Mumbai, a sports management platform, and AI-powered pipelines.
          </p>
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/Naazkn13"
              target="_blank"
              className="border border-teal/30 text-teal px-5 py-2 rounded-full text-sm hover:bg-teal/10 transition-all font-inter"
            >
              GitHub →
            </a>
            <a
              href="https://www.linkedin.com/in/nuzhat-khan-dev/"
              target="_blank"
              className="border border-teal/30 text-teal px-5 py-2 rounded-full text-sm hover:bg-teal/10 transition-all font-inter"
            >
              LinkedIn →
            </a>
            <a
              href="#contact"
              className="bg-teal text-navy px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal/90 transition-all font-inter"
            >
              Let's Talk
            </a>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="flex gap-4 p-5 rounded-xl glass hover:bg-teal/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal/20 transition-all">
                <item.icon size={18} className="text-teal" />
              </div>
              <div>
                <span className="text-teal text-xs font-mono">{item.year}</span>
                <h4 className="font-grotesk font-semibold text-white-soft text-sm mt-0.5">{item.title}</h4>
                <p className="text-grey text-xs mt-1 leading-relaxed font-inter">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
