import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config({ path: './.env' }) // repo root, not in src
import ingredientRoutes from './routes/ingredients'
import recipeRoutes from './routes/recipes'

const port = parseInt(process.env.PORT as string, 10 || 3000)
const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ['Authorization', 'Content-Type'],
}

const app: Application = express()
app.use(cors(options))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb' }))

app.use('/', [ingredientRoutes, recipeRoutes])

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
