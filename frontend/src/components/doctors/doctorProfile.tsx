import { useEffect, useState } from "react";
import {
  useDoctorProfile,
  useUpdateDoctorProfile,
  useToggleDoctorAvailability,
} from "@/hooks/useDoctor";
import {
  FiEdit2,
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiAward,
  FiActivity,
} from "react-icons/fi";

export default function DoctorProfile({
  role,
}: {
  role: "ADMIN" | "DOCTOR" | "PATIENT" | undefined;
}) {
  const isDoctor = role === "DOCTOR";
  const { data, isLoading } = useDoctorProfile(isDoctor);
  const { mutate: update, isPending } = useUpdateDoctorProfile();
  const { mutate: toggle, isPending: isToggling } =
    useToggleDoctorAvailability();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    fees: "",
    about: "",
    degree: "",
    address: "",
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      specialization: data.specialization,
      experience: String(data.experience),
      fees: String(data.fees),
      about: data.about,
      degree: data.degree,
      address: data.address,
    });
  }, [data]);

  if (!isDoctor) return null;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 animate-pulse space-y-3">
        <div className="h-5 bg-gray-200 rounded w-40" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    );
  }

  if (!data) return null;

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const save = () => {
    const formData = new FormData();
    formData.append("specialization", form.specialization);
    formData.append("experience", form.experience);
    formData.append("fees", form.fees);
    formData.append("about", form.about);
    formData.append("degree", form.degree);
    formData.append("address", form.address);
    update(formData, {
      onSuccess: () => setEditing(false),
    });
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
        <h3 className="font-semibold text-gray-800">
          Professional Information
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggle(!data.available)}
            disabled={isToggling}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all active:scale-95 cursor-pointer ${
              data.available
                ? "bg-green-50 text-green-700 hover:bg-green-100"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FiActivity className="w-4 h-4" />
            {isToggling
              ? "Updating..."
              : data.available
                ? "Available"
                : "Unavailable"}
          </button>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-main hover:bg-main/80 text-white text-sm font-medium rounded-md transition-all active:scale-95 cursor-pointer"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          icon={<FiBriefcase />}
          label="Specialization"
          editing={editing}
          name="specialization"
          value={form.specialization}
          change={change}
        >
          {data.specialization}
        </Field>

        <Field
          icon={<FiAward />}
          label="Experience"
          editing={editing}
          name="experience"
          value={form.experience}
          change={change}
        >
          {data.experience} years
        </Field>

        <Field
          icon={<FiDollarSign />}
          label="Fees"
          editing={editing}
          name="fees"
          value={form.fees}
          change={change}
        >
          {data.fees} DA
        </Field>

        <Field
          icon={<FiAward />}
          label="Degree"
          editing={editing}
          name="degree"
          value={form.degree}
          change={change}
        >
          {data.degree}
        </Field>

        <Field
          icon={<FiMapPin />}
          label="Address"
          editing={editing}
          name="address"
          value={form.address}
          change={change}
        >
          {data.address}
        </Field>
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
            <FiBriefcase className="w-4 h-4 text-main" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">About</p>
            {editing ? (
              <textarea
                name="about"
                value={form.about}
                onChange={change}
                rows={3}
                className="mt-0.5 text-sm font-medium text-gray-800 border-b border-indigo-300 outline-none w-full bg-transparent resize-none"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800">
                {data.about || "—"}
              </p>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <div className="flex gap-3 pt-6 mt-2 border-t border-gray-100">
          <button
            onClick={save}
            disabled={isPending}
            className="flex-1 bg-main hover:bg-main/80 text-white font-medium py-2.5 rounded-md transition-all active:scale-95 text-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isPending ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setEditing(false)}
            disabled={isPending}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2.5 rounded-md transition-all text-sm border border-gray-200 disabled:opacity-60 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function Field({
  icon,
  label,
  editing,
  name,
  value,
  change,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  editing: boolean;
  name: string;
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
        <span className="w-4 h-4 text-main">{icon}</span>
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400">{label}</p>
        {editing ? (
          <input
            name={name}
            value={value}
            onChange={change}
            className="mt-0.5 text-sm font-medium text-gray-800 border-b border-indigo-300 outline-none w-full bg-transparent"
          />
        ) : (
          <p className="text-sm font-medium text-gray-800">{children}</p>
        )}
      </div>
    </div>
  );
}
