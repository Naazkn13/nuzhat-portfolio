'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  useEffect(() => {
    const startExperience = () => {
      if (videoRef.current) {
        videoRef.current.muted = false
        // Play returns a promise that might be rejected if autoplay rules are too strict,
        // but since this is triggered by a click event in BootLoader, it will succeed.
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true)
        }).catch((e) => {
          console.error("Audio autoplay failed, falling back to muted", e)
          videoRef.current!.muted = true
          videoRef.current!.play()
          setIsVideoPlaying(true)
        })
      }
    }
    
    window.addEventListener('portfolio-start', startExperience)
    return () => window.removeEventListener('portfolio-start', startExperience)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      
      {/* Cinematic Fullscreen Background Video */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={isVideoPlaying ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-50"
          src="/portfolio-intro.mp4"
          playsInline
          loop
          muted // Default to muted, unmuted via JS when clicked
        />
        {/* Dark overlay to ensure text readability and blend into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/60 to-navy" />
      </motion.div>

      {/* Content wrapper */}
      <div className="z-10 flex flex-col items-center justify-center">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex items-center gap-2 border border-teal-border rounded-full px-4 py-1.5 text-teal text-xs tracking-widest uppercase bg-navy/30 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
          Fullstack Developer · Mumbai
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isVideoPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-grotesk text-5xl md:text-7xl font-bold text-center leading-tight mb-4 drop-shadow-2xl"
        >
          Hi, I'm{' '}
          <span className="text-teal teal-text-glow drop-shadow-[0_0_15px_rgba(0,212,200,0.5)]">Nuzhat Khan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoPlaying ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="text-grey text-lg md:text-xl text-center max-w-xl mb-12 font-inter bg-navy/20 p-2 rounded-lg backdrop-blur-[2px]"
        >
          I find the problem. I build the solution.{' '}
          <span className="text-white-soft font-medium">I make sure it ships.</span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVideoPlaying ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-grey text-xs"
      >
        <span className="bg-navy/30 px-3 py-1 rounded-full backdrop-blur-sm">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-teal to-transparent"
        />
      </motion.div>
    </section>
  )
}
