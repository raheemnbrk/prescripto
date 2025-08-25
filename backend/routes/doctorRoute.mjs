import express from "express"
import { cancelAppointment, doctorDashboard, doctorList, getDoctorAppointments, getDoctorProfile, loginDoctor, markAppointmentCompleted, updateDocProfile } from '../controllers/doctorController.mjs'
import authDoctor from "../midleWares/authDoctor.mjs"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

doctorRouter.post('/doctor-login' , loginDoctor)

doctorRouter.get('/doctor-appointments' , authDoctor , getDoctorAppointments )

doctorRouter.post('/complete-apointment' , authDoctor , markAppointmentCompleted)

doctorRouter.post('/cancel-appointment' , authDoctor , cancelAppointment)

doctorRouter.get('/doctor-dashboard' , authDoctor , doctorDashboard)

doctorRouter.get('/doctor-profile' , authDoctor , getDoctorProfile)

doctorRouter.post('/update-profile' , authDoctor , updateDocProfile)

export { doctorRouter }