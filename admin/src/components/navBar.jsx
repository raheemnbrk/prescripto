import { useContext } from "react";
import { PiCodaLogoFill } from "react-icons/pi";
import { AdminContext } from '../context/adminContext'

export default function NavBar() {
    const { aToken, setAToken } = useContext(AdminContext)

    const logout = () => {
        aToken && setAToken('')
        aToken && localStorage.removeItem("token")
    }
    return (
        <>
            <div className="flex items-center justify-between px-4 sm:px-10 py-4" >
                <div className="flex items-center text-xl sm:text-3xl cursor-pointer gap-2" >
                    <PiCodaLogoFill className="text-primary text-2xl sm:text-4xl" />
                    <p className="flex flex-col" >
                        <span className="font-semibold">prescripto</span>
                        <span className="text-xs font-light" >dashbord panel</span>
                    </p>
                    <p className="text-sm font-light px-1.5 py-0.5 border-1 rounded-full cursor-pointer capitalize mb-2" >{aToken ? 'admin' : 'doctor'}</p>
                </div>
                <button onClick={logout}  className="bg-primary outline-0 cursor-pointer text-white font-medium px-10 py-2 rounded-full" >logout</button>
            </div>
        </>
    )
}