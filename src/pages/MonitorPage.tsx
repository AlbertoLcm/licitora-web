import { useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Radar,
  RefreshCw,
  Sparkles,
  Target,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { opportunities } from '../app/data'
import type { ViewId } from '../app/types'

export function MonitorPage({ onSuccess, navigate }: { onSuccess: (message: string) => void; navigate: (view: ViewId) => void }) {
  const [selectedId, setSelectedId] = useState(opportunities[0].id)
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'discarded'>>({})
  const [scanning, setScanning] = useState(false)
  const selected = opportunities.find((opportunity) => opportunity.id === selectedId) ?? opportunities[0]
  const decision = decisions[selected.id]

  const runScan = () => {
    setScanning(true)
    window.setTimeout(() => {
      setScanning(false)
      onSuccess('Monitoreo actualizado · no hay cambios desde las 08:42')
    }, 900)
  }

  const approve = () => {
    setDecisions((current) => ({ ...current, [selected.id]: 'approved' }))
    onSuccess('Oportunidad aprobada · iniciando extracción y matching RAG')
  }

  const discard = () => {
    setDecisions((current) => ({ ...current, [selected.id]: 'discarded' }))
    onSuccess('Oportunidad descartada y archivada para aprendizaje')
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <section className="relative overflow-hidden rounded-2xl bg-midnight p-5 text-white shadow-soft sm:p-6">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-sky-400/[0.06]" />
        <div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-300/15"><Radar className={`h-6 w-6 ${scanning ? 'animate-spin' : ''}`} /><span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-midnight" /></span>
            <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-base font-bold">Monitor operativo</h2><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">Activo 24/7</span></div><p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-400">El agente consulta CompraMX, detecta publicaciones nuevas, descarga sus anexos y las prioriza según el catálogo de Oltech.</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2"><p className="text-[9px] uppercase tracking-wider text-slate-500">Última consulta</p><p className="mt-0.5 text-[11px] font-bold text-slate-200">Hoy, 08:42</p></div>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2"><p className="text-[9px] uppercase tracking-wider text-slate-500">Próxima ejecución</p><p className="mt-0.5 text-[11px] font-bold text-slate-200">09:00 · 18 min</p></div>
            <button type="button" onClick={runScan} disabled={scanning} className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-[11px] font-bold text-midnight transition hover:bg-slate-100 disabled:opacity-70"><RefreshCw className={`h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />{scanning ? 'Consultando…' : 'Actualizar ahora'}</button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['12', 'Publicaciones hoy', Globe2, 'text-sky-600 bg-sky-50'],
          ['5', 'Relevantes para Oltech', Target, 'text-violet-600 bg-violet-50'],
          ['3', 'Esperan decisión', UserCheck, 'text-amber-600 bg-amber-50'],
          ['37', 'Archivos descargados', Download, 'text-emerald-600 bg-emerald-50'],
        ].map(([value, label, Icon, tone]) => {
          const MetricIcon = Icon as LucideIcon
          return <article key={label as string} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}><MetricIcon className="h-[18px] w-[18px]" /></span><div><p className="text-xl font-bold tracking-tight text-ink">{value as string}</p><p className="text-[9px] font-medium text-slate-500 sm:text-[10px]">{label as string}</p></div></article>
        })}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white px-4 py-5 shadow-card sm:px-6">
        <div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-ink">Flujo de oportunidad</h2><p className="mt-0.5 text-[10px] text-slate-400">Automatización con control humano antes de iniciar una licitación</p></div><span className="hidden rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-700 sm:block">Human-in-the-loop</span></div>
        <div className="mt-6 grid grid-cols-5 gap-1 sm:gap-3">
          {[
            [Globe2, 'Monitoreo', 'CompraMX', 'bg-sky-50 text-sky-700'],
            [Download, 'Descarga', 'Bases y anexos', 'bg-sky-50 text-sky-700'],
            [BrainCircuit, 'Calificación IA', 'Relevancia', 'bg-violet-50 text-violet-700'],
            [UserCheck, 'Decisión humana', 'Iniciar / descartar', 'bg-amber-50 text-amber-700'],
            [Database, 'Matching RAG', 'Histórico Oltech', 'bg-brand-50 text-brand-700'],
          ].map(([Icon, title, caption, tone], index) => {
            const StageIcon = Icon as LucideIcon
            return <div key={title as string} className="relative text-center"><span className={`relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-xl ring-4 ring-white sm:h-11 sm:w-11 ${tone}`}><StageIcon className="h-[18px] w-[18px]" /></span>{index < 4 && <span className="absolute left-[62%] right-[-38%] top-5 h-px bg-slate-200 sm:top-[22px]" />}<p className="mt-2 text-[9px] font-bold text-slate-700 sm:text-[10px]">{title as string}</p><p className="mt-0.5 hidden text-[8px] text-slate-400 sm:block">{caption as string}</p></div>
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"><div><h2 className="text-sm font-bold text-ink">Oportunidades detectadas</h2><p className="mt-0.5 text-[10px] text-slate-400">Ordenadas por compatibilidad con el portafolio</p></div><span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[9px] font-bold text-slate-500">Últimas 24 horas</span></div>
          <div>
            {opportunities.map((opportunity) => {
              const currentDecision = decisions[opportunity.id]
              const active = opportunity.id === selectedId
              return (
                <button type="button" key={opportunity.id} onClick={() => setSelectedId(opportunity.id)} className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-4 text-left transition last:border-0 sm:gap-4 sm:px-6 ${active ? 'bg-sky-50/70' : 'hover:bg-slate-50/70'}`}>
                  <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[11px] font-black ${opportunity.score >= 90 ? 'bg-emerald-100 text-emerald-700' : opportunity.score >= 85 ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>{opportunity.score}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2"><span className="text-[9px] font-bold uppercase tracking-wider text-sky-700">{opportunity.institution}</span>{currentDecision === 'approved' && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-bold text-emerald-700">RAG iniciado</span>}{currentDecision === 'discarded' && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[8px] font-bold text-slate-500">Descartada</span>}</span>
                    <span className="mt-1 block text-xs font-semibold leading-snug text-slate-800">{opportunity.title}</span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-slate-400"><span>{opportunity.published}</span><span>{opportunity.documents} archivos descargados</span><span>{opportunity.amount} estimados</span></span>
                  </span>
                  <ChevronRight className={`mt-3 h-4 w-4 shrink-0 ${active ? 'text-sky-600' : 'text-slate-300'}`} />
                </button>
              )
            })}
          </div>
        </article>

        <aside className="rounded-2xl border border-slate-200/80 bg-white shadow-card xl:sticky xl:top-[92px] xl:self-start">
          <div className="border-b border-slate-100 p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-wider text-sky-700">Revisión humana</p><h2 className="mt-1 text-sm font-bold text-ink">Decisión de oportunidad</h2></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">{selected.score}%</span></div><p className="mt-3 text-xs font-semibold leading-relaxed text-slate-700">{selected.title}</p><p className="mt-1.5 text-[9px] text-slate-400">{selected.id}</p></div>
          <div className="space-y-4 p-5">
            <div className="rounded-xl bg-violet-50 p-3.5"><div className="flex items-center gap-2 text-[10px] font-bold text-violet-800"><BrainCircuit className="h-4 w-4" /> Por qué es relevante</div><p className="mt-2 text-[10px] leading-relaxed text-violet-800/75">{selected.reason}</p></div>
            <div className="grid grid-cols-3 gap-2">{[[selected.lots, 'Partidas'], [selected.documents, 'Archivos'], [selected.amount, 'Monto']].map(([value, label]) => <div key={label as string} className="rounded-xl bg-slate-50 p-2.5 text-center"><p className="text-xs font-bold text-ink">{value as string | number}</p><p className="mt-0.5 text-[8px] text-slate-400">{label as string}</p></div>)}</div>
            <div><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Documentación capturada</p><div className="mt-2 space-y-2">{[['Bases de convocatoria.pdf', '4.8 MB'], ['Anexo técnico.xlsx', '1.2 MB'], ['Modelo de contrato.pdf', '860 KB']].map(([name, size]) => <div key={name} className="flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2"><FileText className="h-3.5 w-3.5 text-rose-500" /><span className="min-w-0 flex-1 truncate text-[9px] font-medium text-slate-600">{name}</span><span className="text-[8px] text-slate-400">{size}</span></div>)}</div></div>
            {!decision && <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={discard} className="rounded-xl border border-slate-200 px-3 py-2.5 text-[10px] font-bold text-slate-500 hover:bg-slate-50">Descartar</button><button type="button" onClick={approve} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-3 py-2.5 text-[10px] font-bold text-white hover:bg-slate-800"><Sparkles className="h-3.5 w-3.5" />Iniciar licitación</button></div>}
            {decision === 'approved' && <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3.5"><div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800"><CheckCircle2 className="h-4 w-4" /> Expediente iniciado</div><p className="mt-1.5 text-[9px] leading-relaxed text-emerald-700">Atlas extrae partidas y consulta la base vectorial para recuperar precedentes.</p><button type="button" onClick={() => navigate('licitaciones')} className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800">Abrir licitación <ArrowRight className="h-3 w-3" /></button></div>}
            {decision === 'discarded' && <div className="rounded-xl bg-slate-100 p-3.5"><p className="text-[10px] font-bold text-slate-600">Oportunidad descartada</p><p className="mt-1 text-[9px] text-slate-500">La decisión se conserva como señal para futuras recomendaciones.</p><button type="button" onClick={() => setDecisions((current) => { const next = { ...current }; delete next[selected.id]; return next })} className="mt-2 text-[9px] font-bold text-slate-700">Deshacer decisión</button></div>}
            <button type="button" onClick={() => onSuccess('En producción, este acceso abrirá la publicación original de CompraMX')} className="flex w-full items-center justify-center gap-1.5 text-[9px] font-semibold text-slate-400 hover:text-sky-700">Ver publicación original <ExternalLink className="h-3 w-3" /></button>
          </div>
        </aside>
      </section>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101b31] to-[#0b1220] p-5 text-white shadow-soft sm:p-6">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-violet-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-violet-300"><Database className="h-3 w-3" /> Búsqueda vectorial RAG</span><h2 className="mt-3 text-lg font-bold tracking-tight">El conocimiento previo aparece en segundos</h2><p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-400">Al aprobar la oportunidad, Atlas relaciona cada partida con productos, evidencias y propuestas trabajadas anteriormente. El equipo valida la respuesta antes de usarla.</p></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[['14', 'Partidas similares'], ['28', 'Evidencias útiles'], ['3', 'Productos sugeridos'], ['94%', 'Mejor coincidencia']].map(([value, label]) => <div key={label} className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-3.5"><p className="text-lg font-bold text-white">{value}</p><p className="mt-1 text-[9px] leading-tight text-slate-400">{label}</p></div>)}</div>
        </div>
      </section>
    </div>
  )
}
