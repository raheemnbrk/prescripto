import { docInfos } from "../assets/assets"
import { Link, useSearchParams } from "react-router-dom"
import { useState } from "react"

export default function Doctors() {
    const specialities = new Set(docInfos.map(ele => ele.speciality))
    const [searchParams, setSearchParams] = useSearchParams()
    const filetrSpecialty = searchParams.get("speciality")
    const filetredSpecialty = filetrSpecialty ?
        docInfos.filter(ele => ele.speciality === filetrSpecialty)
        : docInfos
    const [showFilter, setShowFilter] = useState(false)
    return (
        <>
            <div className="flex flex-col space-y-4 py-8" >
                <p className="text-gray-600" >Browse through the doctors specialist.</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        className={`px-4 py-2 w-fit rounded-md transition-all block md:hidden ${showFilter ? "bg-gray-200" : "bg-primary text-white"}`}
                        onClick={() => setShowFilter(prev => !prev)}
                    >
                        filter
                    </button>
                    <ul className={`flex flex-col space-y-4 ${showFilter ? "block" : "hidden md:block"}`} >
                        {Array.from(specialities).map((ele, ind) => (
                            <li
                                key={ind}
                                onClick={() => { setSearchParams(`speciality=${ele}`) }}
                                className={`pl-4 pr-12 py-1 border border-gray-300 text-gray-600 text-md font-normal cursor-pointer whitespace-nowrap rounded-md ${ele === filetrSpecialty ? "bg-indigo-100" : ""}`}
                            >{ele}</li>
                        ))}
                        {filetrSpecialty && (
                            <li
                                className="pl-4 pr-12 py-1 border border-gray-300 text-gray-600 text-md font-normal cursor-pointer whitespace-nowrap rounded-md "
                                onClick={() => setSearchParams("")}
                            >clear filter</li>
                        )}
                    </ul>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center`}>
                        {filetredSpecialty.map((ele, ind) => (
                            <div key={ind} className="border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden" >
                                <Link to={`/appointments/${ele._id}`} >
                                    <img src={ele.image} className="bg-blue-50" />
                                    <div className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
                                            <p className="capitalize text-green-600">available</p>
                                        </div>
                                        <p className="font-semibold">{ele.name}</p>
                                        <p className="text-gray-500">{ele.speciality}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}