import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./responsiveMenu";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/api/authApi";
import { toast } from "sonner";
import { RiHospitalFill } from "react-icons/ri";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showList, setShowList] = useState(false);

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
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto pb-4 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <RiHospitalFill className="text-main text-4xl" />
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-950">
              Prescripto
            </h1>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase text-sm font-semibold pb-1 transition ${
                  isActive ? "border-b-2 border-main" : "hover:text-main"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `uppercase text-sm font-semibold pb-1 transition ${
                  isActive ? "border-b-2 border-main" : "hover:text-main"
                }`
              }
            >
              Doctors
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `uppercase text-sm font-semibold pb-1 transition ${
                  isActive ? "border-b-2 border-main" : "hover:text-main"
                }`
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `uppercase text-sm font-semibold pb-1 transition ${
                  isActive ? "border-b-2 border-main" : "hover:text-main"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {user?.role === "ADMIN" && (
          <Link to={"/admin"}>
            <p className="px-2 cursor-pointer text-zinc-600 text-sm border border-zinc-600 uppercase font-medium rounded-full">
              admin
            </p>
          </Link>
        )}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={
                    user.image?.trim()
                      ? user.image
                      : "https://www.gravatar.com/avatar/?d=mp"
                  }
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover "
                />
                <FaAngleDown
                  className={`transition-transform ${
                    showMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-3 w-44 bg-white rounded-xl shadow-lg border border-zinc-300 p-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/appointments"
                    className="block px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowMenu(false)}
                  >
                    My Appointments
                  </Link>

                  <button
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500 cursor-pointer"
                    onClick={async () => {
                      setShowMenu(false);
                      await handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register">
              <button className="px-6 py-2 rounded-full bg-main text-white hover:bg-blue-700 transition">
                Create Account
              </button>
            </Link>
          )}

          <HiMenuAlt3
            className="text-3xl text-main cursor-pointer md:hidden"
            onClick={() => setShowList(true)}
          />
        </div>
      </div>

      <ResponsiveMenu showList={showList} setShowList={setShowList} />
    </nav>
  );
}
