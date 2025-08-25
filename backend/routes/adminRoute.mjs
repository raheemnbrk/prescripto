import express from 'express'
import { addDoctor , logAdmin , allDoctor, getAppointments, cancelAppointment, dashboardData } from '../controllers/adminController.mjs'
import upload from '../midleWares/multer.mjs'
import authAdmin from '../midleWares/authAdmin.mjs'
import { changeAvailablity } from '../controllers/doctorController.mjs'

const adminRouter = express.Router()

adminRouter.post("/add-doctor",authAdmin , upload.single("image"), addDoctor)

adminRouter.post("/login" , logAdmin)

adminRouter.post("/all-doctors" , authAdmin ,  allDoctor)

adminRouter.post("/change-availablity" , authAdmin , changeAvailablity)

adminRouter.get("/appointments" , authAdmin ,  getAppointments)

adminRouter.post('/cancel-appointment' , authAdmin , cancelAppointment)

adminRouter.get('/admin-dashboard' , authAdmin , dashboardData)

export default adminRouter