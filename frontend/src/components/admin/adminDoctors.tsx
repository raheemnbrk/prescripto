import {
  useApproveDoctor,
  usePendingDoctors,
  useRejectDoctor,
} from "@/hooks/useAdmin";
import { FiCheck, FiX, FiChevronRight, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminDoctors() {
  const { data: doctors, isLoading } = usePendingDoctors();
  const approve = useApproveDoctor();
  const reject = useRejectDoctor();
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Doctors</h3>
        <Link to={"/admin/doctors"}>
          <button className="flex items-center gap-1 text-sm text-main hover:underline cursor-pointer">
            View all <FiChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : !doctors?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FiUser className="w-8 h-8 mb-2" />
          <p className="text-sm">No pending doctors yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {doctors?.map((doctor: any) => (
            <div
              key={doctor.userId}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    doctor.image?.trim()
                      ? doctor.image
                      : "https://www.gravatar.com/avatar/?d=mp"
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    doctor.status === "APPROVED"
                      ? "bg-green-50 text-green-700"
                      : doctor.status === "REJECTED"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {doctor.status}
                </span>
                {doctor.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => approve.mutate(doctor.userId)}
                      disabled={approve.isPending}
                      className="w-8 h-8 rounded-md bg-green-50 hover:bg-green-100 text-green-700 flex items-center justify-center cursor-pointer transition-all"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => reject.mutate(doctor.userId)}
                      disabled={reject.isPending}
                      className="w-8 h-8 rounded-md bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center cursor-pointer transition-all"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
