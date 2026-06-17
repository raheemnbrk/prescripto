import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { applyDoctor } from "../../lib/api/doctorApi";
import { applyDoctorSchema } from "@/validation/doctorValidation";

export default function ApplyDoctor() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fees: "",
    about: "",
    degree: "",
    address: "",
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast.error("Profile image is required.");
      return;
    }

    const result = applyDoctorSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setIsPending(true);

      const formData = new FormData();
      Object.entries(result.data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      formData.append("image", image);

      await applyDoctor(formData as any);
      toast.success(
        "Application submitted successfully. Wait for admin approval.",
      );
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-2xl mx-4 md:p-8 p-6 py-10 text-left text-sm rounded-lg shadow-[0px_0px_15px_0px] shadow-black/10"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Apply as a Doctor
        </h2>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-main/5">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 text-center px-2">
                  Upload Photo
                </span>
              )}
            </div>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="degree"
            value={form.degree}
            onChange={handleChange}
            placeholder="Degree (e.g. MBBS)"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="experience"
            value={form.experience}
            onChange={handleChange}
            type="number"
            min={0}
            placeholder="Years of experience"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="fees"
            value={form.fees}
            onChange={handleChange}
            type="number"
            min={0}
            placeholder="Consultation fees"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Clinic address"
            className="border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none"
            required
          />
        </div>

        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About yourself (min 10 characters)"
          rows={4}
          className="w-full mt-3 border bg-main/5 border-gray-500/10 rounded px-3 py-3 outline-none resize-none"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-6 mb-4 bg-main hover:bg-main/80 transition-all active:scale-95 py-3 rounded text-white font-medium text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-center mt-2 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
