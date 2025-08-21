import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(false)

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

    const loadUserProfileData = async() => {
        try {
            const { data } = await axios.get(backend_url + '/api/user/get-profile', { headers: { token } })
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false)
        }
    } , [token])

    const value = {
        backend_url,
        doctors,
        token, setToken ,
        userData , setUserData , loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider