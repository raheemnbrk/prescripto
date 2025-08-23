import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AdminContext = createContext()

export default function AdminContextProvider({ children }) {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [aToken, setAToken] = useState(localStorage.getItem("token") || "")
  const [allDoctors, setAllDoctors] = useState([])
  const [appointments, setAppointments] = useState([])

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backend_url + `/api/admin/all-doctors`, {}, { headers: { aToken } })
      if (data.success) {
        setAllDoctors(data.doctors)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(backend_url + "/api/admin/change-availablity", { docId }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        getAllDoctors()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backend_url + '/api/admin/appointments', { headers: { aToken } })
      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
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

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backend_url + '/api/admin/cancel-appointment', { appointmentId: appointmentId }, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        await getAllAppointments()
      }
      else {
        toast.error(data.message)
        console.log(data.message)
      }
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <AdminContext.Provider value={{ backend_url, aToken, setAToken, allDoctors, getAllDoctors, changeAvailablity, getAllAppointments, appointments, calculateAge , cancelAppointment }}>
      {children}
    </AdminContext.Provider>
  )
}
