import type { LucideIcon } from 'lucide-react'

export type ViewId =
  | 'dashboard'
  | 'monitor'
  | 'licitaciones'
  | 'productos'
  | 'documentos'
  | 'marcas'
  | 'historial'
  | 'equipo'

export type NavItem = {
  id: ViewId
  label: string
  icon: LucideIcon
  badge?: string
}

export type TenderStatus = 'En preparación' | 'En revisión' | 'Lista para enviar' | 'Adjudicada'

export type Opportunity = {
  id: string
  institution: string
  title: string
  published: string
  deadline: string
  amount: string
  score: number
  lots: number
  documents: number
  tags: string[]
  reason: string
}
