import { NavLink } from "react-router-dom"
import { ImCross } from "react-icons/im";

export default function ResponsiveMenu({ showList, setShowList }) {

    return (
        <>
            <div className={`flex flex-col space-y-16 md:hidden px-16 py-8 bg-white transition-all duration-300 w-full h-full fixed z-50 top-0 bottom-0 ${showList ? 'right-0' : "-right-full"}`} >
                <ImCross
                    className="flex justify-end ml-70"
                    onClick={() => setShowList(false)}
                />
                <ul className="flex flex-col space-y-6 text-xl font-semibold capitalize items-center " >
                    <li>
                        <NavLink
                            to={""}
                            onClick={() => setShowList(prev => !prev)}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : ""}`
                            }
                        >
                            home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"doctors"}
                            onClick={() => setShowList(prev => !prev)}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : ""}`
                            }
                        >
                            all doctors
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"about"}
                            onClick={() => setShowList(prev => !prev)}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : ""}`
                            }
                        >
                            about
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"contact"}
                            onClick={() => setShowList(prev => !prev)}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md ${isActive ? "bg-primary text-white" : ""}`
                            }
                        >
                            contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}