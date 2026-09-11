'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

type Word = { start: number; end: number; text: string }

const scriptData: Word[] = [
  { start: 0.0, end: 0.76, text: 'I' },
  { start: 0.76, end: 1.18, text: ' graduated' },
  { start: 1.18, end: 1.5, text: ' in' },
  { start: 1.5, end: 2.24, text: ' 2024.' },
  { start: 2.96, end: 3.14, text: 'Within' },
  { start: 3.14, end: 3.3, text: ' a' },
  { start: 3.3, end: 3.52, text: ' year,' },
  { start: 3.88, end: 4.06, text: ' I' },
  { start: 4.06, end: 4.2, text: ' was' },
  { start: 4.2, end: 4.52, text: ' building' },
  { start: 4.52, end: 4.98, text: ' enterprise' },
  { start: 4.98, end: 5.6, text: ' software' },
  { start: 5.6, end: 5.94, text: ' at' },
  { start: 5.94, end: 6.02, text: ' a' },
  { start: 6.02, end: 6.3, text: ' product' },
  { start: 6.3, end: 6.8, text: ' company' },
  { start: 6.8, end: 7.08, text: ' in' },
  { start: 7.08, end: 7.34, text: ' Mumbai.' },
  { start: 7.8, end: 7.98, text: "I'm" },
  { start: 7.98, end: 8.26, text: ' Nuzhat' },
  { start: 8.26, end: 8.46, text: ' Khan.' },
  { start: 8.8, end: 8.88, text: ' I' },
  { start: 8.88, end: 9.1, text: ' build' },
  { start: 9.1, end: 9.3, text: ' with' },
  { start: 9.3, end: 9.6, text: ' Python' },
  { start: 9.6, end: 9.88, text: ' and' },
  { start: 9.88, end: 10.18, text: ' modern' },
  { start: 10.18, end: 10.52, text: ' AI.' },
  { start: 11.04, end: 11.18, text: 'From' },
  { start: 11.18, end: 11.46, text: ' backend' },
  { start: 11.46, end: 11.84, text: ' systems' },
  { start: 11.84, end: 12.12, text: ' that' },
  { start: 12.12, end: 12.4, text: ' handle' },
  { start: 12.4, end: 12.66, text: ' real' },
  { start: 12.66, end: 13.1, text: ' users' },
  { start: 13.1, end: 13.62, text: ' to' },
  { start: 13.62, end: 13.88, text: ' RAG' },
  { start: 13.88, end: 14.22, text: '-powered' },
  { start: 14.22, end: 14.48, text: ' apps' },
  { start: 14.48, end: 14.8, text: ' with' },
  { start: 14.8, end: 15.26, text: ' LLMs,' },
  { start: 15.62, end: 15.78, text: ' I' },
  { start: 15.78, end: 15.98, text: ' own' },
  { start: 15.98, end: 16.4, text: ' projects' },
  { start: 16.4, end: 16.74, text: ' end' },
  { start: 16.74, end: 16.94, text: '-to' },
  { start: 16.94, end: 17.14, text: '-end.' },
  { start: 17.48, end: 17.64, text: ' I' },
  { start: 17.64, end: 17.92, text: ' manage' },
  { start: 17.92, end: 18.12, text: ' the' },
  { start: 18.12, end: 18.28, text: ' full' },
  { start: 18.28, end: 18.68, text: ' lifecycle.' },
  { start: 19.02, end: 19.12, text: 'From' },
  { start: 19.12, end: 19.56, text: ' architecture' },
  { start: 19.56, end: 19.88, text: ' to' },
  { start: 19.88, end: 20.26, text: ' deployment,' },
  { start: 20.58, end: 20.68, text: ' I' },
  { start: 20.68, end: 20.92, text: ' build' },
  { start: 20.92, end: 21.16, text: ' end' },
  { start: 21.16, end: 21.32, text: '-to' },
  { start: 21.32, end: 21.58, text: '-end.' },
  { start: 21.96, end: 22.14, text: 'With' },
  { start: 22.14, end: 22.54, text: ' Python,' },
  { start: 22.82, end: 22.98, text: ' FastAPI,' },
  { start: 23.36, end: 23.52, text: ' React,' },
  { start: 23.82, end: 23.9, text: ' and' },
  { start: 23.9, end: 24.18, text: ' Docker,' },
  { start: 24.72, end: 24.96, text: ' seamlessly' },
  { start: 24.96, end: 25.56, text: ' creating' },
  { start: 25.56, end: 25.86, text: ' robust' },
  { start: 25.86, end: 26.4, text: ' solutions.' },
  { start: 26.4, end: 27.24, text: ' I' },
  { start: 27.24, end: 27.46, text: ' find' },
  { start: 27.46, end: 27.66, text: ' the' },
  { start: 27.66, end: 28.04, text: ' problem,' },
  { start: 28.28, end: 28.72, text: ' I' },
  { start: 28.72, end: 28.96, text: ' build' },
  { start: 28.96, end: 29.1, text: ' the' },
  { start: 29.1, end: 29.58, text: ' solution.' },
  { start: 30.42, end: 30.9, text: "Here's" },
  { start: 30.9, end: 31.0, text: ' what' },
  { start: 31.0, end: 31.22, text: "I've" },
  { start: 31.22, end: 31.46, text: ' built.' },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
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
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight
    }
  }, [displayedText])

  useEffect(() => {
    if (!hasStarted || !videoRef.current) return

    let animationFrameId: number

    const updateText = () => {
      if (!videoRef.current) return
      const time = videoRef.current.currentTime
      let newText = ''

      for (const word of scriptData) {
        if (time >= word.end) {
          newText += word.text
        } else if (time >= word.start) {
          const progress = (time - word.start) / (word.end - word.start)
          const charsToShow = Math.floor(progress * word.text.length)
          newText += word.text.slice(0, charsToShow)
          break
        }
      }

      setDisplayedText(newText)
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

          <div 
            ref={textRef}
            className="h-64 mb-6 w-full overflow-y-auto pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#00D4C8 #080E1A',
            }}
          >
            {displayedText && (
              <p
                className="font-inter text-grey font-medium leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}
              >
                {displayedText}
                <span className="inline-block w-2 h-4 ml-0.5 bg-teal animate-pulse align-middle" />
              </p>
            )}
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
