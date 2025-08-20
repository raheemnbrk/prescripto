import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/adminContext"

export default function DoctorList() {
    const { allDoctors, aToken, getAllDoctors } = useContext(AdminContext)
    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    },
        [aToken])
    return (
        <>
            <div className="px-8 py-4 space-y-4" >
                <h1 className="text-xl font-medium capitalize" >all doctors</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center" >
                    {allDoctors.map((ele, ind) => (
                        <div key={ind} className="border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden" >
                            <img src={ele.image} className="bg-blue-50" />
                            <div className="p-4">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={ele.available} />
                                    <p className="capitalize text-green-600">available</p>
                                </div>
                                <p className="font-semibold">{ele.name}</p>
                                <p className="text-gray-500">{ele.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}