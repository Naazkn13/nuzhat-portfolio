'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { GithubIcon as Github } from './icons/GithubIcon'

const links = ['About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 80)
    setScrolled(latest > 20)
  })

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-navy/80 backdrop-blur-md border-b border-teal-dim' : 'bg-transparent'
      }`}
    >
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-grotesk font-bold text-white-soft tracking-tight"
      >
        NK<span className="text-teal">.</span>
      </motion.span>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-grey hover:text-teal transition-colors text-sm font-inter tracking-wide"
          >
            {link}
          </motion.a>
        ))}
        <motion.a
          href="https://github.com/Naazkn13"
          target="_blank"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 border border-teal-border text-teal px-4 py-1.5 rounded-full text-sm hover:bg-teal-dim transition-all"
        >
          <Github size={14} />
          GitHub
        </motion.a>
      </div>
    </motion.nav>
  )
}
