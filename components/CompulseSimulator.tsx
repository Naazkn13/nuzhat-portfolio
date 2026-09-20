'use client'
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ShieldCheck,
  UserCheck,
  RefreshCw,
  ArrowRight,
  Hash,
  Sparkles,
  Terminal,
  FileCheck2,
  XCircle,
  Bell,
  Layers,
  Check,
  ChevronRight,
} from 'lucide-react'

// --- Synthetic Regulatory Mock Data & Types (NDA Compliant) ---

export type UserRole = 'MAKER' | 'CHECKER' | 'COMPLIANCE'

export type ComplianceTask = {
  id: string
  circularCode: string
  title: string
  authority: 'SEBI (LODR)' | 'SEBI (PIT)' | 'SEBI (AIF)' | 'RBI' | 'Depository'
  frequency: 'Quarterly' | 'Monthly' | 'Half-Yearly' | 'Event-Based'
  statutoryDueDate: string
  daysRemaining: number
  status: 'PENDING_MAKER' | 'VALIDATING' | 'SUBMITTED_TO_CHECKER' | 'REJECTED_TO_MAKER' | 'APPROVED_FILED'
  makerName: string
  makerEmail: string
  checkerName: string
  checkerEmail: string
  department: string
  formCode: string
  escalationTrigger: string
  // Form submission payload
  formData: {
    period: string
    totalMembers?: number
    independentDirectors?: number
    auditMeetings?: number
    promoterShareholding?: number
    publicShareholding?: number
    nonInstitutionHolding?: number
    pledgedPercentage?: number
    transactionValueLakhs?: number
    dpName?: string
    uncalledCommitmentCr?: number
    fundCorpusCr?: number
    annexureUploaded: boolean
    makerNotes: string
    checkerNotes?: string
  }
}

const INITIAL_TASKS: ComplianceTask[] = [
  {
    id: 'TASK-2026-Q3-01',
    circularCode: 'SEBI/HO/CFD/CMD-1/P/CIR/2026/27',
    title: 'LODR Reg 27(2) — Corporate Governance Compliance Report',
    authority: 'SEBI (LODR)',
    frequency: 'Quarterly',
    statutoryDueDate: '2026-10-21 (21 days post quarter-end)',
    daysRemaining: 4,
    status: 'PENDING_MAKER',
    makerName: 'Sneha Patel',
    makerEmail: 'maker@fund.com',
    checkerName: 'Rajesh Khurana',
    checkerEmail: 'checker@fund.com',
    department: 'Secretarial & Legal',
    formCode: 'FORM-CG-Q3',
    escalationTrigger: 'T-3 Days: Warning to Maker; T-0: Alert to CCO',
    formData: {
      period: 'Q2 FY 2026-27 (Ended Sep 30)',
      totalMembers: 8,
      independentDirectors: 4, // 50% compliant
      auditMeetings: 4,
      annexureUploaded: true,
      makerNotes: 'Drafted based on latest board resolution dated Sep 18. Audit committee meetings verified.',
    },
  },
  {
    id: 'TASK-2026-Q3-02',
    circularCode: 'SEBI/HO/CFD/CMD-2/P/CIR/2026/31',
    title: 'LODR Reg 31 — Shareholding Pattern & Encumbrance Filing',
    authority: 'SEBI (LODR)',
    frequency: 'Quarterly',
    statutoryDueDate: '2026-10-21 (21 days post quarter-end)',
    daysRemaining: 4,
    status: 'SUBMITTED_TO_CHECKER',
    makerName: 'Sneha Patel',
    makerEmail: 'maker@fund.com',
    checkerName: 'Rajesh Khurana',
    checkerEmail: 'checker@fund.com',
    department: 'Secretarial & Investor Relations',
    formCode: 'FORM-SHP-Q3',
    escalationTrigger: 'T-1 Day: Urgent escalation to VP Compliance',
    formData: {
      period: 'Q2 FY 2026-27 (Ended Sep 30)',
      promoterShareholding: 62.5,
      publicShareholding: 25.5,
      nonInstitutionHolding: 12.0, // Sums to 100.0%
      pledgedPercentage: 0.0,
      annexureUploaded: true,
      makerNotes: 'BENPOS demat extract cross-verified against RTA feeds (KFintech). Zero pledged shares.',
    },
  },
  {
    id: 'TASK-2026-M09-03',
    circularCode: 'SEBI/HO/IMD/DF-1/P/CIR/2026/28',
    title: 'AIF Reg 28 — Quarterly Activity Report (QAR) & Portfolio Cut',
    authority: 'SEBI (AIF)',
    frequency: 'Quarterly',
    statutoryDueDate: '2026-10-15',
    daysRemaining: 1,
    status: 'PENDING_MAKER',
    makerName: 'Sneha Patel',
    makerEmail: 'maker@fund.com',
    checkerName: 'Rajesh Khurana',
    checkerEmail: 'checker@fund.com',
    department: 'AIF Fund Operations',
    formCode: 'AIF-CAT2-QAR',
    escalationTrigger: 'T-1 Day: High-priority trigger to Investment Committee',
    formData: {
      period: 'Quarter Ended Sep 2026',
      uncalledCommitmentCr: 120.5,
      fundCorpusCr: 450.0,
      annexureUploaded: false,
      makerNotes: 'Waiting on final valuation reports from third-party valuer for unlisted equity tranche.',
    },
  },
  {
    id: 'TASK-2026-EVT-04',
    circularCode: 'SEBI/PIT/REG-7(2)/2026',
    title: 'SEBI PIT Reg 7(2) — Continual Disclosure of Insider Transactions',
    authority: 'SEBI (PIT)',
    frequency: 'Event-Based',
    statutoryDueDate: '2026-09-22 (Within 2 trading days)',
    daysRemaining: -1, // Overdue SLA demo
    status: 'REJECTED_TO_MAKER',
    makerName: 'Sneha Patel',
    makerEmail: 'maker@fund.com',
    checkerName: 'Rajesh Khurana',
    checkerEmail: 'checker@fund.com',
    department: 'Surveillance & PIT Cell',
    formCode: 'FORM-C-DISCLOSURE',
    escalationTrigger: 'T+1: SLA Breach Escalation to Statutory Auditor & CCO',
    formData: {
      period: 'Event Date: Sep 18, 2026',
      transactionValueLakhs: 28.5, // > 10 Lakhs threshold
      dpName: 'Vikram Malhotra (Director)',
      annexureUploaded: true,
      makerNotes: 'Off-market acquisition of equity shares exceeding ₹10 Lakh statutory threshold.',
      checkerNotes: 'Broker contract note timestamp missing from Annexure 2. Re-upload with verified seal.',
    },
  },
  {
    id: 'TASK-2026-M08-05',
    circularCode: 'SEBI/HO/MIRSD/CR/CIR/2026/12',
    title: 'LODR Reg 13(3) — Statement of Investor Complaints & Redressal',
    authority: 'SEBI (LODR)',
    frequency: 'Quarterly',
    statutoryDueDate: '2026-10-21',
    daysRemaining: 18,
    status: 'APPROVED_FILED',
    makerName: 'Sneha Patel',
    makerEmail: 'maker@fund.com',
    checkerName: 'Rajesh Khurana',
    checkerEmail: 'checker@fund.com',
    department: 'Investor Grievance Cell',
    formCode: 'SCORES-Q3-REDRESS',
    escalationTrigger: 'T-3 Days: Reminder to Maker',
    formData: {
      period: 'Q2 FY 2026-27',
      annexureUploaded: true,
      makerNotes: 'SCORES portal reconciliation completed. 0 unresolved investor grievances outstanding.',
      checkerNotes: 'SCORES report cross-referenced with exchange grievances. Signed and filed on SEBI portal.',
    },
  },
]

export default function CompulseSimulator() {
  const [activeRole, setActiveRole] = useState<UserRole>('MAKER')
  const [activeTab, setActiveTab] = useState<'workflow' | 'calendar' | 'matrix'>('workflow')
  const [tasks, setTasks] = useState<ComplianceTask[]>(INITIAL_TASKS)
  const [selectedTaskId, setSelectedTaskId] = useState<string>('TASK-2026-Q3-01')

  // Validation Simulation States
  const [isValidating, setIsValidating] = useState<boolean>(false)
  const [validationStage, setValidationStage] = useState<number>(0)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [validationSuccess, setValidationSuccess] = useState<boolean | null>(null)

  // Checker review form states
  const [checkerRemarkInput, setCheckerRemarkInput] = useState<string>('All statutory thresholds and secretarial annexures audited. Approved for regulatory submission.')
  const [rejectionReasonInput, setRejectionReasonInput] = useState<string>('Discrepancy observed in schedule totals. Please reconcile with trial balance.')

  // Audit Logs
  const [systemLogs, setSystemLogs] = useState<string[]>([
    '[SYS-INIT] Compulse Compliance Platform v2.4 initialized.',
    '[FASTAPI-ENGINE] 67+ SEBI report schemas loaded with Pydantic validation contracts.',
    '[WORKFLOW-ROUTER] 43 maker-checker pipelines registered with PostgreSQL state machine.',
    '[NOTIFY-DISPATCH] 32 automated SLA notification triggers active.',
  ])

  // Active Task
  const currentTask = useMemo(() => {
    return tasks.find((t) => t.id === selectedTaskId) || tasks[0]
  }, [tasks, selectedTaskId])

  const addLog = (entry: string) => {
    const timestamp = new Date().toISOString().substring(11, 19)
    setSystemLogs((prev) => [`[${timestamp}] ${entry}`, ...prev.slice(0, 19)])
  }

  // Preset Scenario Handlers
  const applyPreset = (preset: 'clean' | 'schema_fail' | 'escalation') => {
    setValidationSuccess(null)
    setValidationErrors([])
    setIsValidating(false)
    setValidationStage(0)

    if (preset === 'clean') {
      setSelectedTaskId('TASK-2026-Q3-01')
      setActiveRole('MAKER')
      setTasks((prev) =>
        prev.map((t) =>
          t.id === 'TASK-2026-Q3-01'
            ? {
                ...t,
                status: 'PENDING_MAKER',
                formData: {
                  ...t.formData,
                  totalMembers: 8,
                  independentDirectors: 4, // 50% passes
                  auditMeetings: 4,
                  annexureUploaded: true,
                  makerNotes: 'Q2 Board report verified against signed minutes. All statutory committee quotas satisfied.',
                },
              }
            : t
        )
      )
      addLog('[PRESET] Loaded Clean LODR Reg 27(2) Corporate Governance test scenario.')
    } else if (preset === 'schema_fail') {
      setSelectedTaskId('TASK-2026-Q3-02')
      setActiveRole('MAKER')
      // Make shareholding sum mismatch: 62.5 + 25.5 + 15.0 = 103.0% (Violation!)
      setTasks((prev) =>
        prev.map((t) =>
          t.id === 'TASK-2026-Q3-02'
            ? {
                ...t,
                status: 'PENDING_MAKER',
                formData: {
                  ...t.formData,
                  promoterShareholding: 62.5,
                  publicShareholding: 25.5,
                  nonInstitutionHolding: 15.0, // Error: Sums to 103%
                  annexureUploaded: false, // Missing annexure error
                  makerNotes: 'Unreconciled draft from manual excel sheet.',
                },
              }
            : t
        )
      )
      addLog('[PRESET] Loaded Validation Failure scenario: Sum mismatch (103%) & missing annexure.')
    } else if (preset === 'escalation') {
      setSelectedTaskId('TASK-2026-EVT-04')
      setActiveRole('CHECKER')
      addLog('[PRESET] Loaded Overdue SEBI PIT Reg 7(2) escalation queue.')
    }
  }

  // Run Pydantic Pre-Validation Engine
  const runPydanticValidation = () => {
    setIsValidating(true)
    setValidationStage(1)
    setValidationErrors([])
    setValidationSuccess(null)

    addLog(`[PYDANTIC] Initiating schema validation for model '${currentTask.formCode}'...`)

    setTimeout(() => {
      setValidationStage(2)
      addLog(`[VALIDATION-STEP 1] Validating mandatory regulatory disclosure headers & circular references...`)
    }, 400)

    setTimeout(() => {
      setValidationStage(3)
      addLog(`[VALIDATION-STEP 2] Checking numeric boundary constraints & statutory ratio thresholds...`)
    }, 800)

    setTimeout(() => {
      setValidationStage(4)
      addLog(`[VALIDATION-STEP 3] Verifying cryptographic checksums of uploaded annexures...`)
    }, 1200)

    setTimeout(() => {
      setIsValidating(false)
      const errors: string[] = []

      // Task 1: LODR 27(2) Checks
      if (currentTask.id === 'TASK-2026-Q3-01') {
        const total = currentTask.formData.totalMembers || 0
        const ind = currentTask.formData.independentDirectors || 0
        if (total > 0 && ind / total < 0.5) {
          errors.push(
            `SEBI LODR Reg 17(1) Breach: Independent directors (${ind}/${total} = ${Math.round(
              (ind / total) * 100
            )}%) is below mandatory 50% threshold for companies with executive chairperson.`
          )
        }
        if ((currentTask.formData.auditMeetings || 0) < 4) {
          errors.push(
            `SEBI LODR Reg 18(2)(a) Breach: Audit Committee held only ${currentTask.formData.auditMeetings} meetings (Statutory minimum is 4 per financial year).`
          )
        }
        if (!currentTask.formData.annexureUploaded) {
          errors.push('Pydantic ValidationError: Field `secretarial_audit_annexure` is mandatory.')
        }
      }

      // Task 2: LODR 31 Checks
      if (currentTask.id === 'TASK-2026-Q3-02') {
        const p = currentTask.formData.promoterShareholding || 0
        const pub = currentTask.formData.publicShareholding || 0
        const nonInst = currentTask.formData.nonInstitutionHolding || 0
        const totalShareholding = +(p + pub + nonInst).toFixed(2)
        if (totalShareholding !== 100.0) {
          errors.push(
            `Pydantic ValidationError [TotalCapitalSum]: Shareholding distribution sums to ${totalShareholding}% (Expected exact 100.00%). Discrepancy delta: ${(
              totalShareholding - 100.0
            ).toFixed(2)}%.`
          )
        }
        if (!currentTask.formData.annexureUploaded) {
          errors.push('Missing Document: `BENPOS_reconciliation_certificate.pdf` is required before submission.')
        }
      }

      // Task 3: AIF Reg 28 Checks
      if (currentTask.id === 'TASK-2026-M09-03') {
        if (!currentTask.formData.annexureUploaded) {
          errors.push('Pydantic ValidationError: `independent_valuer_certification` is mandatory for Category II AIF QAR.')
        }
      }

      if (errors.length > 0) {
        setValidationErrors(errors)
        setValidationSuccess(false)
        addLog(`[PYDANTIC-ERROR] Validation failed with ${errors.length} schema exception(s). Submission blocked.`)
      } else {
        setValidationErrors([])
        setValidationSuccess(true)
        addLog(`[PYDANTIC-PASS] All schema constraints passed for '${currentTask.formCode}'. Ready for Checker review.`)
      }
    }, 1600)
  }

  // Maker: Submit to Checker
  const handleMakerSubmit = () => {
    if (validationSuccess !== true) return
    setTasks((prev) =>
      prev.map((t) =>
        t.id === currentTask.id
          ? {
              ...t,
              status: 'SUBMITTED_TO_CHECKER',
            }
          : t
      )
    )
    addLog(
      `[WORKFLOW] Maker ${currentTask.makerName} successfully submitted ${currentTask.id} to reviewer queue.`
    )
    addLog(
      `[NOTIFY-EMAIL] Sent T-0 review prompt to Checker ${currentTask.checkerEmail} (Assigned SLA: 24 Hours).`
    )
    setActiveRole('CHECKER')
  }

  // Checker: Approve
  const handleCheckerApprove = () => {
    const submissionHash = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    setTasks((prev) =>
      prev.map((t) =>
        t.id === currentTask.id
          ? {
              ...t,
              status: 'APPROVED_FILED',
              formData: {
                ...t.formData,
                checkerNotes: checkerRemarkInput,
              },
            }
          : t
      )
    )
    addLog(`[APPROVAL-GRANTED] Checker ${currentTask.checkerName} approved filing ${currentTask.id}.`)
    addLog(`[SEBI-GATEWAY] Automated filing generated. Submission Receipt Hash: sha256_${submissionHash}.`)
    addLog(`[AUDIT-LEDGER] Maker-checker dual approval recorded in PostgreSQL document store.`)
  }

  // Checker: Reject with Remarks
  const handleCheckerReject = () => {
    if (!rejectionReasonInput.trim()) return
    setTasks((prev) =>
      prev.map((t) =>
        t.id === currentTask.id
          ? {
              ...t,
              status: 'REJECTED_TO_MAKER',
              formData: {
                ...t.formData,
                checkerNotes: rejectionReasonInput,
              },
            }
          : t
      )
    )
    addLog(`[APPROVAL-REJECTED] Filing ${currentTask.id} returned to Maker with remarks: "${rejectionReasonInput}".`)
    addLog(`[NOTIFY-EMAIL] Alert dispatched to Maker ${currentTask.makerEmail} regarding required revision.`)
    setActiveRole('MAKER')
  }

  // Reset simulator
  const handleResetSimulator = () => {
    setTasks(INITIAL_TASKS)
    setSelectedTaskId('TASK-2026-Q3-01')
    setActiveRole('MAKER')
    setValidationSuccess(null)
    setValidationErrors([])
    setIsValidating(false)
    addLog('[SYSTEM-RESET] Reset all regulatory filing workflows to baseline demo state.')
  }

  return (
    <div className="glass rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 text-white-soft shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-teal font-semibold">
              RegTech Interactive Sandbox
            </span>
            <span className="text-[10px] bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-full font-mono">
              67+ Reports · 43 Workflows
            </span>
          </div>
          <h2 className="text-2xl font-grotesk font-bold text-white tracking-tight flex items-center gap-2">
            Compulse 2.0 Compliance Engine
          </h2>
          <p className="text-xs text-grey font-inter mt-0.5">
            SEBI Regulatory Reporting, Maker-Checker State Machine & SLA Calendar
          </p>
        </div>

        {/* Preset scenario triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('clean')}
            className="px-3 py-1.5 rounded-lg bg-teal/10 hover:bg-teal/20 text-teal text-xs font-mono font-medium border border-teal/30 transition-all flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            <span>Preset: Clean LODR</span>
          </button>
          <button
            onClick={() => applyPreset('schema_fail')}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono font-medium border border-red-500/30 transition-all flex items-center gap-1.5"
          >
            <AlertTriangle size={13} />
            <span>Preset: Schema Error</span>
          </button>
          <button
            onClick={() => applyPreset('escalation')}
            className="px-3 py-1.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-mono font-medium border border-yellow-500/30 transition-all flex items-center gap-1.5"
          >
            <Clock size={13} />
            <span>Preset: SLA Breach</span>
          </button>
          <button
            onClick={handleResetSimulator}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-grey hover:text-white transition-all border border-white/10"
            title="Reset Simulator"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Navigation & Role Switcher Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Navigation Tabs */}
        <div className="lg:col-span-7 flex items-center gap-2 bg-navy/60 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'workflow'
                ? 'bg-teal/20 text-teal border border-teal/40 shadow-sm'
                : 'text-grey hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>Maker-Checker Execution</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'calendar'
                ? 'bg-teal/20 text-teal border border-teal/40 shadow-sm'
                : 'text-grey hover:text-white'
            }`}
          >
            <Calendar size={14} />
            <span>Statutory Calendar ({tasks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'matrix'
                ? 'bg-teal/20 text-teal border border-teal/40 shadow-sm'
                : 'text-grey hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>Workflow Matrix (43)</span>
          </button>
        </div>

        {/* RBAC Role Switcher */}
        <div className="lg:col-span-5 flex items-center justify-between gap-2 bg-navy/60 p-1.5 rounded-xl border border-white/5">
          <span className="text-[11px] font-mono text-grey px-2 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck size={13} className="text-teal" />
            <span>Role:</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveRole('MAKER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeRole === 'MAKER'
                  ? 'bg-teal text-navy font-bold shadow-md'
                  : 'bg-white/5 text-grey hover:text-white'
              }`}
            >
              Maker (Analyst)
            </button>
            <button
              onClick={() => setActiveRole('CHECKER')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeRole === 'CHECKER'
                  ? 'bg-yellow-400 text-navy font-bold shadow-md'
                  : 'bg-white/5 text-grey hover:text-white'
              }`}
            >
              Checker (Approver)
            </button>
            <button
              onClick={() => setActiveRole('COMPLIANCE')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeRole === 'COMPLIANCE'
                  ? 'bg-purple-400 text-navy font-bold shadow-md'
                  : 'bg-white/5 text-grey hover:text-white'
              }`}
            >
              Auditor
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: WORKFLOW & MAKER-CHECKER EXECUTION */}
      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filing Selector & Status Pipeline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-navy/50 p-4 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-grey tracking-wider">Active Task Queue</span>
                <span className="text-[10px] font-mono text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/20">
                  {tasks.filter((t) => t.status !== 'APPROVED_FILED').length} Pending
                </span>
              </div>

              {/* Task list pills */}
              <div className="space-y-2">
                {tasks.map((task) => {
                  const isSelected = task.id === selectedTaskId
                  return (
                    <div
                      key={task.id}
                      onClick={() => {
                        setSelectedTaskId(task.id)
                        setValidationSuccess(null)
                        setValidationErrors([])
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all text-left ${
                        isSelected
                          ? 'bg-teal/10 border-teal/40 shadow-sm'
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-teal font-semibold">{task.id}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] ${
                            task.status === 'APPROVED_FILED'
                              ? 'bg-teal/20 text-teal'
                              : task.status === 'SUBMITTED_TO_CHECKER'
                              ? 'bg-yellow-400/20 text-yellow-400'
                              : task.status === 'REJECTED_TO_MAKER'
                              ? 'bg-red-400/20 text-red-400'
                              : 'bg-white/10 text-grey'
                          }`}
                        >
                          {task.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white truncate">{task.title}</h4>
                      <div className="flex items-center justify-between text-[10px] text-grey mt-2 font-mono">
                        <span>{task.frequency}</span>
                        <span className={task.daysRemaining < 0 ? 'text-red-400 font-bold' : ''}>
                          {task.daysRemaining < 0
                            ? `Overdue (${Math.abs(task.daysRemaining)}d)`
                            : `${task.daysRemaining}d left`}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Workflow Stage Visualizer */}
            <div className="bg-navy/50 p-4 rounded-2xl border border-white/5 space-y-3">
              <span className="text-xs font-mono uppercase text-grey tracking-wider block">
                Maker-Checker Pipeline State
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between border ${
                    currentTask.status === 'PENDING_MAKER' || currentTask.status === 'VALIDATING'
                      ? 'bg-teal/15 border-teal/40 text-teal'
                      : 'bg-white/5 border-white/5 text-grey'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                      1
                    </span>
                    <span>Maker Drafting & Validation</span>
                  </span>
                  {currentTask.status !== 'PENDING_MAKER' && currentTask.status !== 'VALIDATING' && (
                    <Check size={14} className="text-teal" />
                  )}
                </div>

                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between border ${
                    currentTask.status === 'SUBMITTED_TO_CHECKER'
                      ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-400'
                      : 'bg-white/5 border-white/5 text-grey'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                      2
                    </span>
                    <span>Checker Verification Queue</span>
                  </span>
                  {currentTask.status === 'APPROVED_FILED' && <Check size={14} className="text-teal" />}
                </div>

                <div
                  className={`p-2.5 rounded-lg flex items-center justify-between border ${
                    currentTask.status === 'APPROVED_FILED'
                      ? 'bg-teal/15 border-teal/40 text-teal'
                      : currentTask.status === 'REJECTED_TO_MAKER'
                      ? 'bg-red-400/15 border-red-400/40 text-red-400'
                      : 'bg-white/5 border-white/5 text-grey'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[11px]">
                      3
                    </span>
                    <span>
                      {currentTask.status === 'REJECTED_TO_MAKER' ? 'Returned with Remarks' : 'SEBI Digital Sign-Off'}
                    </span>
                  </span>
                  {currentTask.status === 'APPROVED_FILED' ? (
                    <CheckCircle2 size={14} className="text-teal" />
                  ) : currentTask.status === 'REJECTED_TO_MAKER' ? (
                    <XCircle size={14} className="text-red-400" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Filing Interaction Pane (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Task Card Header */}
            <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs font-mono text-teal tracking-wider">{currentTask.circularCode}</span>
                  <h3 className="text-lg font-grotesk font-bold text-white mt-0.5">{currentTask.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-grey block">Statutory Due Date</span>
                  <span className="text-xs font-mono text-white font-semibold flex items-center gap-1 justify-end">
                    <Clock size={12} className={currentTask.daysRemaining < 0 ? 'text-red-400' : 'text-teal'} />
                    {currentTask.statutoryDueDate}
                  </span>
                </div>
              </div>

              {/* Authority & SLA details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-grey block">Regulator</span>
                  <span className="text-white font-medium">{currentTask.authority}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-grey block">Assigned Maker</span>
                  <span className="text-white font-medium">{currentTask.makerName}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-grey block">Reviewing Checker</span>
                  <span className="text-white font-medium">{currentTask.checkerName}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <span className="text-[10px] text-grey block">Department</span>
                  <span className="text-white font-medium truncate block">{currentTask.department}</span>
                </div>
              </div>

              {/* Rejection notice if previously rejected */}
              {currentTask.status === 'REJECTED_TO_MAKER' && currentTask.formData.checkerNotes && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-red-200 block font-mono">
                      Checker Audit Rejection ({currentTask.checkerName}):
                    </span>
                    <p className="mt-0.5 text-red-300 font-inter">{currentTask.formData.checkerNotes}</p>
                  </div>
                </div>
              )}

              {/* Final Approval badge if already filed */}
              {currentTask.status === 'APPROVED_FILED' && (
                <div className="p-3.5 rounded-xl bg-teal/10 border border-teal/30 text-xs text-teal flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-teal mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-teal font-mono block">
                      SEBI Regulatory Filing Completed & Digitally Signed
                    </span>
                    <p className="mt-0.5 text-white-soft font-inter">
                      Signed off by {currentTask.checkerName}. Acknowledgment receipt dispatched to board secretarial
                      archive.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE VIEW ACCORDING TO ROLE */}
            {activeRole === 'MAKER' && (
              <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-sm font-grotesk font-semibold text-white flex items-center gap-2">
                    <FileText size={15} className="text-teal" />
                    <span>Maker Return Composer (FastAPI Form Schema)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-grey">Form ID: {currentTask.formCode}</span>
                </div>

                {/* Form fields based on selected task */}
                <div className="space-y-4 text-xs font-mono">
                  {/* Task 1: Corporate Governance Form */}
                  {currentTask.id === 'TASK-2026-Q3-01' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Total Board Members</label>
                        <input
                          type="number"
                          value={currentTask.formData.totalMembers || 8}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, totalMembers: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">
                          Independent Directors (Min 50%)
                        </label>
                        <input
                          type="number"
                          value={currentTask.formData.independentDirectors || 4}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, independentDirectors: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Audit Committee Meetings (Min 4)</label>
                        <input
                          type="number"
                          value={currentTask.formData.auditMeetings || 4}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, auditMeetings: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Task 2: Shareholding Pattern Form */}
                  {currentTask.id === 'TASK-2026-Q3-02' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Promoter Shareholding (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={currentTask.formData.promoterShareholding || 62.5}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, promoterShareholding: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Public Shareholding (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={currentTask.formData.publicShareholding || 25.5}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, publicShareholding: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Non-Institution (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={currentTask.formData.nonInstitutionHolding || 12.0}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === currentTask.id
                                  ? { ...t, formData: { ...t.formData, nonInstitutionHolding: val } }
                                  : t
                              )
                            )
                            setValidationSuccess(null)
                          }}
                          className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:border-teal outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Task 3 & 4: Other form layouts */}
                  {currentTask.id === 'TASK-2026-M09-03' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Uncalled Commitment (₹ Cr)</label>
                        <input
                          type="number"
                          value={currentTask.formData.uncalledCommitmentCr || 120.5}
                          readOnly
                          className="w-full bg-navy/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono opacity-80"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Fund Corpus (₹ Cr)</label>
                        <input
                          type="number"
                          value={currentTask.formData.fundCorpusCr || 450.0}
                          readOnly
                          className="w-full bg-navy/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono opacity-80"
                        />
                      </div>
                    </div>
                  )}

                  {currentTask.id === 'TASK-2026-EVT-04' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Designated Person</label>
                        <input
                          type="text"
                          value={currentTask.formData.dpName || 'Vikram Malhotra'}
                          readOnly
                          className="w-full bg-navy/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono opacity-80"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-grey block mb-1">Transaction Value (₹ Lakhs)</label>
                        <input
                          type="number"
                          value={currentTask.formData.transactionValueLakhs || 28.5}
                          readOnly
                          className="w-full bg-navy/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono opacity-80"
                        />
                      </div>
                    </div>
                  )}

                  {/* Annexure Attachment Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-navy/50 border border-white/5">
                    <div className="flex items-center gap-3">
                      <FileCheck2 size={16} className="text-teal" />
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          Mandatory Annexure Attached (`.pdf / .xlsx`)
                        </span>
                        <span className="text-[10px] text-grey">
                          Requires Secretarial Auditor signature or Demat custodian feed
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === currentTask.id
                              ? {
                                  ...t,
                                  formData: { ...t.formData, annexureUploaded: !t.formData.annexureUploaded },
                                }
                              : t
                          )
                        )
                        setValidationSuccess(null)
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                        currentTask.formData.annexureUploaded
                          ? 'bg-teal/20 text-teal border border-teal/40'
                          : 'bg-white/10 text-grey border border-white/10'
                      }`}
                    >
                      {currentTask.formData.annexureUploaded ? '✓ Uploaded (Verified)' : '+ Attach File'}
                    </button>
                  </div>

                  {/* Maker Notes */}
                  <div>
                    <label className="text-[11px] text-grey block mb-1">Maker Submission Notes / Audit Justification</label>
                    <textarea
                      rows={2}
                      value={currentTask.formData.makerNotes}
                      onChange={(e) => {
                        const val = e.target.value
                        setTasks((prev) =>
                          prev.map((t) =>
                            t.id === currentTask.id ? { ...t, formData: { ...t.formData, makerNotes: val } } : t
                          )
                        )
                      }}
                      className="w-full bg-navy/80 border border-white/10 rounded-lg p-2.5 text-xs text-white-soft font-inter focus:border-teal outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Validation Feedback Display */}
                {isValidating && (
                  <div className="p-4 rounded-xl bg-teal/5 border border-teal/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-teal">
                      <span className="flex items-center gap-2">
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Evaluating Pydantic Schema Contracts (Stage {validationStage}/4)...</span>
                      </span>
                      <span>FastAPI Async Service</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-teal"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(validationStage / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {validationSuccess === false && validationErrors.length > 0 && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <XCircle size={15} />
                      <span>Pydantic Pre-Validation Rejected ({validationErrors.length} Issue(s))</span>
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-red-300 font-inter">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {validationSuccess === true && (
                  <div className="p-4 rounded-xl bg-teal/10 border border-teal/40 flex items-center justify-between">
                    <span className="text-xs font-mono text-teal font-semibold flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>All Schema & Statutory Constraints Verified Successfully</span>
                    </span>
                    <span className="text-[10px] font-mono text-teal/80 bg-teal/20 px-2 py-0.5 rounded">
                      Zero Discrepancies
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={runPydanticValidation}
                    disabled={isValidating}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-medium border border-white/10 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <ShieldCheck size={14} className="text-teal" />
                    <span>Run Pre-Validation</span>
                  </button>

                  <button
                    onClick={handleMakerSubmit}
                    disabled={validationSuccess !== true || currentTask.status === 'SUBMITTED_TO_CHECKER'}
                    className="px-5 py-2.5 rounded-xl bg-teal text-navy font-mono font-bold text-xs hover:bg-teal/90 transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Submit to Checker Queue</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* CHECKER ROLE VIEW */}
            {activeRole === 'CHECKER' && (
              <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-sm font-grotesk font-semibold text-white flex items-center gap-2">
                    <UserCheck size={15} className="text-yellow-400" />
                    <span>Checker Verification & Approval Stage</span>
                  </h4>
                  <span className="text-[11px] font-mono text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/30">
                    Dual Authorization Gate
                  </span>
                </div>

                {/* Submission diff summary */}
                <div className="bg-navy/50 p-4 rounded-xl border border-white/5 space-y-3">
                  <span className="text-xs font-mono uppercase text-grey tracking-wider block">
                    Submission Snapshot Submitted by {currentTask.makerName}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="bg-white/5 p-2 rounded">
                      <span className="text-[10px] text-grey block">Period</span>
                      <span className="text-white">{currentTask.formData.period}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                      <span className="text-[10px] text-grey block">Annexure Status</span>
                      <span className={currentTask.formData.annexureUploaded ? 'text-teal font-semibold' : 'text-red-400 font-semibold'}>
                        {currentTask.formData.annexureUploaded ? '✓ Verified Hash' : '✗ Missing Attachment'}
                      </span>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                      <span className="text-[10px] text-grey block">Maker Sign-off Time</span>
                      <span className="text-white">Today 14:15 IST</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-black/30 border border-white/5 text-xs text-white-soft font-inter">
                    <span className="font-mono text-grey text-[10px] block mb-0.5">Maker Remarks:</span>
                    {currentTask.formData.makerNotes}
                  </div>
                </div>

                {/* Audit checklist */}
                <div className="space-y-2 text-xs font-mono">
                  <span className="text-[11px] uppercase text-grey tracking-wider block">Mandatory Verification Checklist</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-grey">
                      <input type="checkbox" defaultChecked className="accent-teal rounded" />
                      <span>Statutory circular references confirmed</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-grey">
                      <input type="checkbox" defaultChecked className="accent-teal rounded" />
                      <span>Cross-checked against prior quarter baseline</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-grey">
                      <input type="checkbox" defaultChecked className="accent-teal rounded" />
                      <span>Secretarial audit sign-off attached</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-grey">
                      <input type="checkbox" defaultChecked className="accent-teal rounded" />
                      <span>Maker-checker segregation enforced</span>
                    </label>
                  </div>
                </div>

                {/* Checker Remarks & Rejection Input */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] font-mono text-grey block mb-1">
                      Checker Audit Remarks (Recorded upon Approval)
                    </label>
                    <input
                      type="text"
                      value={checkerRemarkInput}
                      onChange={(e) => setCheckerRemarkInput(e.target.value)}
                      className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-inter focus:border-yellow-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-grey block mb-1">
                      Rejection Reason (Recorded upon Return to Maker)
                    </label>
                    <input
                      type="text"
                      value={rejectionReasonInput}
                      onChange={(e) => setRejectionReasonInput(e.target.value)}
                      className="w-full bg-navy/80 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-inter focus:border-red-400 outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleCheckerReject}
                      disabled={currentTask.status === 'APPROVED_FILED'}
                      className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono font-medium border border-red-500/30 transition-all flex items-center gap-2 disabled:opacity-40"
                    >
                      <XCircle size={14} />
                      <span>Reject & Send Back</span>
                    </button>

                    <button
                      onClick={handleCheckerApprove}
                      disabled={currentTask.status === 'APPROVED_FILED'}
                      className="px-5 py-2.5 rounded-xl bg-yellow-400 text-navy font-mono font-bold text-xs hover:bg-yellow-300 transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 size={15} />
                      <span>Approve & Sign SEBI Filing</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AUDITOR / COMPLIANCE VIEW */}
            {activeRole === 'COMPLIANCE' && (
              <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h4 className="text-sm font-grotesk font-semibold text-white flex items-center gap-2">
                    <ShieldCheck size={16} className="text-purple-400" />
                    <span>Compliance Officer & Auditor Oversight</span>
                  </h4>
                  <span className="text-[11px] font-mono text-purple-400 bg-purple-400/10 px-2.5 py-0.5 rounded-full border border-purple-400/30">
                    Read-Only Audit Trail
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-grey block">Total Reports in Scope</span>
                    <span className="text-xl font-bold text-white mt-1 block">67 Variants</span>
                    <span className="text-[10px] text-teal mt-0.5 block">100% SEBI LODR / PIT / AIF covered</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-grey block">Configured Workflows</span>
                    <span className="text-xl font-bold text-white mt-1 block">43 Pipelines</span>
                    <span className="text-[10px] text-yellow-400 mt-0.5 block">Enforced dual-sign-off gates</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-grey block">Notification Triggers</span>
                    <span className="text-xl font-bold text-white mt-1 block">32 Rules</span>
                    <span className="text-[10px] text-purple-300 mt-0.5 block">Automated SLA escalation</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-grey font-mono space-y-1.5">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <Hash size={13} className="text-teal" />
                    <span>Cryptographic Verification Check:</span>
                  </div>
                  <p className="text-[11px] text-grey">
                    All maker submissions and checker sign-offs are hashed and persisted in a PostgreSQL write-only
                    audit log, preventing backdated filing modifications.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STATUTORY COMPLIANCE CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-navy/50 p-4 rounded-2xl border border-white/5">
            <div>
              <h3 className="text-base font-grotesk font-bold text-white">Periodic Statutory Filings Register</h3>
              <p className="text-xs text-grey font-inter">
                Real-time tracking of statutory deadlines across SEBI LODR, PIT, AIF, and Depositories
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-teal/10 text-teal border border-teal/20">
                ● Normal Track
              </span>
              <span className="px-2.5 py-1 rounded bg-red-400/10 text-red-400 border border-red-400/20">
                ● SLA Alert / Overdue
              </span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-navy/60">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-grey uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5">Circular / Act</th>
                  <th className="p-3.5">Report Title</th>
                  <th className="p-3.5">Frequency</th>
                  <th className="p-3.5">Statutory Due Date</th>
                  <th className="p-3.5">Maker / Checker</th>
                  <th className="p-3.5">Workflow Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 text-teal font-semibold">{task.circularCode}</td>
                    <td className="p-3.5 text-white font-medium max-w-xs truncate">{task.title}</td>
                    <td className="p-3.5 text-grey">{task.frequency}</td>
                    <td className="p-3.5">
                      <span className={task.daysRemaining < 0 ? 'text-red-400 font-bold' : 'text-white'}>
                        {task.statutoryDueDate}
                      </span>
                    </td>
                    <td className="p-3.5 text-grey">
                      <span className="text-white block">{task.makerName}</span>
                      <span className="text-[10px] text-grey">Reviewer: {task.checkerName}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] inline-block ${
                          task.status === 'APPROVED_FILED'
                            ? 'bg-teal/20 text-teal'
                            : task.status === 'SUBMITTED_TO_CHECKER'
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : task.status === 'REJECTED_TO_MAKER'
                            ? 'bg-red-400/20 text-red-400'
                            : 'bg-white/10 text-grey'
                        }`}
                      >
                        {task.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedTaskId(task.id)
                          setActiveTab('workflow')
                        }}
                        className="px-2.5 py-1 rounded bg-teal/10 hover:bg-teal/20 text-teal text-[11px] font-mono border border-teal/30 transition-all inline-flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WORKFLOW MATRIX & ARCHITECTURE */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: 43 Maker-Checker Pipelines */}
          <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-sm font-grotesk font-semibold text-white flex items-center gap-2">
                <Layers size={15} className="text-teal" />
                <span>43 Maker-Checker Pipeline Matrix</span>
              </h4>
              <span className="text-[10px] font-mono text-teal bg-teal/10 px-2 py-0.5 rounded">
                State Machine
              </span>
            </div>

            <p className="text-xs text-grey font-inter">
              Every regulatory filing is governed by an explicit state transition machine, preventing single-step
              bypasses and maintaining strict compliance separation.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-semibold flex items-center justify-between">
                  <span>Level 1: Secretarial & Board Filings (16 Workflows)</span>
                  <span className="text-[10px] text-teal">SEBI LODR</span>
                </span>
                <p className="text-[11px] text-grey font-inter">
                  Company Secretary Maker → Compliance Officer Checker → Exchange XML Dispatch.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-semibold flex items-center justify-between">
                  <span>Level 2: Insider Trading & SDD Disclosures (12 Workflows)</span>
                  <span className="text-[10px] text-yellow-400">SEBI PIT</span>
                </span>
                <p className="text-[11px] text-grey font-inter">
                  Surveillance Maker → Head of Compliance Checker → SDD SHA-256 Ledger update.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-white font-semibold flex items-center justify-between">
                  <span>Level 3: Alternative Investment Funds (15 Workflows)</span>
                  <span className="text-[10px] text-purple-400">SEBI AIF</span>
                </span>
                <p className="text-[11px] text-grey font-inter">
                  Fund Operations Maker → Risk Officer Checker → Quarterly Activity Report (QAR).
                </p>
              </div>
            </div>
          </div>

          {/* Right: 32 Automated Email Triggers */}
          <div className="bg-navy/70 p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-sm font-grotesk font-semibold text-white flex items-center gap-2">
                <Bell size={15} className="text-yellow-400" />
                <span>32 Automated SLA Notification Triggers</span>
              </h4>
              <span className="text-[10px] font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                Escalation Engine
              </span>
            </div>

            <p className="text-xs text-grey font-inter">
              Automated scheduler background workers evaluate statutory due dates every hour, triggering tiered
              notifications before regulatory fines are incurred.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-grey">T - 7 Days</span>
                <span className="text-white">Drafting Prompt to Maker Analyst</span>
                <span className="text-[10px] text-teal">Low Priority</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-grey">T - 3 Days</span>
                <span className="text-white">Warning: Approaching Deadline</span>
                <span className="text-[10px] text-yellow-400">Medium Priority</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-grey">T - 1 Day</span>
                <span className="text-white">Urgent Submission Alert to Reviewer</span>
                <span className="text-[10px] text-orange-400">High Priority</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-grey">T + 1 Day</span>
                <span className="text-red-400 font-bold">Overdue SLA Breach to Board & CCO</span>
                <span className="text-[10px] text-red-400">Critical Priority</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live System Terminal / Event Stream */}
      <div className="bg-black/60 rounded-2xl border border-white/10 p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-teal">
            <Terminal size={14} />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              Live Engine Audit Log (PostgreSQL Event Bus)
            </span>
          </div>
          <span className="text-[10px] text-grey">FastAPI · Pydantic · Celery Worker</span>
        </div>
        <div className="space-y-1 text-[11px] max-h-32 overflow-y-auto font-mono scrollbar-thin">
          {systemLogs.map((log, index) => (
            <div
              key={index}
              className={`leading-relaxed ${
                log.includes('[ERROR]') || log.includes('REJECTED')
                  ? 'text-red-400'
                  : log.includes('APPROVED') || log.includes('PASS')
                  ? 'text-teal'
                  : log.includes('WARN') || log.includes('CHECKER')
                  ? 'text-yellow-400'
                  : 'text-grey'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Architecture Callout */}
      <div className="p-4 rounded-2xl bg-teal/5 border border-teal/20 text-xs font-inter text-grey flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-teal flex-shrink-0" />
          <span>
            <strong className="text-white">RegTech Architecture Note:</strong> Standardized Pydantic schemas across 67+
            SEBI reporting formats eliminate cross-departmental submission errors before reaching reviewers.
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] font-mono text-teal bg-teal/10 px-3 py-1 rounded-full border border-teal/30">
            FastAPI · React · PostgreSQL · Docker
          </span>
        </div>
      </div>
    </div>
  )
}
