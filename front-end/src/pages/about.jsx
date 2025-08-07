import { assets } from "../assets/assets"

export default function About() {
    return (
        <>
            <div className="flex flex-col space-y-6 pt-16" >
                <h1 className="text-3xl mx-auto font-semibold capitalize flex gap-2">
                    <span className="text-gray-600" >about</span>
                    <span>us</span>
                </h1>
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-[50%} h-auto">
                        <img className="w-full" src={assets.aboutImg} />
                    </div>
                    <div className="flex flex-col space-y-6" >
                        <p className="text-gray-600 text-sm">Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                        <p className="text-gray-600 text-sm">Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                        <p>our vision</p>
                        <p className="text-gray-600 text-sm">Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                    </div>
                </div>
                <h1 className="text-2xl capitalize gap-2 flex items-center" >
                    <span>why</span>
                    <span className="text-gray-600" >choose us</span>
                </h1>
                <div className="flex flex-col md:flex-row" >
                    <div className="flex flex-col space-y-6 border border-gray-200 px-12 py-16 hover:bg-primary transition-all duration-200 group cursor-pointer">
                        <h1 className="text-xl font-semibold uppercase text-gray-700 group-hover:text-white">efficiency:</h1>
                        <p className="text-gray-500 font-light group-hover:text-white" >Streamlined appointment <br /> scheduling that fits into your <br /> busy lifestyle.</p>
                    </div>
                    <div className="flex flex-col space-y-6 border border-gray-200 px-12 py-16 hover:bg-primary transition-all duration-200 group cursor-pointer">
                        <h1 className="text-xl font-semibold uppercase text-gray-700 group-hover:text-white">convenience:</h1>
                        <p className="text-gray-500 font-light group-hover:text-white" >Access to a network of <br /> trusted healthcare professionals <br /> in your area.</p>
                    </div>
                    <div className="flex flex-col space-y-6 border border-gray-200 px-12 py-16 hover:bg-primary transition-all duration-200 group cursor-pointer">
                        <h1 className="text-xl font-semibold uppercase text-gray-700 group-hover:text-white">personalization:</h1>
                        <p className="text-gray-500 font-light group-hover:text-white" >Tailored recommendations <br /> and reminders to help you stay <br /> on top of your health.</p>
                    </div>
                </div>
            </div>
        </>
    )
}