import express from "express"
import { doctorList, loginDoctor } from '../controllers/doctorController.mjs'

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

doctorRouter.post('/doctor-login' , loginDoctor)

export { doctorRouter }