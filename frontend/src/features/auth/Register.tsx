import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerSchema } from "../../types/authTypes";
import { register } from "../../lib/api/authApi";
import { useAuthStore } from "../../store/authStore";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isPending, setIsPending] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [isHidden, setIsHidden] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setIsPending(true);
      const data = await register(result.data);
      setAuth(data.user, data.accessToken);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-md md:max-w-lg mx-4 md:p-8 p-6 py-10 text-left text-sm rounded-lg shadow-[0px_0px_15px_0px] shadow-black/10"
      >
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Sign Up
        </h2>

        <div className="flex items-center my-3 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
            <path
              d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-3"
            type="text"
            placeholder="Username"
            required
          />
        </div>

        <div className="flex items-center my-3 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
            <path
              d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-3"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex items-center mt-3 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
            <path
              d="M6.25 9.375a1.875 1.875 0 1 0 2.5 0V7.5h-2.5v1.875Z"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.75 6.25V4.375a3.75 3.75 0 0 1 7.5 0V6.25"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <rect
              x="1.875"
              y="6.25"
              width="11.25"
              height="7.5"
              rx="1"
              stroke="#6B7280"
              strokeOpacity=".6"
              strokeWidth="1.3"
            />
          </svg>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-3"
            type={isHidden ? "password" : "text"}
            placeholder="Password"
            required
          />
          <button
          type="button"
            className="ml-auto cursor-pointer mr-4 text-xl"
            onClick={() => setIsHidden((prev) => !prev)}
          >
            {isHidden ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mb-4 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-3 rounded text-white font-medium text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
