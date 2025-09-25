import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/mongodb.mjs'
import cloudinaryConnect from './config/cloudinary.mjs'
import adminRouter from './routes/adminRoute.mjs'
import { doctorRouter } from './routes/doctorRoute.mjs'
import userRouter from './routes/userRoute.mjs'
import dotenv from "dotenv"
dotenv.config()

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://prescripto-five-lac.vercel.app"
]

const app = express()
const port = process.env.PORT || 3000
connectDb()
cloudinaryConnect()

app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    return res.status(200).send({ msg: "hello world" })
})

app.listen(port, () => {
    console.log(`listning in port ${port}`)
})