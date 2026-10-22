import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  metadataBase: new URL('https://nuzhat-portfolio-alpha.vercel.app'),
  title: 'Nuzhat Khan — Python Backend Developer | AI/GenAI Engineer',
  description: 'Python backend developer and AI/GenAI engineer with ~14 months experience in enterprise BFSI RegTech (FastAPI, PostgreSQL, Docker) and applied AI (Qdrant, CLIP, LoRA). Available immediately in Mumbai & Remote.',
  alternates: { canonical: 'https://nuzhat-portfolio-alpha.vercel.app' },
  openGraph: {
    title: 'Nuzhat Khan — Python Backend Developer | AI/GenAI Engineer',
    description: 'Python backend developer and AI/GenAI engineer with ~14 months experience in enterprise BFSI RegTech and applied AI.',
    url: 'https://nuzhat-portfolio-alpha.vercel.app',
    siteName: 'Nuzhat Khan',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nuzhat Khan — Python Backend Developer & AI/GenAI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuzhat Khan — Python Backend Developer | AI/GenAI Engineer',
    description: 'Python backend developer and AI/GenAI engineer with ~14 months experience in enterprise BFSI RegTech and applied AI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nuzhat Khan',
  jobTitle: 'Python Backend Developer & AI/GenAI Engineer',
  url: 'https://nuzhat-portfolio-alpha.vercel.app',
  sameAs: [
    'https://github.com/Naazkn13',
    'https://www.linkedin.com/in/nuzhat-khan-dev/',
  ],
  knowsAbout: [
    'Python',
    'FastAPI',
    'PostgreSQL',
    'Docker',
    'PyTest',
    'SQLAlchemy',
    'Pydantic',
    'RegTech',
    'SEBI Compliance',
    'Qdrant',
    'Vector Search',
    'CLIP',
    'LoRA Fine-Tuning',
    'RAG',
    'React',
    'Next.js',
    'TypeScript',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: "Bhavan's College, Mumbai University",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var r of regs) { r.unregister(); }
                });
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <BootLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
