'use client'
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  FileText,
  RefreshCw,
  UserCheck,
  ArrowRight,
  Hash,
  Clock,
  ShieldAlert,
  Building2,
  Check,
  X,
  Sparkles,
  Terminal,
  FileCheck2,
} from 'lucide-react'

// --- Synthetic Mock Data & Types (Strictly NDA Compliant) ---

type DesignatedPerson = {
  id: string
  name: string
  role: string
  category: 'KMP' | 'Director' | 'Designated Person' | 'Connected Person'
  panMasked: string
  holdingApex: number
  holdingNexus: number
  holdingCipher: number
  lastTradeCipherDate?: string // for contra-trade rule
}

const DESIGNATED_PERSONS: DesignatedPerson[] = [
  {
    id: 'DP-01',
    name: 'Vikram Malhotra',
    role: 'Director (Operations)',
    category: 'Director',
    panMasked: 'ABCDE****F',
    holdingApex: 45000,
    holdingNexus: 12000,
    holdingCipher: 2500,
    lastTradeCipherDate: '2026-02-05', // Bought 45 days ago
  },
  {
    id: 'DP-02',
    name: 'Pooja Sharma',
    role: 'VP — Strategic Finance',
    category: 'Designated Person',
    panMasked: 'XYZPQ****M',
    holdingApex: 18000,
    holdingNexus: 6000,
    holdingCipher: 0,
  },
  {
    id: 'DP-03',
    name: 'Arjun Rao',
    role: 'Head of Engineering (Connected)',
    category: 'Connected Person',
    panMasked: 'KLPQR****T',
    holdingApex: 8500,
    holdingNexus: 3000,
    holdingCipher: 0,
  },
]

type Security = {
  ticker: string
  companyName: string
  price: number
  windowStatus: 'OPEN' | 'CLOSED'
  isGreyListed: boolean
  greyListReason?: string
}

const SECURITIES: Record<string, Security> = {
  'APEX-TECH': {
    ticker: 'APEX-TECH',
    companyName: 'Apex Technologies Ltd',
    price: 1420,
    windowStatus: 'OPEN',
    isGreyListed: false,
  },
  'NEXUS-CORP': {
    ticker: 'NEXUS-CORP',
    companyName: 'Nexus Global Systems Ltd',
    price: 850,
    windowStatus: 'CLOSED',
    isGreyListed: true,
    greyListReason: 'Active UPSI: Acquisition talks under Project Falcon (SEBI PIT Reg 4)',
  },
  'CIPHER-FIN': {
    ticker: 'CIPHER-FIN',
    companyName: 'Cipher Financial Holdings Ltd',
    price: 3100,
    windowStatus: 'OPEN',
    isGreyListed: false,
  },
}

type SDDEntry = {
  id: string
  timestamp: string
  matter: string
  nature: string
  sharer: string
  recipient: string
  panMasked: string
  purpose: string
  ndaOnRecord: boolean
  hashSignature: string
}

const INITIAL_SDD_ENTRIES: SDDEntry[] = [
  {
    id: 'SDD-2026-0819',
    timestamp: '2026-09-18 10:24:15 UTC',
    matter: 'Project Falcon (Strategic M&A)',
    nature: 'Acquisition / Restructuring',
    sharer: 'Dr. Sunita Mehta (CFO)',
    recipient: 'Rajesh Varma (Lead Partner, LexPartners Legal)',
    panMasked: 'AABCP****K',
    purpose: 'Drafting Share Purchase Agreement & regulatory disclosures',
    ndaOnRecord: true,
    hashSignature: '7f9a2e3b1c8d04e5...a1f4',
  },
  {
    id: 'SDD-2026-0818',
    timestamp: '2026-09-16 14:05:32 UTC',
    matter: 'Q3 Audited Financial Results',
    nature: 'Financial Performance',
    sharer: 'Alok Gupta (Head of Investor Relations)',
    recipient: 'Suresh Singhania (Statutory Auditor, S.K. & Co.)',
    panMasked: 'BBLMP****R',
    purpose: 'Quarterly limited review audit certification',
    ndaOnRecord: true,
    hashSignature: '3c8e1f0b9d7a2c4e...88b2',
  },
  {
    id: 'SDD-2026-0817',
    timestamp: '2026-09-12 09:15:00 UTC',
    matter: 'Special Interim Dividend Declaration',
    nature: 'Dividends & Capital Allocation',
    sharer: 'Vikram Malhotra (Director)',
    recipient: 'Ananya Sen (Merchant Banker, Horizon Capital)',
    panMasked: 'DELPS****W',
    purpose: 'Dividend payout structuring & liquidity verification',
    ndaOnRecord: true,
    hashSignature: '6d4a9b2c8f1e0d3a...e4c9',
  },
]

export default function NovusSimulator() {
  const [activeTab, setActiveTab] = useState<'preclearance' | 'sdd'>('preclearance')

  // --- TAB 1: Pre-Clearance State ---
  const [selectedDpId, setSelectedDpId] = useState<string>('DP-01')
  const [selectedTicker, setSelectedTicker] = useState<string>('APEX-TECH')
  const [tradeAction, setTradeAction] = useState<'BUY' | 'SELL'>('BUY')
  const [tradeQuantity, setTradeQuantity] = useState<number>(2000)
  const [hasUndertaking, setHasUndertaking] = useState<boolean>(true)

  // Simulation Evaluation State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)
  const [evaluationStage, setEvaluationStage] = useState<number>(0)
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'PASSED' | 'REJECTED_GREYLIST' | 'REJECTED_CONTRA' | 'REJECTED_WINDOW' | null
    details: string
    ruleRef: string
  } | null>(null)

  // Maker-Checker State
  const [makerCheckerStatus, setMakerCheckerStatus] = useState<'IDLE' | 'PENDING' | 'APPROVED' | 'REJECTED'>('IDLE')
  const [approvalMandateId, setApprovalMandateId] = useState<string>('')
  const [checkerNotes, setCheckerNotes] = useState<string>('Surveillance checks validated. Pre-clearance approved for 7 trading days.')

  // Tab 1 Audit Logs
  const [surveillanceLogs, setSurveillanceLogs] = useState<string[]>([
    '[SYS-INIT] RegTech Surveillance Rules Engine v2.4 initialized.',
    '[MONITOR] ECAS / BENPOS depository sync active — Last reconciled 04:00 IST.',
    '[POLICY] SEBI PIT Regulations, 2015 & Model Code Schedule B loaded.',
  ])

  // --- TAB 2: SDD State ---
  const [sddEntries, setSddEntries] = useState<SDDEntry[]>(INITIAL_SDD_ENTRIES)
  const [globalWindowClosed, setGlobalWindowClosed] = useState<boolean>(false)
  const [isVerifyingIntegrity, setIsVerifyingIntegrity] = useState<boolean>(false)
  const [integrityVerified, setIntegrityVerified] = useState<boolean | null>(null)

  // New SDD Form Fields
  const [sddMatter, setSddMatter] = useState<string>('Project Falcon (Strategic M&A)')
  const [sddNature, setSddNature] = useState<string>('Acquisition / Restructuring')
  const [sddRecipient, setSddRecipient] = useState<string>('Kavita Deshmukh (M&A Advisory Lead)')
  const [sddPan, setSddPan] = useState<string>('PQZKM1094E')
  const [sddPurpose, setSddPurpose] = useState<string>('Synergy evaluation and valuation matrix modeling')
  const [sddNdaChecked, setSddNdaChecked] = useState<boolean>(true)

  const selectedDP = useMemo(() => {
    return DESIGNATED_PERSONS.find((dp) => dp.id === selectedDpId) || DESIGNATED_PERSONS[0]
  }, [selectedDpId])

  const selectedSec = useMemo(() => {
    return SECURITIES[selectedTicker] || SECURITIES['APEX-TECH']
  }, [selectedTicker])

  const tradeValue = useMemo(() => {
    return tradeQuantity * selectedSec.price
  }, [tradeQuantity, selectedSec])

  // Quick Preset Scenarios
  const handlePreset = (preset: 'clean' | 'greylist' | 'contra') => {
    setMakerCheckerStatus('IDLE')
    setEvaluationResult(null)
    if (preset === 'clean') {
      setSelectedDpId('DP-01')
      setSelectedTicker('APEX-TECH')
      setTradeAction('BUY')
      setTradeQuantity(1500)
    } else if (preset === 'greylist') {
      setSelectedDpId('DP-02')
      setSelectedTicker('NEXUS-CORP')
      setTradeAction('BUY')
      setTradeQuantity(1000)
    } else if (preset === 'contra') {
      setSelectedDpId('DP-01')
      setSelectedTicker('CIPHER-FIN')
      setTradeAction('SELL')
      setTradeQuantity(2000)
    }
  }

  // Run Surveillance Engine
  const runSurveillanceChecks = () => {
    setIsEvaluating(true)
    setEvaluationStage(1)
    setEvaluationResult(null)
    setMakerCheckerStatus('IDLE')

    const timestamp = new Date().toISOString().substring(11, 19)

    // Stage 1: Window Check
    setTimeout(() => {
      setEvaluationStage(2)
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [STAGE 1] Checking trading window for ${selectedSec.ticker}...`,
        ...prev,
      ])
    }, 300)

    // Stage 2: Grey-List Cross-Reference
    setTimeout(() => {
      setEvaluationStage(3)
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [STAGE 2] Querying UPSI SDD Grey-List register...`,
        ...prev,
      ])
    }, 600)

    // Stage 3: Contra-Trade & Threshold Check
    setTimeout(() => {
      setEvaluationStage(4)
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [STAGE 3] Reconciling 6-month historical BENPOS trades for DP ${selectedDP.name}...`,
        ...prev,
      ])
    }, 900)

    // Final Verdict
    setTimeout(() => {
      setIsEvaluating(false)

      // Rule 1: Grey-List Violation
      if (selectedSec.isGreyListed) {
        setEvaluationResult({
          status: 'REJECTED_GREYLIST',
          details: `Security ${selectedSec.ticker} is currently on the UPSI Grey-List. ${selectedSec.greyListReason}. Trading strictly prohibited.`,
          ruleRef: 'SEBI PIT Regulations, 2015 — Regulation 4(1) & Schedule B',
        })
        setMakerCheckerStatus('REJECTED')
        setSurveillanceLogs((prev) => [
          `[${timestamp}] [VERDICT: BLOCKED] Flagged under SEBI PIT Reg 4 — Grey-Listed Security. Pre-clearance denied.`,
          ...prev,
        ])
        return
      }

      // Rule 2: Contra-Trade Violation (Sell within 180 days of Buy on CIPHER-FIN)
      if (selectedTicker === 'CIPHER-FIN' && tradeAction === 'SELL') {
        setEvaluationResult({
          status: 'REJECTED_CONTRA',
          details: `Contra-trade rule triggered: Designated Person bought 2,500 shares on 05-Feb-2026. Opposite transaction within 180 days is prohibited.`,
          ruleRef: 'SEBI PIT Regulations, 2015 — Schedule B, Clause 10 (Contra-Trade Restriction)',
        })
        setMakerCheckerStatus('REJECTED')
        setSurveillanceLogs((prev) => [
          `[${timestamp}] [VERDICT: BLOCKED] Contra-trade violation detected (<180 days). Mandatory cooling period active.`,
          ...prev,
        ])
        return
      }

      // Rule 3: Trading Window Closed
      if (selectedSec.windowStatus === 'CLOSED' || globalWindowClosed) {
        setEvaluationResult({
          status: 'REJECTED_WINDOW',
          details: `Trading window for ${selectedSec.ticker} is currently CLOSED due to financial results / sensitive period.`,
          ruleRef: 'SEBI PIT Regulations, 2015 — Schedule B, Clause 4',
        })
        setMakerCheckerStatus('REJECTED')
        setSurveillanceLogs((prev) => [
          `[${timestamp}] [VERDICT: BLOCKED] Trading window closed. Pre-clearance cannot be approved during window closure.`,
          ...prev,
        ])
        return
      }

      // Passed Automated Surveillance!
      setEvaluationResult({
        status: 'PASSED',
        details: `Automated surveillance checks passed. No grey-list match, no contra-trade conflict, trading window open. Routed to Compliance Officer for sign-off.`,
        ruleRef: 'SEBI PIT Schedule B, Clause 6 (Pre-Clearance Protocol)',
      })
      setMakerCheckerStatus('PENDING')
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [VERDICT: PASSED] Automated surveillance verified. Enqueued into Maker-Checker approval desk.`,
        ...prev,
      ])
    }, 1200)
  }

  // Maker-Checker Sign-off
  const handleMakerCheckerAction = (action: 'APPROVE' | 'REJECT') => {
    const timestamp = new Date().toISOString().substring(11, 19)
    if (action === 'APPROVE') {
      const mandate = `MNDT-2026-${Math.floor(1000 + Math.random() * 9000)}`
      setApprovalMandateId(mandate)
      setMakerCheckerStatus('APPROVED')
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [MAKER-CHECKER] Mandate ${mandate} ISSUED by Principal Compliance Officer. Valid for 7 trading days.`,
        ...prev,
      ])
    } else {
      setMakerCheckerStatus('REJECTED')
      setSurveillanceLogs((prev) => [
        `[${timestamp}] [MAKER-CHECKER] Pre-clearance REJECTED by Compliance Officer. Notes: ${checkerNotes}`,
        ...prev,
      ])
    }
  }

  // Tab 2: Add SDD Entry
  const handleAddSddEntry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!sddRecipient || !sddPan) return

    const now = new Date()
    const utcString = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    const newId = `SDD-2026-0${sddEntries.length + 820}`
    const mockHash = `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`

    const newEntry: SDDEntry = {
      id: newId,
      timestamp: utcString,
      matter: sddMatter,
      nature: sddNature,
      sharer: 'Dr. Sunita Mehta (CFO)',
      recipient: sddRecipient,
      panMasked: sddPan.slice(0, 5) + '****' + sddPan.slice(-1),
      purpose: sddPurpose,
      ndaOnRecord: sddNdaChecked,
      hashSignature: mockHash,
    }

    setSddEntries([newEntry, ...sddEntries])
    setSddRecipient('')
    setSddPurpose('')
    setIntegrityVerified(null)
  }

  // Tab 2: Verify Cryptographic Chain Integrity
  const verifySddChain = () => {
    setIsVerifyingIntegrity(true)
    setIntegrityVerified(null)
    setTimeout(() => {
      setIsVerifyingIntegrity(false)
      setIntegrityVerified(true)
    }, 700)
  }

  return (
    <section className="glass rounded-2xl p-6 sm:p-8 border border-teal/30 relative overflow-hidden my-10 shadow-2xl">
      {/* Background Accent Glows */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Mode Switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-teal font-mono text-xs uppercase tracking-widest font-semibold">
              Live Interactive RegTech Sandbox
            </span>
            <span className="text-[10px] bg-white/10 text-white-soft/80 border border-white/10 px-2 py-0.5 rounded-full font-mono">
              SEBI PIT 2015 Compliant
            </span>
          </div>
          <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-white-soft">
            Novus RegTech Simulation Engine
          </h2>
          <p className="text-grey font-inter text-xs sm:text-sm mt-1 max-w-xl">
            Test the two core workflows built at Novus: Automated Insider Trading Surveillance & Pre-Clearance, and the Structured Digital Database (SDD).
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-navy-2/90 p-1 rounded-xl border border-white/10 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveTab('preclearance')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-inter transition-all ${
              activeTab === 'preclearance'
                ? 'bg-teal text-navy font-semibold shadow-md'
                : 'text-grey hover:text-white-soft'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Pre-Clearance Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('sdd')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-inter transition-all ${
              activeTab === 'sdd'
                ? 'bg-teal text-navy font-semibold shadow-md'
                : 'text-grey hover:text-white-soft'
            }`}
          >
            <Lock size={16} />
            <span>UPSI SDD (Reg 3(5))</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PRE-CLEARANCE SURVEILLANCE ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'preclearance' && (
        <div className="space-y-8">
          {/* Quick Scenario Fill Bar */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-grey flex items-center gap-1.5">
              <Sparkles size={14} className="text-teal" />
              Quick Scenarios:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePreset('clean')}
                className="text-xs font-inter px-3 py-1 rounded-md bg-white/5 hover:bg-teal/10 hover:text-teal text-white-soft border border-white/10 transition-all"
              >
                1. Compliant Trade (Passes to Approver)
              </button>
              <button
                onClick={() => handlePreset('greylist')}
                className="text-xs font-inter px-3 py-1 rounded-md bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-white-soft border border-white/10 transition-all"
              >
                2. Grey-Listed Security (Reg 4 Flag)
              </button>
              <button
                onClick={() => handlePreset('contra')}
                className="text-xs font-inter px-3 py-1 rounded-md bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 text-white-soft border border-white/10 transition-all"
              >
                3. Contra-Trade Violation (&lt;180 Days)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-navy-2/60 border border-white/10 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-grotesk font-semibold text-teal uppercase tracking-wider flex items-center gap-2">
                  <UserCheck size={16} />
                  1. Designated Person (Applicant)
                </h3>
                
                {/* Person Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {DESIGNATED_PERSONS.map((dp) => (
                    <button
                      key={dp.id}
                      onClick={() => {
                        setSelectedDpId(dp.id)
                        setEvaluationResult(null)
                        setMakerCheckerStatus('IDLE')
                      }}
                      className={`text-left p-3 rounded-lg border text-xs transition-all ${
                        selectedDpId === dp.id
                          ? 'border-teal bg-teal/10 text-white-soft shadow-sm'
                          : 'border-white/5 bg-white/[0.02] text-grey hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-white-soft truncate">{dp.name}</div>
                      <div className="text-[11px] text-teal/80 truncate mt-0.5">{dp.role}</div>
                      <div className="text-[10px] text-grey font-mono mt-1">{dp.panMasked}</div>
                    </button>
                  ))}
                </div>

                {/* Target Security Selection */}
                <div className="pt-2">
                  <label className="text-xs font-inter text-grey block mb-2 font-medium">
                    2. Target Security (Equity / Derivatives)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {Object.values(SECURITIES).map((sec) => (
                      <button
                        key={sec.ticker}
                        onClick={() => {
                          setSelectedTicker(sec.ticker)
                          setEvaluationResult(null)
                          setMakerCheckerStatus('IDLE')
                        }}
                        className={`text-left p-3 rounded-lg border text-xs transition-all ${
                          selectedTicker === sec.ticker
                            ? 'border-teal bg-teal/10 text-white-soft'
                            : 'border-white/5 bg-white/[0.02] text-grey hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-white-soft">{sec.ticker}</span>
                          {sec.isGreyListed ? (
                            <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                              Grey-List
                            </span>
                          ) : (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              Open
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-grey truncate mt-1">{sec.companyName}</div>
                        <div className="text-[11px] font-mono text-teal mt-1">₹{sec.price.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trade Action & Quantity Slider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-inter text-grey block mb-1.5 font-medium">
                      Transaction Action
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTradeAction('BUY')
                          setEvaluationResult(null)
                          setMakerCheckerStatus('IDLE')
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          tradeAction === 'BUY'
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-grey'
                        }`}
                      >
                        BUY (Acquire)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTradeAction('SELL')
                          setEvaluationResult(null)
                          setMakerCheckerStatus('IDLE')
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          tradeAction === 'SELL'
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                            : 'bg-white/5 border-white/10 text-grey'
                        }`}
                      >
                        SELL (Dispose)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-inter text-grey font-medium">
                        Proposed Volume: <span className="text-teal font-mono font-bold">{tradeQuantity.toLocaleString('en-IN')}</span> shares
                      </label>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={25000}
                      step={500}
                      value={tradeQuantity}
                      onChange={(e) => {
                        setTradeQuantity(Number(e.target.value))
                        setEvaluationResult(null)
                        setMakerCheckerStatus('IDLE')
                      }}
                      className="w-full accent-teal cursor-pointer h-2 bg-white/10 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-grey font-mono mt-1">
                      <span>500</span>
                      <span>12,500</span>
                      <span>25,000</span>
                    </div>
                  </div>
                </div>

                {/* Total Value Bar & Regulatory Disclosure */}
                <div className="bg-black/30 rounded-lg p-3 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-grey">Calculated Deal Value:</span>
                    <div className="text-lg font-mono font-bold text-white-soft">
                      ₹{tradeValue.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-grey">
                        (₹{(tradeValue / 100000).toFixed(2)} Lakhs)
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-mono text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/20">
                      SEBI Threshold: ₹10L+
                    </span>
                    <div className="text-[10px] text-grey mt-0.5">Mandatory Pre-Clearance Required</div>
                  </div>
                </div>

                {/* Declarations Checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-grey cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={hasUndertaking}
                    onChange={(e) => setHasUndertaking(e.target.checked)}
                    className="mt-0.5 accent-teal rounded"
                  />
                  <span>
                    I affirm under oath that I hold no Unpublished Price Sensitive Information (UPSI) and will not execute contra-trades for 6 months.
                  </span>
                </label>

                {/* Evaluation Trigger Button */}
                <button
                  disabled={isEvaluating || !hasUndertaking}
                  onClick={runSurveillanceChecks}
                  className="w-full py-3 px-4 rounded-xl bg-teal text-navy font-grotesk font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw size={16} className="animate-spin text-navy" />
                      <span>Running FastAPI Surveillance Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={16} className="text-navy" />
                      <span>Run Automated Surveillance Pipeline</span>
                      <ArrowRight size={16} className="text-navy" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results & Maker-Checker Column */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              {/* Surveillance Status Card */}
              <div className="bg-navy-2/60 border border-white/10 rounded-xl p-5 flex-grow">
                <h3 className="text-sm font-grotesk font-semibold text-teal uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Terminal size={16} />
                  2. Surveillance Engine Verdict
                </h3>

                {/* Pipeline Progress Stages */}
                {isEvaluating && (
                  <div className="space-y-2.5 py-4">
                    <div className="flex items-center gap-2.5 text-xs font-mono text-grey">
                      <RefreshCw size={14} className={`animate-spin ${evaluationStage >= 1 ? 'text-teal' : 'text-grey'}`} />
                      <span>Stage 1: Trading Window Schedule...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-grey">
                      <RefreshCw size={14} className={`animate-spin ${evaluationStage >= 2 ? 'text-teal' : 'text-grey'}`} />
                      <span>Stage 2: Grey-List & SDD Cross-Match...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-grey">
                      <RefreshCw size={14} className={`animate-spin ${evaluationStage >= 3 ? 'text-teal' : 'text-grey'}`} />
                      <span>Stage 3: 180-Day Contra-Trade Demat Audit...</span>
                    </div>
                  </div>
                )}

                {/* Initial Idle Placeholder */}
                {!isEvaluating && !evaluationResult && (
                  <div className="text-center py-10 px-4 text-grey">
                    <ShieldCheck size={36} className="mx-auto text-teal/40 mb-3" />
                    <p className="text-xs leading-relaxed">
                      Select a Designated Person, target security, and proposed trade volume, then click <strong className="text-white-soft">Run Automated Surveillance Pipeline</strong> to evaluate compliance rules in real-time.
                    </p>
                  </div>
                )}

                {/* Rejection Result */}
                {!isEvaluating && evaluationResult && evaluationResult.status !== 'PASSED' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl border bg-rose-500/10 border-rose-500/30 text-rose-300 space-y-2.5"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm font-grotesk">
                      <ShieldAlert size={18} className="text-rose-400" />
                      <span>Surveillance Verdict: REJECTED</span>
                    </div>
                    <p className="text-xs text-white-soft/90 leading-relaxed">
                      {evaluationResult.details}
                    </p>
                    <div className="pt-2 border-t border-rose-500/20 text-[11px] font-mono text-rose-400">
                      <strong>Legal Ref:</strong> {evaluationResult.ruleRef}
                    </div>
                  </motion.div>
                )}

                {/* Passed Automated Checks -> Unlocks Maker-Checker */}
                {!isEvaluating && evaluationResult && evaluationResult.status === 'PASSED' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-300 space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-xs font-grotesk">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>Surveillance Engine: 100% COMPLIANT</span>
                      </div>
                      <p className="text-[11px] text-white-soft/90">
                        {evaluationResult.details}
                      </p>
                      <div className="text-[10px] font-mono text-emerald-400/80">
                        Governing: {evaluationResult.ruleRef}
                      </div>
                    </div>

                    {/* Maker-Checker Desk */}
                    <div className="bg-black/40 border border-teal/20 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-grotesk font-semibold text-teal flex items-center gap-1.5">
                          <UserCheck size={14} />
                          Maker-Checker Stage: Compliance Review
                        </span>
                        <span className="text-[10px] font-mono bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 px-2 py-0.5 rounded">
                          Awaiting Checker Sign-Off
                        </span>
                      </div>

                      <div className="text-xs text-grey space-y-1">
                        <div>
                          <strong className="text-white-soft">Checker:</strong> Anand Swaminathan (Chief Compliance Officer)
                        </div>
                        <div>
                          <strong className="text-white-soft">Requested Mandate:</strong> {selectedDP.name} · {tradeAction} {tradeQuantity} {selectedTicker}
                        </div>
                      </div>

                      {/* Approval / Rejection Actions */}
                      {makerCheckerStatus === 'PENDING' && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            onClick={() => handleMakerCheckerAction('APPROVE')}
                            className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-inter text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow"
                          >
                            <Check size={14} />
                            Approve Mandate
                          </button>
                          <button
                            onClick={() => handleMakerCheckerAction('REJECT')}
                            className="py-2 px-3 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 font-inter text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Approved Certificate Card */}
                      {makerCheckerStatus === 'APPROVED' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-3 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-emerald-300 flex items-center gap-1">
                              <FileCheck2 size={14} />
                              PRE-CLEARANCE MANDATE ISSUED
                            </span>
                            <span className="font-mono text-[10px] text-white-soft bg-emerald-500/20 px-1.5 py-0.5 rounded">
                              {approvalMandateId}
                            </span>
                          </div>
                          <p className="text-[11px] text-grey">
                            Pre-clearance valid for <strong>7 Calendar Days</strong>. Execution must be reported to Compliance within 2 trading days under SEBI PIT Reg 7(2).
                          </p>
                          <div className="text-[10px] font-mono text-emerald-400/70 truncate">
                            SHA256: 9e4f2081d09e3a6c8b744a...
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Terminal-Style Real-Time Audit Log */}
              <div className="bg-black/50 border border-white/10 rounded-xl p-3 font-mono text-[11px] h-36 overflow-y-auto space-y-1">
                <div className="text-[10px] text-teal/70 sticky top-0 bg-black/90 pb-1 border-b border-white/10 flex items-center justify-between">
                  <span>AUDIT TRAIL (STREAM)</span>
                  <span>IMMUTABLE</span>
                </div>
                {surveillanceLogs.map((log, idx) => (
                  <div key={idx} className="text-grey/90 leading-tight">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STRUCTURED DIGITAL DATABASE (SDD - SEBI PIT REG 3(5) & 3(6)) */}
      {/* ========================================================================= */}
      {activeTab === 'sdd' && (
        <div className="space-y-8">
          {/* Statutory Notice Banner */}
          <div className="bg-teal/5 border border-teal/20 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-teal" />
                <span className="font-grotesk font-semibold text-white-soft text-sm">
                  SEBI Regulation 3(5) & 3(6) Mandate
                </span>
              </div>
              <p className="text-xs text-grey max-w-2xl leading-relaxed">
                Listed entities must maintain an internal Structured Digital Database of UPSI containing names, PAN/passport, and sharing timestamps. Under Regulation 3(6), the database must have <strong>adequate internal controls and audit trails to prevent any deletion or tampering</strong>.
              </p>
            </div>

            {/* Global Trading Window Lock Trigger */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-navy-2 p-2 rounded-lg border border-white/10">
              <span className="text-xs text-grey font-inter">Window:</span>
              <button
                onClick={() => setGlobalWindowClosed(!globalWindowClosed)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                  globalWindowClosed
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {globalWindowClosed ? <Lock size={12} /> : <Unlock size={12} />}
                <span>{globalWindowClosed ? 'WINDOW CLOSED' : 'WINDOW OPEN'}</span>
              </button>
            </div>
          </div>

          {/* SDD Entry Form + Verification Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form to Log New UPSI Sharing Event */}
            <form onSubmit={handleAddSddEntry} className="lg:col-span-5 bg-navy-2/60 border border-white/10 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-grotesk font-semibold text-teal uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} />
                Log UPSI Recipient into SDD
              </h3>

              <div>
                <label className="text-xs font-inter text-grey block mb-1 font-medium">Matter / Deal Name</label>
                <select
                  value={sddMatter}
                  onChange={(e) => setSddMatter(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white-soft focus:border-teal outline-none"
                >
                  <option value="Project Falcon (Strategic M&A)">Project Falcon (Strategic M&A)</option>
                  <option value="Q3 Audited Financial Results">Q3 Audited Financial Results</option>
                  <option value="Special Interim Dividend Declaration">Special Interim Dividend Declaration</option>
                  <option value="Capex Expansion Plan (₹400 Cr)">Capex Expansion Plan (₹400 Cr)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-inter text-grey block mb-1 font-medium">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={sddRecipient}
                    onChange={(e) => setSddRecipient(e.target.value)}
                    placeholder="e.g. Legal Counsel, Auditor"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white-soft focus:border-teal outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-inter text-grey block mb-1 font-medium">Recipient PAN / ID</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={sddPan}
                    onChange={(e) => setSddPan(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs font-mono text-white-soft focus:border-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-inter text-grey block mb-1 font-medium">Legitimate Purpose of Sharing</label>
                <input
                  type="text"
                  required
                  value={sddPurpose}
                  onChange={(e) => setSddPurpose(e.target.value)}
                  placeholder="e.g. Drafting due diligence reports"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white-soft focus:border-teal outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-grey cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={sddNdaChecked}
                  onChange={(e) => setSddNdaChecked(e.target.checked)}
                  className="accent-teal rounded"
                />
                <span>Confidentiality & Non-Disclosure Agreement (NDA) Executed</span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-teal text-navy font-grotesk font-bold text-xs hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow"
              >
                <Lock size={14} />
                <span>Commit to Immutable SDD Ledger</span>
              </button>
            </form>

            {/* Cryptographic Chain Integrity Card */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-navy-2/60 border border-white/10 rounded-xl p-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-grotesk font-semibold text-teal uppercase tracking-wider flex items-center gap-2">
                      <Hash size={16} />
                      SEBI Reg 3(6) Tamper-Evident Ledger
                    </h3>
                    <button
                      onClick={verifySddChain}
                      disabled={isVerifyingIntegrity}
                      className="text-xs font-mono text-teal hover:underline flex items-center gap-1"
                    >
                      <RefreshCw size={12} className={isVerifyingIntegrity ? 'animate-spin' : ''} />
                      <span>Verify Block Hashes</span>
                    </button>
                  </div>

                  <p className="text-xs text-grey mb-4">
                    Every entry in the SDD is timestamped to the exact second with a SHA-256 block hash linked to preceding transactions. Zero deletions or retroactive edits are permitted by law.
                  </p>

                  {/* Verification Banner */}
                  {integrityVerified && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Ledger Verified: Hash Continuity 100% Intact. Zero Deletions.</span>
                    </motion.div>
                  )}

                  {/* Table of Entries */}
                  <div className="overflow-x-auto max-h-72 overflow-y-auto border border-white/5 rounded-lg">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-grey font-mono text-[10px] uppercase sticky top-0">
                        <tr>
                          <th className="p-2.5">Entry ID</th>
                          <th className="p-2.5">Matter & Recipient</th>
                          <th className="p-2.5">Masked PAN</th>
                          <th className="p-2.5">Status</th>
                          <th className="p-2.5">Block Hash</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sddEntries.map((entry) => (
                          <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-2.5 font-mono text-teal whitespace-nowrap">{entry.id}</td>
                            <td className="p-2.5">
                              <div className="font-semibold text-white-soft">{entry.matter}</div>
                              <div className="text-[11px] text-grey">{entry.recipient}</div>
                            </td>
                            <td className="p-2.5 font-mono text-grey whitespace-nowrap">{entry.panMasked}</td>
                            <td className="p-2.5 whitespace-nowrap">
                              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                                IMMUTABLE
                              </span>
                            </td>
                            <td className="p-2.5 font-mono text-[10px] text-grey/80 truncate max-w-[100px]">
                              {entry.hashSignature}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-grey font-mono">
                  <span>Total Recorded Events: {sddEntries.length}</span>
                  <span>Database Retention: 8 Years (Statutory)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info / Tech Summary */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-grey font-inter">
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-teal" />
          <span>Production Architecture: FastAPI backend + PostgreSQL document/event store + RBAC Maker-Checker.</span>
        </div>
        <div className="text-[11px] font-mono text-teal/70">
          Synthetic Data · RegTech Enterprise Prototype
        </div>
      </div>
    </section>
  )
}
