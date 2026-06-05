import { assets } from "../assets/assets"

export default function Contact() {
    return (
        <>
            <div className="flex flex-col gap-6 px-8 md:px-36 pt-16" >
                <h1 className="text-3xl font-semibold flex gap-2 capitalize text-center" >
                    <span className="text-gray-600" >contact</span>
                    <span>us</span>
                </h1>
                <div className="flex flex-col md:flex-row gap-12 items-center" >
                    <div className="w-full md:max-w-[350px]" >
                        <img className="w-full h-auto md:h-[350px] object-cover" src={assets.contactImg} />
                    </div>
                    <div className="flex flex-col space-y-6" >
                        <p className="text-xl font-semibold text-gray-600" >OUR OFFICE</p>
                        <p className="text-gray-500 font-light" >00000 Willms Station <br />Suite 000, Washington, USA</p>
                        <p className="text-gray-500 font-light" >Tel: (000) 000-0000 <br />Email: greatstackdev@gmail.com</p>
                        <p className="text-xl font-semibold text-gray-600" >CAREERS AT PRESCRIPTO</p>
                        <p className="text-gray-500 font-light" >Learn more about our teams and job openings.</p>
                        <button className="justify-start w-fit capitalize px-6 py-4 border border-black hover:text-white hover:bg-black cursor-pointer" >explore jobs</button>
                    </div>
                </div>
            </div>
        </>
    )
}