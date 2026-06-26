'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Timed subtitles: each entry has a start time (seconds), end time, and the text.
// Adjust these timestamps to perfectly match your video's speech!
const subtitles = [
  { start: 0.5, end: 3, text: "Hi, I'm Nuzhat Khan" },
  { start: 3.5, end: 6, text: "A fullstack developer based in Mumbai" },
  { start: 6.5, end: 9.5, text: "I find the problem" },
  { start: 10, end: 13, text: "I build the solution" },
  { start: 13.5, end: 17, text: "And I make sure it ships" },
]

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null)

  useEffect(() => {
    const startExperience = () => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true)
        }).catch(() => {
          videoRef.current!.muted = true
          videoRef.current!.play()
          setIsVideoPlaying(true)
        })
      }
    }
    
    window.addEventListener('portfolio-start', startExperience)
    return () => window.removeEventListener('portfolio-start', startExperience)
  }, [])

  // Subtitle sync loop — reads video currentTime and matches to subtitle entries
  useEffect(() => {
    if (!isVideoPlaying) return
    
    let animFrame: number
    const syncSubtitles = () => {
      if (videoRef.current) {
        const t = videoRef.current.currentTime
        const active = subtitles.find(s => t >= s.start && t <= s.end)
        setCurrentSubtitle(active ? active.text : null)
      }
      animFrame = requestAnimationFrame(syncSubtitles)
    }
    
    animFrame = requestAnimationFrame(syncSubtitles)
    return () => cancelAnimationFrame(animFrame)
  }, [isVideoPlaying])

  return (
    <section className="relative min-h-screen flex items-center justify-end px-6 md:px-16 overflow-hidden">
      
      {/* Cinematic Fullscreen Background Video */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={isVideoPlaying ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/portfolio-intro.mp4"
          playsInline
          loop
          muted
        />
        {/* Gradient overlays for readability and seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy" />
      </motion.div>

      {/* Right-side content with glassmorphism */}
      <div className="z-10 flex flex-col items-end text-right max-w-lg w-full md:w-auto md:mr-8">
        
        {/* Static badge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isVideoPlaying ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center gap-2 glass rounded-full px-4 py-1.5 text-teal text-xs tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
          Fullstack Developer · Mumbai
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVideoPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-grotesk text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-2xl"
        >
          Hi, I'm{' '}
          <span className="text-teal teal-text-glow">Nuzhat Khan</span>
        </motion.h1>

        {/* Typewriter subtitle synced to video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVideoPlaying ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="h-16 flex items-center justify-end w-full mb-8"
        >
          <AnimatePresence mode="wait">
            {currentSubtitle && (
              <motion.div
                key={currentSubtitle}
                initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="glass-strong rounded-xl px-6 py-3"
              >
                <p className="font-inter text-lg md:text-xl text-white-soft font-medium">
                  {currentSubtitle}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Static tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1 }}
          className="text-grey text-sm md:text-base font-inter glass rounded-lg px-4 py-2"
        >
          I find the problem. I build the solution.{' '}
          <span className="text-white-soft font-medium">I make sure it ships.</span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVideoPlaying ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-grey text-xs"
      >
        <span className="glass rounded-full px-3 py-1">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-teal to-transparent"
        />
      </motion.div>
    </section>
  )
}
