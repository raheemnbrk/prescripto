import express from 'express'
import { bookAppointments, getProfile, appointmentsList, loginUser, registerUser, updateProfile, cancelAppointments } from '../controllers/userController.mjs'
import authUser from '../midleWares/authUser.mjs'
import upload from '../midleWares/multer.mjs'

const userRouter = express.Router()

userRouter.post("/register" , registerUser)

userRouter.post("/login" , loginUser)

userRouter.get('/get-profile' , authUser ,  getProfile)

userRouter.post('/update-profile' , upload.single('image') , authUser , updateProfile)

userRouter.post('/book-appointments' , authUser , bookAppointments)

userRouter.get('/appointments' , authUser , appointmentsList)

userRouter.post('/cancel-appointments' , authUser , cancelAppointments)

export default userRouter