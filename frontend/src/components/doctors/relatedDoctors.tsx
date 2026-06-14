import { useRelatedDoctors } from "@/hooks/useDoctor";
import DoctorCardLoading from "../loading/doctorCardLoading";
import DoctorCard from "./doctorCard";

export default function RelatedDoctors({
  id,
  specialization,
}: {
  id: string;
  specialization: string;
}) {
  const {
    data: doctors,
    isLoading,
    isError,
  } = useRelatedDoctors(id, specialization);

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-center text-2xl font-semibold capitalize">
        related doctors
      </h1>
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
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
