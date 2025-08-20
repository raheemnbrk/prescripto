import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react";

import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import RelatedDoctors from "../components/appointments/relatedDoctors";
import { AppContext } from "../context/appContext";

export default function Appointments() {
    const { doctors } = useContext(AppContext)
    const { id } = useParams()
    const doc = doctors.find(ele => ele._id === id)

    const [docSlot, setDocSlot] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState("")
    const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

    const getCurrentDate = () => {
        setDocSlot([])
        let today = new Date()
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            if (currentDate.getDate() === today.getDate()) {
                const now = new Date();
                let minutes = now.getMinutes();
                let roundedMinutes = minutes <= 30 ? 0 : 30;
                let roundedHour = roundedMinutes === 0 ? now.getHours() + 1 : now.getHours();

                currentDate.setHours(Math.max(10, roundedHour));
                currentDate.setMinutes(roundedMinutes);
                currentDate.setSeconds(0);
                currentDate.setMilliseconds(0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
                currentDate.setSeconds(0);
                currentDate.setMilliseconds(0);
            }


            let timeSolt = []
            while (currentDate < endTime) {
                let formattedDate = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                timeSolt.push({
                    timeDate: new Date(currentDate),
                    time: formattedDate
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlot(prev => [...prev, timeSolt])
        }
    }

    useEffect(() => {
        getCurrentDate()
    }, [])

    return (
        <>
            <div className="py-4">
                <div className="flex flex-col md:flex-row gap-4" >
                    <div className="w-full md:w-[38%]" >
                        <img className="bg-primary w-full md:w-[900px] object-cover rounded-md" src={doc.image} alt={doc.name} />
                    </div>

                    <div className="flex flex-col relative z-50 bg-white bottom-24 md:bottom-0 w-[90%] mx-auto space-y-2 border border-gray-300 rounded-md p-8 py-5" >
                        <h1 className="flex items-center gap-2 text-3xl font-semibold capitalize text-gray-600" >
                            <span>{doc.name}</span>
                            <RiVerifiedBadgeFill className="text-blue-800" />
                        </h1>
                        <h1 className="text-gray-600 flex items-center gap-2" >
                            <span>{doc.degree} - </span>
                            <span>{doc.speciality}</span>
                            <button className="border border-gray-300 text-xs rounded-full p-1 cursor-pointer" >{doc.experience}</button>
                        </h1>
                        <h1 className="flex items-center capitalize gap-1" >
                            <span>about</span>
                            <IoIosInformationCircleOutline />
                        </h1>
                        <h1 className="text-sm text-gray-600" >{doc.about}</h1>
                        <h1 className="flex items-center fap-2 mt-4" >
                            <span className="capitalize text-gray-700" >appointement fees : </span>
                            <span className="font-medium" >${doc.fees}</span>
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col py-4 md:ml-78" >
                    <div className="flex flex-col space-y-4" >
                        <p className="text-gray-600 capitalize font-medium" >booking slot</p>
                        <div className="flex items-center gap-8 overflow-scroll" >{
                            docSlot.length && docSlot.map((ele, ind) => (
                                <div key={ind} onClick={() => setSlotIndex(ind)} className={`text-xl flex flex-col items-center border border-gray-300 p-4 rounded-full cursor-pointer capitalize ${slotIndex === ind ? "bg-primary text-white" : "bg-white text-gray-600"}`} >
                                    <p>{ele[0] && dayOfWeek[ele[0].timeDate.getDay()]}</p>
                                    <p>{ele[0] && ele[0].timeDate.getDate()}</p>
                                </div>
                            ))
                        }</div>
                        <div className="flex items-center gap-4 overflow-x-scroll" >
                            {docSlot.length && docSlot[slotIndex].map((ele, ind) => (
                                <p key={ind} onClick={() => setSlotTime(ele.time)} className={`py-2 px-4 border cursor-pointer rounded-full ${slotTime === ele.time ? "bg-primary text-white" : " border-gray-300 text-gray-400"}`} >{ele.time.toLowerCase()}</p>
                            ))}
                        </div>
                        <button className="text-white bg-primary rounded-full cursor-pointer px-16 py-3 capitalize w-fit" >book an appointement</button>
                    </div>
                </div>

                <RelatedDoctors doc={doc} />
            </div>
        </>
    )
}