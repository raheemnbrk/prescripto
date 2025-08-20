import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContextProvider, { AdminContext } from "./context/adminContext";
import { useContext } from "react";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import AllApointments from "./pages/admin/allApointments";
import DashBoard from "./pages/admin/dashbord";
import DoctorList from "./pages/admin/doctorList";
import AddDoctor from "./pages/admin/addDoctor";

function AppContent() {
  const { aToken } = useContext(AdminContext);
  return (
    <>
      {
        aToken ?
          (
            <>
              <ToastContainer />
              <NavBar />
              <div className="flex py-8" >
                <SideBar />
                <Routes>
                  <Route path="/" element={<></>} />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/all-apointments" element={<AllApointments />} />
                  <Route path="/doctor-list" element={<DoctorList />} />
                  <Route path="/admin-dashboard" element={<DashBoard />} />
                </Routes>
              </div>
            </>
          ) :
          (
            <>
              <Login />
              <ToastContainer />
            </>
          )
      }
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminContextProvider>
        <AppContent />
      </AdminContextProvider>
    </BrowserRouter>
  );
}
