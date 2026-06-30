import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  title: 'Nuzhat Khan — Fullstack Developer',
  description: 'Nuzhat Khan — Fullstack Developer in Mumbai. Building enterprise compliance platforms, biometric attendance systems, and AI-powered tools with React, FastAPI, and Python.',
  openGraph: {
    title: 'Nuzhat Khan — Fullstack Developer',
    description: 'Nuzhat Khan — Fullstack Developer in Mumbai. Building enterprise compliance platforms, biometric attendance systems, and AI-powered tools with React, FastAPI, and Python.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <BootLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
