import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  Command,
  Menu,
  Search,
  Settings,
  Users,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { navigation } from '../app/data'
import type { ViewId } from '../app/types'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-950/20">
        <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/20" />
        <Activity className="relative h-5 w-5" strokeWidth={2.4} />
      </div>
      {!compact && (
        <div>
          <div className="flex items-center gap-1.5 text-[17px] font-bold tracking-[-0.03em] text-white">
            Oltech <span className="font-medium text-brand-300">Atlas</span>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Tender intelligence</p>
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  activeView,
  setActiveView,
  open,
  onClose,
}: {
  activeView: ViewId
  setActiveView: (view: ViewId) => void
  open: boolean
  onClose: () => void
}) {
  const navigate = (view: ViewId) => {
    setActiveView(view)
    onClose()
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col bg-midnight px-4 pb-4 pt-5 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden" aria-label="Cerrar menú">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1" aria-label="Navegación principal">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Espacio de trabajo</p>
          {navigation.map((item) => {
            const Icon = item.icon
            const active = activeView === item.id
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
                  active
                    ? 'bg-white/[0.09] text-white shadow-inner ring-1 ring-white/[0.06]'
                    : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${active ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} strokeWidth={1.9} />
                <span className="flex-1">{item.label}</span>
                {item.badge && <span className="rounded-full bg-brand-400/15 px-2 py-0.5 text-[10px] font-bold text-brand-300">{item.badge}</span>}
              </button>
            )
          })}

          <p className="mb-2 mt-7 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Organización</p>
          <button
            type="button"
            onClick={() => navigate('equipo')}
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-all ${
              activeView === 'equipo' ? 'bg-white/[0.09] text-white' : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
            }`}
          >
            <Users className="h-[18px] w-[18px] text-slate-500" strokeWidth={1.9} />
            Equipo
          </button>
          <button type="button" className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-slate-400 transition-all hover:bg-white/[0.05] hover:text-slate-100">
            <Settings className="h-[18px] w-[18px] text-slate-500" strokeWidth={1.9} />
            Configuración
          </button>
        </nav>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Zap className="h-4 w-4 fill-brand-400 text-brand-400" />
              Plan profesional
            </div>
            <span className="text-[10px] text-slate-500">72%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full w-[72%] rounded-full bg-brand-400" />
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-slate-500">7,240 de 10,000 páginas procesadas</p>
        </div>
      </aside>
    </>
  )
}

export function Header({
  onMenu,
  onSearch,
  notificationsOpen,
  setNotificationsOpen,
}: {
  onMenu: () => void
  onSearch: () => void
  notificationsOpen: boolean
  setNotificationsOpen: (value: boolean) => void
}) {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center gap-4 border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button type="button" onClick={onMenu} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Abrir menú">
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onSearch}
        className="group flex h-10 max-w-md flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-left text-sm text-slate-400 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
      >
        <Search className="h-4 w-4 text-slate-400 group-hover:text-brand-600" />
        <span className="hidden flex-1 sm:inline">Buscar productos, documentos o partidas…</span>
        <span className="sm:hidden">Buscar…</span>
        <span className="hidden items-center gap-0.5 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:flex">
          <Command className="h-2.5 w-2.5" />K
        </span>
      </button>

      <div className="relative ml-auto">
        <button
          type="button"
          onClick={() => {
            setNotificationsOpen(!notificationsOpen)
            setProfileOpen(false)
          }}
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-ink"
          aria-label="Notificaciones"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        {notificationsOpen && (
          <div className="absolute right-0 top-12 w-[min(350px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <h3 className="text-sm font-bold text-ink">Notificaciones</h3>
              <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">3 nuevas</span>
            </div>
            {[
              ['ISO 13485 por vencer', 'Smith+Nephew · vence en 15 días', 'bg-amber-50 text-amber-600', AlertTriangle],
              ['Procesamiento completado', 'IMSS 2026 · 126 partidas extraídas', 'bg-emerald-50 text-emerald-600', CheckCircle2],
              ['Revisión asignada', 'Mariana te asignó 8 partidas', 'bg-sky-50 text-sky-600', Users],
            ].map(([title, subtitle, tone, Icon]) => {
              const NotificationIcon = Icon as LucideIcon
              return (
                <button type="button" key={title as string} className="flex w-full gap-3 border-b border-slate-50 px-4 py-3.5 text-left last:border-0 hover:bg-slate-50">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tone}`}><NotificationIcon className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-xs font-semibold text-slate-800">{title as string}</span>
                    <span className="mt-0.5 block text-[11px] text-slate-500">{subtitle as string}</span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setProfileOpen(!profileOpen)
            setNotificationsOpen(false)
          }}
          className="flex items-center gap-2.5 rounded-xl p-1.5 pr-2 text-left transition hover:bg-slate-50"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-xs font-bold text-white">AL</span>
          <span className="hidden md:block">
            <span className="block text-xs font-semibold text-slate-800">Alberto López</span>
            <span className="block text-[10px] text-slate-400">Administrador</span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-12 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
            {['Ver perfil', 'Preferencias', 'Cerrar sesión'].map((item) => (
              <button key={item} type="button" className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">{item}</button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
