import { specializationData } from "@/assets/assets";
import { Link } from "react-router-dom";

export default function Specialization() {
  return (
    <>
      <div id="specialization" className="space-y-4">
        <h1 className="text-2xl font-semibold text-center capitalize">
          find by specialization
        </h1>
        <p className="text-center text-sm">
          Simple browse through our extensive list of trusted <br /> doctors ,
          schedule your appointment hassle-free.
        </p>
        <div className="w-full flex items-center sm:justify-center gap-8 pt-8 overflow-scroll">
          {specializationData.map((s, ind) => (
            <Link
              key={ind}
              to={`doctors?specialization=${s.specialization}`}
              className="flex flex-col space-y-2 items-center text-xs cursor-pointer hover:-translate-y-1.5 transition-all duration-300"
            >
              <img src={s.image} alt="" className="w-16 sm:w-24" />
              <h1 className="whitespace-nowrap">{s.specialization}</h1>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
