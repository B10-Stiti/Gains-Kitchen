import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import uploadRoute from './routes/upload.js'
import recipeRoutes from './routes/recipeRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/api/auth', authRoutes)

// if someone visit /uploads, go look for it inside the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.use('/api/upload', uploadRoute);

app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT
app.listen(PORT)
