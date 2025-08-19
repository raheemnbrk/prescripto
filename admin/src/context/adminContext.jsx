import { createContext, useState } from "react"

export const AdminContext = createContext()

export default function AdminContextProvider({ children }) {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [aToken, setAToken] = useState(localStorage.getItem("token") || "")

  return (
    <AdminContext.Provider value={{ backend_url, aToken, setAToken }}>
      {children}
    </AdminContext.Provider>
  )
}
