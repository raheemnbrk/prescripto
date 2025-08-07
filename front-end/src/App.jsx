import { BrowserRouter , Routes , Route } from "react-router-dom"

import Layout from "./components/layout"
import Home from "./pages/home"
import About from "./pages/about"
import Doctors from "./pages/doctors"
import Appointments from "./pages/appointments"
import Contact from "./pages/contact"
import Login from "./pages/login"
import MyProfile from "./pages/myProfile"
import MyAppointments from "./pages/myAppointments"

export default function App() {
  return (
    <div className="p-4 sm:px-32 sm:py-4">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="doctors" element={<Doctors/>} />
          <Route path="appointments/:id" element={<Appointments/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="login" element={<Login/>} />
          <Route path="myProfile" element={<MyProfile/>} />
          <Route path="myAppointments" element={<MyAppointments/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}