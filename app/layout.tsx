import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import BootLoader from '@/components/BootLoader'

export const metadata: Metadata = {
  title: 'Nuzhat Khan — Software Developer | Python | FastAPI | AI/GenAI | RAG',
  description: 'Software developer building AI/GenAI applications with RAG, LLMs, embeddings, and vector search. Python, FastAPI, React, Docker.',
  alternates: { canonical: 'https://nuzhat-portfolio-alpha.vercel.app' },
  openGraph: {
    title: 'Nuzhat Khan — Software Developer | Python | FastAPI | AI/GenAI',
    description: 'Software developer building AI/GenAI applications with RAG, LLMs, embeddings, and vector search.',
    url: 'https://nuzhat-portfolio-alpha.vercel.app',
    siteName: 'Nuzhat Khan',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nuzhat Khan — Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuzhat Khan — Software Developer | Python | FastAPI | AI/GenAI',
    description: 'Software developer building AI/GenAI applications with RAG, LLMs, embeddings, and vector search.',
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
  jobTitle: 'Software Developer',
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
    'RAG',
    'LLM Integration',
    'Pinecone',
    'FAISS',
    'LangChain',
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
      </head>
      <body suppressHydrationWarning>
        <BootLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
