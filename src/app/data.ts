import {
  Boxes,
  Building2,
  FileCheck2,
  History,
  LayoutDashboard,
  Library,
  Radar,
} from "lucide-react";
import type { NavItem, Opportunity, TenderStatus, ViewId } from "./types";

export const navigation: NavItem[] = [
  { id: "dashboard", label: "Resumen", icon: LayoutDashboard },
  { id: "monitor", label: "Radar CompraMX", icon: Radar, badge: "5" },
  { id: "licitaciones", label: "Licitaciones", icon: FileCheck2, badge: "8" },
  { id: "productos", label: "Productos", icon: Boxes },
  { id: "documentos", label: "Documentos", icon: Library },
  { id: "marcas", label: "Marcas", icon: Building2 },
  { id: "historial", label: "Historial", icon: History },
];

export const tenders: Array<{
  id: string;
  institution: string;
  title: string;
  due: string;
  lots: number;
  progress: number;
  status: TenderStatus;
}> = [
  {
    id: "LA-050GYR019-E118-2026",
    institution: "IMSS",
    title: "Material de osteosíntesis y endoprótesis",
    due: "18 ago, 10:00",
    lots: 126,
    progress: 68,
    status: "En preparación",
  },
  {
    id: "AA-12-N7A-012N7A001-N-41-2026",
    institution: "ISSSTE",
    title: "Insumos para cirugía ortopédica",
    due: "22 ago, 13:00",
    lots: 84,
    progress: 92,
    status: "En revisión",
  },
  {
    id: "SSM-LPN-014-2026",
    institution: "Secretaría de Salud",
    title: "Implantes para trauma, región centro",
    due: "27 ago, 09:00",
    lots: 52,
    progress: 100,
    status: "Lista para enviar",
  },
  {
    id: "HRAEO-LP-018-2026",
    institution: "Hospital Regional",
    title: "Sistema de fijación de columna",
    due: "04 sep, 11:30",
    lots: 38,
    progress: 34,
    status: "En preparación",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "LA-050GYR047-E236-2026",
    institution: "IMSS",
    title: "Adquisición de material de osteosíntesis para unidades médicas",
    published: "Hoy, 08:24",
    deadline: "26 ago, 10:00",
    amount: "$18.4 M",
    score: 96,
    lots: 74,
    documents: 8,
    tags: ["Trauma", "Implantes", "Nacional"],
    reason:
      "Alta coincidencia con 42 productos activos y 18 partidas adjudicadas anteriormente.",
  },
  {
    id: "AA-12-N7A-012N7A001-N-58-2026",
    institution: "ISSSTE",
    title: "Suministro de prótesis de cadera y rodilla",
    published: "Hoy, 07:51",
    deadline: "29 ago, 13:00",
    amount: "$31.2 M",
    score: 91,
    lots: 46,
    documents: 11,
    tags: ["Artroplastia", "Cadera", "Rodilla"],
    reason:
      "El catálogo actual cubre 89% de las especificaciones preliminares detectadas.",
  },
  {
    id: "SSJ-LPN-032-2026",
    institution: "Secretaría de Salud Jalisco",
    title: "Sistema de fijación para cirugía de columna",
    published: "Ayer, 18:36",
    deadline: "02 sep, 09:00",
    amount: "$12.8 M",
    score: 87,
    lots: 28,
    documents: 6,
    tags: ["Columna", "Fijación", "Regional"],
    reason:
      "Coincide con la línea Medtronic y tres expedientes completos de 2024–2025.",
  },
  {
    id: "HRAEO-IA-024-2026",
    institution: "Hospital Regional de Alta Especialidad",
    title: "Insumos especializados para artroscopia",
    published: "Ayer, 16:12",
    deadline: "05 sep, 11:30",
    amount: "$6.7 M",
    score: 78,
    lots: 19,
    documents: 5,
    tags: ["Artroscopia", "Anclas", "Suturas"],
    reason:
      "Cobertura parcial: se detectaron productos compatibles, pero faltan dos certificados vigentes.",
  },
];

export const products = [
  {
    code: "ZM-3245",
    name: "Tornillo cortical 3.5 mm",
    brand: "Zimmer Biomet",
    family: "Trauma",
    docs: 12,
    match: 98,
  },
  {
    code: "SY-8812",
    name: "Placa volar de radio distal",
    brand: "Stryker",
    family: "Extremidades",
    docs: 9,
    match: 96,
  },
  {
    code: "SN-4501",
    name: "Clavo intramedular de tibia",
    brand: "Smith+Nephew",
    family: "Trauma",
    docs: 15,
    match: 94,
  },
  {
    code: "MT-2290",
    name: "Sistema de fijación lumbar",
    brand: "Medtronic",
    family: "Columna",
    docs: 18,
    match: 92,
  },
  {
    code: "ZM-4108",
    name: "Copa acetabular no cementada",
    brand: "Zimmer Biomet",
    family: "Cadera",
    docs: 11,
    match: 89,
  },
  {
    code: "SY-7460",
    name: "Ancla de sutura bioabsorbible",
    brand: "Stryker",
    family: "Artroscopia",
    docs: 8,
    match: 87,
  },
];

export const documents = [
  {
    name: "Ficha técnica – Tornillos corticales 3.5",
    type: "Ficha técnica",
    brand: "Zimmer Biomet",
    updated: "Hoy, 09:42",
    status: "Vigente",
  },
  {
    name: "Registro sanitario 0679C2024 SSA",
    type: "COFEPRIS",
    brand: "Stryker",
    updated: "Ayer, 16:18",
    status: "Vigente",
  },
  {
    name: "Certificado ISO 13485:2016",
    type: "Certificado",
    brand: "Smith+Nephew",
    updated: "11 ago, 12:05",
    status: "Por vencer",
  },
  {
    name: "Catálogo Trauma 2026 – ES",
    type: "Catálogo",
    brand: "Zimmer Biomet",
    updated: "10 ago, 10:31",
    status: "Vigente",
  },
  {
    name: "Carta de libre venta – Sistemas de columna",
    type: "Carta",
    brand: "Medtronic",
    updated: "08 ago, 14:54",
    status: "En revisión",
  },
];

export const brands = [
  {
    name: "Zimmer Biomet",
    products: 842,
    docs: 194,
    coverage: 96,
    initials: "ZB",
    tone: "bg-indigo-50 text-indigo-700",
  },
  {
    name: "Stryker",
    products: 615,
    docs: 148,
    coverage: 91,
    initials: "SK",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    name: "Smith+Nephew",
    products: 497,
    docs: 126,
    coverage: 88,
    initials: "SN",
    tone: "bg-sky-50 text-sky-700",
  },
  {
    name: "Medtronic",
    products: 376,
    docs: 92,
    coverage: 84,
    initials: "MD",
    tone: "bg-rose-50 text-rose-700",
  },
];

export const statusStyles: Record<TenderStatus, string> = {
  "En preparación": "bg-sky-50 text-sky-700 ring-sky-600/10",
  "En revisión": "bg-amber-50 text-amber-700 ring-amber-600/10",
  "Lista para enviar": "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  Adjudicada: "bg-violet-50 text-violet-700 ring-violet-600/10",
};

export const viewMeta: Record<
  ViewId,
  { eyebrow: string; title: string; description: string }
> = {
  dashboard: {
    eyebrow: "Miércoles, 12 de agosto",
    title: "Buenos días, Alberto",
    description: "Esto es lo que está pasando con tus licitaciones.",
  },
  monitor: {
    eyebrow: "Inteligencia de oportunidades",
    title: "Radar CompraMX",
    description:
      "Monitorea nuevas convocatorias y decide cuáles convertir en licitación.",
  },
  licitaciones: {
    eyebrow: "Operación",
    title: "Licitaciones",
    description: "Centraliza partidas, evidencias y avances de cada proceso.",
  },
  productos: {
    eyebrow: "Base de conocimiento",
    title: "Catálogo de productos",
    description: "Encuentra el producto que mejor cumple cada requerimiento.",
  },
  documentos: {
    eyebrow: "Base de conocimiento",
    title: "Biblioteca documental",
    description:
      "Fichas, catálogos, certificados y traducciones en un solo lugar.",
  },
  marcas: {
    eyebrow: "Base de conocimiento",
    title: "Marcas",
    description: "Consulta la cobertura documental de cada fabricante.",
  },
  historial: {
    eyebrow: "Inteligencia comercial",
    title: "Historial de partidas",
    description:
      "Convierte la experiencia acumulada en decisiones más rápidas.",
  },
  equipo: {
    eyebrow: "Administración",
    title: "Equipo",
    description: "Gestiona responsables, carga de trabajo y colaboración.",
  },
};
