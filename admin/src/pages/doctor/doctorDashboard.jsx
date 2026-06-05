import { useContext } from "react"
import { doctorContext } from "../../context/doctorContext"
import { useEffect } from "react"

import { assets } from "../../assets/assets"

import { FaRegListAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

export default function DoctorDashboard() {
    const { dashData, getDashData, dToken, cancelAppointment, markCompleted } = useContext(doctorContext)
    useEffect(() => {
        getDashData()
    }, [dToken])
    return (
        <>
            <div className="flex flex-col gap-4 px-4 py-4" >
                <p className="font-semibold mt-3 ml-4 text-lg capitalize">doctor dashBoard</p>
                {dashData && (
                    <div className="flex flex-col gap-8" >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8" >
                            <div className="flex items-center gap-4 bg-gray-100 w-64 px-2 py-1 rounded-md cursor-pointer capitalize">
                                <img src={assets.earning_icon} alt="" />
                                <div>
                                    <p className="font-medium text-xl">${dashData.earning}</p>
                                    <p className="text-md font-medium text-gray-500" >earnings</p>
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
                                    <p className="font-medium text-xl">{dashData.patients}</p>
                                    <p className="text-md font-medium text-gray-500" >patienst</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8" >
                            <div className="flex items-center gap-3 p-4 rouded-md mt-8 text-xl font-semibold capitalize" >
                                <FaRegListAlt className="text-primary" />
                                <p>latest booking</p>
                            </div>

                            <div className="hidden sm:block" >
                                {dashData.latestAppointments.map((item, ind) => (
                                    <div className="items-center gap-4 px-6 py-2 hover:bg-gray-100 cursor-pointer grid grid-cols-[3fr_5fr_2fr] rounded-md" key={ind}>
                                        <img className="w-10 rounded-full" src={item.userData.image} alt="" />
                                        <div>
                                            <p className="text-gray-600 font-medium">{item.userData.name}</p>
                                            <p className="text-gray-500" >{item.slotDate}</p>
                                        </div>
                                        {item.isCompleted ? (
                                            <p className="text-green-600">completed</p>
                                        ) : item.cancelled ? (
                                            <p className="text-red-600">cancelled</p>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button onClick={() => cancelAppointment(item._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-red-100 text-red-300 font-bold border border-red-300">
                                                    <IoClose />
                                                </button>
                                                <button onClick={() => markCompleted(item._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-green-100 text-green-300 font-bold border border-green-300">
                                                    <IoMdCheckmark />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                ))}
                            </div>

                            <div className="block sm:hidden" >
                                {dashData.latestAppointments.map((item, ind) => (
                                    <div className="flex flex-col space-y-4 px-4 py-2 bg-gray-100 rounded-md" key={ind}>
                                        <div className="flex gap-2" >
                                            <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="" />
                                            <p>{item.userData.name}</p>
                                        </div>
                                        <p>{item.slotDate},{item.slotTime}</p>
                                        {item.isCompleted ? (
                                            <p className="text-green-600">completed</p>
                                        ) : item.cancelled ? (
                                            <p className="text-red-600">cancelled</p>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button onClick={() => cancelAppointment(item._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-red-100 text-red-300 font-bold border border-red-300">
                                                    <IoClose />
                                                </button>
                                                <button onClick={() => markCompleted(item._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-green-100 text-green-300 font-bold border border-green-300">
                                                    <IoMdCheckmark />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}