import express from 'express'
import { bookAppointments, getProfile, loginUser, registerUser, updateProfile } from '../controllers/userController.mjs'
import authUser from '../midleWares/authUser.mjs'
import upload from '../midleWares/multer.mjs'

const userRouter = express.Router()

userRouter.post("/register" , registerUser)

userRouter.post("/login" , loginUser)

userRouter.get('/get-profile' , authUser ,  getProfile)

userRouter.post('/update-profile' , upload.single('image') , authUser , updateProfile)

userRouter.post('/book-appointments' , authUser , bookAppointments)

export default userRouter