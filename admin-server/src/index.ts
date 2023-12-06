import express, { Application } from 'express'
import 'dotenv/config'
import cors from 'cors'

import ingredientRoutes from './routes/ingredients'
import recipeRoutes from './routes/recipes'
import apiRouter from './routes'

const port = parseInt(process.env.PORT as string, 10 || 3000)
const env = process.env.ENV
const options: cors.CorsOptions = {
  origin: (process.env.ALLOWED_ORIGIN as string) || '',
  allowedHeaders: ['Authorization', 'Content-Type'],
}

const app: Application = express()
app.use(cors(options))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const router = express.Router()

router.use((req, res, next) => {
  if (
    env === 'production' &&
    !req.originalUrl.includes('/api/recipes') &&
    !req.originalUrl.includes('/api/ingredients')
  ) {
    // only allow the route /api/recipes for now in production
    return res.status(500).send()
  }
  next()
})

app.use('/', [router, ingredientRoutes, recipeRoutes, apiRouter])

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`)
})
