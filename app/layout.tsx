import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  title: 'Nuzhat Khan — Fullstack Developer | FastAPI, React, Next.js, Mumbai',
  description: 'Mumbai-based fullstack developer shipping BFSI compliance platforms, sports ops tools, hospital management systems, and desktop apps with Python, FastAPI, React, Next.js, and TypeScript.',
  alternates: { canonical: 'https://nuzhat-portfolio-alpha.vercel.app' },
  openGraph: {
    title: 'Nuzhat Khan — Fullstack Developer, Mumbai',
    description: 'I build end-to-end platforms for compliance, operations, and payroll — the kind that ship and stay shipped.',
    url: 'https://nuzhat-portfolio-alpha.vercel.app',
    siteName: 'Nuzhat Khan',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nuzhat Khan — Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuzhat Khan — Fullstack Developer, Mumbai',
    description: 'I build end-to-end platforms for compliance, operations, and payroll — the kind that ship and stay shipped.',
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
  jobTitle: 'Fullstack Developer',
  url: 'https://nuzhat-portfolio-alpha.vercel.app',
  sameAs: [
    'https://github.com/Naazkn13',
    'https://www.linkedin.com/in/nuzhat-khan-dev/',
  ],
  knowsAbout: [
    'Python',
    'FastAPI',
    'React',
    'Next.js',
    'TypeScript',
    'PostgreSQL',
    'Docker',
    'Azure DevOps',
    'SEBI Compliance',
    'RAG',
    'Pinecone',
    'FAISS',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Infomatics Services',
  },
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
      </head>
      <body suppressHydrationWarning>
        <BootLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
