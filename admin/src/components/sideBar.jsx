import { useContext } from "react"
import { AdminContext } from "../context/adminContext"
import { NavLink } from "react-router-dom"

import { IoHomeOutline, IoPeople } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineAddBox } from "react-icons/md";
import { doctorContext } from "../context/doctorContext";

export default function SideBar() {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(doctorContext)
  return (
    <>
      <div className="border-r border-r-gray-400 min-h-screen px-2 py-4" >
        {
          aToken && (
            <ul>
              <NavLink to="admin-dashboard" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoHomeOutline />
                <p className="hidden md:block">dashboard</p>
              </NavLink>
              <NavLink to="all-apointments" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <SlCalender />
                <p className="whitespace-nowrap hidden md:block">all apointments</p>
              </NavLink>
              <NavLink to="add-doctor" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <MdOutlineAddBox />
                <p className="hidden md:block">add doctor</p>
              </NavLink>
              <NavLink to="doctor-list" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoPeople />
                <p className="hidden md:block">doctor list</p>
              </NavLink>
            </ul>
          )
        }

        {
          dToken && (
            <ul>
              <NavLink to="doctor-dashboard" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoHomeOutline />
                <p className="hidden md:block">dashboard</p>
              </NavLink>
              <NavLink to="doctor-appointments" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <SlCalender />
                <p className="whitespace-nowrap hidden md:block">all apointments</p>
              </NavLink>
              <NavLink to="doctor-profile" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoPeople />
                <p className="hidden md:block">profile</p>
              </NavLink>
            </ul>
          )
        }
      </div>
    </>
  )
}