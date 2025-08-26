import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDb from './config/mongodb.mjs'
import cloudinaryConnect from './config/cloudinary.mjs'
import adminRouter from './routes/adminRoute.mjs'
import { doctorRouter } from './routes/doctorRoute.mjs'
import userRouter from './routes/userRoute.mjs'

const app = express()
const port = process.env.PORT || 3000
connectDb()
cloudinaryConnect()

app.use(express.json())
app.use(cors({
  origin: ["https://prescripto-j6cq.vercel.app", "https://prescripto-7k1g.vercel.app"],
  credentials: true
}))
app.use(express.urlencoded({ extended: true }))

app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)

app.get('/', (req, res) => {
    return res.status(200).send({ msg: "hello world" })
})

app.listen(port, () => {
    console.log(`listning in port ${port}`)
})