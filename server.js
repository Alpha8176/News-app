import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.join(__dirname, 'dist')

const app = express()
const port = process.env.PORT || 4000
const apiKey = process.env.NEWSAPI_KEY

if (!apiKey) {
  console.warn('WARNING: NEWSAPI_KEY is not set. The proxy will fail until you add it to .env or the environment.')
}

app.use(cors())
app.use(express.json())
app.use(express.static(distPath))

app.get('/api/top-headlines', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ status: 'error', message: 'Server missing NEWSAPI_KEY' })
  }

  const category = req.query.category || 'general'
  const country = req.query.country || 'us'

  try {
    const url = new URL('https://newsapi.org/v2/top-headlines')
    url.searchParams.set('country', country)
    url.searchParams.set('category', category)

    const response = await fetch(url.toString(), {
      headers: {
        'X-Api-Key': apiKey,
      },
    })

    const data = await response.json()
    return res.status(response.status).json(data)
  } catch (error) {
    console.error('NewsAPI proxy error:', error)
    return res.status(500).json({ status: 'error', message: 'Proxy error contacting NewsAPI' })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`NewsAPI proxy server listening on http://localhost:${port}`)
})
