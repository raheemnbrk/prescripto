import { assets } from "../../assets/assets";

import { FaArrowRightLong } from "react-icons/fa6";

export default function Hero() {
  return (
    <>
      <div className="bg-main px-8 md:px-16 pt-8 md:pt-16 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md overflow-hidden">
        <div className="flex flex-col space-y-6 order-1 pt-16">
          <h1 className="capitalize text-white text-3xl md:text-5xl font-semibold text-center md:text-left">
            book appointment <br /> with trusted <br /> doctors
          </h1>
          <div className="flex flex-col md:flex-row gap-4 text-center md:text-left items-center">
            <img
              src={assets.group_profiles}
              className="w-20 md:w-24 shrink-0 mx-auto md:mx-0"
            />
            <p className="text-white text-sm font-light capitalize">
              Simply browse through our extensive list of trusted <br />{" "}
              doctors,schedule <br /> your appointment hassle-free.
            </p>
          </div>
          <div className="flex justify-center md:justify-start capitalize">
            <button className="bg-stone-100 text-gray-600 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer">
              <a className="flex items-center gap-4 px-6 py-2" href="#Specialization">
                <p>book appointment</p>
                <FaArrowRightLong />
              </a>
            </button>
          </div>
        </div>

        <div className="order-2 md:pt-24">
          <img src={assets.header_img} className="w-full h-auto" />
        </div>
      </div>
    </>
  );
}
