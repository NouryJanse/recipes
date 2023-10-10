import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
dotenv.config({ path: './.env' }) // repo root, not in src
import routes from './routes/recipes'

const port = parseInt(process.env.PORT as string, 10 || 3000)
const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ['Authorization', 'Content-Type'],
}

const app: Application = express()
app.use(cors(options))
app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
