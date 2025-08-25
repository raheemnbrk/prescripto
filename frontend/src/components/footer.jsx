import { PiCodaLogoFill } from "react-icons/pi";

export default function Footer() {
    const time = new Date().getFullYear()
    return (
        <>
            <div className="mt-24 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-36 py-8 border-b border-gray-400" >
                    <div className="flex flex-col space-y-2">
                        <div className="flex gap-2 text-xl sm:text-2xl font-bold items-center cursor-pointer">
                            <PiCodaLogoFill className="text-primary text-2xl" />
                            <h1 className="capitalize text-blue-950">prescripto</h1>
                        </div>
                        <p className="text-gray-600" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia totam quaerat provident fuga officia sit aperiam, minima voluptatem repudiandae ipsam iusto fugit eos dolor qui illo voluptatum tempore tenetur hic?</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-xl font-semibold capitalize">company</h1>
                            <ul className="text-gray-600 capitalize">
                                <li>home</li>
                                <li>about us</li>
                                <li>delivery</li>
                                <li>privacy policy</li>
                            </ul>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-xl font-semibold capitalize">get in touch</h1>
                            <div className="text-gray-600">
                                <p>+0-000-000-000</p>
                                <p>greatstackdev@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 text-center">
                    <p className="font-medium text-sm">Copyrights {time} @raheemnbrk-All rights reserved </p>
                </div>
            </div>
        </>
    )
}