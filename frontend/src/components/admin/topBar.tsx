import { RiHospitalFill } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/api/authApi";
import { toast } from "sonner";

export default function TopBar() {
  const { user, setLoading, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    if (user) {
      setLoading(true);
      try {
        const res = await logout();
        toast.success(res?.data?.message || "User logged out successfully");
        clearAuth();
      } catch (err) {
        const res = await logout();
        toast.success(res?.data?.message || "User logged out successfully");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-b border-gray-200">
      <Link to="/admin">
        <div className="flex items-center gap-2">
          <RiHospitalFill className="text-main text-4xl" />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-950">
            Prescripto
          </h1>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-main/20 bg-main/5 text-main hover:bg-main hover:text-white transition-all duration-200"
        >
          <FiExternalLink className="text-base" />
          <span className="text-sm font-medium">Patient Site</span>
        </Link>

        <div className="hidden md:block h-6 w-px bg-gray-200" />

        <p className="text-gray-600 font-medium">Hi, Admin</p>

        <button
          className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full transition cursor-pointer hover:text-red-500 hover:bg-red-100"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
