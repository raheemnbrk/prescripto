import { PiCodaLogoFill } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import ResponsiveMenu from "./responsiveMenu";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

export default function NavBar() {
    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)
    const [showList, setShowList] = useState(false)

    const logOut = () => {
        setToken('')
        localStorage.removeItem('token')
        setShowMenu(false)
    }
    return (
        <>
            <div className="flex items-center justify-between pb-5 border-b border-b-gray-400">
                <Link to={"/"} >
                    <div className="flex gap-2 text-2xl sm:text-3xl font-bold items-center cursor-pointer">
                        <PiCodaLogoFill className="text-primary text-4xl" />
                        <h1 className="capitalize text-blue-950">prescripto</h1>
                    </div>
                </Link>

                <div className="hidden md:block">
                    <ul className="flex gap-6 " >
                        <li>
                            <NavLink
                                to={'/'}
                                className={({ isActive }) => `pb-1 uppercase font-semibold text-sm ${isActive ? 'border-b-2 border-primary' : ''}`}>
                                home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'doctors'}
                                className={({ isActive }) => `pb-1 uppercase font-semibold text-sm ${isActive ? 'border-b-2 border-b-primary' : ''}`}>
                                all doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'about'}
                                className={({ isActive }) => `pb-1 uppercase font-semibold text-sm ${isActive ? 'border-b-2 border-b-primary' : ''}`}>
                                about
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'contact'}
                                className={({ isActive }) => `pb-1 uppercase font-semibold text-sm ${isActive ? 'border-b-2 border-b-primary' : ''}`}>
                                contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="flex gap-4 items-center" >
                    {token ?
                        (
                            <div className="relative">
                                <div className="flex gap-1 cursor-pointer items-center" onClick={() => setShowMenu(prev => !prev)}>
                                    <img className="w-8 rounded-full" src={userData.image} />
                                    <FaAngleDown />
                                </div>

                                {showMenu && (
                                    <div className="absolute top-full right-0 mt-6 bg-stone-100 p-4 z-50 min-w-max whitespace-nowrap rounded-md shadow-md space-y-2">
                                        <Link to="myProfile" ><p onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-black cursor-pointer">my profile</p></Link>
                                        <Link to={"myAppointments"} ><p onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-black cursor-pointer">my appointments</p></Link>
                                        <Link to={"/"} ><p className="text-gray-600 hover:text-black cursor-pointer" onClick={logOut}>log out</p></Link>
                                    </div>
                                )}
                            </div>
                        ) :
                        <Link to={"login"}><button className="px-6 py-2 bg-primary text-white capitalize cursor-pointer rounded-full" >create account</button></Link>
                    }
                    <HiMenuAlt3 onClick={() => setShowList(true)} className="text-2xl text-primary cursor-pointer block md:hidden" />
                </div>
                <ResponsiveMenu showList={showList} setShowList={setShowList} />
            </div>
        </>
    )
}