'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import { GithubIcon } from './icons/GithubIcon'
import { Download, FileText, ExternalLink, Play, Pause, RotateCcw, Eye } from 'lucide-react'

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
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [activeResumeTab, setActiveResumeTab] = useState<'PYTHON' | 'AI'>('PYTHON')

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
    <section className="relative min-h-screen md:h-screen flex flex-col md:flex-row md:overflow-hidden bg-[#080E1A] pt-16 md:pt-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[1]" />

      {/* LEFT COLUMN — VIDEO WITH POSTER */}
      <div className="relative w-full md:w-[65%] lg:w-[68%] h-[38vh] sm:h-[46vh] md:h-full flex-shrink-0 z-[2] bg-navy/60">
        <video
          ref={videoRef}
          className="hero-video-mask w-full h-full object-cover cursor-pointer"
          src="/portfolio-intro.mp4"
          poster="/frame-30.jpg"
          playsInline
          preload="metadata"
          onClick={handleVideoClick}
        />

        {/* Click overlay - Play */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/40 backdrop-blur-[2px] cursor-pointer group"
              onClick={handlePlayClick}
            >
              <div className="flex flex-col items-center gap-3 select-none">
                <span className="w-14 h-14 rounded-full bg-teal/20 border border-teal/50 text-teal flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-teal group-hover:text-navy transition-all shadow-xl shadow-teal/10">
                  ▶
                </span>
                <span className="text-teal font-mono uppercase tracking-widest text-xs px-3 py-1 rounded-full bg-navy/80 border border-teal/30">
                  Watch 60-Sec Intro
                </span>
              </div>
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
                  <span className="w-3 h-10 bg-teal rounded-full" />
                  <span className="w-3 h-10 bg-teal rounded-full" />
                </div>
                <span className="text-teal font-mono uppercase tracking-widest text-xs">
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
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#080E1A]/50 cursor-pointer"
              onClick={handleReplay}
            >
              <div className="flex flex-col items-center gap-3 select-none">
                <span className="w-14 h-14 rounded-full bg-teal/20 border border-teal/50 text-teal flex items-center justify-center text-2xl hover:scale-110 hover:bg-teal hover:text-navy transition-all">
                  ↻
                </span>
                <span className="text-teal font-mono uppercase tracking-widest text-xs">
                  Replay Intro
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN — RECRUITER VALUE PROPOSITION & IMMEDIATE CONTENT */}
      <div className="relative w-full md:w-[35%] lg:w-[32%] flex-1 md:h-full flex items-center py-6 md:py-0 z-[2] bg-[#080E1A]/95 md:bg-transparent">
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full px-5 sm:px-7 md:px-6 lg:px-8 space-y-4">

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="rounded-full px-3 py-1 text-teal text-[11px] font-mono tracking-wider uppercase border border-teal/30 bg-teal/5">
              Python Backend &amp; AI/GenAI
            </span>
            <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs tracking-wide border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available Immediately · Mumbai / Remote
            </span>
          </div>

          {/* Name & Title */}
          <div>
            <h1 className="font-grotesk font-bold text-3xl sm:text-4xl text-white-soft leading-tight">
              Nuzhat Khan
            </h1>
            <p className="text-teal font-mono text-xs sm:text-sm mt-1">
              Software Developer · ~14 Months Experience
            </p>
          </div>

          {/* Recruiter Summary Box (ALWAYS VISIBLE; switches to subtitle stream when video plays) */}
          <div 
            ref={textRef}
            className="w-full max-h-48 sm:max-h-56 overflow-y-auto pr-1 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#00D4C8 #080E1A',
            }}
          >
            {hasStarted ? (
              <p className="font-inter text-grey">
                {displayedText}
                <span className="inline-block w-2 h-4 ml-0.5 bg-teal animate-pulse align-middle" />
              </p>
            ) : (
              <div className="space-y-2 text-grey font-inter">
                <p>
                  <strong className="text-white-soft font-semibold">Enterprise BFSI &amp; RegTech Developer:</strong> Shipped 4 production platforms at Infomatics Services (June 2025 – 24 July 2026) using <span className="text-teal font-mono">FastAPI, PostgreSQL, Docker</span> handling trade pre-clearance, 67+ SEBI report maker-checker workflows, and financial document extraction (98% accuracy on 500+ statements/mo).
                </p>
                <p>
                  <strong className="text-white-soft font-semibold">Applied AI &amp; Quantitative Engineering:</strong> Built multimodal search (<span className="text-teal font-mono">CLIP, Qdrant, LoRA</span>) and an algorithmic trading system backed by 37 automated pytest tests.
                </p>
              </div>
            )}
          </div>

          {/* PRIMARY RECRUITER ACTIONS: DUAL RESUME DOWNLOADS */}
          <div className="w-full space-y-2.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {/* Primary Download: Python Backend Resume */}
              <a
                href="/resume-python.pdf"
                download="Nuzhat_Khan_Python_Developer_Resume.pdf"
                className="py-2.5 px-3 bg-teal hover:bg-teal/90 text-navy rounded-xl font-grotesk font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <Download size={14} />
                Python Resume (PDF)
              </a>

              {/* Secondary Download: AI/GenAI Resume */}
              <a
                href="/resume-ai.pdf"
                download="Nuzhat_Khan_AI_GenAI_Engineer_Resume.pdf"
                className="py-2.5 px-3 border border-teal/40 hover:bg-teal/10 text-teal rounded-xl font-grotesk font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                <FileText size={14} />
                AI/GenAI Resume
              </a>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
              <a
                href="#projects"
                className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-teal/30 text-grey hover:text-white-soft font-mono transition-all text-[11px]"
              >
                Explore Projects ↓
              </a>
              <button
                type="button"
                onClick={() => setShowResumeModal(true)}
                className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-teal/30 text-grey hover:text-white-soft font-mono transition-all text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Eye size={12} className="text-teal" />
                Preview in Browser
              </button>
              <a
                href="https://github.com/Naazkn13"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-teal/30 text-grey hover:text-white-soft font-mono transition-all text-[11px] flex items-center gap-1"
              >
                <GithubIcon className="w-3 h-3 text-teal" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DUAL RESUME INLINE PREVIEW MODAL */}
      <AnimatePresence>
        {showResumeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-navy/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl h-[90vh] bg-[#0B1220] border border-teal/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Bar */}
              <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#080E1A] gap-3">
                {/* Tabs to select which resume to view */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveResumeTab('PYTHON')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeResumeTab === 'PYTHON'
                        ? 'bg-teal text-navy font-bold'
                        : 'text-grey hover:text-white-soft bg-white/5'
                    }`}
                  >
                    Python Backend Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveResumeTab('AI')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeResumeTab === 'AI'
                        ? 'bg-teal text-navy font-bold'
                        : 'text-grey hover:text-white-soft bg-white/5'
                    }`}
                  >
                    AI / GenAI Resume
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={activeResumeTab === 'PYTHON' ? '/resume-python.pdf' : '/resume-ai.pdf'}
                    download={activeResumeTab === 'PYTHON' ? 'Nuzhat_Khan_Python_Developer_Resume.pdf' : 'Nuzhat_Khan_AI_GenAI_Engineer_Resume.pdf'}
                    className="flex items-center gap-1.5 text-xs bg-teal/15 hover:bg-teal/25 text-teal border border-teal/40 px-3 py-1.5 rounded-full font-inter transition-all"
                  >
                    <Download size={13} />
                    Download Current ({activeResumeTab === 'PYTHON' ? 'Python' : 'AI'})
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowResumeModal(false)}
                    className="text-grey hover:text-white-soft text-xs font-mono uppercase tracking-widest px-2 py-1"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Iframe View */}
              <iframe
                src={activeResumeTab === 'PYTHON' ? '/resume-python.pdf' : '/resume-ai.pdf'}
                title="Resume Preview"
                className="w-full flex-1 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
