import express from "express"
import { cancelAppointment, doctorDashboard, doctorList, getDoctorAppointments, loginDoctor, markAppointmentCompleted } from '../controllers/doctorController.mjs'
import authDoctor from "../midleWares/authDoctor.mjs"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

doctorRouter.post('/doctor-login' , loginDoctor)

doctorRouter.get('/doctor-appointments' , authDoctor , getDoctorAppointments )

doctorRouter.post('/complete-apointment' , authDoctor , markAppointmentCompleted)

doctorRouter.post('/cancel-appointment' , authDoctor , cancelAppointment)

doctorRouter.get('/doctor-dashboard' , authDoctor , doctorDashboard)

export { doctorRouter }