import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

interface ResponsiveMenuProps {
  showList: boolean;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResponsiveMenu({
  showList,
  setShowList,
}: ResponsiveMenuProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
        showList ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-xl font-bold text-blue-950">Menu</h2>

        <button onClick={() => setShowList(false)}>
          <IoClose className="text-3xl text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col p-4">
        <NavLink
          to="/"
          onClick={() => setShowList(false)}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg font-medium transition ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/doctors"
          onClick={() => setShowList(false)}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg font-medium transition ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          Doctors
        </NavLink>

        <NavLink
          to="/about"
          onClick={() => setShowList(false)}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg font-medium transition ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          onClick={() => setShowList(false)}
          className={({ isActive }) =>
            `px-4 py-3 rounded-lg font-medium transition ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
            }`
          }
        >
          Contact
        </NavLink>

        <div className="border-t mt-4 pt-4">
          <NavLink
            to="/profile"
            onClick={() => setShowList(false)}
            className="block px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/appointments"
            onClick={() => setShowList(false)}
            className="block px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            My Appointments
          </NavLink>

          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-red-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
