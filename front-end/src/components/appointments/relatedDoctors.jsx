import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../context/appContext"

export default function RelatedDoctors(props) {
    const { doctors } = useContext(AppContext)
    const relatedDocs = doctors.filter(ele => ele.speciality === props.doc.speciality)
    const filtredDocs = relatedDocs.filter(ele => String(ele._id) !== String(props.doc._id))
    return (
        <>
            <div className="pt-16 flex flex-col space-y-4 px-4">
                <h1 className="text-2xl font-semibold capitalize text-center" >related doctors</h1>
                <p className="text-gray-600 font-light text-center" >Simply browse through our extensive list of trusted <br /> doctors.</p>
                <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start" >
                    {filtredDocs.map((ele, ind) => (
                        <div key={ind} className="w-full md:w-[250px] border border-blue-200 rounded-xl cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden" >
                            <Link to={`/appointments/${ele._id}`} >
                                <img src={ele.image} className="bg-blue-50" />
                                <div className="p-4">
                                    <div className={`flex capitalize items-center gap-1 ${ele.available ? "text-green-600" : "text-red-500"}`}>
                                        <span className={`inline-block w-2 h-2 rounded-full ${ele.available ? "bg-green-600" : "bg-red-500"}`}></span>
                                        {!ele.available && (<p>not</p>)}
                                        <p>available</p>
                                    </div>
                                    <p className="font-semibold">{ele.name}</p>
                                    <p className="text-gray-500">{ele.speciality}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}