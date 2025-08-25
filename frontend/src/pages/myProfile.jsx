import { useState, useContext } from "react"
import { AppContext } from "../context/appContext"
import { toast } from "react-toastify"
import axios from "axios"

export default function MyProfile() {
    const { userData, setUserData, backend_url, loadUserProfileData , token } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setIamge] = useState(false)

    const updateUserProfile = async () => {
        try {
            const formData = new FormData()

            formData.append("name", userData.name)
            formData.append("phone", userData.phone)
            formData.append("address", JSON.stringify(userData.address))
            formData.append("gender", userData.gender)
            formData.append("dob", userData.dob)

            image && formData.append("image", image)

            const { data } = await axios.post(backend_url + '/api/user/update-profile', formData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setIamge(false)
            }
            else {
                console.log(data.message)
                toast.error(data.error)
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }

    return userData && (
        <div className="flex flex-col space-y-4 mt-16">
            {isEdit
                ? (
                    <label htmlFor="image">
                        <div>
                            <img className="w-36 rounded-lg" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        </div>
                        <input onChange={(e) => setIamge(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                    </label>
                )
                : (<img src={userData.image} className="w-36 rounded-lg" alt="profile" />)
            }
            <div className="flex flex-col space-y-4">
                {isEdit ? (
                    <input
                        className="bg-white px-4 py-2 text-2xl font-semibold capitalize w-fit border-2 border-gray-300 text-neutral-500 rounded-md"
                        value={userData.name || ""}
                        onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />
                ) : (
                    <p className="text-2xl font-semibold capitalize">{userData.name}</p>
                )}
                <hr className="text-neutral-500" />
            </div>

            <p className="text-xl font-semibold text-neutral-500 underline mt-5 capitalize">
                contact informations
            </p>
            <div className="grid grid-cols-[1fr_4fr] space-y-4">
                <p className="font-medium capitalize">email:</p>
                <p className="text-blue-400">{userData.email}</p>

                <p className="font-medium capitalize">phone:</p>
                {isEdit ? (
                    <input
                        className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                        value={userData.phone || ""}
                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                ) : (
                    <p className="text-blue-400">{userData.phone}</p>
                )}

                <p className="font-medium capitalize">address:</p>
                {isEdit ? (
                    <div className="flex flex-col space-y-2">
                        <input
                            className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                            value={userData.address?.line1 || ""}
                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                        />
                        <input
                            className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                            value={userData.address.line2 || ""}
                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col space-2">
                        <p className="text-gray-600">{userData.address.line1}</p>
                        <p className="text-gray-600">{userData.address.line2}</p>
                    </div>
                )}
            </div>

            <p className="text-xl font-semibold text-neutral-500 underline mt-5 capitalize">
                basic informations
            </p>
            <div className="grid grid-cols-[1fr_4fr] space-y-4">
                <p className="font-medium capitalize">gender:</p>
                {isEdit ? (
                    <input
                        className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                        value={userData.gender || ""}
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    />
                ) : (
                    <p className="text-gray-600">{userData.gender}</p>
                )}

                <p className="font-medium capitalize">date of birth:</p>
                {isEdit ? (
                    <input
                        className="bg-white px-4 py-2 text-gray-600 capitalize w-fit border-2 border-gray-300 rounded-md"
                        type="date"
                        value={userData.dob || ""}
                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                    />
                ) : (
                    <p className="text-gray-600">{userData.dob}</p>
                )}
            </div>

            {isEdit ? (
                <button
                    className="px-4 py-2 border-2 border-neutral-500 cursor-pointer rounded-full text-neutral-500 w-fit hover:bg-primary hover:text-white hover:border-primary transition-all duration-150"
                    onClick={updateUserProfile}
                >
                    save informations
                </button>
            ) : (
                <button
                    className="px-10 py-2 capitalize font-medium border-2 border-neutral-500 cursor-pointer rounded-full text-neutral-500 w-fit hover:bg-primary hover:text-white hover:border-primary transition-all duration-150"
                    onClick={() => setIsEdit(true)}
                >
                    edit
                </button>
            )}
        </div>
    )
}
