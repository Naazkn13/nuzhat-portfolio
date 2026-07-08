'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Cpu, Fingerprint, FileText } from 'lucide-react'

const capabilities = [
  {
    icon: ShieldCheck,
    label: 'Compliance Platforms',
    metric: '67+ SEBI reports automated',
    body: 'Regulatory tech for BFSI: maker-checker workflows, PIT/UPSI governance, RBAC, and live ECAS/BENPOS reconciliation.',
  },
  {
    icon: Cpu,
    label: 'AI Tooling & RAG',
    metric: 'Multiple LLM-backed deployments',
    body: 'RAG pipelines, semantic search, LLM integration, and document intelligence with Pinecone, FAISS, and FastAPI.',
  },
  {
    icon: Fingerprint,
    label: 'Biometric & Identity Systems',
    metric: 'Live hardware deployments',
    body: 'Attendance and access control running at a Mumbai hospital — device SDK, enrollment, shift logic, and real-time counters.',
  },
  {
    icon: FileText,
    label: 'Document & Data Pipelines',
    metric: 'Production-grade parsing layer',
    body: 'PDF and tabular extraction, audit trails, and role-gated exports — powering regulated reporting without manual copy-paste.',
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
