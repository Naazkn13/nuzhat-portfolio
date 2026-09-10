'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

type WordTimestamp = { start: number; end: number; text: string }
type Phrase = { start: number; end: number; words: WordTimestamp[] }

const scriptData: Phrase[] = [
  {
    start: 0.00, end: 2.36,
    words: [
      { start: 0.00, end: 0.80, text: "I" },
      { start: 0.80, end: 1.20, text: " graduated" },
      { start: 1.20, end: 1.60, text: " in" },
      { start: 1.60, end: 2.36, text: " 2024." }
    ]
  },
  {
    start: 3.56, end: 11.80,
    words: [
      { start: 3.56, end: 4.32, text: "By" },
      { start: 4.32, end: 5.06, text: " 2025," },
      { start: 5.14, end: 5.62, text: " I" },
      { start: 5.62, end: 5.74, text: " was" },
      { start: 5.74, end: 6.12, text: " already" },
      { start: 6.12, end: 6.50, text: " building" },
      { start: 6.50, end: 6.90, text: " enterprise" },
      { start: 6.90, end: 7.46, text: " software" },
      { start: 7.46, end: 7.68, text: " at" },
      { start: 7.68, end: 7.76, text: " a" },
      { start: 7.76, end: 7.98, text: " product" },
      { start: 7.98, end: 8.40, text: " company" },
      { start: 8.40, end: 8.60, text: " in" },
      { start: 8.60, end: 8.88, text: " Mumbai," },
      { start: 9.28, end: 9.64, text: " compliance" },
      { start: 9.64, end: 10.14, text: " platforms" },
      { start: 10.14, end: 10.54, text: " used" },
      { start: 10.54, end: 10.74, text: " by" },
      { start: 10.74, end: 10.86, text: " the" },
      { start: 10.86, end: 11.44, text: " BFSI" },
      { start: 11.44, end: 11.80, text: " sector." }
    ]
  },
  {
    start: 12.46, end: 15.40,
    words: [
      { start: 12.46, end: 13.10, text: "I'm" },
      { start: 13.10, end: 13.70, text: " Nuzhat Khan," },
      { start: 14.56, end: 14.64, text: " software" },
      { start: 14.64, end: 14.90, text: " developer." },
      { start: 14.90, end: 15.40, text: " Python." },
    ]
  },
  {
    start: 17.66, end: 22.92,
    words: [
      { start: 17.66, end: 18.42, text: "I" },
      { start: 18.42, end: 18.66, text: " find" },
      { start: 18.66, end: 18.80, text: " the" },
      { start: 18.80, end: 19.18, text: " problem," },
      { start: 19.66, end: 19.84, text: " I" },
      { start: 19.84, end: 20.08, text: " build" },
      { start: 20.08, end: 20.24, text: " the" },
      { start: 20.24, end: 20.72, text: " solution," },
      { start: 21.08, end: 21.90, text: " and" },
      { start: 21.90, end: 22.00, text: " I" },
      { start: 22.00, end: 22.18, text: " make" },
      { start: 22.18, end: 22.44, text: " sure" },
      { start: 22.44, end: 22.58, text: " it" },
      { start: 22.58, end: 22.92, text: " ships." }
    ]
  },
  {
    start: 24.58, end: 25.64,
    words: [
      { start: 24.58, end: 25.10, text: "Here's" },
      { start: 25.10, end: 25.20, text: " what" },
      { start: 25.20, end: 25.40, text: " I've" },
      { start: 25.40, end: 25.64, text: " built." }
    ]
  }
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typewriterActive, setTypewriterActive] = useState(false)
  const [showResume, setShowResume] = useState(false)

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

  // Sync Typewriter to Video currentTime
  useEffect(() => {
    if (!typewriterActive || !videoRef.current) return

    let animationFrameId: number

    const updateTypewriter = () => {
      if (!videoRef.current) return
      const time = videoRef.current.currentTime
      let newText = ""

      for (let i = 0; i < scriptData.length; i++) {
        const phrase = scriptData[i]
        const nextPhraseStart = i + 1 < scriptData.length ? scriptData[i + 1].start : time + 10

        // If we are before this phrase even starts deleting, or during it
        if (time >= phrase.start && time < nextPhraseStart) {
          
          if (time <= phrase.end) {
            // TYPING PHASE
            let builtString = ""
            for (const word of phrase.words) {
              if (time >= word.end) {
                builtString += word.text
              } else if (time >= word.start) {
                const progress = (time - word.start) / (word.end - word.start)
                const charsToShow = Math.floor(progress * word.text.length)
                builtString += word.text.slice(0, charsToShow)
              }
            }
            newText = builtString
          } else {
            // DELETING PHASE
            const gap = nextPhraseStart - phrase.end
            const holdEnd = phrase.end + (gap * 0.1)
            
            if (time <= holdEnd) {
              // Holding full text
              newText = phrase.words.map(w => w.text).join('')
            } else {
              // Deleting
              const deleteProgress = (time - holdEnd) / (nextPhraseStart - holdEnd)
              const fullText = phrase.words.map(w => w.text).join('')
              const charsToKeep = Math.max(0, Math.floor(fullText.length * (1 - deleteProgress)))
              newText = fullText.slice(0, charsToKeep)
            }
          }
          break
        }
      }

      setDisplayedText(newText)
      animationFrameId = requestAnimationFrame(updateTypewriter)
    }

    animationFrameId = requestAnimationFrame(updateTypewriter)
    return () => cancelAnimationFrame(animationFrameId)
  }, [typewriterActive])

  return (
    <section className="relative h-screen flex flex-col md:flex-row overflow-hidden bg-[#080E1A]">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[1]" />

      {/* LEFT COLUMN — VIDEO */}
      <div className="relative w-full md:w-[80%] h-[55vh] md:h-full flex-shrink-0 z-[2]">
        <video
          ref={videoRef}
          className="hero-video-mask w-full h-full object-cover"
          src="/portfolio-intro.mp4"
          playsInline
          preload="auto"
        />

        {/* Click overlay */}
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
                  Watch my 60-sec intro
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN — TEXT */}
      <div className="relative w-full md:w-[20%] h-[45vh] md:h-full flex items-center z-[2]">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full px-4 md:px-5 lg:px-6">

          <div className="mb-4 flex flex-wrap items-center gap-1.5 rounded-full px-3 py-1 text-teal text-[10px] tracking-widest uppercase border border-teal/20 bg-teal/5">
            <span className="leading-none whitespace-nowrap">• Software Developer · Python · FastAPI · AI/GenAI · React</span>
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
