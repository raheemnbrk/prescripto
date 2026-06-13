import type { Doctor } from "@/types/doctorType";
import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      to={`/doctors/${doctor.userId}`}
      className="group bg-white border border-primary/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="bg-indigo-50 flex items-center justify-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-56 w-full object-cover rounded-xl"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${
              doctor.available ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              doctor.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {doctor.available ? "Available" : "Unavailable"}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
        <p className="text-gray-500 mt-1">{doctor.specialization}</p>
      </div>
    </Link>
  );
}
