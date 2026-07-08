'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      setReady(true)
      return
    }

    // Wait for BootLoader to finish before rendering the cursor
    const onBootDone = () => {
      // Persist state for visitor-initiated refreshes / back-navigations
      window.sessionStorage.setItem('boot-sequence', '1')
      setReady(true)
    }
    window.addEventListener('portfolio-start', onBootDone)

    // If BootLoader already ran in this tab session, show immediately
    if (window.sessionStorage.getItem('boot-sequence') === '1') {
      setReady(true)
    }

    return () => {
      window.removeEventListener('portfolio-start', onBootDone)
    }
  }, [])

  const showCursor = ready && !isTouch

  if (!showCursor) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-teal rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 3 : 1,
          opacity: isVisible ? (isHovering ? 0.5 : 1) : 0,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-teal/40 rounded-full pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
