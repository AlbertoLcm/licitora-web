import { useEffect, useState } from 'react'
import { Check, CircleHelp, Plus } from 'lucide-react'
import { viewMeta } from './app/data'
import type { ViewId } from './app/types'
import { Header, Sidebar } from './components/AppLayout'
import { NewTenderDialog, SearchDialog } from './components/Dialogs'
import {
  BrandsPage,
  DocumentsPage,
  HistoryPage,
  LicitacionesPage,
  ProductsPage,
  TeamPage,
} from './pages/CatalogPages'
import { DashboardPage } from './pages/DashboardPage'
import { MonitorPage } from './pages/MonitorPage'

function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [newTenderOpen, setNewTenderOpen] = useState(false)
  const [documentMode, setDocumentMode] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchQuery('')
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setNewTenderOpen(false)
        setNotificationsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const openSearch = (query = '') => {
    setSearchQuery(query)
    setSearchOpen(true)
  }

  const openTender = () => {
    setDocumentMode(false)
    setNewTenderOpen(true)
  }

  const openDocument = () => {
    setDocumentMode(true)
    setNewTenderOpen(true)
  }

  const meta = viewMeta[activeView]

  return (
    <div className="min-h-screen bg-canvas text-slate-700">
      <Sidebar activeView={activeView} setActiveView={setActiveView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen lg:pl-[264px]">
        <Header onMenu={() => setSidebarOpen(true)} onSearch={() => openSearch()} notificationsOpen={notificationsOpen} setNotificationsOpen={setNotificationsOpen} />
        <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-7">
          <div className="mx-auto max-w-[1024px]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700">{meta.eyebrow}</p>
                <h1 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-ink sm:text-[28px]">{meta.title}</h1>
                <p className="mt-1 text-xs text-slate-500">{meta.description}</p>
              </div>
              {activeView === 'dashboard' && <button type="button" onClick={openTender} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"><Plus className="h-4 w-4" />Nueva licitación</button>}
            </div>

            {activeView === 'dashboard' && <DashboardPage onNewTender={openTender} onSearch={openSearch} navigate={setActiveView} />}
            {activeView === 'monitor' && <MonitorPage onSuccess={setToast} navigate={setActiveView} />}
            {activeView === 'licitaciones' && <LicitacionesPage onNewTender={openTender} />}
            {activeView === 'productos' && <ProductsPage onSearch={() => openSearch()} />}
            {activeView === 'documentos' && <DocumentsPage onUpload={openDocument} />}
            {activeView === 'marcas' && <BrandsPage />}
            {activeView === 'historial' && <HistoryPage />}
            {activeView === 'equipo' && <TeamPage />}
          </div>
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} initialQuery={searchQuery} />
      <NewTenderDialog open={newTenderOpen} onClose={() => setNewTenderOpen(false)} onSuccess={setToast} documentMode={documentMode} />

      {toast && <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-xl bg-midnight px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-slide-up"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500"><Check className="h-3.5 w-3.5" /></span>{toast}</div>}
      <button type="button" className="fixed bottom-5 left-5 z-10 hidden h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-lg transition hover:text-brand-600 lg:grid" aria-label="Ayuda"><CircleHelp className="h-[18px] w-[18px]" /></button>
    </div>
  )
}

export default App
