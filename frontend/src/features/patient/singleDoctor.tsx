import BookAppointment from "@/components/doctors/bookAppointment";
import RelatedDoctors from "@/components/doctors/relatedDoctors";
import DoctorDetailLoading from "@/components/loading/doctorDetailsLoading";
import { useDoctor } from "@/hooks/useDoctor";
import { FiAward, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Navigate, useParams } from "react-router-dom";

export default function SingleDoctor() {
  const { id } = useParams();
  if (!id) return <Navigate to={"/doctors"} replace />;
  const { data: doctor, isLoading, isError } = useDoctor(id);
  console.log(doctor);
  if (isLoading) return <DoctorDetailLoading />;
  if (isError || !doctor) {
    return <p className="text-center text-gray-500 py-20">Doctor not found.</p>;
  }
  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="bg-indigo-50 rounded-lg">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-90 object-cover rounded-xl"
            />
          </div>
        </div>{" "}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${doctor.available ? "bg-green-500" : "bg-red-500"}`}
              />
              <span
                className={`text-sm font-medium ${doctor.available ? "text-green-600" : "text-red-500"}`}
              >
                {doctor.available ? "Available" : "Unavailable"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
            <p className="text-gray-500 mt-1">{doctor.specialization}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <FiAward className="w-5 h-5 text-main" />
              <div>
                <p className="text-sm text-gray-400">Degree</p>
                <p className="font-medium text-gray-800">{doctor.degree}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <FiClock className="w-5 h-5 text-main" />
              <div>
                <p className="text-sm text-gray-400">Experience</p>
                <p className="font-medium text-gray-800">
                  {doctor.experience} years
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <FiDollarSign className="w-5 h-5 text-main" />
              <div>
                <p className="text-sm text-gray-400">Consultation Fee</p>
                <p className="font-medium text-gray-800">{doctor.fees} DA</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <FiMapPin className="w-5 h-5 text-main" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="font-medium text-gray-800">{doctor.address}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">About</h3>
            <p className="text-gray-500 leading-relaxed">{doctor.about}</p>
          </div>
        </div>
      </div>
      <BookAppointment docId={id} available={doctor.available} />
      <RelatedDoctors id={id} specialization={doctor.specialization} />
    </div>
  );
}
