import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContextProvider, { AdminContext } from "./context/adminContext";
import { useContext } from "react";
import NavBar from "./components/navBar";

function AppContent() {
  const { aToken } = useContext(AdminContext);
  return (
    <>
      {
        aToken ?
          (
            <>
              <ToastContainer />
              <NavBar/>
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
    <AdminContextProvider>
      <AppContent />
    </AdminContextProvider>
  );
}
