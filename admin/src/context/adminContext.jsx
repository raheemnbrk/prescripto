import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AdminContext = createContext()

export default function AdminContextProvider({ children }) {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [aToken, setAToken] = useState(localStorage.getItem("token") || "")
  const [allDoctors, setAllDoctors] = useState([])

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
      toast.error(err.message )
    }
  }

  return (
    <AdminContext.Provider value={{ backend_url, aToken, setAToken , allDoctors , getAllDoctors }}>
      {children}
    </AdminContext.Provider>
  )
}
