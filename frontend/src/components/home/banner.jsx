import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"

export default function Banner() {
    return (
        <>
            <div className="bg-primary rounded-md flex gap-8 px-16 py-8 md:py-0" >
                <div className="flex flex-col space-y-4 md:pt-16">
                    <h1 className="text-3xl md:text-5xl font-semibold capitalize text-white">book appoinement</h1>
                    <h1 className="text-3xl md:text-5xl font-semibold capitalize text-white"> with 100+ trusted doctors</h1>
                    <button className="text-gray-600 bg-stone-100 rounded-full px-8 py-3 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer w-fit md:mt-8" >
                        <Link to={'login'} >
                            Create account
                        </Link>
                    </button>
                </div>
                <div className="hidden md:block pt-16">
                    <img className="w-[360px] h-[360px]" src={assets.appointment_img} alt="" />
                </div>
            </div>
        </>
    )
}