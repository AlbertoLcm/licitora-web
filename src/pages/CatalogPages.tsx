import {
  Archive,
  CalendarDays,
  ChevronRight,
  FileText,
  Gauge,
  Plus,
  Search,
  Target,
  TrendingUp,
  UploadCloud,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'
import { brands, documents, products, tenders } from '../app/data'
import { PageShell, StatusBadge } from '../components/ui'

export function LicitacionesPage({ onNewTender }: { onNewTender: () => void }) {
  return (
    <PageShell title="Portafolio de procesos" description="4 procesos activos · 300 partidas en preparación" action={<button type="button" onClick={onNewTender} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800"><Plus className="h-4 w-4" />Nueva licitación</button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tenders.map((tender) => (
          <article key={tender.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-xs font-black text-slate-700">{tender.institution.slice(0, 2)}</span><StatusBadge status={tender.status} /></div>
            <p className="mt-5 line-clamp-2 min-h-10 text-sm font-bold leading-snug text-ink">{tender.title}</p>
            <p className="mt-2 truncate text-[10px] text-slate-400">{tender.id}</p>
            <div className="mt-5 flex items-center justify-between text-[10px]"><span className="text-slate-500">{tender.lots} partidas</span><span className="font-bold text-slate-700">{tender.progress}%</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${tender.progress}%` }} /></div>
            <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[10px] text-slate-500"><CalendarDays className="h-3.5 w-3.5 text-slate-400" /> {tender.due}</div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}

export function ProductsPage({ onSearch }: { onSearch: () => void }) {
  return (
    <PageShell title="Productos indexados" description="2,845 referencias listas para matching" action={<button type="button" onClick={onSearch} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"><Search className="h-4 w-4" />Búsqueda inteligente</button>}>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead><tr className="border-b border-slate-100 bg-slate-50/70 text-[9px] font-bold uppercase tracking-wider text-slate-400"><th className="px-6 py-3.5">Producto</th><th className="px-4 py-3.5">Marca</th><th className="px-4 py-3.5">Familia</th><th className="px-4 py-3.5">Documentos</th><th className="px-4 py-3.5">Match promedio</th></tr></thead>
            <tbody>{products.map((product) => <tr key={product.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"><td className="px-6 py-4"><p className="text-xs font-semibold text-slate-800">{product.name}</p><p className="mt-1 text-[10px] font-medium text-slate-400">{product.code}</p></td><td className="px-4 py-4 text-[11px] text-slate-600">{product.brand}</td><td className="px-4 py-4"><span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">{product.family}</span></td><td className="px-4 py-4 text-[11px] font-semibold text-slate-600">{product.docs}</td><td className="px-4 py-4"><span className="font-mono text-[11px] font-bold text-emerald-600">{product.match}%</span></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}

export function DocumentsPage({ onUpload }: { onUpload: () => void }) {
  return (
    <PageShell title="Documentos recientes" description="568 archivos · 92% con metadatos completos" action={<button type="button" onClick={onUpload} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"><UploadCloud className="h-4 w-4" />Subir documento</button>}>
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
          {documents.map((doc) => (
            <button type="button" key={doc.name} className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left last:border-0 hover:bg-slate-50">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600"><FileText className="h-[18px] w-[18px]" /></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">{doc.name}</span><span className="mt-1 block text-[10px] text-slate-400">{doc.type} · {doc.brand}</span></span>
              <span className="hidden text-[10px] text-slate-400 sm:block">{doc.updated}</span>
              <span className={`hidden rounded-full px-2.5 py-1 text-[9px] font-bold md:block ${doc.status === 'Vigente' ? 'bg-emerald-50 text-emerald-700' : doc.status === 'Por vencer' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'}`}>{doc.status}</span>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Por tipo</p><div className="mt-4 space-y-3">{[['Fichas técnicas', 184, 'bg-brand-500'], ['Catálogos', 126, 'bg-sky-500'], ['Certificados', 148, 'bg-violet-500'], ['Traducciones', 110, 'bg-amber-500']].map(([label, count, tone]) => <div key={label as string} className="flex items-center gap-2.5 text-[11px]"><span className={`h-2 w-2 rounded-full ${tone}`} /><span className="flex-1 text-slate-600">{label as string}</span><span className="font-bold text-slate-700">{count as number}</span></div>)}</div></div>
          <div className="rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100"><WandSparkles className="h-5 w-5 text-brand-700" /><p className="mt-3 text-xs font-bold text-brand-900">Indexación automática</p><p className="mt-1.5 text-[10px] leading-relaxed text-brand-800/70">Atlas extrae contenido, fechas y registros al cargar un archivo.</p></div>
        </div>
      </div>
    </PageShell>
  )
}

export function BrandsPage() {
  return (
    <PageShell title="Fabricantes conectados" description="24 marcas · 91% de cobertura documental promedio">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {brands.map((brand) => <article key={brand.name} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card"><div className="flex items-center gap-3"><span className={`grid h-11 w-11 place-items-center rounded-xl text-xs font-black ${brand.tone}`}>{brand.initials}</span><div><h3 className="text-sm font-bold text-ink">{brand.name}</h3><p className="text-[10px] text-slate-400">Fabricante activo</p></div></div><div className="mt-5 grid grid-cols-2 gap-2"><div className="rounded-xl bg-slate-50 p-3"><p className="text-base font-bold text-ink">{brand.products}</p><p className="text-[9px] text-slate-400">Productos</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-base font-bold text-ink">{brand.docs}</p><p className="text-[9px] text-slate-400">Documentos</p></div></div><div className="mt-4 flex items-center justify-between text-[10px]"><span className="text-slate-500">Cobertura</span><span className="font-bold text-emerald-600">{brand.coverage}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${brand.coverage}%` }} /></div></article>)}
      </div>
    </PageShell>
  )
}

export function HistoryPage() {
  return (
    <PageShell title="Conocimiento acumulado" description="12,480 partidas analizadas desde 2019">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-ink">Resultados por año</h3><p className="mt-1 text-[10px] text-slate-400">Participaciones y adjudicaciones</p></div><span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500">2019–2026</span></div><div className="mt-8 flex h-52 items-end justify-between gap-2 border-b border-slate-100 px-2">{[{ y: '19', a: 42, b: 25 }, { y: '20', a: 55, b: 32 }, { y: '21', a: 48, b: 30 }, { y: '22', a: 66, b: 41 }, { y: '23', a: 72, b: 48 }, { y: '24', a: 81, b: 55 }, { y: '25', a: 92, b: 64 }, { y: '26', a: 68, b: 47 }].map((bar) => <div key={bar.y} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="flex h-[170px] w-full max-w-10 items-end justify-center gap-1"><div className="w-2.5 rounded-t bg-slate-200" style={{ height: `${bar.a}%` }} /><div className="w-2.5 rounded-t bg-brand-500" style={{ height: `${bar.b}%` }} /></div><span className="text-[9px] text-slate-400">'{bar.y}</span></div>)}</div><div className="mt-4 flex justify-center gap-5 text-[10px] text-slate-500"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-slate-200" />Participamos</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-brand-500" />Adjudicadas</span></div></div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6"><h3 className="text-sm font-bold text-ink">Indicadores históricos</h3><div className="mt-5 space-y-3">{[['Tasa de adjudicación', '64%', Target, 'text-emerald-600 bg-emerald-50'], ['Partidas reutilizadas', '78%', Archive, 'text-violet-600 bg-violet-50'], ['Valor adjudicado', '$184M', TrendingUp, 'text-sky-600 bg-sky-50'], ['Precio promedio optimizado', '+12%', Gauge, 'text-amber-600 bg-amber-50']].map(([label, value, Icon, tone]) => { const StatIcon = Icon as LucideIcon; return <div key={label as string} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className={`grid h-9 w-9 place-items-center rounded-lg ${tone}`}><StatIcon className="h-4 w-4" /></span><span className="flex-1 text-[11px] font-medium text-slate-600">{label as string}</span><span className="text-sm font-bold text-ink">{value as string}</span></div> })}</div></div>
      </div>
    </PageShell>
  )
}

export function TeamPage() {
  return (
    <PageShell title="Equipo de licitaciones" description="6 colaboradores activos · 42 tareas esta semana" action={<button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" />Invitar persona</button>}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[
        ['Alberto López', 'Administrador', 'AL', 'bg-indigo-100 text-indigo-700', 14], ['Mariana Cruz', 'Líder de licitaciones', 'MC', 'bg-rose-100 text-rose-700', 11], ['Jorge Ramírez', 'Especialista técnico', 'JR', 'bg-sky-100 text-sky-700', 8], ['Daniela Pérez', 'Documentación', 'DP', 'bg-amber-100 text-amber-700', 5], ['Luis Torres', 'Asuntos regulatorios', 'LT', 'bg-emerald-100 text-emerald-700', 3], ['Sofía Vega', 'Revisión legal', 'SV', 'bg-violet-100 text-violet-700', 1],
      ].map(([name, role, initials, tone, tasks]) => <article key={name as string} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xs font-black ${tone}`}>{initials as string}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-ink">{name as string}</p><p className="mt-0.5 text-[10px] text-slate-400">{role as string}</p><p className="mt-2 text-[10px] font-semibold text-brand-700">{tasks as number} tareas activas</p></div><span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" /></article>)}</div>
    </PageShell>
  )
}
