import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backend_url + "/api/doctor/list")
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    };

    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        backend_url,
        doctors,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider