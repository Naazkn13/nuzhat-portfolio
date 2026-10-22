'use client'
import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Fingerprint,
  CheckCircle2,
  Clock,
  Building2,
  FileText,
  RefreshCw,
  Terminal,
  X,
  Printer,
  Layers,
  ShieldCheck,
  Check,
} from 'lucide-react'

// --- Synthetic Healthcare Staff & Attendance Mock Data (Strictly Privacy & NDA Compliant) ---

export type StaffMember = {
  id: string
  name: string
  role: string
  department: 'Ophthalmology' | 'Optometry' | 'Nursing' | 'Administration' | 'Diagnostics'
  baseSalary: number
  totalDays: number
  presentDays: number
  paidLeaveTaken: number
  overtimeHours: number
  lateDays: number
  zkDeviceId: string
}

const HOSPITAL_STAFF: StaffMember[] = [
  {
    id: 'EYE-101',
    name: 'Dr. Ayesha Siddiqui',
    role: 'Chief Ophthalmologist & Surgeon',
    department: 'Ophthalmology',
    baseSalary: 165000,
    totalDays: 30,
    presentDays: 27,
    paidLeaveTaken: 2,
    overtimeHours: 14.5,
    lateDays: 0,
    zkDeviceId: 'ZK-SURG-01',
  },
  {
    id: 'EYE-102',
    name: 'Dr. Rohan Mehra',
    role: 'Consultant Cornea Specialist',
    department: 'Ophthalmology',
    baseSalary: 140000,
    totalDays: 30,
    presentDays: 26,
    paidLeaveTaken: 3,
    overtimeHours: 8.0,
    lateDays: 1,
    zkDeviceId: 'ZK-SURG-01',
  },
  {
    id: 'EYE-103',
    name: 'Kavita Iyer',
    role: 'Senior Optometrist',
    department: 'Optometry',
    baseSalary: 52000,
    totalDays: 30,
    presentDays: 28,
    paidLeaveTaken: 1,
    overtimeHours: 12.0,
    lateDays: 2,
    zkDeviceId: 'ZK-OPD-02',
  },
  {
    id: 'EYE-104',
    name: 'Rahul Deshmukh',
    role: 'Clinical Refractionist',
    department: 'Optometry',
    baseSalary: 44000,
    totalDays: 30,
    presentDays: 29,
    paidLeaveTaken: 0,
    overtimeHours: 16.0,
    lateDays: 1,
    zkDeviceId: 'ZK-OPD-02',
  },
  {
    id: 'EYE-105',
    name: 'Sister Mary Fernandes',
    role: 'OT In-Charge / Head Nurse',
    department: 'Nursing',
    baseSalary: 48000,
    totalDays: 30,
    presentDays: 28,
    paidLeaveTaken: 1,
    overtimeHours: 20.0,
    lateDays: 0,
    zkDeviceId: 'ZK-SURG-01',
  },
  {
    id: 'EYE-106',
    name: 'Priya Nair',
    role: 'Staff Nurse (Ward Care)',
    department: 'Nursing',
    baseSalary: 34000,
    totalDays: 30,
    presentDays: 27,
    paidLeaveTaken: 2,
    overtimeHours: 10.5,
    lateDays: 2,
    zkDeviceId: 'ZK-WARD-03',
  },
  {
    id: 'EYE-107',
    name: 'Anjali Jadhav',
    role: 'Staff Nurse (Daycare OT)',
    department: 'Nursing',
    baseSalary: 33000,
    totalDays: 30,
    presentDays: 26,
    paidLeaveTaken: 3,
    overtimeHours: 6.0,
    lateDays: 1,
    zkDeviceId: 'ZK-WARD-03',
  },
  {
    id: 'EYE-108',
    name: 'Sunita Patil',
    role: 'Ophthalmic OT Assistant',
    department: 'Nursing',
    baseSalary: 28000,
    totalDays: 30,
    presentDays: 29,
    paidLeaveTaken: 1,
    overtimeHours: 14.0,
    lateDays: 0,
    zkDeviceId: 'ZK-SURG-01',
  },
  {
    id: 'EYE-109',
    name: 'Vikas Sawant',
    role: 'Optical Coherence Tech (OCT)',
    department: 'Diagnostics',
    baseSalary: 38000,
    totalDays: 30,
    presentDays: 28,
    paidLeaveTaken: 1,
    overtimeHours: 10.0,
    lateDays: 3,
    zkDeviceId: 'ZK-DIAG-04',
  },
  {
    id: 'EYE-110',
    name: 'Fatima Sayed',
    role: 'Hospital Admin & Billing Manager',
    department: 'Administration',
    baseSalary: 46000,
    totalDays: 30,
    presentDays: 28,
    paidLeaveTaken: 2,
    overtimeHours: 8.5,
    lateDays: 0,
    zkDeviceId: 'ZK-ADM-01',
  },
  {
    id: 'EYE-111',
    name: 'Ganesh More',
    role: 'Patient Care & Registration Coordinator',
    department: 'Administration',
    baseSalary: 26000,
    totalDays: 30,
    presentDays: 29,
    paidLeaveTaken: 1,
    overtimeHours: 12.0,
    lateDays: 1,
    zkDeviceId: 'ZK-ADM-01',
  },
  {
    id: 'EYE-112',
    name: 'Ramesh Shinde',
    role: 'Facility & Inventory Supervisor',
    department: 'Administration',
    baseSalary: 25000,
    totalDays: 30,
    presentDays: 30,
    paidLeaveTaken: 0,
    overtimeHours: 18.0,
    lateDays: 0,
    zkDeviceId: 'ZK-ADM-01',
  },
]

type PunchLog = {
  id: string
  timestamp: string
  staffName: string
  staffId: string
  type: 'CHECK_IN' | 'CHECK_OUT'
  deviceId: string
  matchScore: number
  status: 'VERIFIED' | 'LATE_FLAG' | 'OT_FLAG'
}

export default function BiometricSimulator() {
  const [staffList, setStaffList] = useState<StaffMember[]>(HOSPITAL_STAFF)
  const [selectedStaffId, setSelectedStaffId] = useState<string>('EYE-103')
  const [punchType, setPunchType] = useState<'CHECK_IN' | 'CHECK_OUT'>('CHECK_IN')
  const [activeTab, setActiveTab] = useState<'PUNCH' | 'PAYROLL' | 'LOGS'>('PUNCH')
  const [payslipModalStaff, setPayslipModalStaff] = useState<StaffMember | null>(null)
  const [punchLogs, setPunchLogs] = useState<PunchLog[]>([
    {
      id: 'PUN-9921',
      timestamp: '08:54:12 IST',
      staffName: 'Dr. Ayesha Siddiqui',
      staffId: 'EYE-101',
      type: 'CHECK_IN',
      deviceId: 'ZK-SURG-01',
      matchScore: 99.8,
      status: 'VERIFIED',
    },
    {
      id: 'PUN-9922',
      timestamp: '08:58:34 IST',
      staffName: 'Sister Mary Fernandes',
      staffId: 'EYE-105',
      type: 'CHECK_IN',
      deviceId: 'ZK-SURG-01',
      matchScore: 99.4,
      status: 'VERIFIED',
    },
    {
      id: 'PUN-9923',
      timestamp: '09:12:04 IST',
      staffName: 'Kavita Iyer',
      staffId: 'EYE-103',
      type: 'CHECK_IN',
      deviceId: 'ZK-OPD-02',
      matchScore: 98.9,
      status: 'LATE_FLAG',
    },
  ])
  const [isPunching, setIsPunching] = useState(false)
  const [lastPunchStatus, setLastPunchStatus] = useState<string | null>(null)

  const selectedStaff = useMemo(
    () => staffList.find((s) => s.id === selectedStaffId) || staffList[0],
    [staffList, selectedStaffId]
  )

  // Payroll computation engine
  const calculatePayroll = (staff: StaffMember) => {
    const dailyRate = staff.baseSalary / 30
    const hourlyRate = dailyRate / 8
    const overtimeRate = hourlyRate * 1.5 // 1.5x for OT in healthcare

    const payableDays = Math.min(30, staff.presentDays + staff.paidLeaveTaken)
    const unpaidDays = 30 - payableDays
    const lopDeduction = Math.round(unpaidDays * dailyRate)

    const overtimePay = Math.round(staff.overtimeHours * overtimeRate)
    const grossEarnings = Math.round(staff.baseSalary - lopDeduction + overtimePay)

    const pfDeduction = staff.baseSalary > 15000 ? Math.min(1800, Math.round(staff.baseSalary * 0.12)) : 0
    const professionalTax = 200
    const lateFine = staff.lateDays > 2 ? (staff.lateDays - 2) * 250 : 0
    const totalDeductions = pfDeduction + professionalTax + lateFine

    const netSalary = grossEarnings - totalDeductions

    return {
      dailyRate: Math.round(dailyRate),
      hourlyRate: Math.round(hourlyRate),
      payableDays,
      unpaidDays,
      lopDeduction,
      overtimePay,
      grossEarnings,
      pfDeduction,
      professionalTax,
      lateFine,
      totalDeductions,
      netSalary,
    }
  }

  const selectedPayroll = useMemo(() => calculatePayroll(selectedStaff), [selectedStaff])

  const handleTriggerPunch = () => {
    setIsPunching(true)
    setLastPunchStatus(null)

    setTimeout(() => {
      const now = new Date()
      const timeStr = now.toTimeString().split(' ')[0] + ' IST'
      const matchScore = parseFloat((98.2 + Math.random() * 1.7).toFixed(1))
      const isLate = punchType === 'CHECK_IN' && now.getMinutes() > 15
      const status: 'VERIFIED' | 'LATE_FLAG' | 'OT_FLAG' = isLate
        ? 'LATE_FLAG'
        : punchType === 'CHECK_OUT'
        ? 'OT_FLAG'
        : 'VERIFIED'

      const newPunch: PunchLog = {
        id: `PUN-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: timeStr,
        staffName: selectedStaff.name,
        staffId: selectedStaff.id,
        type: punchType,
        deviceId: selectedStaff.zkDeviceId,
        matchScore,
        status,
      }

      setPunchLogs((prev) => [newPunch, ...prev.slice(0, 7)])
      setIsPunching(false)
      setLastPunchStatus(`Punch confirmed for ${selectedStaff.name} via ${selectedStaff.zkDeviceId} (${matchScore}% match)`)

      // Update staff metrics dynamically
      if (punchType === 'CHECK_OUT') {
        setStaffList((prev) =>
          prev.map((s) =>
            s.id === selectedStaff.id ? { ...s, overtimeHours: +(s.overtimeHours + 1.0).toFixed(1) } : s
          )
        )
      }
    }, 600)
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-7 md:p-9 border border-teal/20 text-white-soft shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-teal/10 border border-teal/30 text-teal">
              <Fingerprint size={22} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-grotesk font-bold text-xl md:text-2xl text-white-soft">
                  Biometric Attendance & Payroll Engine
                </h3>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Live ADMS Simulation
                </span>
              </div>
              <p className="text-grey text-xs sm:text-sm font-inter mt-0.5">
                Real-time ZKTeco biometric ingestion, policy evaluation & 30-day salary calculation (12+ Staff)
              </p>
            </div>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-navy/80 border border-white/10 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('PUNCH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'PUNCH'
                ? 'bg-teal text-navy font-semibold shadow-md'
                : 'text-grey hover:text-white-soft'
            }`}
          >
            <Fingerprint size={13} />
            Device Punch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('PAYROLL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'PAYROLL'
                ? 'bg-teal text-navy font-semibold shadow-md'
                : 'text-grey hover:text-white-soft'
            }`}
          >
            <Layers size={13} />
            Payroll Grid
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('LOGS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'LOGS'
                ? 'bg-teal text-navy font-semibold shadow-md'
                : 'text-grey hover:text-white-soft'
            }`}
          >
            <Terminal size={13} />
            ADMS Logs
          </button>
        </div>
      </div>

      {/* Main Body per Tab */}
      <div className="pt-6">
        {activeTab === 'PUNCH' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left: Device Simulator */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-teal font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ZKTeco Hardware ADMS Simulator
                  </span>
                  <span className="text-[11px] font-mono text-grey">IP: 192.168.1.105:8081</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Select Staff */}
                  <div>
                    <label className="block text-xs font-inter text-grey mb-1.5">
                      Select Hospital Staff (12 Members):
                    </label>
                    <select
                      value={selectedStaffId}
                      onChange={(e) => setSelectedStaffId(e.target.value)}
                      className="w-full bg-[#080E1A] border border-white/15 rounded-xl px-3 py-2 text-xs text-white-soft font-inter focus:outline-none focus:border-teal/50"
                    >
                      {staffList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.department} · {s.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Punch Type */}
                  <div>
                    <label className="block text-xs font-inter text-grey mb-1.5">Punch Type:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPunchType('CHECK_IN')}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                          punchType === 'CHECK_IN'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                            : 'bg-white/5 text-grey border-white/10 hover:border-white/20'
                        }`}
                      >
                        Check-In (IN)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPunchType('CHECK_OUT')}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                          punchType === 'CHECK_OUT'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/50'
                            : 'bg-white/5 text-grey border-white/10 hover:border-white/20'
                        }`}
                      >
                        Check-Out (OUT)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Device Hardware Info Pill */}
                <div className="p-3 rounded-lg bg-navy/60 border border-teal/15 flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2 text-grey">
                    <Building2 size={13} className="text-teal" />
                    <span>Device: <strong className="text-white-soft">{selectedStaff.zkDeviceId}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-grey">
                    <Clock size={13} className="text-teal" />
                    <span>Shift: <strong className="text-white-soft">09:00 AM – 05:30 PM</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-grey">
                    <ShieldCheck size={13} className="text-teal" />
                    <span>Firmware: <strong className="text-white-soft">ZK-Ver 6.60</strong></span>
                  </div>
                </div>

                {/* Trigger Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    disabled={isPunching}
                    onClick={handleTriggerPunch}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal to-teal/80 hover:from-teal/90 hover:to-teal/70 text-navy font-grotesk font-bold text-sm tracking-wide shadow-lg shadow-teal/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isPunching ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        ADMS Handshake & Biometric Match in progress...
                      </>
                    ) : (
                      <>
                        <Fingerprint size={16} />
                        Simulate Biometric Fingerprint Scan
                      </>
                    )}
                  </button>
                </div>

                {lastPunchStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{lastPunchStatus}</span>
                  </motion.div>
                )}
              </div>

              {/* Recent Punches Feed */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-teal">
                    Live ADMS Event Ingestion Stream
                  </span>
                  <span className="text-[10px] font-mono text-grey">Protocol: HTTP POST /iclock/cdata</span>
                </div>

                <div className="space-y-2">
                  {punchLogs.map((p) => (
                    <div
                      key={p.id}
                      className="p-2.5 rounded-lg bg-[#080E1A]/80 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.type === 'CHECK_IN' ? 'bg-emerald-400' : 'bg-blue-400'
                          }`}
                        />
                        <span className="font-mono text-grey text-[11px]">{p.timestamp}</span>
                        <span className="font-medium text-white-soft">{p.staffName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-grey">
                          {p.deviceId}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            p.type === 'CHECK_IN'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {p.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Real-time Staff Ledger & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-xl bg-teal/5 border border-teal/20 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal">
                      30-Day Automated Payroll Ledger
                    </span>
                    <h4 className="font-grotesk font-bold text-lg text-white-soft mt-0.5">
                      {selectedStaff.name}
                    </h4>
                    <p className="text-grey text-xs">{selectedStaff.role} · {selectedStaff.department}</p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal/10 text-teal border border-teal/30">
                    {selectedStaff.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Monthly Base:</span>
                    <strong className="text-white-soft text-sm">₹{selectedStaff.baseSalary.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Net Payout:</span>
                    <strong className="text-teal text-sm">₹{selectedPayroll.netSalary.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Present / Cycle:</span>
                    <span className="text-white-soft font-mono">{selectedStaff.presentDays} / 30 Days</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Paid Leave (PL):</span>
                    <span className="text-emerald-400 font-mono">{selectedStaff.paidLeaveTaken} Days</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Overtime Hours:</span>
                    <span className="text-teal font-mono">{selectedStaff.overtimeHours} hrs (1.5x)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#080E1A]/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Late Deductions:</span>
                    <span className="text-rose-400 font-mono">{selectedStaff.lateDays} Late ({selectedPayroll.lateFine > 0 ? `₹${selectedPayroll.lateFine}` : 'Grace'})</span>
                  </div>
                </div>

                {/* Earnings vs Deductions Breakdown */}
                <div className="p-3 rounded-lg bg-[#080E1A]/80 border border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-grey">
                    <span>Base Salary (30 days):</span>
                    <span className="text-white-soft font-mono">₹{selectedStaff.baseSalary.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedPayroll.lopDeduction > 0 && (
                    <div className="flex justify-between text-rose-400">
                      <span>Loss of Pay ({selectedPayroll.unpaidDays} days):</span>
                      <span className="font-mono">- ₹{selectedPayroll.lopDeduction.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {selectedPayroll.overtimePay > 0 && (
                    <div className="flex justify-between text-teal">
                      <span>Overtime Bonus ({selectedStaff.overtimeHours} hrs):</span>
                      <span className="font-mono">+ ₹{selectedPayroll.overtimePay.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-grey">
                    <span>PF (Provident Fund) Deduction:</span>
                    <span className="font-mono text-rose-400">- ₹{selectedPayroll.pfDeduction.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-grey">
                    <span>Professional Tax (PT):</span>
                    <span className="font-mono text-rose-400">- ₹{selectedPayroll.professionalTax}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm">
                    <span className="text-white-soft">Calculated Net Pay:</span>
                    <span className="text-teal font-mono">₹{selectedPayroll.netSalary.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPayslipModalStaff(selectedStaff)}
                  className="w-full py-2.5 px-4 rounded-xl border border-teal/40 bg-teal/10 hover:bg-teal/20 text-teal text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText size={14} />
                  Preview & Print Generated Payslip
                </button>
              </div>

              {/* Verified Metrics Callout */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                <span className="font-mono text-teal uppercase text-[10px] tracking-wider block">
                  Production Impact & Proven ROI
                </span>
                <ul className="space-y-1.5 text-grey font-inter">
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-teal flex-shrink-0" />
                    <span><strong>12+ Healthcare staff</strong> managed live across shifts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-teal flex-shrink-0" />
                    <span>Payroll processing turnaround reduced from <strong>2+ hours to &lt;30 mins</strong> (75% cut)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={13} className="text-teal flex-shrink-0" />
                    <span>Zero manual Excel formula errors or sync data loss</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Staff Payroll Grid */}
        {activeTab === 'PAYROLL' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-grey font-inter">
                Complete staff roster for 30-day payroll cycle (12 eye hospital staff members):
              </span>
              <span className="text-teal font-mono text-[11px]">Cycle: 01 Oct 2026 – 30 Oct 2026</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080E1A]/80">
              <table className="w-full text-left text-xs font-inter">
                <thead className="bg-white/5 border-b border-white/10 text-grey font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-3">Role & Dept</th>
                    <th className="py-3 px-3">Base</th>
                    <th className="py-3 px-3">Present</th>
                    <th className="py-3 px-3">PL</th>
                    <th className="py-3 px-3">OT (hrs)</th>
                    <th className="py-3 px-3">Net Pay</th>
                    <th className="py-3 px-4 text-right">Payslip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {staffList.map((staff) => {
                    const payroll = calculatePayroll(staff)
                    return (
                      <tr key={staff.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-white-soft block">{staff.name}</span>
                          <span className="text-[10px] font-mono text-grey">{staff.id}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-white-soft block">{staff.role}</span>
                          <span className="text-[10px] text-teal">{staff.department}</span>
                        </td>
                        <td className="py-3 px-3 font-mono text-grey">₹{staff.baseSalary.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 font-mono text-white-soft">{staff.presentDays}d</td>
                        <td className="py-3 px-3 font-mono text-emerald-400">{staff.paidLeaveTaken}d</td>
                        <td className="py-3 px-3 font-mono text-teal">{staff.overtimeHours}h</td>
                        <td className="py-3 px-3 font-mono font-bold text-teal">₹{payroll.netSalary.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setPayslipModalStaff(staff)}
                            className="px-2.5 py-1 rounded-lg border border-teal/30 bg-teal/5 text-teal hover:bg-teal/15 text-[11px] font-mono transition-all"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: ADMS Live Sync Logs */}
        {activeTab === 'LOGS' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-grey space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-teal">
                <span>FastAPI ADMS Gateway Daemon — ZKTeco Real-Time Sync</span>
                <span className="text-emerald-400">● LISTENING (Port 8081)</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <p className="text-grey/60">[08:45:00.102] INFO: ADMS Gateway initialized. Connected to Supabase DB.</p>
                <p className="text-grey/60">[08:45:01.450] INFO: Device ZK-SURG-01 registered from 192.168.1.105 (Firmware: 6.60).</p>
                <p className="text-grey/60">[08:45:02.120] INFO: Device ZK-OPD-02 registered from 192.168.1.106.</p>
                <p className="text-grey/60">[08:45:02.910] INFO: Device ZK-WARD-03 registered from 192.168.1.107.</p>
                <p className="text-grey/60">[08:45:03.400] INFO: Device ZK-ADM-01 registered from 192.168.1.108.</p>
                <p className="text-emerald-300">[08:54:12.890] POST /iclock/cdata?SN=ZK-SURG-01&table=ATTLOG -&gt; 200 OK (EMP: EYE-101, Match: 99.8%)</p>
                <p className="text-emerald-300">[08:58:34.120] POST /iclock/cdata?SN=ZK-SURG-01&table=ATTLOG -&gt; 200 OK (EMP: EYE-105, Match: 99.4%)</p>
                <p className="text-yellow-300">[09:12:04.550] POST /iclock/cdata?SN=ZK-OPD-02&table=ATTLOG -&gt; 200 OK (EMP: EYE-103, Late +12m)</p>
                <p className="text-teal">[09:30:00.000] CRON: Executed daily accrual job. Processed 12 staff records in 142ms.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payslip Modal */}
      <AnimatePresence>
        {payslipModalStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-2xl bg-[#0B1220] border border-teal/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080E1A]">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-teal" />
                  <span className="font-grotesk font-bold text-white-soft text-base">
                    Hospital Payslip — {payslipModalStaff.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPayslipModalStaff(null)}
                  className="p-1 rounded-lg text-grey hover:text-white-soft transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Printable Payslip Body */}
              <div className="p-6 sm:p-8 space-y-6 text-xs text-white-soft font-inter max-h-[75vh] overflow-y-auto">
                {/* Hospital Header */}
                <div className="text-center pb-4 border-b border-white/10 space-y-1">
                  <h4 className="font-grotesk font-bold text-xl text-teal">
                    MUMBAI EYE HEALTHCARE & SURGERY CENTER
                  </h4>
                  <p className="text-grey text-[11px]">
                    Andheri West, Mumbai, Maharashtra 400058 · Reg No: MH/MUM/MED/2021/89
                  </p>
                  <span className="inline-block mt-2 font-mono text-[11px] text-white-soft bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    Salary Statement for Month: October 2026
                  </span>
                </div>

                {/* Staff Meta */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px]">
                  <div>
                    <span className="text-grey block">Employee ID:</span>
                    <strong className="text-white-soft font-mono">{payslipModalStaff.id}</strong>
                  </div>
                  <div>
                    <span className="text-grey block">Name:</span>
                    <strong className="text-white-soft">{payslipModalStaff.name}</strong>
                  </div>
                  <div>
                    <span className="text-grey block">Designation:</span>
                    <strong className="text-teal">{payslipModalStaff.role}</strong>
                  </div>
                  <div>
                    <span className="text-grey block">Department:</span>
                    <strong className="text-white-soft">{payslipModalStaff.department}</strong>
                  </div>
                </div>

                {/* Days Table */}
                <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-navy/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Total Days</span>
                    <span className="font-bold text-white-soft">30</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Present</span>
                    <span className="font-bold text-emerald-400">{payslipModalStaff.presentDays}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Paid Leave</span>
                    <span className="font-bold text-teal">{payslipModalStaff.paidLeaveTaken}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/60 border border-white/5">
                    <span className="text-grey block text-[10px]">Overtime</span>
                    <span className="font-bold text-blue-400">{payslipModalStaff.overtimeHours} hrs</span>
                  </div>
                </div>

                {/* Earnings & Deductions Tables */}
                {(() => {
                  const pay = calculatePayroll(payslipModalStaff)
                  return (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Earnings */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                        <span className="font-mono text-teal uppercase text-[10px] tracking-wider block pb-1 border-b border-white/10">
                          Gross Earnings (₹)
                        </span>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-grey">Basic Salary:</span>
                          <span className="font-mono">₹{payslipModalStaff.baseSalary.toLocaleString('en-IN')}</span>
                        </div>
                        {pay.overtimePay > 0 && (
                          <div className="flex justify-between py-1 border-b border-white/5 text-teal">
                            <span>Overtime Pay ({payslipModalStaff.overtimeHours}h):</span>
                            <span className="font-mono">+ ₹{pay.overtimePay.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 font-bold text-white-soft">
                          <span>Total Earnings:</span>
                          <span className="font-mono text-teal">₹{pay.grossEarnings.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Deductions */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                        <span className="font-mono text-rose-400 uppercase text-[10px] tracking-wider block pb-1 border-b border-white/10">
                          Statutory Deductions (₹)
                        </span>
                        {pay.lopDeduction > 0 && (
                          <div className="flex justify-between py-1 border-b border-white/5 text-rose-300">
                            <span>Loss of Pay ({pay.unpaidDays}d):</span>
                            <span className="font-mono">₹{pay.lopDeduction.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1 border-b border-white/5 text-grey">
                          <span>Provident Fund (PF):</span>
                          <span className="font-mono text-rose-300">₹{pay.pfDeduction.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5 text-grey">
                          <span>Professional Tax (PT):</span>
                          <span className="font-mono text-rose-300">₹{pay.professionalTax}</span>
                        </div>
                        {pay.lateFine > 0 && (
                          <div className="flex justify-between py-1 border-b border-white/5 text-rose-300">
                            <span>Late Mark Penalties:</span>
                            <span className="font-mono">₹{pay.lateFine}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 font-bold text-white-soft">
                          <span>Total Deductions:</span>
                          <span className="font-mono text-rose-400">₹{pay.totalDeductions.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {/* Net Pay Banner */}
                {(() => {
                  const pay = calculatePayroll(payslipModalStaff)
                  return (
                    <div className="p-4 rounded-xl bg-teal/10 border border-teal/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-teal">Net Disbursed Amount</span>
                        <div className="text-xl sm:text-2xl font-bold font-grotesk text-white-soft">
                          ₹{pay.netSalary.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded bg-teal/20 text-teal border border-teal/40">
                        Disbursed via Direct Bank ACH
                      </span>
                    </div>
                  )
                })()}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 border-t border-white/10 bg-[#080E1A] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-teal text-navy font-grotesk font-bold text-xs flex items-center gap-1.5 hover:bg-teal/90 transition-all cursor-pointer"
                >
                  <Printer size={13} />
                  Print / Save as PDF
                </button>
                <button
                  type="button"
                  onClick={() => setPayslipModalStaff(null)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-grey hover:text-white-soft text-xs font-inter transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
