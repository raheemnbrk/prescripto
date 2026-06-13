import DoctorCard from "@/components/doctors/doctorCard";
import Filter from "@/components/doctors/filter";
import DoctorCardLoading from "@/components/loading/doctorCardLoading";
import { useDoctors } from "@/hooks/useDoctor";
import { useDoctorFilters } from "@/hooks/useDoctorFilters";

export default function Doctors() {
  const { search, specialization } = useDoctorFilters();
  const {
    data: doctors,
    isLoading,
    isError,
  } = useDoctors(search, specialization);

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Find Your Doctor</h1>
        <p className="text-gray-500 mt-2">
          Search by doctor name or filter by specialty.
        </p>
      </div>
      <Filter />
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
    </div>
  );
}
