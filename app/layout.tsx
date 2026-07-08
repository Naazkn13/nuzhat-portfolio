import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  title: 'Nuzhat Khan — Fullstack Developer',
  description: 'Nuzhat Khan — Fullstack Developer in Mumbai. SEBI-compliant platforms, PIT/UPSI surveillance, biometric systems, and AI tooling with React, Next.js, FastAPI, and Python.',
  openGraph: {
    title: 'Nuzhat Khan — Fullstack Developer',
    description: 'Nuzhat Khan — Fullstack Developer in Mumbai. SEBI-compliant platforms, PIT/UPSI surveillance, biometric systems, and AI tooling.',
    url: 'https://nuzhat-portfolio.vercel.app',
    type: 'website',
  },
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
