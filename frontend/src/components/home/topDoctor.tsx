import { useTopDoctors } from "@/hooks/useDoctor";
import { Link } from "react-router-dom";
import DoctorCardLoading from "../loading/doctorCardLoading";
import DoctorCard from "../doctors/doctorCard";

export default function TopDoctors() {
  const { data: doctors, isLoading, isError } = useTopDoctors(4);
  return (
    <div className="flex flex-col space-y-6 mt-16">
      <h1 className="text-2xl font-semibold capitalize text-center">
        top doctors to book
      </h1>
      <p className="font-lihgt text-center">
        simply brows through our list of trusted doctors
      </p>
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <DoctorCardLoading key={i} />
          ))}
        </div>
      )}
      {!isLoading && !isError && doctors?.length === 0 && (
        <p className="text-center text-gray-500 py-10">No doctors found.</p>
      )}
      {!isLoading && !isError && doctors && doctors.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.userId} doctor={doctor} />
          ))}
        </div>
      )}
      <Link to="/doctors" className="block w-fit mx-auto">
        <button className="bg-blue-50 px-8 py-2 text-gray-600 cursor-pointer font-semibold rounded-full">
          More
        </button>
      </Link>
    </div>
  );
}
