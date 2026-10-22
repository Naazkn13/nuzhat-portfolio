'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, ArrowRight, Download, Copy, Check, ExternalLink } from 'lucide-react'
import { LinkedinIcon as Linkedin } from './icons/LinkedinIcon'
import { GithubIcon as Github } from './icons/GithubIcon'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('knuzhat136@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
          <p className="text-grey font-inter text-lg mb-8 max-w-lg mx-auto">
            Looking for someone who ships real things?
            I'm open to opportunities, collaborations, and interesting problems.
          </p>

          {/* Direct Email Badge with 1-Click Copy */}
          <div className="inline-flex items-center gap-2.5 bg-[#0E1726]/90 border border-teal/30 hover:border-teal/60 rounded-full px-4 py-2 mb-4 backdrop-blur-sm transition-colors shadow-lg">
            <Mail size={15} className="text-teal shrink-0" />
            <a
              href="mailto:knuzhat136@gmail.com?subject=Opportunity%20Inquiry%20-%20Nuzhat%20Khan"
              className="text-white-soft hover:text-teal font-mono text-sm md:text-base font-medium transition-colors"
              title="Click to compose email"
            >
              knuzhat136@gmail.com
            </a>
            <button
              onClick={copyEmail}
              type="button"
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/15 hover:bg-teal/25 text-teal border border-teal/30 transition-all ml-1 cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-teal" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-grey/70 font-inter text-sm mb-10">
            Usually respond within 24 hrs, IST.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center w-full"
        >
          <MagneticButton>
            <a
              href="mailto:knuzhat136@gmail.com?subject=Opportunity%20Inquiry%20-%20Nuzhat%20Khan"
              className="flex items-center justify-center gap-2 bg-teal text-navy px-8 py-2.5 rounded-full font-grotesk font-semibold hover:bg-teal/90 transition-all group"
            >
              <Mail size={16} />
              Say Hello
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://www.linkedin.com/in/nuzhat-khan-dev/"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal px-8 py-2.5 rounded-full font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume-python.pdf"
              download="Nuzhat_Khan_Python_Developer_Resume.pdf"
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal px-8 py-2.5 rounded-full font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              <Download size={16} />
              Python Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume-ai.pdf"
              download="Nuzhat_Khan_AI_GenAI_Engineer_Resume.pdf"
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal px-8 py-2.5 rounded-full font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              <Download size={16} />
              AI Resume
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="https://github.com/Naazkn13"
              target="_blank"
              className="flex items-center justify-center gap-2 border border-teal/30 text-teal px-8 py-2.5 rounded-full font-grotesk font-semibold hover:bg-teal/10 transition-all"
            >
              <Github size={16} />
              GitHub
            </a>
          </MagneticButton>
        </motion.div>

        {/* Gmail Web Fallback */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-grey/60 font-inter"
        >
          <span>Using web browser?</span>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=knuzhat136@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="text-teal/80 hover:text-teal inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
          >
            Open directly in Gmail Web <ExternalLink size={11} />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-grey/40 text-xs font-inter mt-20"
        >
          © 2026 Nuzhat Khan · Built with Next.js + Framer Motion
        </motion.p>
      </div>
    </section>
  )
}
