'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BootLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  const handleEnter = () => {
    // Dispatch event to Hero to start video unmuted
    window.dispatchEvent(new Event('portfolio-start'))
    setIsVisible(false)
    document.body.style.overflow = ''
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-navy flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00D4C808_1px,transparent_1px),linear-gradient(to_bottom,#00D4C808_1px,transparent_1px)] bg-[size:64px_64px]" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center z-10"
          >
            <div className="text-teal font-grotesk font-bold text-5xl mb-6 tracking-tighter teal-text-glow">
              NK<span className="animate-pulse">_</span>
            </div>
            
            <div className="w-48 h-[2px] bg-navy-2 rounded-full overflow-hidden relative mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 left-0 h-full bg-teal shadow-[0_0_10px_#00D4C8]"
              />
            </div>
            
            <div className="h-10 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-grey text-[10px] font-mono uppercase tracking-widest flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" />
                    Boot Sequence Initiated
                  </motion.div>
                ) : (
                  <motion.button
                    key="enter-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    className="text-teal text-xs font-mono uppercase tracking-widest border border-teal-border px-6 py-2 rounded-full hover:bg-teal-dim transition-colors relative group"
                  >
                    <span className="absolute inset-0 rounded-full teal-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                    Enter Experience
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
