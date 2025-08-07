import { useState } from "react"

export default function Login() {
    const [state, setState] = useState("sign up")
    return (
        <>
            <form className="flex flex-col space-y-3 mt-24 md:mt-16 mx-auto p-8 w-fit border border-gray-200 rounded-lg shadow-lg" >
                <p className="text-2xl text-gray-600 font-semibold capitalize self-start" >{state === "sign up" ? "create account" : "login"}</p>
                <p className="text-gray-500 text-sm font-light capitalize self-start" >please {state === "sign up" ? "sign up" : "login"} to book an appointment</p>
                {state === "sign up" && (
                    <div className="flex flex-col gap-2" >
                        <p className="text-gray-500 capitalize text-sm">full name</p>
                        <input className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="text" required />
                    </div>
                )}
                <div className="flex flex-col gap-2" >
                    <p className="text-gray-500 capitalize text-sm">email</p>
                    <input className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="text" required />
                </div>
                <div className="flex flex-col gap-2" >
                    <p className="text-gray-500 capitalize text-sm">password</p>
                    <input className="border border-gray-300 w-[300px] p-1.5 rounded-md " type="text" required />
                </div>
                <button className="bg-primary pz-4 py-2 rounded-lg cursor-pointer text-white capitalize font-semibold w-[300px]" >{state === "sign up" ? "create account" : "login"}</button>
                <div className="text-sm text-gray-500 self-start text-left flex gap-1" >
                    <span>{state === "sign up" ? "Already have an account?" : "Create an new account?"}</span>
                    <span onClick={() => setState(state === "sign up" ? "login" : "sign up")} className="text-primary underline font-semibold cursor-pointer" >{state === "sign up" ? "login here" : "click here"}</span>
                </div>
            </form>
        </>
    )
}