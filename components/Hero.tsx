'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

type Phrase = { start: number; end: number; text: string }

const scriptData: Phrase[] = [
  { start: 0.0, end: 2.5, text: 'I graduated in 2024.' },
  { start: 2.5, end: 7.5, text: 'Within a year, I was building enterprise software at a product company in Mumbai.' },
  { start: 7.5, end: 10.0, text: "I'm Nuzhat Khan." },
  { start: 10.0, end: 13.0, text: 'I build with Python and modern AI.' },
  { start: 13.0, end: 16.5, text: 'From backend systems that handle real users, to RAG-powered apps with LLMs.' },
  { start: 16.5, end: 19.5, text: 'I own projects end to end.' },
  { start: 19.5, end: 23.0, text: 'I manage the full lifecycle from architecture to deployment.' },
  { start: 23.0, end: 26.0, text: 'I build end to end with Python, FastAPI, React, and Docker.' },
  { start: 26.0, end: 29.0, text: 'Seamlessly creating robust solutions.' },
  { start: 29.5, end: 32.0, text: 'I find the problem. I build the solution.' },
  { start: 32.0, end: 35.0, text: "Here's what I've built." },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onEnded = () => {
      setVideoEnded(true)
      setIsPaused(false)
    }
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [])

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => {
        setHasStarted(true)
        setVideoEnded(false)
        setIsPaused(false)
      }).catch(err => console.error('Playback failed:', err))
    }
  }, [])

  const handleVideoClick = useCallback(() => {
    if (!videoRef.current || !hasStarted || videoEnded) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPaused(false)
    } else {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }, [hasStarted, videoEnded])

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().then(() => {
        setVideoEnded(false)
        setIsPaused(false)
      })
    }
  }, [])

  useEffect(() => {
    if (!hasStarted || !videoRef.current) return

    let animationFrameId: number

    const updateText = () => {
      if (!videoRef.current) return
      const time = videoRef.current.currentTime
      const phrase = scriptData.find(p => time >= p.start && time < p.end)
      setCurrentText(phrase ? phrase.text : '')
      animationFrameId = requestAnimationFrame(updateText)
    }

    animationFrameId = requestAnimationFrame(updateText)
    return () => cancelAnimationFrame(animationFrameId)
  }, [hasStarted])

  return (
    <section className="relative h-screen flex flex-col md:flex-row overflow-hidden bg-[#080E1A]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[1]" />

      {/* LEFT COLUMN — VIDEO */}
      <div className="relative w-full md:w-[72%] h-[55vh] md:h-full flex-shrink-0 z-[2]">
        <video
          ref={videoRef}
          className="hero-video-mask w-full h-full object-cover cursor-pointer"
          src="/portfolio-intro.mp4"
          playsInline
          preload="auto"
          onClick={handleVideoClick}
        />

        {/* Click overlay - Play */}
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
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-3 select-none"
              >
                <span className="text-4xl">▶</span>
                <span className="text-teal font-inter uppercase tracking-widest text-xs">
                  Watch my 60-sec intro
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pause indicator */}
        <AnimatePresence>
          {hasStarted && isPaused && !videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/40 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-12 bg-teal rounded-full" />
                  <span className="w-3 h-12 bg-teal rounded-full" />
                </div>
                <span className="text-teal font-inter uppercase tracking-widest text-xs">
                  Paused
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay button */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/40 cursor-pointer"
              onClick={handleReplay}
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-3 select-none"
              >
                <span className="text-4xl">↻</span>
                <span className="text-teal font-inter uppercase tracking-widest text-xs">
                  Replay
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN — TEXT */}
      <div className="relative w-full md:w-[28%] h-[45vh] md:h-full flex items-center z-[2]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full px-4 md:px-5 lg:px-6">

          <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-full px-3 py-1 text-teal text-[10px] tracking-widest uppercase border border-teal/20 bg-teal/5">
            <span className="leading-none whitespace-nowrap">• Software Developer · Python · AI/GenAI</span>
          </div>
          <div className="mb-5 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs tracking-wide border border-emerald-400/25 bg-emerald-400/5 text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to opportunities
          </div>

          <h1
            className="font-grotesk font-bold text-white-soft leading-tight mb-6"
            style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}
          >
            Nuzhat Khan
          </h1>

          <div className="h-24 mb-6 w-full">
            <AnimatePresence mode="wait">
              {currentText && (
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-inter text-grey font-medium leading-relaxed"
                  style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}
                >
                  {currentText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <a
              href="#projects"
              className="px-5 py-2.5 bg-teal text-navy rounded-full font-mono uppercase tracking-widest text-xs hover:bg-teal/90 transition-colors"
            >
              View Projects
            </a>
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="px-5 py-2.5 border border-teal/40 text-teal rounded-full text-xs hover:bg-teal/10 transition-colors"
            >
              View Resume
            </button>
          </div>

          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-3 w-full md:w-auto"
              >
                <a
                  href="#contact"
                  className="px-5 py-2.5 border border-teal/40 text-teal rounded-full text-xs hover:bg-teal/10 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="https://github.com/Naazkn13"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 border border-teal/40 text-teal px-5 py-2.5 rounded-full text-xs hover:bg-teal/10 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Resume inline viewer */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl h-[80vh] bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0B1220]">
                <span className="text-white-soft font-grotesk text-sm">Nuzhat_Khan_Resume.pdf</span>
                <button
                  type="button"
                  onClick={() => setShowResume(false)}
                  className="text-grey hover:text-white-soft text-xs uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
              <iframe
                src="/Nuzhat_Khan_Resume.pdf"
                title="Resume"
                className="w-full h-[calc(80vh-49px)] bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
