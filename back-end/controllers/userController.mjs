import validator from "validator"
import bcrypt from "bcrypt"
import userModel from '../models/userModel.mjs'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from "../models/doctorsModel.mjs"
import appointmentsModel from "../models/appointments.mjs"
import razorpay from "razorpay"

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

const bookAppointments = async (req, res) => {
    try {
        const { userId } = req;
        const { slotDate, slotTime, docId } = req.body;

        const doctorData = await doctorModel.findById(docId).select("-password");
        if (!doctorData.available) {
            return res.json({ success: false, message: "doctor not available" });
        }

        const slotTaken = await appointmentsModel.findOne({
            docId,
            slotDate,
            slotTime,
        });

        if (slotTaken) {
            return res.json({ success: false, message: "slot not available" });
        }

        const userTaken = await appointmentsModel.findOne({
            userId,
            docId,
            slotDate,
            slotTime,
        });

        if (userTaken) {
            return res.json({ success: false, message: "You already booked this appointment" });
        }

        const userData = await userModel.findById(userId).select("-password");

        const appointmentsData = {
            userId,
            docId,
            userData,
            doctorData,
            amount: doctorData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentsModel(appointmentsData);
        await newAppointment.save();

        let slots_Booked = doctorData.slots_Booked || {};
        if (!slots_Booked[slotDate]) {
            slots_Booked[slotDate] = [];
        }
        slots_Booked[slotDate].push(slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_Booked });

        res.json({ success: true, message: "appointment booked" });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message });
    }
}

const appointmentsList = async (req, res) => {
    try {
        const { userId } = req
        const appointments = await appointmentsModel.find({ userId })
        res.json({ success: true, appointments })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.meaage })
    }
}

const cancelAppointments = async (req, res) => {
    try {
        const { appointmentsId } = req.body
        const { userId } = req

        const appointmentsData = await appointmentsModel.findById(appointmentsId)

        if (appointmentsData.userId !== userId) {
            return res.json({ success: false, message: "unAuthorized access." })
        }

        await appointmentsModel.findByIdAndUpdate(appointmentsId, { cancelled: true })

        const { docId, slotDate, slotTime } = req.body
        const doctorData = await doctorModel.findById(docId)

        let slots_Booked = doctorData.slots_Booked || {}

        if (slots_Booked[slotDate]) {
            slots_Booked[slotDate] = slots_Booked[slotDate].filter(e => e !== slotTime)
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_Booked })
        res.json({ success: true, message: "appointment cancelled." })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const payment = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentsModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "appointment cancelled or not found" })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId
        }

        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === "paid") {
            await appointmentsModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "payment successfully" })
        }
        else {
            res.json({ success: false, message: "payment failed" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointments, appointmentsList, cancelAppointments, payment, verifyPayment }