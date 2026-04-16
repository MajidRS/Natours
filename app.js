import express from 'express'
import { configDotenv } from 'dotenv'
configDotenv({ path: './config.env' })
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const staticFilePath = path.join(dirName, 'public')

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static(staticFilePath))

export default app
