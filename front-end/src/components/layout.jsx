import { Outlet } from "react-router-dom"

import NavBar from "./navBar"
import Footer from "./footer"

export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer/>
        </>
    )
}