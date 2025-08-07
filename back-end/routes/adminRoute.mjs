import express from 'express'
import { addDoctor , logAdmin } from '../controllers/adminController.mjs'
import upload from '../midleWares/multer.mjs'
import authAdmin from '../midleWares/authAdmin.mjs'

const adminRouter = express()

adminRouter.post("/add-doctor",authAdmin , upload.single("image"), addDoctor)

adminRouter.post("/login" , logAdmin)

export default adminRouter