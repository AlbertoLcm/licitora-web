import 'dotenv/config'
import express from 'express'
import OpenAI from 'openai'
import pg from 'pg'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// The existing document pipeline keeps its local OpenRouter settings here.
dotenv.config({ path: path.resolve(projectDirectory, '../scripts/.env') })
// Local RAG credentials always take precedence and remain ignored by Git.
dotenv.config({ path: path.resolve(projectDirectory, '.env.local') })

const databaseUrl = process.env.RAG_DATABASE_URL
if (!databaseUrl) throw new Error('Falta RAG_DATABASE_URL. Copia .env.example a .env.local y configura el usuario de lectura.')
if (!process.env.OPENROUTER_API_KEY) throw new Error('Falta OPENROUTER_API_KEY para generar embeddings y respuestas.')

const pool = new pg.Pool({ connectionString: databaseUrl, max: 5, idleTimeoutMillis: 20_000 })
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    ...(process.env.OPENROUTER_APP_TITLE ? { 'X-Title': process.env.OPENROUTER_APP_TITLE } : {}),
    ...(process.env.OPENROUTER_APP_URL ? { 'HTTP-Referer': process.env.OPENROUTER_APP_URL } : {}),
  },
})

const embeddingModel = process.env.OPENROUTER_EMBEDDING_MODEL || process.env.OPENAI_EMBEDDING_MODEL || 'openai/text-embedding-3-small'
const chatModel = process.env.OPENROUTER_CHAT_MODEL || process.env.OPENROUTER_FLASH_MODEL || 'google/gemini-2.5-flash'
const app = express()
app.use(express.json({ limit: '32kb' }))
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))

function vectorLiteral(values) {
  if (!Array.isArray(values) || values.length !== 1536) throw new Error('El modelo de embeddings no devolvió un vector de 1536 dimensiones.')
  return `[${values.join(',')}]`
}

async function embed(query) {
  const response = await openrouter.embeddings.create({ model: embeddingModel, input: query, dimensions: 1536 })
  return vectorLiteral(response.data[0]?.embedding)
}

const retrievalSql = `
WITH candidates AS (
  SELECT
    'document'::text AS kind,
    c.id::text AS id,
    COALESCE(d.title, f.name) AS title,
    b.name AS brand,
    COALESCE(d.document_type, 'Documento') AS filter_type,
    COALESCE(d.document_type, 'Documento') AS source_type,
    c.page_number,
    COALESCE(c.clean_text, c.raw_text) AS fragment,
    f.web_view_link AS url,
    c.embedding <=> $1::vector AS distance
  FROM document_chunks c
  JOIN drive_files f ON f.id = c.file_id
  LEFT JOIN LATERAL (
    SELECT id, title, document_type, brand_id
    FROM documents
    WHERE file_id = c.file_id
    ORDER BY created_at DESC
    LIMIT 1
  ) d ON TRUE
  LEFT JOIN brands b ON b.id = d.brand_id

  UNION ALL

  SELECT
    'product', p.id::text, p.name, b.name, 'Producto', 'Producto', p.catalog_page,
    COALESCE(NULLIF(p.search_text, ''), NULLIF(p.description, ''), p.name), f.web_view_link,
    p.embedding <=> $1::vector
  FROM products p
  LEFT JOIN drive_files f ON f.id = p.file_id
  LEFT JOIN brands b ON b.id = p.brand_id
  WHERE p.embedding IS NOT NULL

  UNION ALL

  SELECT
    'tender_item', ti.id::text,
    concat(t.tender_code, ' · ', t.procedure_number), NULL, 'Partida / historial',
    concat('Partida · ', t.institution), NULL, ti.required_description, t.bases_path,
    ti.embedding <=> $1::vector
  FROM tender_items ti
  JOIN tenders t ON t.id = ti.tender_id
  WHERE ti.embedding IS NOT NULL
)
SELECT * FROM candidates
WHERE ($2::text IS NULL OR brand = $2)
  AND ($3::text IS NULL OR filter_type = $3)
ORDER BY distance ASC
LIMIT 8`

function sourceFromRow(row) {
  return {
    id: `${row.kind}-${row.id}`,
    kind: row.kind,
    title: row.title,
    brand: row.brand || 'Histórico Oltech',
    type: row.source_type,
    page: row.page_number ? `Pág. ${row.page_number}` : null,
    fragment: row.fragment.slice(0, 900),
    url: row.url || null,
    similarity: Number((1 - Number(row.distance)).toFixed(3)),
  }
}

async function answerQuestion(question, sources) {
  const evidence = sources.map((source, index) => (
    `[${index + 1}] ${source.type} | ${source.title} | ${source.brand}${source.page ? ` | ${source.page}` : ''}\n${source.fragment}`
  )).join('\n\n')
  const completion = await openrouter.chat.completions.create({
    model: chatModel,
    temperature: 0.15,
    messages: [
      {
        role: 'system',
        content: 'Eres Atlas, asistente de licitaciones médicas. Responde en español exclusivamente con la evidencia proporcionada. Si la evidencia no basta, dilo claramente. No inventes certificaciones, vigencias, medidas, precios ni adjudicaciones. Sé directo y cita los números de fuente entre corchetes cuando corresponda.',
      },
      { role: 'user', content: `Pregunta: ${question}\n\nEvidencia recuperada:\n${evidence}` },
    ],
  })
  return completion.choices[0]?.message?.content?.trim() || 'No fue posible generar una respuesta con la evidencia recuperada.'
}

app.get('/api/rag/filters', async (_request, response, next) => {
  try {
    const [brands, types, count] = await Promise.all([
      pool.query("SELECT name FROM brands WHERE name IS NOT NULL ORDER BY name"),
      pool.query("SELECT DISTINCT document_type FROM documents WHERE document_type IS NOT NULL AND document_type <> '' ORDER BY document_type"),
      pool.query('SELECT count(DISTINCT file_id)::int AS count FROM document_chunks'),
    ])
    response.json({
      brands: brands.rows.map((row) => row.name),
      types: [...types.rows.map((row) => row.document_type), 'Producto', 'Partida / historial'],
      indexedDocuments: count.rows[0].count,
    })
  } catch (error) { next(error) }
})

app.post('/api/rag/chat', async (request, response, next) => {
  try {
    const question = typeof request.body?.question === 'string' ? request.body.question.trim() : ''
    const brand = typeof request.body?.brand === 'string' && request.body.brand ? request.body.brand : null
    const type = typeof request.body?.type === 'string' && request.body.type ? request.body.type : null
    if (!question) return response.status(400).json({ error: 'Escribe una pregunta para consultar el conocimiento indexado.' })
    if (question.length > 2_000) return response.status(400).json({ error: 'La pregunta supera el límite de 2,000 caracteres.' })

    const rows = await pool.query(retrievalSql, [await embed(question), brand, type])
    const sources = rows.rows.map(sourceFromRow)
    if (!sources.length) return response.json({ answer: null, sources: [] })
    response.json({ answer: await answerQuestion(question, sources), sources })
  } catch (error) { next(error) }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(projectDirectory, 'dist')))
  app.get('/{*path}', (request, response, next) => {
    if (request.path.startsWith('/api/')) return next()
    response.sendFile(path.join(projectDirectory, 'dist/index.html'))
  })
}

app.use((error, _request, response, _next) => {
  const status = typeof error === 'object' && error && 'status' in error ? Number(error.status) : 500
  // Do not log provider messages: some providers include sensitive management URLs in them.
  console.error('RAG API error status:', status)
  if (status === 401 || status === 403) {
    return response.status(503).json({ error: 'OpenRouter no tiene crédito disponible o la clave no está autorizada. Actualiza el saldo o la clave local.' })
  }
  response.status(500).json({ error: 'No fue posible consultar Atlas. Revisa la conexión local e inténtalo de nuevo.' })
})

const port = Number(process.env.PORT || 8787)
app.listen(port, '0.0.0.0', () => console.log(`Licitora escuchando en puerto ${port}`))
