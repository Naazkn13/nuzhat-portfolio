'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Cpu, Fingerprint, FileText } from 'lucide-react'

const capabilities = [
  {
    icon: Cpu,
    label: 'AI/GenAI & RAG',
    metric: 'LLM-backed applications',
    body: 'RAG pipelines, semantic search, LLM integration, embeddings, vector search with Pinecone, FAISS, LangChain, and FastAPI.',
  },
  {
    icon: ShieldCheck,
    label: 'Full-Stack Platforms',
    metric: 'Production deployments',
    body: 'End-to-end web applications with React, Next.js, Node.js, PostgreSQL, Docker, and CI/CD pipelines.',
  },
  {
    icon: Fingerprint,
    label: 'Hardware & Mobile Integration',
    metric: 'Live deployments',
    body: 'Biometric device SDK integration, Android APK distribution, real-time systems, and mobile-first applications.',
  },
  {
    icon: FileText,
    label: 'Document & Data Pipelines',
    metric: 'Production-grade parsing',
    body: 'PDF and tabular extraction, data transformation, automated reporting, and role-gated exports.',
  },
]

export default function WhatIOwn() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="what-i-can-own" ref={ref} className="relative py-28 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-inter">Capabilities</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2">What I Can Own</h2>
        <p className="text-grey font-inter mt-4 max-w-2xl">Every project below is live, in production, or in UAT with a real user. I own these end-to-end: spec, build, deploy, iterate.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon
          return (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-teal/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="text-teal" size={22} />
                  <h3 className="font-grotesk font-semibold text-white-soft text-lg">{cap.label}</h3>
                </div>
                <span className="text-teal text-xs font-mono uppercase tracking-wider">{cap.metric}</span>
              </div>
              <p className="text-grey font-inter text-sm leading-relaxed">{cap.body}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
