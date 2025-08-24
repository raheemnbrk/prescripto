import { useContext } from "react"
import { AdminContext } from "../../context/adminContext"
import { useEffect } from "react"

import { FaRegListAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { assets } from "../../assets/assets"

export default function DashBoard() {
    const { dashData, getDashBoardData, aToken, cancelAppointment } = useContext(AdminContext)

    useEffect(() => {
        getDashBoardData()
    }, [aToken])

    return (
        <>
            <div className="flex flex-col gap-6 p-4" >
                <h1 className='font-semibold mt-3 ml-4 text-lg capitalize' >dashboard</h1>

                {dashData && (
                    <div className="flex flex-col gap-8" >
                        <div className="flex items-center justify-between gap-8" >
                            <div className="flex items-center gap-4 bg-gray-100 w-64 px-2 py-1 rounded-md cursor-pointer capitalize">
                                <img src={assets.doctor_icon} alt="" />
                                <div>
                                    <p className="font-medium text-xl">{dashData.doctors}</p>
                                    <p className="text-md font-medium text-gray-500" >doctors</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-gray-100 w-64 px-2 py-1 rounded-md cursor-pointer capitalize">
                                <img src={assets.appointments_icons} alt="" />
                                <div>
                                    <p className="font-medium text-xl">{dashData.appointments}</p>
                                    <p className="text-md font-medium text-gray-500" >appointments</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-gray-100 w-64 px-2 py-1 rounded-md cursor-pointer capitalize">
                                <img src={assets.users_icon} alt="" />
                                <div>
                                    <p className="font-medium text-xl">{dashData.users}</p>
                                    <p className="text-md font-medium text-gray-500" >users</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8" >
                            <div className="flex items-center gap-3 p-4 rouded-md mt-8 text-xl font-semibold capitalize" >
                                <FaRegListAlt className="text-primary" />
                                <p>latest booking</p>
                            </div>
                            <div>
                                {dashData.latestAppointments.map((item, ind) => (
                                    <div className="items-center gap-4 px-6 py-2 hover:bg-gray-100 cursor-pointer grid grid-cols-[3fr_5fr_2fr] rounded-md" key={ind}>
                                        <img className="w-10 rounded-full" src={item.doctorData.image} alt="" />
                                        <div>
                                            <p className="text-gray-600 font-medium">{item.doctorData.name}</p>
                                            <p className="text-gray-500" >{item.slotDate}</p>
                                        </div>
                                        {item.cancelled
                                            ? (<p className="text-red-300 font-medium" >cancelled</p>)
                                            : <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer bg-red-100 shadow"
                                            >
                                                <IoClose className="text-red-300" size={16} />
                                            </button>
                                        }
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}