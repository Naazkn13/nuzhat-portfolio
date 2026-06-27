'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

const typewriterLines = [
  "I graduated in 2024.",
  "By 2025, enterprise software. Live. Deployed.",
  "I find the problem.",
  "I build the solution.",
  "I make sure it ships."
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  
  // Typewriter state
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play().then(() => {
        setHasStarted(true)
      }).catch(err => console.error("Playback failed:", err))
    }
  }

  // Typewriter effect synced with hasStarted
  useEffect(() => {
    if (!hasStarted) return
    
    let timeout: NodeJS.Timeout
    const currentFullText = typewriterLines[currentLineIndex]

    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1))
        }, 80) // typing speed
      } else {
        // finished typing this line, pause for 3s
        timeout = setTimeout(() => {
          if (currentLineIndex < typewriterLines.length - 1) {
            setIsTyping(false) // start deleting if not the last line
          }
          // If it's the last line, it will just stay there
        }, 3000)
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30) // deleting speed
      } else {
        // finished deleting, move to next line
        setCurrentLineIndex(prev => prev + 1)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, hasStarted, currentLineIndex])

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row bg-[#080E1A] overflow-hidden">
      
      {/* Background grid and subtle glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,212,200,0.08),transparent_60%)] pointer-events-none" />

      {/* Left Column (Video) */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen z-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover video-mask"
          src="/portfolio-intro.mp4"
          playsInline
          // Note: NO loop attribute, plays once
        />
        
        {/* Click to play overlay covering the video */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/60 cursor-pointer group"
              onClick={handlePlayClick}
            >
              <div className="text-teal font-inter uppercase tracking-widest text-sm border border-teal-border px-6 py-3 rounded-full group-hover:bg-teal-dim transition-colors relative overflow-hidden">
                <span className="absolute inset-0 rounded-full teal-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                  Click to hear Nuzhat
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column (Content) */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen flex flex-col justify-center px-8 md:pr-16 lg:pr-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start text-left max-w-xl mx-auto md:mx-0 w-full"
        >
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 glass-subtle rounded-full px-4 py-1.5 text-teal text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
            Fullstack Developer · Mumbai
          </div>

          {/* Heading */}
          <h1 
            className="font-grotesk font-bold leading-tight mb-8 drop-shadow-2xl text-white-soft"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            Hi, I'm <span className="text-teal teal-text-glow">Nuzhat Khan</span>
          </h1>

          {/* Typewriter text */}
          <div className="h-20 mb-12">
            <p className="font-inter text-xl md:text-2xl text-grey font-medium leading-relaxed">
              {displayedText}
              <span className="inline-block w-3 h-6 ml-1 bg-teal animate-pulse align-middle" />
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <MagneticButton>
              <a href="#contact" className="group relative px-8 py-3 bg-teal text-navy font-mono uppercase tracking-widest text-sm rounded-full overflow-hidden block">
                <span className="relative z-10 font-bold">Contact</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a href="https://github.com/nuzhat-khan" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-grey hover:text-teal transition-colors">
                <GithubIcon className="w-6 h-6" />
                <span className="font-mono uppercase tracking-widest text-sm">GitHub</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
