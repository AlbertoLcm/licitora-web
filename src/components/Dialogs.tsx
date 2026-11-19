import { useEffect, useState, type FormEvent } from "react";
import {
  Bot,
  CheckCircle2,
  ChevronDown,
  FileText,
  FileWarning,
  Filter,
  LoaderCircle,
  Search,
  SendHorizontal,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

type ChatSource = {
  id: string;
  kind: "document" | "product" | "tender_item";
  title: string;
  brand: string;
  type: string;
  page: string | null;
  fragment: string;
  url: string | null;
};
type ChatTurn = {
  id: number;
  query: string;
  answer?: string | null;
  sources?: ChatSource[];
  error?: string;
};
type ChatFilters = {
  brands: string[];
  types: string[];
  indexedDocuments: number;
};

const suggestedQuestions = [
  "¿Qué opciones de tornillo de titanio cumplen con FDA?",
  "Muéstrame la ficha técnica de la placa de radio distal",
  "¿Qué certificados están por vencer?",
  "Busca partidas similares de trauma adjudicadas en 2025",
];
const defaultFilters: ChatFilters = {
  brands: [],
  types: [],
  indexedDocuments: 0,
};

export function SearchDialog({
  open,
  onClose,
  initialQuery,
}: {
  open: boolean;
  onClose: () => void;
  initialQuery: string;
}) {
  const [query, setQuery] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [filters, setFilters] = useState<ChatFilters>(defaultFilters);

  const ask = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) return;
    const id = Date.now();
    setTurns((current) => [...current, { id, query: trimmedQuestion }]);
    setQuery("");
    setLoading(true);
    try {
      const response = await fetch("/api/rag/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmedQuestion,
          brand: brandFilter || null,
          type: typeFilter || null,
        }),
      });
      const payload = (await response.json()) as {
        answer?: string | null;
        sources?: ChatSource[];
        error?: string;
      };
      if (!response.ok)
        throw new Error(payload.error || "No fue posible consultar Licitora.");
      setTurns((current) =>
        current.map((turn) =>
          turn.id === id
            ? {
                ...turn,
                answer: payload.answer ?? null,
                sources: payload.sources ?? [],
              }
            : turn,
        ),
      );
    } catch (error) {
      setTurns((current) =>
        current.map((turn) =>
          turn.id === id
            ? {
                ...turn,
                error:
                  error instanceof Error
                    ? error.message
                    : "No fue posible consultar Licitora.",
              }
            : turn,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setTurns([]);
    setLoading(false);
    void fetch("/api/rag/filters")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<ChatFilters>;
      })
      .then(setFilters)
      .catch(() => setFilters(defaultFilters));
    if (initialQuery.trim()) void ask(initialQuery);
    // Fresh conversation when the dialog opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialQuery]);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const previous = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = previous.overflow;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const activeFilterCount =
    Number(Boolean(brandFilter)) + Number(Boolean(typeFilter));
  const clearFilters = () => {
    setBrandFilter("");
    setTypeFilter("");
  };
  const submitQuestion = (event: FormEvent) => {
    event.preventDefault();
    void ask(query);
  };
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        aria-label="Consulta documental con Licitora"
        className="flex h-[min(780px,calc(100vh-1.5rem))] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/40 bg-white shadow-2xl shadow-slate-950/25 animate-scale-in sm:h-[min(780px,calc(100vh-3rem))]"
      >
        <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-6">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-midnight text-brand-300 shadow-lg shadow-slate-950/10">
            <Bot className="h-5 w-5" />
            <i className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 not-italic" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-ink">Licitora</h2>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-700">
                RAG en vivo
              </span>
            </div>
            <p className="mt-0.5 truncate text-[10px] text-slate-400">
              Evidencia real de documentos, productos y partidas históricas
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar consulta"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-[10px] font-bold transition ${filtersOpen || activeFilterCount ? "border-brand-200 bg-brand-50 text-brand-800" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
            >
              <Filter className="h-3.5 w-3.5" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[9px] text-white">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={`h-3.5 w-3.5 transition ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>
            {!filtersOpen && activeFilterCount > 0 && (
              <>
                <span className="rounded-md bg-white px-2 py-1 text-[10px] text-slate-500 shadow-sm ring-1 ring-slate-200">
                  {brandFilter || typeFilter}
                </span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[10px] font-bold text-brand-700 hover:text-brand-800"
                >
                  Limpiar
                </button>
              </>
            )}
            <span className="ml-auto hidden items-center gap-1.5 text-[10px] text-slate-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {filters.indexedDocuments || "…"} documentos indexados
            </span>
          </div>
          {filtersOpen && (
            <div className="mt-2.5 grid gap-2 border-t border-slate-200/80 pt-2.5 sm:grid-cols-2">
              <label className="text-[10px] font-semibold text-slate-500">
                Marca
                <select
                  value={brandFilter}
                  onChange={(event) => setBrandFilter(event.target.value)}
                  className="mt-1 block h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                >
                  <option value="">Todas las marcas</option>
                  {filters.brands.map((brand) => (
                    <option key={brand}>{brand}</option>
                  ))}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-500">
                Tipo de evidencia
                <select
                  value={typeFilter}
                  onChange={(event) => setTypeFilter(event.target.value)}
                  className="mt-1 block h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                >
                  <option value="">Todos los tipos</option>
                  {filters.types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#fbfdff_0%,#ffffff_30%)] px-4 py-5 sm:px-6">
          {turns.length === 0 && !loading ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center py-8 text-center sm:py-14">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-8 ring-brand-50/50">
                <Sparkles className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                Consulta tu conocimiento técnico
              </h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                Licitora busca en documentos, productos y partidas históricas, y
                muestra los fragmentos que respaldan cada respuesta.
              </p>
              <div className="mt-6 grid w-full gap-2 text-left sm:grid-cols-2">
                {suggestedQuestions.map((question) => (
                  <button
                    type="button"
                    key={question}
                    onClick={() => void ask(question)}
                    className="group rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-brand-200 hover:bg-brand-50/40"
                  >
                    <span className="flex items-start gap-2">
                      <Search className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                      <span className="text-[11px] font-semibold leading-relaxed text-slate-600 group-hover:text-brand-900">
                        {question}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-6">
              {turns.map((turn) => (
                <div key={turn.id} className="space-y-4 animate-fade-in">
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-midnight px-4 py-3 text-xs leading-relaxed text-white shadow-sm">
                    {turn.query}
                  </div>
                  {turn.error ? (
                    <Notice
                      title="No fue posible consultar Licitora"
                      detail={turn.error}
                    />
                  ) : turn.sources === undefined ? null : turn.sources
                      .length === 0 || !turn.answer ? (
                    <Notice
                      title="No encontré evidencia indexada para esta consulta."
                      detail="Prueba con otro término, ajusta los filtros o consulta por producto, marca, certificado o partida."
                      clear={activeFilterCount > 0 ? clearFilters : undefined}
                    />
                  ) : (
                    <div className="flex items-start gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <Bot className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold text-ink">
                              Respuesta de Licitora
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                              <CheckCircle2 className="h-3 w-3" />
                              {turn.sources.length} fuentes verificables
                            </span>
                          </div>
                          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-slate-600">
                            {turn.answer}
                          </p>
                        </div>
                        <Sources sources={turn.sources} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-[11px] text-slate-500 shadow-sm">
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin text-brand-600" />
                    Buscando evidencia real y verificando fuentes…
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <form
          onSubmit={submitQuestion}
          className="border-t border-slate-200 bg-white p-3.5 sm:px-6 sm:py-4"
        >
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/10">
            <Sparkles className="h-4 w-4 shrink-0 text-brand-600" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pregunta por documentos, productos o partidas…"
              className="h-7 min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="grid h-8 w-8 place-items-center rounded-lg bg-midnight text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200"
            >
              <SendHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-[9px] text-slate-400">
            <span className="flex min-w-0 items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
              Cada respuesta muestra archivo, página y fragmento de respaldo.
            </span>
            <span className="hidden whitespace-nowrap sm:block">
              ⌘ K para abrir
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

function Notice({
  title,
  detail,
  clear,
}: {
  title: string;
  detail: string;
  clear?: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-600">
        <FileWarning className="h-4 w-4" />
      </span>
      <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-bold text-slate-700">{title}</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
          {detail}
        </p>
        {clear && (
          <button
            type="button"
            onClick={clear}
            className="mt-3 text-[10px] font-bold text-brand-700 hover:text-brand-800"
          >
            Quitar filtros y buscar de nuevo
          </button>
        )}
      </div>
    </div>
  );
}
function Sources({ sources }: { sources: ChatSource[] }) {
  return (
    <div className="mt-3">
      <p className="mb-2 px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Fuentes consultadas
      </p>
      <div className="space-y-2">
        {sources.map((source) => (
          <article
            key={source.id}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-50 text-rose-600">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate text-[11px] font-bold text-brand-700 hover:underline"
                    >
                      {source.title}
                    </a>
                  ) : (
                    <p className="truncate text-[11px] font-bold text-slate-700">
                      {source.title}
                    </p>
                  )}
                  {source.page && (
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
                      {source.page}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-brand-700">
                  {source.brand} · {source.type}
                </p>
                <blockquote className="mt-2 border-l-2 border-brand-300 pl-2 text-[10px] leading-relaxed text-slate-500">
                  {source.fragment}
                </blockquote>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function NewTenderDialog({
  open,
  onClose,
  onSuccess,
  documentMode = false,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  documentMode?: boolean;
}) {
  const [name, setName] = useState("");
  if (!open) return null;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onClose();
    onSuccess(
      documentMode
        ? "Documento cargado para indexación"
        : "Licitación creada y lista para procesar",
    );
    setName("");
  };
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl animate-scale-in sm:p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <UploadCloud className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold tracking-tight text-ink">
              {documentMode ? "Cargar documento" : "Nueva licitación"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {documentMode
                ? "Licitora clasificará e indexará el contenido automáticamente."
                : "Carga las bases y deja que Licitora extraiga las partidas."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <label className="mt-5 block">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {documentMode ? "Nombre del documento" : "Nombre del proceso"}
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-xs text-slate-800 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
            placeholder={
              documentMode
                ? "Ej. Certificado ISO 13485"
                : "Ej. Material de curación IMSS 2026"
            }
          />
        </label>
        <button
          type="button"
          className="mt-4 flex w-full flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-7 text-center transition hover:border-brand-400 hover:bg-brand-50/50"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
            <UploadCloud className="h-5 w-5" />
          </span>
          <span className="mt-3 text-xs font-bold text-slate-700">
            Arrastra tus archivos aquí
          </span>
          <span className="mt-1 text-[10px] text-slate-400">
            PDF, DOCX o XLSX · máximo 100 MB
          </span>
        </button>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            {documentMode ? "Cargar e indexar" : "Crear proceso"}
          </button>
        </div>
      </form>
    </div>
  );
}
