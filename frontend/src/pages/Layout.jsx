import React from "react";
import Utils from "../utils";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        Utils.showAlert(1, 'Logout successfully');
        navigate('/login');
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <nav className="w-full bg-gray-800 text-white flex justify-between items-center px-6 py-4">
                    <h1 className="text-xl font-semibold">Employee Management Tool</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
                    >
                        Logout
                    </button>
                </nav>
                <div>{children}</div>
            </div>
        </>
    );
};

export default Layout;
