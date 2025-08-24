import doctorModel from "../models/doctorsModel.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'availability changed' })
    }
    catch (err) {
        console.log(err)
        res.json({ sucess: false, message: err.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"])
        res.json({ success: true, doctors })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "invalid credentiels." })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            return res.json({ success: false, message: "incorrect password" })
        }

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { changeAvailablity, doctorList, loginDoctor }