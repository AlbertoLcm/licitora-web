import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Bot,
  Boxes,
  FileText,
  History,
  Search,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react'
import { documents, products } from '../app/data'

export function SearchDialog({ open, onClose, initialQuery }: { open: boolean; onClose: () => void; initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery, open])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const normalized = query.toLowerCase()
    const candidates = [
      ...products.map((item) => ({ icon: Boxes, type: 'Producto', title: item.name, meta: `${item.brand} · ${item.code}`, match: `${item.match}% match` })),
      ...documents.map((item) => ({ icon: FileText, type: 'Documento', title: item.name, meta: `${item.brand} · ${item.type}`, match: item.status })),
      { icon: History, type: 'Partida histórica', title: 'Tornillo cortical de titanio de 3.5 mm', meta: 'Cotizada en 2022, 2023, 2025 y 2026', match: '12 coincidencias' },
    ]
    const filtered = candidates.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(normalized))
    return (filtered.length ? filtered : candidates).slice(0, 5)
  }, [query])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/50 px-4 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-slate-950/25 animate-scale-in">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5">
          <Sparkles className="h-5 w-5 shrink-0 text-brand-600" />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca por producto, requisito, marca o documento…" className="h-8 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-slate-400" />
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-2 py-1 text-[9px] font-bold text-slate-400">ESC</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Búsquedas sugeridas</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{['Tornillo de titanio con FDA', 'Certificados que vencen este mes', 'Placa de radio distal estéril', 'Partidas ganadas en 2025'].map((item) => <button type="button" key={item} onClick={() => setQuery(item)} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-left text-[11px] font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-800"><Search className="h-3.5 w-3.5 text-slate-400" />{item}</button>)}</div></div>
          ) : (
            <div><div className="flex items-center justify-between px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Resultados de Atlas</p><span className="text-[10px] text-slate-400">{results.length} coincidencias principales</span></div>{results.map((result) => { const ResultIcon = result.icon; return <button type="button" key={`${result.type}-${result.title}`} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-slate-50"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><ResultIcon className="h-[18px] w-[18px]" /></span><span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-wider text-brand-700">{result.type}</span><span className="mt-0.5 block truncate text-xs font-semibold text-slate-800">{result.title}</span><span className="mt-0.5 block truncate text-[10px] text-slate-400">{result.meta}</span></span><span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-700 sm:block">{result.match}</span><ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500" /></button> })}</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-2.5 text-[9px] text-slate-400"><span className="flex items-center gap-1.5"><Bot className="h-3 w-3 text-brand-600" /> Respuestas generadas desde tu base de conocimiento</span><span className="hidden sm:block">↑↓ Navegar · ↵ Abrir</span></div>
      </div>
    </div>
  )
}

export function NewTenderDialog({ open, onClose, onSuccess, documentMode = false }: { open: boolean; onClose: () => void; onSuccess: (message: string) => void; documentMode?: boolean }) {
  const [name, setName] = useState('')
  if (!open) return null

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onClose()
    onSuccess(documentMode ? 'Documento cargado para indexación' : 'Licitación creada y lista para procesar')
    setName('')
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl animate-scale-in sm:p-6">
        <div className="flex items-start justify-between"><div><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><UploadCloud className="h-5 w-5" /></span><h2 className="mt-4 text-lg font-bold tracking-tight text-ink">{documentMode ? 'Cargar documento' : 'Nueva licitación'}</h2><p className="mt-1 text-xs text-slate-500">{documentMode ? 'Atlas clasificará e indexará el contenido automáticamente.' : 'Carga las bases y deja que Atlas extraiga las partidas.'}</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button></div>
        <label className="mt-5 block"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{documentMode ? 'Nombre del documento' : 'Nombre del proceso'}</span><input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10" placeholder={documentMode ? 'Ej. Certificado ISO 13485' : 'Ej. Material de curación IMSS 2026'} /></label>
        <button type="button" className="mt-4 flex w-full flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-7 text-center transition hover:border-brand-400 hover:bg-brand-50/50"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-sm"><UploadCloud className="h-5 w-5" /></span><span className="mt-3 text-xs font-bold text-slate-700">Arrastra tus archivos aquí</span><span className="mt-1 text-[10px] text-slate-400">PDF, DOCX o XLSX · máximo 100 MB</span></button>
        <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50">Cancelar</button><button type="submit" className="rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800">{documentMode ? 'Cargar e indexar' : 'Crear proceso'}</button></div>
      </form>
    </div>
  )
}
