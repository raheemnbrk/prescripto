import { useContext } from "react"
import { doctorContext } from "../../context/doctorContext"
import { useEffect } from "react"
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

export default function DoctorAppointments() {
    const { appointments, getAppointments, dToken, calculateAge, markCompleted, cancelAppointment } = useContext(doctorContext)

    useEffect(() => {
        getAppointments()
    }, [dToken])
    return (
        <>
            <div className="flex flex-col w-full p-4">
                <p className="font-semibold mt-3 ml-4 text-lg capitalize">all appointments</p>

                <div className="bg-white rounded-md text-sm">
                    <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 border-b-2 border-b-gray-200 px-4 pb-3 capitalize">
                        <p>#</p>
                        <p>patient</p>
                        <p>payment</p>
                        <p>age</p>
                        <p>date & time</p>
                        <p>fees</p>
                        <p>action</p>
                    </div>
                </div>

                {appointments.map((ele, ind) => (
                    <div key={ind}>
                        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-gray-600">
                            <p>{ind + 1}</p>
                            <div className="flex items-center gap-2">
                                <img className="w-6 h-6 rounded-full" src={ele.userData.image} />
                                <p>{ele.userData.name}</p>
                            </div>
                            <p className="px-2 border border-gray-600 rounded-full w-fit">{ele.payment ? "online" : "cash"}</p>
                            <p>{calculateAge(ele.userData.dob)}</p>
                            <p>{ele.slotDate}, {ele.slotTime}</p>
                            <p>${ele.amount}</p>
                            <div className="flex gap-2">
                                {ele.isCompleted ? (
                                    <p className="text-green-600">completed</p>
                                ) : ele.cancelled ? (
                                    <p className="text-red-600">cancelled</p>
                                ) : (
                                    <>
                                        <button onClick={() => cancelAppointment(ele._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-red-100 text-red-300 font-bold border border-red-300">
                                            <IoClose />
                                        </button>
                                        <button onClick={() => markCompleted(ele._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-green-100 text-green-300 font-bold border border-green-300">
                                            <IoMdCheckmark />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="sm:hidden flex flex-col gap-1 border-b px-3 py-2 text-gray-700">
                            <div className="flex items-center gap-2">
                                <img className="w-8 h-8 rounded-full" src={ele.userData.image} />
                                <p className="font-medium">{ele.userData.name}</p>
                            </div>
                            <p className="text-sm"><span className="font-semibold">Payment:</span> {ele.payment ? "online" : "cash"}</p>
                            <p className="text-sm"><span className="font-semibold">Age:</span> {calculateAge(ele.userData.dob)}</p>
                            <p className="text-sm"><span className="font-semibold">Date & Time:</span> {ele.slotDate}, {ele.slotTime}</p>
                            <p className="text-sm"><span className="font-semibold">Fees:</span> ${ele.amount}</p>
                            <div className="flex gap-2 mt-1">
                                {ele.isCompleted ? (
                                    <p className="text-green-600">completed</p>
                                ) : ele.cancelled ? (
                                    <p className="text-red-600">cancelled</p>
                                ) : (
                                    <>
                                        <button onClick={() => cancelAppointment(ele._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-red-100 text-red-300 font-bold border border-red-300">
                                            <IoClose />
                                        </button>
                                        <button onClick={() => markCompleted(ele._id)} className="w-6 h-6 flex items-center justify-center rounded-full cursor-pointer bg-green-100 text-green-300 font-bold border border-green-300">
                                            <IoMdCheckmark />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}