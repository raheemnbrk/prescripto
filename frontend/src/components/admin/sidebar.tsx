import { useAuthStore } from "@/store/authStore";
import { FaBusinessTime, FaUserDoctor, FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface sidebarLink {
  name: string;
  path: string;
  icon: React.ReactElement;
}

export default function SideBar() {
  const adminSidebarLinks: sidebarLink[] = [
    { name: "Dashboard", path: "/", icon: <MdDashboard /> },
    { name: "Users", path: "users", icon: <FaUsers /> },
    { name: "Doctors", path: "doctors", icon: <FaUserDoctor /> },
    { name: "Appointments", path: "appointments", icon: <FaBusinessTime /> },
  ];

  const doctorSideBarLinks: sidebarLink[] = [
    { name: "Dashboard", path: "/", icon: <MdDashboard /> },
    { name: "Patients", path: "patients", icon: <FaUsers /> },
    { name: "profile", path: "profile", icon: <FaUserDoctor /> },
    { name: "Appointments", path: "appointments", icon: <FaBusinessTime /> },
  ];

  const { user } = useAuthStore();

  const sidebarLinks =
    user?.role === "ADMIN" ? adminSidebarLinks : doctorSideBarLinks;
  return (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-300 flex flex-col transition-all duration-300 pt-4">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-3 transition-all ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-main/10 border-main text-main"
                : "hover:bg-gray-100/90 text-gray-700"
            }`
          }
        >
          {item.icon}
          <p className="md:block hidden">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
