'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Briefcase, Sparkles, Download, ArrowRight } from 'lucide-react'

const timeline = [
  {
    icon: GraduationCap,
    year: '2021 – 2024',
    title: 'BSc in Information Technology',
    subtitle: "Bhavan's College, Mumbai University",
    desc: 'Foundational coursework in algorithms, relational databases, data structures, and computer networks.',
  },
  {
    icon: Briefcase,
    year: 'Jun 2025 – 24 Jul 2026',
    title: 'Software Developer (Enterprise RegTech & BFSI)',
    subtitle: 'Infomatics Services Pvt. Ltd., Mumbai (~14 Months)',
    desc: 'Shipped Novus Comply & Novus UPSI (trade pre-clearance, RBAC, encrypted databases), Compulse (automating 67+ SEBI reports across 43 maker-checker stages to UAT), and CAS Statement Parser (98% accuracy on 500+ statements/mo).',
  },
  {
    icon: Sparkles,
    year: 'Available Immediately',
    title: 'Open to Work: Python Backend & AI/GenAI Roles',
    subtitle: 'Mumbai (On-Site / Hybrid) or Remote',
    desc: 'Zero notice period. Ready to deploy production-grade FastAPI microservices, robust PostgreSQL schemas, Docker workflows, and practical vector retrieval / GenAI applications.',
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
        <span className="text-teal text-xs tracking-widest uppercase font-mono">Background &amp; Track Record</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2 text-white-soft">
          About Me
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Narrative Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-7 sm:p-8 space-y-5 text-grey font-inter leading-relaxed border border-white/10"
        >
          <p>
            I am a <strong className="text-white-soft">Python Backend Developer and AI/GenAI Engineer</strong> with ~14 months of enterprise software engineering experience in regulated financial systems (BFSI &amp; RegTech) at Infomatics Services.
          </p>
          <p>
            My engineering philosophy centers on <strong className="text-white-soft">verifiable correctness, clean domain logic, and end-to-end ownership</strong>. From architecting async FastAPI endpoints and designing indexed PostgreSQL database schemas to containerizing with Docker and deploying CI/CD pipelines, I build systems designed for auditability and scale.
          </p>
          <p>
            Beyond enterprise compliance, I have built and deployed practical full-stack and AI systems: a live hardware-integrated biometric attendance and payroll engine at a Mumbai eye hospital, a multimodal semantic search engine using CLIP and Qdrant, and an algorithmic trading system backed by 37 automated pytest tests.
          </p>

          {/* Verified Metric Badges */}
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-grey">
            <span className="border border-teal/30 text-teal bg-teal/5 rounded-full px-3 py-1">67+ SEBI reports automated</span>
            <span className="border border-teal/30 text-teal bg-teal/5 rounded-full px-3 py-1">43 maker-checker stages</span>
            <span className="border border-white/10 text-white-soft rounded-full px-3 py-1">12+ hospital staff onboarded</span>
            <span className="border border-white/10 text-white-soft rounded-full px-3 py-1">98% CAS parsing accuracy</span>
            <span className="border border-emerald-400/30 text-emerald-300 rounded-full px-3 py-1">37 automated pytest tests</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="/resume-python.pdf"
              download="Nuzhat_Khan_Python_Developer_Resume.pdf"
              className="bg-teal text-navy px-5 py-2.5 rounded-full text-xs font-grotesk font-bold hover:bg-teal/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Download size={13} />
              Python Resume
            </a>
            <a
              href="/resume-ai.pdf"
              download="Nuzhat_Khan_AI_GenAI_Engineer_Resume.pdf"
              className="border border-teal/40 text-teal px-5 py-2.5 rounded-full text-xs font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              AI Resume
            </a>
            <a
              href="#contact"
              className="border border-white/20 text-white-soft px-5 py-2.5 rounded-full text-xs font-grotesk hover:bg-white/5 transition-all flex items-center gap-1"
            >
              Let&apos;s Connect
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Right Timeline Cards */}
        <div className="space-y-5">
          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="flex gap-4 p-5 sm:p-6 rounded-xl glass hover:bg-teal/5 transition-all group border border-white/5 hover:border-teal/20"
            >
              <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal/20 transition-all text-teal">
                <item.icon size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-teal text-xs font-mono">{item.year}</span>
                <h4 className="font-grotesk font-bold text-white-soft text-sm sm:text-base">{item.title}</h4>
                <p className="text-grey/90 text-xs font-mono">{item.subtitle}</p>
                <p className="text-grey text-xs mt-1.5 leading-relaxed font-inter">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
