import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const doctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [docProfile, setDocProfile] = useState(false)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/doctor/doctor-appointments', { headers: { token: dToken } })
            if (data.success) {
                setAppointments(data.doctorAppointments.reverse())
                console.log(data.doctorAppointments)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const markCompleted = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/doctor/complete-apointment', { appointmentId: appointmentId }, { headers: { token: dToken } })
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/doctor/cancel-appointment', { appointmentId: appointmentId }, { headers: { token: dToken } })
            if (data.success) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/doctor/doctor-dashboard', { headers: { token: dToken } })
            if (data.success) {
                setDashData(data.dashboardData)
                console.log(data.dashboardData)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const getDoctorProfile = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/doctor/doctor-profile', { headers: { token: dToken } })
            if (data.success) {
                setDocProfile(data.doctorProfile)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const calculateAge = (dob) => {
        const date = new Date()
        const bd = new Date(dob)

        let age = date.getFullYear() - bd.getFullYear()
        return age
    }

    

    const value = {
        dToken, setDToken, backend_url,
        appointments,
        getAppointments,
        calculateAge,
        markCompleted,
        cancelAppointment,
        getDashData,
        dashData,
        docProfile, getDoctorProfile, setDocProfile
    }
    return (
        <doctorContext.Provider value={value} >
            {children}
        </doctorContext.Provider>
    )
}

export default DoctorContextProvider