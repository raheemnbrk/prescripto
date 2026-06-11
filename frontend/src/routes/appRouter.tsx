import { Routes, Route } from "react-router-dom";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import GuestRouter from "./GuestRouter";
import Home from "../features/patient/home";
import PublicRoutes from "./PublicRoutes";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRouter />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
