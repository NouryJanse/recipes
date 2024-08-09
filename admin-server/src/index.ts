import express, { Application, NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import apiRouter from './routes'

const port = parseInt(process.env.PORT as string, 10 || 3000)
const options: cors.CorsOptions = {
    origin: (process.env.ALLOWED_ORIGIN as string) || '',
    allowedHeaders: ['Authorization', 'Content-Type'],
}

const app: Application = express()
app.use(cors(options))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const router = express.Router()
router.use(async (req: Request, res: Response, next: NextFunction) => {
    next()
})

app.use('/', [router, apiRouter])

app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`)
})
