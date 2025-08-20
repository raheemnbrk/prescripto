import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorsModel.mjs'
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
    try {
        const { body: { name, email, password, experience, degree, speciality, address, about, fees } } = req
        const imageFile = req.file

        console.log(req.file)
        console.log(req.body)

        if (!name || !email || !password || !experience || !degree || !speciality || !address || !about || !fees) {
            return res.json({ success: false, msg: "missing credentiels" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, msg: "please enter a valid password" })
        }

        if (!imageFile) {
            return res.json({ success: false, msg: "No image file uploaded" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            fees: Number(fees),
            experience,
            about,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, msg: "doctor added" })
    }
    catch (err) {
        console.log(err)
        return res.json({ success: false, msg: err.message })
    }
}

const logAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, msg: "invalid credentiels" })
        }
    }
    catch (err) {
        console.log(err)
        return res.json({ success: false, msg: err.message })
    }
}

const allDoctor = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { addDoctor, logAdmin , allDoctor }