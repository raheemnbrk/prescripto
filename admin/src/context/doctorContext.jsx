import { useContext } from "react";
import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";

export const doctorContext = createContext()

const DoctorContextProvider = ({ children }) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || '')

    const value = {
        dToken, setDToken, backend_url
    }
    return (
        <doctorContext.Provider value={value} >
            {children}
        </doctorContext.Provider>
    )
}

export default DoctorContextProvider