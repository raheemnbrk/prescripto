import express from 'express'
import { addDoctor , logAdmin , allDoctor } from '../controllers/adminController.mjs'
import upload from '../midleWares/multer.mjs'
import authAdmin from '../midleWares/authAdmin.mjs'
import { changeAvailablity } from '../controllers/doctorController.mjs'

const adminRouter = express.Router()

adminRouter.post("/add-doctor",authAdmin , upload.single("image"), addDoctor)

adminRouter.post("/login" , logAdmin)

adminRouter.post("/all-doctors" , authAdmin ,  allDoctor)

adminRouter.post("/change-availablity" , authAdmin , changeAvailablity)

export default adminRouter