import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { IoMdLogOut } from "react-icons/io";

const Navbar = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(UserContext);
    const [selectedTab, setSelectedTab] = useState("Home");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (selection) => {
        onSelect(selection);
        setSelectedTab(selection);
        toggleMenu();
    };

    const changeColor = (val) => {
        return selectedTab === val ? "#2b6cb0" : "#FFFFFF";
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-4 py-4 px-2">
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
                <div className="flex md:order-2 space-x-3 md:space-x-8 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={logout}
                    >
                        <IoMdLogOut size={20} />
                    </button>
                </div>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                style={{ cursor: 'pointer', color: changeColor("Home") }}
                                className={`block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`}
                                onClick={() => handleSelect("Home")}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                style={{ cursor: 'pointer', color: changeColor("My Workbooks") }}
                                className={`block py-2 px-3 text-blue-700 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                onClick={() => handleSelect("My Workbooks")}
                            >
                                My Workbooks
                            </a>
                        </li>
                        <li>
                            <a
                                style={{ cursor: 'pointer', color: changeColor("Profile") }}
                                className={`block py-2 px-3 text-blue-700 rounded md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                                onClick={() => handleSelect("Profile")}
                            >
                                Profile
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
