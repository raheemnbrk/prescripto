import { useContext, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { AdminContext } from "../context/adminContext"
import { doctorContext } from "../context/doctorContext"

export default function Login() {
    const [state, setState] = useState('admin')

    const { backend_url, setAToken } = useContext(AdminContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setDToken } = useContext(doctorContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'admin') {
                const { data } = await axios.post(backend_url + `/api/admin/login`, { email, password })
                if (data.token) {
                    console.log(data)
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    toast.success("login success")
                }
                else {
                    toast.error('login failed')
                }
            }
            else {
                const { data } = await axios.post(backend_url + '/api/doctor/doctor-login', { email, password })
                if (data.token) {
                    console.log(data)
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    toast.success("login success")
                }
                else {
                    toast.error('login failed')
                }
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <>
            <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
                <div className="flex flex-col gap-6 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm text-gray-600 shadow-lg" >
                    <p className="flex items-center gap-2 text-2xl font-semibold capitalize mx-auto" >
                        <span className="text-primary" >{state}</span>
                        <span>login</span>
                    </p>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium text-gray-500 capitalize">email</p>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" required className="w-[320px] px-4 py-2 border-1 border-gray-300 rounded-md outline-0" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium text-gray-500 capitalize">password</p>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" required className="w-[320px] px-4 py-2 border-1 border-gray-300 rounded-md outline-0" />
                    </div>
                    <button className="bg-primary text-white rounded-lg px-4 py-2 cursor-pointer w-full text-lg" >Login</button>
                    {state === 'admin'
                        ? (<p className="capitalize flex items-center gap-2 mx-auto"><span>doctor login?</span><span onClick={() => setState('doctor')} className="text-primary cursor-pointer underline">click here</span></p>)
                        : (<p className="capitalize flex items-center gap-2 mx-auto"><span>admin login?</span><span onClick={() => setState('admin')} className="text-primary cursor-pointer underline">click here</span></p>)
                    }
                </div>
            </form>
        </>
    )
}