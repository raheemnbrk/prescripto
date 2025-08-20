import { useContext } from "react"
import { AdminContext } from "../context/adminContext"
import { NavLink } from "react-router-dom"

import { IoHomeOutline, IoPeople } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineAddBox } from "react-icons/md";

export default function SideBar() {
  const { aToken } = useContext(AdminContext)
  return (
    <>
      <div className="border-r border-r-gray-400 min-h-screen px-2 py-4" >
        {
          aToken && (
            <ul>
              <NavLink to="admin-dashboard" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoHomeOutline />
                <p>dashboard</p>
              </NavLink>
              <NavLink to="all-apointments" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <SlCalender />
                <p className="whitespace-nowrap">all apointments</p>
              </NavLink>
              <NavLink to="add-doctor" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <MdOutlineAddBox />
                <p>add doctor</p>
              </NavLink>
              <NavLink to="doctor-list" className="flex items-center gap-2 hover:underline hover:bg-gray-100 px-4 py-2 rounded-md text-gray-600 capitalize cursor-pointer">
                <IoPeople />
                <p>doctor list</p>
              </NavLink>
            </ul>
          )
        }
      </div>
    </>
  )
}