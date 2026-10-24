import type { ReactNode } from 'react'
import { TrendingUp, type LucideIcon } from 'lucide-react'
import { statusStyles } from '../app/data'
import type { TenderStatus } from '../app/types'

export function MetricCard({ label, value, helper, icon: Icon, tone, trend }: {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: string
  trend?: string
}) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <p className="mt-2 text-[28px] font-bold tracking-[-0.04em] text-ink">{value}</p>
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
          <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        {trend && <span className="inline-flex items-center gap-0.5 font-bold text-emerald-600"><TrendingUp className="h-3 w-3" />{trend}</span>}
        <span>{helper}</span>
      </div>
    </article>
  )
}

export function ProgressRing({ value }: { value: number }) {
  const radius = 43
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" role="img" aria-label={`${value}% completado`}>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e9eef5" strokeWidth="7" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#13b98f" strokeWidth="7" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <span className="block text-xl font-bold tracking-[-0.04em] text-ink">{value}%</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Avance</span>
        </div>
      </div>
    </div>
  )
}

export function StatusBadge({ status }: { status: TenderStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset ${statusStyles[status]}`}>{status}</span>
}

export function PageShell({ title, description, action, children }: { title: string; description: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div><h2 className="text-base font-bold text-ink">{title}</h2><p className="mt-1 text-xs text-slate-500">{description}</p></div>
        {action}
      </div>
      {children}
    </div>
  )
}
