# Oltech Licitora

Template frontend para una plataforma inteligente de gestión de licitaciones, construido con React, Vite, TypeScript y Tailwind CSS.

El prototipo incluye un Radar CompraMX simulado y un chat Atlas conectado a datos reales: búsqueda vectorial en documentos indexados, productos y partidas/historial de licitaciones. Las respuestas muestran los fragmentos y las páginas que las respaldan.

## Ejecutar localmente

```bash
npm install
npm run dev
```

El comando inicia Vite en `http://localhost:5173` y la API privada de Atlas en
`http://localhost:8787`. El navegador sólo se comunica con `/api`; nunca recibe
credenciales de PostgreSQL ni claves de OpenRouter.

## Configuración local del RAG

1. Copia `.env.example` a `.env.local`.
2. Define `RAG_DATABASE_URL` con un usuario de PostgreSQL de sólo lectura.
3. Define `OPENROUTER_API_KEY` con crédito disponible. También se puede
   reutilizar la configuración local del pipeline en `../scripts/.env`.

`.env.local` está ignorado por Git. La base debe tener la extensión `vector` y
embeddings de 1536 dimensiones, como el esquema de Licitora.

## Compilar para producción

```bash
npm run build
```

## Despliegue en Coolify con Docker

Configura una aplicación con el repositorio, selecciona **Dockerfile** como método de compilación y usa `licitora-web` como directorio base si el repositorio incluye la carpeta padre. El Dockerfile está en la raíz de `licitora-web`. Configura el puerto interno **8787**, asigna el dominio HTTPS y utiliza `/api/health` como comprobación de salud. El contenedor sirve tanto la web como la API.

Define estas variables de ejecución en Coolify, sin incluir secretos en el repositorio:

```text
RAG_DATABASE_URL=postgresql://usuario_lectura:CONTRASEÑA@HOST_POSTGRES:5432/licitora
OPENROUTER_API_KEY=CLAVE_DE_OPENROUTER
OPENROUTER_EMBEDDING_MODEL=openai/text-embedding-3-small
OPENROUTER_CHAT_MODEL=google/gemini-2.5-flash
```

La clave necesita crédito y el modelo de embeddings debe coincidir con el utilizado para indexar los documentos. Codifica los caracteres especiales del usuario o contraseña como componentes de URL.

Si PostgreSQL es otro contenedor de Coolify, conecta ambos a una red Docker compartida y usa su nombre de servicio y puerto interno como `HOST_POSTGRES`; consulta la configuración de red del servicio existente. Si PostgreSQL corre directamente en el servidor, usa una dirección del servidor accesible desde el contenedor (por ejemplo, la IP privada configurada), y permite esa conexión en PostgreSQL. `localhost` dentro del contenedor apunta al propio contenedor, no al servidor ni a PostgreSQL. Comprueba que el usuario tenga `SELECT` sobre las tablas RAG y que `pgvector` esté instalado.

La ruta de salud comprueba que el proceso HTTP responde; no valida PostgreSQL ni OpenRouter. Tras desplegar, prueba los filtros y una consulta en el chat para verificar ambas conexiones.

El Radar y algunas pantallas administrativas permanecen simulados. El diálogo
Atlas sí usa la base de datos real mediante su API local.
