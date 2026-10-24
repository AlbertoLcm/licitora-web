import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Download,
  FileBadge,
  FileCheck2,
  FileSearch,
  Globe2,
  MoreHorizontal,
  PackageSearch,
  Radar,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UploadCloud,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { tenders } from '../app/data'
import type { ViewId } from '../app/types'
import { MetricCard, ProgressRing, StatusBadge } from '../components/ui'

export function DashboardPage({ onNewTender, onSearch, navigate }: { onNewTender: () => void; onSearch: (query?: string) => void; navigate: (view: ViewId) => void }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Licitaciones activas" value="8" helper="2 cierran esta semana" icon={FileCheck2} tone="bg-sky-50 text-sky-600" trend="+2" />
        <MetricCard label="Partidas analizadas" value="1,248" helper="en los últimos 30 días" icon={PackageSearch} tone="bg-violet-50 text-violet-600" trend="+18%" />
        <MetricCard label="Cobertura documental" value="92%" helper="134 documentos vinculados" icon={ShieldCheck} tone="bg-emerald-50 text-emerald-600" trend="+4%" />
        <MetricCard label="Tiempo recuperado" value="146 h" helper="estimado este mes" icon={TimerReset} tone="bg-amber-50 text-amber-600" trend="+23%" />
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-brand-50 p-5 shadow-card sm:p-6">
        <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border-[30px] border-brand-200/20" />
        <div className="relative grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="flex items-start gap-4">
            <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-700/15">
              <Radar className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand-400 ring-4 ring-white" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold tracking-tight text-ink">Radar CompraMX</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Monitoreando</span>
              </div>
              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-500">Atlas encontró <strong className="font-bold text-slate-800">5 oportunidades relevantes</strong> hoy y descargó sus bases para evaluación. Tres esperan una decisión de tu equipo.</p>
              <button type="button" onClick={() => navigate('monitor')} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[11px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">Revisar oportunidades <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1.5 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-sm backdrop-blur sm:gap-2">
            {[
              [Globe2, 'Detectar', 'CompraMX'],
              [Download, 'Descargar', 'Bases'],
              [BrainCircuit, 'Calificar', 'IA'],
              [UserCheck, 'Decidir', 'Humano'],
              [Database, 'Conectar', 'RAG'],
            ].map(([Icon, title, caption], index) => {
              const FlowIcon = Icon as LucideIcon
              return <div key={title as string} className="relative min-w-0 text-center"><span className={`relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-xl ${index === 3 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-slate-100 text-slate-600'}`}><FlowIcon className="h-4 w-4" /></span>{index < 4 && <span className="absolute left-[68%] right-[-32%] top-[18px] h-px bg-slate-200" />}<p className="mt-2 truncate text-[9px] font-bold text-slate-700">{title as string}</p><p className="mt-0.5 hidden text-[8px] text-slate-400 sm:block">{caption as string}</p></div>
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card xl:col-span-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">Prioridad de hoy</p>
              </div>
              <h2 className="mt-1 text-base font-bold tracking-tight text-ink">IMSS · Material de osteosíntesis</h2>
            </div>
            <button type="button" onClick={() => navigate('licitaciones')} className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-brand-700 hover:text-brand-800 sm:self-auto">
              Abrir expediente <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="grid gap-7 p-5 sm:p-6 lg:grid-cols-[128px_1fr]">
            <ProgressRing value={68} />
            <div className="min-w-0">
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['126', 'Partidas', 'text-ink'],
                  ['86', 'Completas', 'text-emerald-600'],
                  ['40', 'Pendientes', 'text-amber-600'],
                ].map(([value, label, color]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-3">
                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ['Extracción de partidas', 100, '126 de 126'],
                  ['Matching de productos', 78, '98 de 126'],
                  ['Evidencia documental', 61, '77 de 126'],
                ].map(([label, progress, count]) => (
                  <div key={label as string}>
                    <div className="mb-1.5 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">{label as string}</span>
                      <span className="text-slate-400">{count as string}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-amber-500" /> Cierre: martes 18 de agosto, 10:00</span>
            <span className="flex items-center gap-2"><span className="flex -space-x-1.5"><i className="grid h-6 w-6 place-items-center rounded-full bg-indigo-100 text-[8px] font-bold text-indigo-700 ring-2 ring-white not-italic">AL</i><i className="grid h-6 w-6 place-items-center rounded-full bg-rose-100 text-[8px] font-bold text-rose-700 ring-2 ring-white not-italic">MC</i><i className="grid h-6 w-6 place-items-center rounded-full bg-sky-100 text-[8px] font-bold text-sky-700 ring-2 ring-white not-italic">JR</i></span> 3 responsables</span>
          </div>
        </article>

        <article className="relative overflow-hidden rounded-2xl bg-midnight p-5 text-white shadow-soft sm:p-6 xl:col-span-4">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-400/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-sky-500/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400/15 text-brand-300 ring-1 ring-brand-300/10"><Bot className="h-5 w-5" /></span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-300"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" /> En línea</span>
            </div>
            <h2 className="mt-5 text-lg font-bold tracking-tight">Pregúntale a Atlas</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Busca en 2,845 productos y más de 560 documentos técnicos.</p>
            <button type="button" onClick={() => onSearch()} className="mt-5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-3 text-left text-xs text-slate-400 transition hover:border-brand-400/30 hover:bg-white/[0.09] hover:text-slate-200">
              <Sparkles className="h-4 w-4 text-brand-300" /> ¿Qué necesitas encontrar?
            </button>
            <div className="mt-4 space-y-2">
              {[
                'Tornillo de titanio con FDA',
                '¿Qué certificados faltan?',
                'Partidas similares de 2025',
              ].map((prompt) => (
                <button type="button" key={prompt} onClick={() => onSearch(prompt)} className="flex w-full items-center justify-between rounded-lg px-1 py-1.5 text-left text-[11px] text-slate-400 transition hover:text-white">
                  <span>{prompt}</span><ChevronRight className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card xl:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-bold text-ink">Licitaciones recientes</h2>
              <p className="mt-0.5 text-[11px] text-slate-400">Seguimiento de los procesos activos</p>
            </div>
            <button type="button" onClick={() => navigate('licitaciones')} className="text-[11px] font-bold text-brand-700 hover:text-brand-800">Ver todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-6 py-3">Licitación</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Avance</th>
                  <th className="px-4 py-3">Cierre</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {tenders.slice(0, 3).map((tender) => (
                  <tr key={tender.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="px-6 py-3.5">
                      <p className="max-w-[270px] truncate text-xs font-semibold text-slate-800">{tender.title}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{tender.institution} · {tender.lots} partidas</p>
                    </td>
                    <td className="px-4 py-3.5"><StatusBadge status={tender.status} /></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${tender.progress}%` }} /></div>
                        <span className="text-[10px] font-semibold text-slate-500">{tender.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-slate-500">{tender.due}</td>
                    <td className="px-4 py-3.5"><button type="button" onClick={() => navigate('licitaciones')} className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-sm"><MoreHorizontal className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6 xl:col-span-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-ink">Requiere atención</h2>
              <p className="mt-0.5 text-[11px] text-slate-400">Alertas documentales</p>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600"><AlertTriangle className="h-4 w-4" /></span>
          </div>
          <div className="mt-5 space-y-4">
            {[
              { title: 'ISO 13485 por vencer', meta: 'Smith+Nephew · 15 días', tone: 'bg-amber-500' },
              { title: 'Registro sanitario incompleto', meta: 'Stryker · 3 productos', tone: 'bg-rose-500' },
              { title: 'Traducción pendiente', meta: 'Catálogo Spine 2026 · 48 págs.', tone: 'bg-sky-500' },
            ].map((alert) => (
              <button type="button" key={alert.title} onClick={() => navigate('documentos')} className="group flex w-full items-start gap-3 text-left">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${alert.tone}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-slate-700 group-hover:text-brand-700">{alert.title}</span>
                  <span className="mt-0.5 block text-[10px] text-slate-400">{alert.meta}</span>
                </span>
                <ChevronRight className="mt-1 h-3.5 w-3.5 text-slate-300 group-hover:text-brand-500" />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => navigate('documentos')} className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-[11px] font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">Revisar alertas</button>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-bold text-ink">Base de conocimiento</h2><p className="mt-0.5 text-[11px] text-slate-400">Contenido disponible para matching</p></div>
            <BookOpen className="h-4 w-4 text-brand-600" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ['2,845', 'Productos'], ['568', 'Documentos'], ['24', 'Marcas'], ['12.4k', 'Partidas históricas'],
            ].map(([value, label]) => <div key={label} className="rounded-xl bg-slate-50 p-3.5"><p className="text-lg font-bold tracking-tight text-ink">{value}</p><p className="mt-0.5 text-[10px] text-slate-500">{label}</p></div>)}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between">
            <div><h2 className="text-sm font-bold text-ink">Flujo automatizado</h2><p className="mt-0.5 text-[11px] text-slate-400">De las bases al expediente listo para enviar</p></div>
            <button type="button" onClick={onNewTender} className="hidden text-[11px] font-bold text-brand-700 sm:block">Procesar archivo</button>
          </div>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {[
              [UploadCloud, 'Carga', 'PDF'], [FileSearch, 'Lectura', 'OCR'], [PackageSearch, 'Matching', 'IA'], [FileBadge, 'Evidencia', 'RAG'], [CheckCircle2, 'Validación', 'Listo'],
            ].map(([Icon, title, caption], index) => {
              const StepIcon = Icon as LucideIcon
              return <div key={title as string} className="relative text-center"><div className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-4 ring-white"><StepIcon className="h-[17px] w-[17px]" /></div>{index < 4 && <div className="absolute left-[60%] right-[-40%] top-5 h-px bg-slate-200" />}<p className="mt-2 text-[10px] font-bold text-slate-700">{title as string}</p><p className="mt-0.5 text-[9px] text-slate-400">{caption as string}</p></div>
            })}
          </div>
        </article>
      </section>
    </div>
  )
}
