'use client'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'
import { LinkedinIcon as Linkedin } from './icons/LinkedinIcon'
import { GithubIcon as Github } from './icons/GithubIcon'

const internalLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '/case-study' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    // Keep navbar visible if mobile menu is open
    if (!mobileMenuOpen) {
      setHidden(latest > prev && latest > 80)
    }
    setScrolled(latest > 20)
  })

  return (
    <motion.nav
      animate={{ y: hidden && !mobileMenuOpen ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-3.5 md:py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-[#080E1A]/90 backdrop-blur-md border-b border-teal/20' : 'bg-transparent'
      }`}
    >
      {/* Brand logo / initial */}
      <Link
        href="/"
        className="font-grotesk font-bold text-base md:text-lg text-white-soft tracking-wider hover:text-teal transition-colors flex items-center gap-1.5"
      >
        <span className="text-teal font-mono">&lt;</span>
        <span>NK</span>
        <span className="text-teal font-mono">/&gt;</span>
      </Link>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-8">
        {internalLinks.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={link.href}
              className="text-grey hover:text-teal transition-colors text-sm font-inter tracking-wide"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.a
          href="https://github.com/Naazkn13"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 border border-teal/30 text-teal px-4 py-1.5 rounded-full text-sm hover:bg-teal/10 transition-all"
        >
          <Github size={14} />
          GitHub
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/nuzhat-khan-dev/"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 border border-teal/30 text-teal px-4 py-1.5 rounded-full text-sm hover:bg-teal/10 transition-all"
        >
          <Linkedin size={14} />
          LinkedIn
        </motion.a>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        className="md:hidden text-grey hover:text-teal p-1.5 rounded-lg transition-colors focus:outline-none"
      >
        {mobileMenuOpen ? <X size={22} className="text-teal" /> : <Menu size={22} />}
      </button>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#080E1A]/95 backdrop-blur-xl border-b border-teal/20 px-6 py-5 flex flex-col gap-3.5 md:hidden shadow-2xl"
          >
            {internalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-grey hover:text-teal text-base font-inter py-1 transition-colors flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-teal/40 text-xs">→</span>
              </Link>
            ))}

            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              <a
                href="/Nuzhat_Khan_Resume.pdf"
                download
                className="flex items-center gap-1.5 bg-teal text-navy px-4 py-2 rounded-full text-xs font-grotesk font-semibold hover:bg-teal/90 transition-all"
              >
                <Download size={13} />
                Resume
              </a>
              <a
                href="https://github.com/Naazkn13"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-teal/30 text-teal px-3.5 py-2 rounded-full text-xs font-grotesk hover:bg-teal/10 transition-all"
              >
                <Github size={13} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nuzhat-khan-dev/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-teal/30 text-teal px-3.5 py-2 rounded-full text-xs font-grotesk hover:bg-teal/10 transition-all"
              >
                <Linkedin size={13} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
