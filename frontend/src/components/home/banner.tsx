import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

export default function Banner() {
  return (
    <div className="bg-main rounded-md flex flex-col md:flex-row items-center gap-8 px-8 md:px-24 text-center md:text-left">
      <div className="flex flex-col items-center md:items-start space-y-4 md:pt-16 flex-1">
        <h1 className="text-3xl md:text-5xl font-semibold capitalize text-white mt-6">
          book appointment
        </h1>

        <h1 className="text-3xl md:text-5xl font-semibold capitalize text-white">
          with 100+ trusted doctors
        </h1>

        <button className="text-gray-600 bg-stone-100 rounded-full px-8 py-3 hover:scale-105 transition-all duration-300 w-fit md:mt-8 cursor-pointer">
          <Link to="/register">Create account</Link>
        </button>
      </div>

      <div className="flex justify-center md:pt-16">
        <img
          className="w-64 h-64 md:w-90 md:h-90 object-contain"
          src={assets.appointment_img}
          alt="appointment"
        />
      </div>
    </div>
  );
}
