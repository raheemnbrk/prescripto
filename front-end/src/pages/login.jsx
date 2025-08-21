import { useContext } from "react"
import { useState } from "react"
import { AppContext } from "../context/appContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const { backend_url, token, setToken } = useContext(AppContext)
    const [state, setState] = useState("sign up")

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (state === 'sign up') {
                const { data } = await axios.post(backend_url + `/api/user/register`, { name, email, password })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                }    
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backend_url + `/api/user/login`, { email, password })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-24 md:mt-16 mx-auto p-8 w-fit border border-gray-200 rounded-lg shadow-lg" >
                <p className="text-2xl text-gray-600 font-semibold capitalize self-start" >{state === "sign up" ? "create account" : "login"}</p>
                <p className="text-gray-500 text-sm font-light capitalize self-start" >please {state === "sign up" ? "sign up" : "login"} to book an appointment</p>
                {state === "sign up" && (
                    <div className="flex flex-col gap-2" >
                        <p className="text-gray-500 capitalize text-sm">full name</p>
                        <input onChange={(e) => setName(e.target.value)} className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="text" required />
                    </div>
                )}
                <div className="flex flex-col gap-2" >
                    <p className="text-gray-500 capitalize text-sm">email</p>
                    <input onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="email" required />
                </div>
                <div className="flex flex-col gap-2" >
                    <p className="text-gray-500 capitalize text-sm">password</p>
                    <input onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="password" required />
                </div>
                <button type="submit" className="bg-primary pz-4 py-2 rounded-lg cursor-pointer text-white capitalize font-semibold w-[300px]" >{state === "sign up" ? "create account" : "login"}</button>
                <div className="text-sm text-gray-500 self-start text-left flex gap-1" >
                    <span>{state === "sign up" ? "Already have an account?" : "Create an new account?"}</span>
                    <span onClick={() => setState(state === "sign up" ? "login" : "sign up")} className="text-primary underline font-semibold cursor-pointer" >{state === "sign up" ? "login here" : "click here"}</span>
                </div>
            </form>
        </>
    )
}