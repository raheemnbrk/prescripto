import { useContext } from "react"
import { AdminContext } from "../../context/adminContext"
import { useEffect } from "react"
import { IoClose } from "react-icons/io5";

export default function AllApointments() {
    const { getAllAppointments, appointments, aToken, calculateAge, cancelAppointment } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])
    return (
        <>
            <div className="w-full flex flex-col space-y-6 p-4" >
                <h1 className="text-2xl font-medium capitalize" >all appointments</h1>
                <div className="bg-white rounded-md text-sm" >
                    <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-b capitalize" >
                        <p>#</p>
                        <p>patient</p>
                        <p>age</p>
                        <p>date & time</p>
                        <p>doctor</p>
                        <p>fees</p>
                        <p>actions</p>
                    </div>
                    {appointments.map((ele, ind) => (
                        <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] text-gray-500 px-6 py-3 hover:bg-gray-100 rounded-md cursor-pointer" key={ind}>
                            <p className="max-sm:hidden" >{ind + 1}</p>
                            <div className="flex items-center gap-2 " >
                                <img className="w-8 rounded-full" src={ele.userData.image} alt="" />
                                <p>{ele.userData.name}</p>
                            </div>
                            <p className="max-sm:hidden" >{calculateAge(ele.userData.dob)}</p>
                            <p>{ele.slotDate} , {ele.slotTime}</p>
                            <div className="flex items-center gap-2 " >
                                <img className="w-8 rounded-full" src={ele.doctorData.image} alt="" />
                                <p>{ele.doctorData.name}</p>
                            </div>
                            <p>{`$${ele.amount}`}</p>
                            {ele.cancelled
                                ? (<p className="text-red-300 font-medium" >cancelled</p>)
                                : <button
                                    onClick={() => cancelAppointment(ele._id)}
                                    className="w-6 h-6 flex justify-center items-center rounded-full cursor-pointer bg-red-100 shadow"
                                >
                                    <IoClose className="text-red-300" size={16} />
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}