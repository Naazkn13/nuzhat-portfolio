'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import { GithubIcon as Github } from './icons/GithubIcon'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-teal text-xs tracking-widest uppercase font-inter">Get in touch</span>
          <h2 className="font-grotesk text-4xl md:text-6xl font-bold mt-2 mb-6">
            Let's <span className="text-teal">Connect</span>
          </h2>
          <p className="text-grey font-inter text-lg mb-12 max-w-lg mx-auto">
            Looking for someone who ships real things?
            I'm open to opportunities, collaborations, and interesting problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton>
            <a
              href="mailto:your@email.com"
              className="flex items-center justify-center gap-2 bg-teal text-navy px-8 py-3.5 rounded-full font-grotesk font-semibold hover:bg-teal/90 transition-all group"
            >
              <Mail size={16} />
              Say Hello
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://github.com/Naazkn13"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal px-8 py-3.5 rounded-full font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              <Github size={16} />
              GitHub — Naazkn13
            </a>
          </MagneticButton>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-grey/40 text-xs font-inter mt-20"
        >
          © 2025 Nuzhat Khan · Built with Next.js + Framer Motion
        </motion.p>
      </div>
    </section>
  )
}
