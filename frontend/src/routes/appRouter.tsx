import { Routes, Route } from "react-router-dom";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import GuestRouter from "./GuestRouter";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRouter />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
