import { useContext } from "react"
import { doctorContext } from "../../context/doctorContext"
import { useEffect } from "react"

export default function DoctorProfile() {
    const { docProfile, setDocProfile, dToken, getDoctorProfile } = useContext(doctorContext)

    useEffect(() => {
        getDoctorProfile()
    }, [dToken])

    return (
        <>
            <div>
                <p className="font-semibold mt-3 ml-4 text-lg capitalize">doctor dashBoard</p>
                <div>
                    {docProfile && (
                        <div className="flex flex-col gap-4 m-5" >
                            <div>
                                <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={docProfile.image} alt="" />
                            </div>

                            <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-gray-100" >
                                <p className="flex items-center gap-2 text-3xl font-medium text-gray-700" >{docProfile.name}</p>
                                <div className="flex items-center gap-2 mt-1 text-gray-600" >
                                    <p>{docProfile.degree} - {docProfile.speciality}</p>
                                    <button className="border-1 border-gray-600 px-2 rounded-full text-sm">{docProfile.experience}</button>
                                </div>
                                <div className="flex flex-col gap-1  text-neutral-800 mt-3" >
                                    <p className="capitalize text-sm font-medium" >about:</p>
                                    <p className="text-gray-600" >{docProfile.about}</p>
                                </div>
                                <p className="text-gray-600 font-medium mt-4" >appointment fee : {docProfile.fees}</p>
                                <div className="flex gap-2 py-2" >
                                    <p>adress: </p>
                                    <p className="text-sm" >
                                        {docProfile.address.line1}
                                        <br />
                                        {docProfile.address.line2}
                                    </p>
                                </div>

                                <div className="flex gap-1 pt-2" >
                                    <input type="checkbox" />
                                    <label htmlFor="" >available</label>
                                </div>

                                <button className="px-4 py-1 border border-primary text-sm rounded-full mt-5 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 capitalize" >edit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}