'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import MagneticButton from './MagneticButton'
import { GithubIcon } from './icons/GithubIcon'

type WordTimestamp = { start: number; end: number; text: string }
type Phrase = { start: number; end: number; words: WordTimestamp[] }

const scriptData: Phrase[] = [
  {
    start: 0.00, end: 2.00,
    words: [
      { start: 0.00, end: 0.60, text: "I" },
      { start: 0.60, end: 1.10, text: " graduated" },
      { start: 1.10, end: 1.40, text: " in" },
      { start: 1.40, end: 2.00, text: " 2024." }
    ]
  },
  {
    start: 2.50, end: 8.50,
    words: [
      { start: 2.50, end: 2.90, text: "By" },
      { start: 2.90, end: 3.30, text: " 2025," },
      { start: 3.40, end: 3.60, text: " I" },
      { start: 3.60, end: 3.80, text: " was" },
      { start: 3.80, end: 4.20, text: " already" },
      { start: 4.20, end: 4.60, text: " building" },
      { start: 4.60, end: 5.00, text: " enterprise" },
      { start: 5.00, end: 5.50, text: " software" },
      { start: 5.50, end: 5.70, text: " at" },
      { start: 5.70, end: 5.80, text: " a" },
      { start: 5.80, end: 6.10, text: " product" },
      { start: 6.10, end: 6.50, text: " company" },
      { start: 6.50, end: 6.70, text: " in" },
      { start: 6.70, end: 7.20, text: " Mumbai." },
    ]
  },
  {
    start: 9.00, end: 11.50,
    words: [
      { start: 9.00, end: 9.50, text: "I'm" },
      { start: 9.50, end: 10.00, text: " Nuzhat Khan," },
      { start: 10.30, end: 10.60, text: " software" },
      { start: 10.60, end: 11.50, text: " developer." },
    ]
  },
  {
    start: 12.00, end: 15.00,
    words: [
      { start: 12.00, end: 12.30, text: "I" },
      { start: 12.30, end: 12.70, text: " build" },
      { start: 12.70, end: 13.20, text: " AI/GenAI" },
      { start: 13.20, end: 13.60, text: " apps" },
      { start: 13.60, end: 13.90, text: " with" },
      { start: 13.90, end: 14.30, text: " RAG" },
      { start: 14.30, end: 14.60, text: " and" },
      { start: 14.60, end: 15.00, text: " LLMs." },
    ]
  },
  {
    start: 15.50, end: 19.00,
    words: [
      { start: 15.50, end: 15.80, text: "I" },
      { start: 15.80, end: 16.20, text: " own" },
      { start: 16.20, end: 16.60, text: " projects" },
      { start: 16.60, end: 16.90, text: " end" },
      { start: 16.90, end: 17.10, text: " to" },
      { start: 17.10, end: 17.50, text: " end —" },
      { start: 17.50, end: 17.80, text: " from" },
      { start: 17.80, end: 18.20, text: " architecture" },
      { start: 18.20, end: 18.50, text: " to" },
      { start: 18.50, end: 19.00, text: " deployment." },
    ]
  },
  {
    start: 19.50, end: 22.50,
    words: [
      { start: 19.50, end: 19.80, text: "I" },
      { start: 19.80, end: 20.20, text: " work" },
      { start: 20.20, end: 20.60, text: " across" },
      { start: 20.60, end: 21.00, text: " Python," },
      { start: 21.00, end: 21.40, text: " FastAPI," },
      { start: 21.40, end: 21.80, text: " React," },
      { start: 21.80, end: 22.10, text: " and" },
      { start: 22.10, end: 22.50, text: " Docker." },
    ]
  },
  {
    start: 23.00, end: 25.50,
    words: [
      { start: 23.00, end: 23.30, text: "I" },
      { start: 23.30, end: 23.60, text: " find" },
      { start: 23.60, end: 23.80, text: " the" },
      { start: 23.80, end: 24.20, text: " problem," },
      { start: 24.50, end: 24.70, text: " I" },
      { start: 24.70, end: 25.00, text: " build" },
      { start: 25.00, end: 25.20, text: " the" },
      { start: 25.20, end: 25.50, text: " solution." },
    ]
  },
  {
    start: 26.00, end: 27.50,
    words: [
      { start: 26.00, end: 26.40, text: "Here's" },
      { start: 26.40, end: 26.60, text: " what" },
      { start: 26.60, end: 26.80, text: " I've" },
      { start: 26.80, end: 27.20, text: " built." },
      { start: 27.20, end: 27.50, text: " →" },
    ]
  },
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
      <div className="relative w-full md:w-[72%] h-[55vh] md:h-full flex-shrink-0 z-[2]">
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

          <div className="h-20 mb-6 w-full">
            {typewriterActive && (
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
