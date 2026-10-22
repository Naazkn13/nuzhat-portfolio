'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Globe, ShieldCheck, Terminal, Lock } from 'lucide-react'
import { GithubIcon as Github } from './icons/GithubIcon'
import ProjectCard, { Project } from './ProjectCard'

const projects: Project[] = [
  {
    title: 'Novus Comply & Novus UPSI',
    tag: 'Enterprise · Production',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    problem: 'BFSI sector required a strictly regulated, auditable pathway for trade pre-clearance and UPSI (Unpublished Price Sensitive Information) access governance to eliminate spreadsheet compliance leaks.',
    built: 'Built a multi-tier trade pre-clearance engine reconciling 4 data feeds (ECAS, BENPOS, KFin, CAMS) with SEBI PIT restricted/grey-list checks on every transaction request. Engineered RBAC, bcrypt auth, Fernet-encrypted UPSI database fields, and tamper-evident SHA-256 audit logging over asynchronous FastAPI and indexed PostgreSQL.',
    result: 'Deployed to production at a live enterprise BFSI client, delivering sub-second compliance audit queues and full statutory digital database auditability.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure DevOps', 'React', 'Pydantic'],
    links: [
      { label: 'Interactive Sandbox', url: '/case-study/novus-comply-upsi#simulation', icon: ShieldCheck, note: 'Pre-Clearance Prototype' },
    ],
    constraints: [
      'Strict SEBI PIT insider-trading regulatory guidelines with maker-checker approvals',
      'Tamper-evident audit logging for all compliance access and threshold exceptions',
      'High-throughput reconciliation with downstream ECAS/BENPOS depository data',
    ],
    architecture: [
      'FastAPI asynchronous microservices with connection-pooled PostgreSQL',
      'Role-based access control (RBAC) isolating trader, checker, and compliance tiers',
      'Fernet symmetric encryption for sensitive UPSI disclosures',
      'Containerized with Docker and deployed via Azure DevOps CI/CD pipelines',
    ],
    keyDecisions: [
      'Enforced explicit multi-stage role gates over open ACLs to eliminate reviewer errors',
      'Implemented immutable hash-chained audit trails for regulatory inspectability',
    ],
    note: 'Enterprise client deployment — interactive simulation sandbox available in case study.',
    caseStudy: 'novus-comply-upsi',
  },
  {
    title: 'Compulse (SEBI Compliance Reporting Platform)',
    tag: 'Enterprise · UAT Stage',
    tagColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    problem: 'Institutional compliance teams spent hundreds of hours manually aggregating, validating, and submitting statutory periodic SEBI reports across fragmented internal databases.',
    built: 'Co-developed a comprehensive compliance platform automating 67+ SEBI report types across 43 maker-checker workflow stages. Implemented strict Pydantic validation contracts across heterogeneous data sources, 32+ automated email notifications, and an auditable re-submission history.',
    result: 'Automated 67+ SEBI report formats through 43 maker-checker stages; successfully reached institutional client UAT with zero submission schema discrepancies.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'React', 'Pydantic', 'Ubuntu Linux'],
    links: [
      { label: 'Interactive Sandbox', url: '/case-study/compulse#simulation', icon: ShieldCheck, note: 'Maker-Checker Workflow' },
    ],
    constraints: [
      '67+ distinct report variants spanning LODR, PIT, and AIF statutory mandates',
      'Maker-checker dual sign-off with no single-person submission loophole',
      'Strict change review and traceable amendment logging in UAT',
    ],
    architecture: [
      'FastAPI validation layers with typed Pydantic request/response schemas',
      'PostgreSQL document store for multi-version submission records',
      'React form composer with modular report building blocks',
    ],
    keyDecisions: [
      'Built shared validation contracts across report categories to minimize code duplication',
      'Isolated reviewer queue state machine to ensure complete UAT sign-off traceability',
    ],
    note: 'Enterprise UAT deployment — test the full calendar and maker-checker sandbox in the case study.',
    caseStudy: 'compulse',
  },
  {
    title: 'Biometric Attendance & 30-Day Payroll Engine',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Eye hospital in Mumbai relied on manual paper sign-ins and error-prone Excel formulas for overtime, paid leave accruals, and monthly salary disbursement.',
    built: 'Engineered an end-to-end automated platform that ingests real-time ZKTeco biometric punch events (ADMS protocol) into an asynchronous FastAPI backend. Built policy calculation algorithms for 30-day salary cycles, overtime multipliers (1.5x), loss-of-pay deductions, and PDF payslips, backed by an Expo Android app for staff check-ins.',
    result: 'Live in production managing 12+ healthcare staff with zero downtime; reduced monthly payroll calculation turnaround from 2+ hours to under 30 minutes (75% reduction).',
    stack: ['Python', 'FastAPI', 'Supabase', 'React', 'Expo', 'Android APK', 'ZKTeco SDK', 'Docker'],
    links: [
      { label: 'Interactive Demo Route', url: '/demo/biometric-attendance', icon: ShieldCheck, note: 'Live ADMS Prototype' },
      { label: 'Hospital Web App', url: 'https://attendance-sigma-one.vercel.app/', icon: Globe, note: 'Staff Login' },
    ],
    constraints: [
      'ZKTeco biometric hardware running proprietary ADMS push protocol',
      'Dual access required: administrative web portal + mobile Android APK for staff',
      'Configurable hospital policy rules for clinical shifts, night OT, and paid leave',
    ],
    architecture: [
      'FastAPI event receiver parsing HTTP POST /iclock/cdata payloads',
      'Supabase PostgreSQL database with Row-Level Security and audit triggers',
      'Decoupled event queue to isolate device connectivity from payroll computation',
    ],
    keyDecisions: [
      'Separated hardware punch ingestion from policy evaluation to prevent device disconnects from interrupting salary calculations',
      'Implemented parameterized rule models rather than hard-coded healthcare payroll formulas',
    ],
    note: 'Live deployment at Mumbai eye hospital (12+ staff). Explore the live demo route or embedded sandbox.',
    caseStudy: 'biometric-attendance-system',
  },
  {
    title: 'CAS Statement Parser',
    tag: 'Desktop App · Client Deployed',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    problem: 'Unstructured, multi-page CDSL PDF financial statements prevented automated extraction of Demat equity holdings, mutual fund folios, and historical transactions.',
    built: 'Built a local-first deterministic Python document extraction pipeline using PyMuPDF and Tabula-py. Normalized multi-table layouts into typed records using Pandas, and packaged the tool into a standalone desktop application via Tauri and PyInstaller for client distribution.',
    result: 'Client-deployed desktop tool extracting records at 98% accuracy across 500+ statements per month, eliminating 10+ hours per week of manual data entry.',
    stack: ['Python', 'PyMuPDF', 'Tabula-py', 'Pandas', 'Tauri', 'PyInstaller'],
    links: [],
    constraints: [
      'Zero API access to CDSL data feeds — extraction forced from raw PDF layouts',
      'Inconsistent table formats and split headers across statement revisions',
      'Offline client execution required without cloud network dependencies',
    ],
    architecture: [
      'Deterministic rule-based PDF coordinate parser using PyMuPDF',
      'Tabular normalization engine outputting structured Excel workbooks',
      'Lightweight Tauri desktop wrapper with local file system sandboxing',
    ],
    keyDecisions: [
      'Chose deterministic heuristic parsing over LLM OCR to prevent financial hallucination and ensure 100% reproducible figures',
      'Optimized output specifically for client spreadsheet reconciliation workflows',
    ],
    note: 'Client-deployed production desktop tool.',
    caseStudy: 'cas-parser',
  },
  {
    title: 'Project Phoenix (Algorithmic Trading & Online Learning Engine)',
    tag: 'Private · Quantitative Engine',
    tagColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    problem: 'Systematic intraday market trading requires automated signal verification, strict capital-preservation risk gates, and post-trade feedback to prevent drawdowns during choppy market regimes.',
    built: 'Engineered a production-style algorithmic trading system on Angel One SmartAPI featuring a tri-agent core (BrainAgent: dual Heiken-Ashi momentum + ADX filter; ExecutorAgent: order routing + Chandelier ATR trailing stop; ResearcherAgent: Bayesian win-rate calibration + 24h symbol penalty box) governed by a RiskGuardian (2% position sizing, 5% daily kill-switch). Persisted in SQLite via SQLAlchemy.',
    result: 'Covered by 37 automated pytest tests across 11 test suites validating risk sizing, trailing stops, session gates, and agent collaboration. Zero syntax or compilation errors (py_compile clean).',
    stack: ['Python', 'NumPy', 'Pandas', 'SQLAlchemy', 'SQLite', 'Pydantic', 'PyTest', 'AsyncIO'],
    links: [],
    constraints: [
      'Hard capital risk limits with sub-millisecond execution guardrails',
      'Strict credential isolation with zero live secrets (.env.example only)',
      'Deterministic test coverage across mock API feeds and edge market sessions',
    ],
    architecture: [
      'Modular tri-agent orchestration with clean separation of signal, risk, and execution',
      'Conjugate-Beta Bayesian updating layer adjusting conviction after closed trades',
      'SQLAlchemy-backed trade journal tracking execution slippage and failure modes',
    ],
    keyDecisions: [
      'Enforced a hard RiskGuardian kill-switch at the root dispatcher level, overriding individual agent signals',
      'Wrote comprehensive unit and regression tests (37 tests) before running paper test cycles',
    ],
    note: 'Private repository in live test phase. Architectural walkthrough and test suite available for review upon request.',
  },
  {
    title: 'FashionGallery (Multimodal AI & Vector Search Engine)',
    tag: 'AI / GenAI · Vector Search',
    tagColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    problem: 'Traditional e-commerce keyword queries fail on fashion catalogs because visual style, cut, and color relationships cannot be adequately captured through text metadata alone.',
    built: 'Developed a multimodal semantic search engine using joint image-text embeddings from open_clip (ViT-B/32), indexed in Qdrant with tuned HNSW parameters (m=16, ef_construct=200). Implemented LoRA fine-tuning from scratch with low-rank adapters, a linear probe, a hybrid HSV dominant-color re-ranker, and Gemini-powered query expansion with local fallback. (First version built on FAISS and Pinecone, then rebuilt on Qdrant).',
    result: 'Sub-100ms vector search across multimodal catalogs demonstrating practical implementation of vector databases, embedding alignment, and fine-tuning architectures.',
    stack: ['Python', 'FastAPI', 'PyTorch', 'open_clip', 'Qdrant', 'LoRA', 'Docker', 'React'],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/Naazkn13/FashionGallery', icon: Github },
    ],
    constraints: [
      'Fast joint image and text search across multimodal catalog indices',
      'Explainable search results combining embedding similarity with color fidelity',
      'Local fallback when external LLM API rate limits are encountered',
    ],
    architecture: [
      'open_clip ViT-B/32 feature extraction pipeline',
      'Qdrant vector database container with tuned HNSW indexing',
      'FastAPI asynchronous endpoints containerized with Docker Compose',
    ],
    keyDecisions: [
      'Migrated from FAISS/Pinecone to Qdrant to enable native payload filtering and local Docker reproducibility',
      'Implemented LoRA from scratch with zero-initialized B matrix to explore adapter behavior on multimodal weights',
    ],
    note: 'Public open-source repository on GitHub.',
    caseStudy: 'fashion-gallery',
  },
  {
    title: 'NSA Sports Platform',
    tag: 'Live · Production',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Sports academy managed player registration, age-category verification, and tournament affiliations manually across spreadsheets and paper documents.',
    built: 'Built a full-stack sports platform with role-based routing for players, coaches, and administrators. Integrated multi-tier registration, club affiliations, OTP verification, Razorpay payments, and OCR-assisted document inspection with automated approval notifications.',
    result: 'Live in production at nsasports.co.in, managing 50+ active players across tournament seasons with zero downtime.',
    stack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Supabase', 'Tailwind CSS'],
    links: [
      { label: 'Live Site', url: 'https://nsasports.co.in/', icon: Globe },
    ],
    constraints: [
      'Role-based access separating coaches, athletes, and league administrators',
      'Flexible seasonal schema changes for tournament brackets and categories',
      'Public registration portal paired with secure administrative dashboards',
    ],
    architecture: [
      'Next.js responsive frontend with role-aware navigation',
      'Document database store for seasonal rule and roster flexibility',
      'Automated email notifications on approval and verification milestones',
    ],
    keyDecisions: [
      'Chose document-oriented schemas to accommodate evolving seasonal rules without repeated database migrations',
      'Built automated verification workflows, cutting administrative turnaround by 70%',
    ],
    note: 'Live production platform.',
    caseStudy: 'nsa-sports-platform',
  },
  {
    title: 'Hospital SOP & Operations Portal',
    tag: 'Enterprise · Deployed',
    tagColor: 'text-teal border-teal/30 bg-teal/10',
    problem: 'Hospital clinical and administrative staff experienced onboarding delays and inconsistent shift compliance due to unstructured training documentation.',
    built: 'Built a role-aware hospital training portal backed by a Python batch PDF generation pipeline (ReportLab). Compiled clinical protocols into 48 SOPs across 15 hospital categories, paired with training video modules and progress verification.',
    result: 'Deployed and in active use at a Mumbai eye hospital, streamlining clinical staff compliance and operational audits across shifts.',
    stack: ['Next.js', 'Python (ReportLab)', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    links: [],
    constraints: [
      'Zero existing structured digital protocol curriculum',
      'Diverse device mix across hospital wards and low-bandwidth terminals',
    ],
    architecture: [
      'Next.js web portal with role-gated protocol views',
      'Python ReportLab pipeline compiling structured protocol definitions into standardized PDFs',
      'Supabase PostgreSQL tracking staff completion and version changes',
    ],
    keyDecisions: [
      'Delivered modular digital SOPs alongside video walk-throughs to maximize compliance during shift handovers',
    ],
    note: 'Internal healthcare deployment.',
    caseStudy: 'hospital-sop-portal',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-teal text-xs tracking-widest uppercase font-mono">Verified Work Delivered</span>
        <h2 className="font-grotesk text-4xl md:text-5xl font-bold mt-2 text-white-soft">
          Featured Projects &amp; Case Studies
        </h2>
        <p className="text-grey font-inter text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
          Every project below includes verifiable production evidence, architecture rationale, and measured outcomes.
          Case studies and interactive sandboxes are available for deep technical inspection.
        </p>
      </motion.div>

      <div className="grid gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} i={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
