'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

const typewriterLines = [
  "I graduated in 2024.",
  "Enterprise software.",
  "Live. Deployed.",
  "I find the problem.",
  "I build the solution.",
  "I make sure it ships."
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)

  // Typewriter state
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [typewriterActive, setTypewriterActive] = useState(false)

  // Listen for video end
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => setVideoEnded(true)
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [])

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => {
        setHasStarted(true)
        setTypewriterActive(true)
      }).catch(err => console.error("Playback failed:", err))
    }
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!typewriterActive) return

    let timeout: NodeJS.Timeout
    const currentFullText = typewriterLines[currentLineIndex]

    if (isTyping) {
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1))
        }, 80)
      } else {
        // Finished typing, pause 2.5s then move to next
        timeout = setTimeout(() => {
          if (currentLineIndex < typewriterLines.length - 1) {
            setIsTyping(false)
          }
        }, 2500)
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
      } else {
        setCurrentLineIndex(prev => prev + 1)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, typewriterActive, currentLineIndex])

  return (
    <section className="relative h-screen flex flex-col md:flex-row overflow-hidden bg-[#080E1A]">

      {/* Background grid — spans entire section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[1]" />

      {/* ──────── LEFT COLUMN — VIDEO (80%) ──────── */}
      <div className="relative w-full md:w-[80%] h-[55vh] md:h-full flex-shrink-0 z-[2]">
        <video
          ref={videoRef}
          className="hero-video-mask w-full h-full object-cover"
          src="/portfolio-intro.mp4"
          playsInline
          preload="auto"
        />

        {/* Click overlay — shown before first click */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/40 cursor-pointer"
              onClick={handlePlayClick}
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3 select-none"
              >
                <span className="text-4xl">▶</span>
                <span className="text-teal font-inter uppercase tracking-widest text-xs">
                  Click to watch
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ──────── RIGHT COLUMN — TEXT (20%) ──────── */}
      <div className="relative w-full md:w-[20%] h-[45vh] md:h-full flex items-center z-[2]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full px-4 md:px-5 lg:px-6">

          {/* Badge */}
          <div className="mb-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-teal text-[10px] tracking-widest uppercase border border-teal/20 bg-teal/5">
            <span className="w-1 h-1 bg-teal rounded-full animate-pulse" />
            Fullstack Developer · Mumbai
          </div>

          {/* Name */}
          <h1
            className="font-grotesk font-bold text-white-soft leading-tight mb-6"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
          >
            Nuzhat Khan
          </h1>

          {/* Typewriter area */}
          <div className="h-16 mb-6 w-full">
            {typewriterActive && (
              <p
                className="font-inter text-grey font-medium leading-relaxed"
                style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}
              >
                {displayedText}
                <span className="inline-block w-2 h-4 ml-0.5 bg-teal animate-pulse align-middle" />
              </p>
            )}
          </div>

          {/* Buttons — appear after video ends */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row md:flex-col gap-3 w-full"
              >
                <MagneticButton>
                  <a
                    href="#contact"
                    className="group relative px-5 py-2.5 bg-teal text-navy font-mono uppercase tracking-widest text-xs rounded-full overflow-hidden block text-center"
                  >
                    <span className="relative z-10 font-bold">Contact</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="https://github.com/Naazkn13"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 text-grey hover:text-teal transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span className="font-mono uppercase tracking-widest text-xs">GitHub</span>
                  </a>
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
