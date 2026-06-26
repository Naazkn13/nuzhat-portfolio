import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  title: 'Nuzhat Khan — Fullstack Developer',
  description: 'Fullstack developer based in Mumbai. Building with AI.',
  openGraph: {
    title: 'Nuzhat Khan — Fullstack Developer',
    description: 'Fullstack developer based in Mumbai. Building with AI.',
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
