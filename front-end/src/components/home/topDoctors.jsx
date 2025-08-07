import { docInfos } from "../../assets/assets"

import { Link } from "react-router-dom"

export default function TopDoctors() {
    return (
        <>
            <div className="flex flex-col space-y-6 mt-36">
                <h1 className="text-2xl font-semibold capitalize text-center">top doctors to book</h1>
                <p className="font-lihgt text-center" >simply brows through our extense list of trusted doctors</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
                    {docInfos.slice(0, 10).map((ele, ind) => (
                        <div key={ind} className="border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden" >
                            <Link to={`appointments/${ele._id}`} >
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
                <button className="bg-blue-50 px-8 py-2 my-8 text-gray-600 cursor-pointer font-semibold rounded-full w-fit mx-auto" >
                    <Link to={'doctors'} >
                        more
                    </Link>
                </button>
            </div>
        </>
    )
}