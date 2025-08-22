import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/appContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export default function MyAppointments() {
    const { backend_url, token, getDoctorsData } = useContext(AppContext)
    const [appointments, setAppointments] = useState([])

    const navigate = useNavigate()

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/user/appointments', { headers: { token } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        }
        catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const cancelAppointments = async (appointment) => {
        try {
            const { data } = await axios.post(backend_url + '/api/user/cancel-appointments',
                {
                    appointmentsId: appointment._id,
                    docId: appointment.docId,
                    slotDate: appointment.slotDate,
                    slotTime: appointment.slotTime
                }
                , { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await getUserAppointments()
                await getDoctorsData()
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            console.log(err)
            toast(err.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'apointment payment',
            description: 'apointment payment',
            id: order.id,
            receipt: order.receipt,
            handler: async (res) => {
                console.log(res)

                try {
                    const { data } = await axios.post(backend_url + '/api/user/verify-razorPay', res, { headers: { token } })
                    if (data.success) {
                        getUserAppointments()
                        navigate("/myAppointments")
                    }
                    else {
                        toast.error(data.message)
                    }
                }
                catch (err) {

                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const appointmentPay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backend_url + '/api/user/payment-razorpay', { appointmentId: appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])
    return (
        <>
            <div className="flex flex-col space-y-6 mt-16" >
                <h1 className="text-gray-600 text-xl capitalize" >My appointements</h1>
                <div className="flex flex-col space-y-4 px-4 py-6" >
                    {appointments.map((ele, ind) => (
                        <div key={ind} className="p-4 flex flex-col md:flex-row md:justify-between gap-8 items-center border-b border-b-neutral-500" >
                            <div className="flex flex-col md:flex-row gap-2 items-center">
                                <div className="w-full md:w-[200px]" ><img src={ele.doctorData.image} /></div>
                                <div>
                                    <h1 className="text-xl font-medium" >{ele.doctorData.name}</h1>
                                    <p className="font-light text-gray-600" >{ele.doctorData.speciality}</p>
                                    <p className="mt-6 text-gray-600 capitalize font-semibold text-lg" >adress</p>
                                    <p className="text-gray-500 font-light">{ele.doctorData.address.line1}</p>
                                    <p className="text-gray-500 font-light">{ele.doctorData.address.line2}</p>
                                    <p className="flex gap-4" >
                                        <span>date & time:</span>
                                        <span className="text-gray-500 font-light" > {ele.slotDate} | {ele.slotTime} </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 capitalize font-semibold self-start ml-6 md:self-center" >
                                {!ele.cancelled && ele.payment && (<button onClick={() => appointmentPay(ele._id)} className="hover:bg-primary text-neutral-500 hover:text-white cursor-pointer px-4 py-2 border-2" >paid</button>)}
                                {!ele.cancelled && !ele.payment && (<button onClick={() => appointmentPay(ele._id)} className="hover:bg-primary text-neutral-500 hover:text-white cursor-pointer px-4 py-2 border-1 border-neutral-500 hover:border-primary" >pay online</button>)}
                                {!ele.cancelled && (<button onClick={() => cancelAppointments(ele)} className="px-4 py-2 w-fit border border-neutral-500 cursor-pointer text-neutral-500 hover:bg-red-500 hover:text-white hover:border-red-500" >cancel appointement</button>)}
                                {ele.cancelled && (<button className="bg-white text-red-900 border-2 border-red-900 cursor-pointer px-4 py-2" >appointment cancelled</button>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}