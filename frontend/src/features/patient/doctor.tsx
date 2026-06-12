import { Link } from "react-router-dom";

export default function Doctors() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Find Your Doctor</h1>
        <p className="text-gray-500 mt-2">
          Search by doctor name or filter by specialty.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search doctor..."
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select className="px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Link
            key={doctor._id}
            to={`/appointments/${doctor._id}`}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-64 w-full object-cover bg-blue-50"
            />

            <div className="p-5">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-3 ${
                  doctor.available
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    doctor.available ? "bg-green-600" : "bg-red-500"
                  }`}
                />
                {doctor.available ? "Available Today" : "Unavailable"}
              </div>

              <h3 className="font-semibold text-lg text-gray-800">
                {doctor.name}
              </h3>

              <p className="text-gray-500 mt-1">{doctor.speciality}</p>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}
