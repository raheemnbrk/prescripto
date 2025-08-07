import { useState } from "react"
import { assets } from "../assets/assets"

export default function MyProfile() {
    const [user, setUser] = useState(
        {
            name: "edward vincet",
            image: assets.profile,
            email: "abcabc@gmail.com",
            phone: "+1 123 456 78",
            adrees: {
                line1: "hello my street ,st",
                line2: "second building"
            },
            gender: "male",
            dob: "2004-07-13"
        }
    )
    const [isEdit, setIsEdit] = useState(false)
    return (
        <>
            <div className="flex flex-col space-y-4 mt-16" >
                <img src={user.image} className="w-36 rounded-lg" />
                <div className="flex flex-col space-y-4" >
                    {isEdit ?
                        <input
                            className="bg-white px-4 py-2 text-2xl font-semibold capitalize w-fit border-2 rounded-md"
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                        : (<p className="text-2xl font-semibold capitalize" >{user.name}</p>)
                    }
                    <hr className="text-neutral-500" />
                </div>
                <p className="text-xl font-semibold text-neutral-500 underline mt-5 capitalize">contact informations</p>
                <div className="grid grid-cols-[1fr_4fr] space-y-4" >
                    <p className="font-medium capitalize" >email:</p>
                    <p className="text-blue-400">{user.email}</p>
                    <p className="font-medium capitalize" >phone:</p>
                    {isEdit ?
                        <input
                            className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                            value={user.phone}
                            onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        : (<p className="text-blue-400">{user.phone}</p>)
                    }
                    <p className="font-medium capitalize" >adress:</p>
                    {isEdit ?
                        <div className="flex flex-col space-y-2" >
                            <input
                                className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                                value={user.adrees.line1}
                                onChange={(e) => setUser(prev => ({ ...prev.adrees, line1: e.target.value }))}
                            />
                            <input
                                className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                                value={user.adrees.line2}
                                onChange={(e) => setUser(prev => ({ ...prev.adrees, line2: e.target.value }))}
                            />
                        </div>
                        : (<div className="flex flex-col space-2" >
                            <p className="text-gray-600">{user.adrees.line1}</p>
                            <p className="text-gray-600">{user.adrees.line2}</p>
                        </div>)
                    }
                </div>
                <p className="text-xl font-semibold text-neutral-500 underline mt-5 capitalize">basic informations</p>
                <div className="grid grid-cols-[1fr_4fr] space-y-4" >
                    <p className="font-medium capitalize" >gender:</p>
                    {isEdit ? (<input
                        className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                        value={user.gender}
                        onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))}
                    />
                    ) : (
                        <p className="text-gray-600">{user.gender}</p>)
                    }
                    <p className="font-medium capitalize" >date of birth:</p>
                    {isEdit ? (
                        <input
                            className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                            type="date"
                            value={user.dob}
                            onChange={(e) => setUser(prev => ({ ...prev, dob: e.target.value }))}
                        />) :
                        (<p className="text-gray-600" >{user.dob}</p>)
                    }

                </div>
                {isEdit ? (
                    <button className="px-4 py-2 border-2 border-neutral-500 cursor-pointer rounded-full text-neutral-500 w-fit hover:bg-primary hover:text-white hover:border-primary transition-all duration-150" onClick={()=>setIsEdit(false)} >save informations</button>) :
                    (<button className="px-4 py-2 border-2 border-neutral-500 cursor-pointer rounded-full text-neutral-500 w-fit hover:bg-primary hover:text-white hover:border-primary transition-all duration-150"  onClick={() => setIsEdit(true)} >edit</button>)
                }

            </div>
        </>
    )
}