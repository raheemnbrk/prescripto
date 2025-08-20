import express from "express"
import { doctorList } from '../controllers/doctorController.mjs'

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

export { doctorRouter }