import validator from "validator"
import bcrypt from "bcrypt"
import userModel from '../models/userModel.mjs'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            res.json({ success: false, message: "missing credentiels." })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "enter a valid email." })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "enter a strong pasword" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "invalid credentiels" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const getProfile = async (req, res) => {
    try {
        const { userId } = req
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData })
    }
    catch (err) {
        console.log(err)
        res.json({ success: true, message: err.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userId } = req
        const { name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            res.json({ success: false, message: "invalid details" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, dob, gender, address: JSON.parse(address) })

        if (imageFile) {
            const uploadImage = await cloudinary.uploader.upload(imageFile.path, { ressource_type: "image" })
            const image_url = uploadImage.secure_url

            await userModel.findByIdAndUpdate(userId, { image: image_url })
        }

        res.json({ success: true, message: "profile updated" })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { registerUser, loginUser, getProfile , updateProfile }