import { Routes, Route } from "react-router-dom";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import GuestRouter from "./GuestRouter";
import Home from "../features/patient/home";
import PublicRoutes from "./PublicRoutes";
import Doctors from "../features/patient/doctor";
import MainLayout from "./mainLayout";
import ApplyDoctor from "@/features/auth/applyDoctor";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRouter />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<ApplyDoctor />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
        </Route>
      </Route>
    </Routes>
  );
}
