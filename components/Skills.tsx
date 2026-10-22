'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = {
  'Backend & APIs': [
    'Python',
    'FastAPI',
    'RESTful APIs',
    'Pydantic',
    'SQLAlchemy',
    'AsyncIO',
    'PyTest',
    'JWT & RBAC Auth',
    'Microservices',
  ],
  'AI / GenAI & Vector Search': [
    'RAG Architecture',
    'Vector Search',
    'Qdrant (HNSW Tuning)',
    'CLIP (open_clip ViT-B/32)',
    'LoRA Fine-Tuning',
    'Text & Image Embeddings',
    'LLM API Integration (Gemini)',
    'Hybrid Re-ranking',
    'FAISS & Pinecone',
  ],
  'Databases & Storage': [
    'PostgreSQL',
    'Supabase',
    'SQLite',
    'Redis (Caching)',
    'MongoDB',
    'Database Indexing',
  ],
  'Data & Document Pipelines': [
    'Pandas',
    'NumPy',
    'PyMuPDF',
    'Tabula-py',
    'ReportLab (PDF Engine)',
    'Structured Layout Parsing',
    'Financial Statement Extraction',
  ],
  'DevOps & Cloud': [
    'Docker & Docker Compose',
    'Azure DevOps CI/CD',
    'GitHub Actions',
    'Linux (Ubuntu/Fedora)',
    'Git',
    'Postman API Testing',
    'Vercel & Railway',
  ],
  'Frontend & Mobile': [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Tailwind CSS',
    'Expo (React Native)',
    'Framer Motion',
  ],
  'Domain & RegTech Security': [
    'SEBI Compliance (PIT & LODR)',
    'Maker-Checker Workflows',
    'UPSI Governance & SDD',
    'Tamper-Evident Audit Trails',
    'Fernet & Bcrypt Encryption',
    'BFSI Reconciliation (ECAS/BENPOS)',
  ],
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-mono">Core Competencies</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2 text-white-soft">Technical Skills</h2>
        <p className="text-grey font-inter text-sm md:text-base mt-2 max-w-2xl">
          Categorized technical skills backed by production code, client deployments, and verified open-source projects.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-2xl glass hover:bg-teal/5 transition-all group border border-white/5 hover:border-teal/20"
          >
            <h4 className="font-grotesk font-bold text-teal text-sm mb-4 tracking-wide flex items-center justify-between">
              <span>{category}</span>
              <span className="text-[10px] font-mono text-grey/60">({items.length})</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs text-grey border border-white/10 rounded-lg px-2.5 py-1 glass-subtle font-mono hover:text-white-soft hover:border-teal/30 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
