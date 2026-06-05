import { useContext, useState } from 'react'
import '../../assets/assets'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/adminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function AddDoctor() {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Gynecologist')
    const [degree, setDegree] = useState('')
    const [address1, setAdress1] = useState('')
    const [address2, setAdress2] = useState('')

    const { backend_url, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!docImg) {
                return toast.error("image not selected")
            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('fees', fees)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            formData.append('experience', experience)
            formData.append('degree', degree)
            formData.append('about', about)
            formData.append('speciality', speciality)

            const { data } = await axios.post(backend_url + `/api/admin/add-doctor`, formData, { headers: { aToken } })
            if (data.success) {
                toast.success('doctor added successfully')
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setDegree('')
                setFees('')
                setAbout('')
                setSpeciality('')
                setExperience('')
                setAdress1('')
                setAdress2('')
            } else {
                toast.error(data.msg || 'failed to add doctor')
            }
        }
        catch (err) {
            toast.error(err.message)
            console.log(err)
        }
    }
    return (
        <>
            <form className='w-full mt-5 px-8 flex flex-col gap-4' onSubmit={onSubmitHandler}>
                <p className='font-semibold mt-3 ml-4 text-lg capitalize' >add doctor</p>
                <div className='bg-white px-8 py-8 border border-gray-400 rounded-md shadow-lg space-y-4' >
                    <div className='flex items-center gap-4 text-gray-600' >
                        <label htmlFor="doc-img">
                            <img className='w-16 cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                        </label>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden  accept="image/*" />
                        <p className='capitalize' >upload doctor <br />picture</p>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-10 text-gray-500' >
                        <div className='w-full lg:flex-1 flex flex-col gap-4' >
                            <div className="flex-1 flex flex-col gap-1">
                                <p>doctor name</p>
                                <input onChange={(e) => setName(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="text" placeholder='name' required />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p>doctor email</p>
                                <input onChange={(e) => setEmail(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="email" placeholder='email' required />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p>doctor password</p>
                                <input onChange={(e) => setPassword(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="password" placeholder='password' required />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p>doctor experience</p>
                                <select onChange={(e) => setExperience(e.target.value)} className='border border-gray-300 px-3 py-2 rounded-md outline-0'>
                                    <option value="1 year">1 year</option>
                                    <option value="2 year">2 year</option>
                                    <option value="3 year">3 year</option>
                                    <option value="4 year">4 year</option>
                                    <option value="5 year">5 year</option>
                                    <option value="6 year">6 year</option>
                                    <option value="7 year">7 year</option>
                                    <option value="8 year">8 year</option>
                                </select>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p>fees</p>
                                <input onChange={(e) => setFees(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="number" placeholder='fees' required />
                            </div>
                        </div>

                        <div className='w-full lg:flex-1 flex flex-col gap-2'>
                            <div className='flex-1 flex flex-col gap-1' >
                                <p>specaility</p>
                                <select onChange={(e) => setSpeciality(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0">
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                    <option value="General physician">General physician</option>
                                </select>
                            </div>

                            <div className="flex-1 flex flex-col gap-1" >
                                <p>education</p>
                                <input onChange={(e) => setDegree(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="text" placeholder='education' required />
                            </div>

                            <div className='flex-1 flex flex-col gap-2' >
                                <p>adress</p>
                                <input onChange={(e) => setAdress1(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="text" placeholder='adress 1' required />
                                <input onChange={(e) => setAdress2(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md outline-0" type="text" placeholder='adress 2' required />
                            </div>
                        </div>
                    </div>

                    <div className='text-gray-500 mt-6 mb-2' >
                        <p>about</p>
                        <textarea onChange={(e) => setAbout(e.target.value)} className='px-4 py-2 border border-gray-300 w-full outline-0 rounded-md' placeholder='write about doctor' rows={5} id=""></textarea>
                    </div>

                    <button className='bg-primary mt-6 cursor-pointer px-10 py-2 text-white font-medium rounded-full capitalize'>add doctor</button>
                </div>
            </form>
        </>
    )
}