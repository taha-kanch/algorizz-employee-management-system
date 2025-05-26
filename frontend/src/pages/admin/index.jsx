import { NavLink, Outlet } from "react-router-dom";
import Layout from "../Layout";

const AdminDashboard = () => {

    return (
        <>
            <Layout>
                <div className="flex">
                    <div className="w-64 h-screen bg-gray-800 text-white p-4">
                        <h2 className="text-xl font-bold mb-4">Admin</h2>
                        <nav className="flex flex-col space-y-2">
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'hover:bg-gray-700 p-2 rounded bg-gray-700'
                                        : 'hover:bg-gray-700 p-2 rounded'
                                }
                                end
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/admin/employees"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'hover:bg-gray-700 p-2 rounded bg-gray-700'
                                        : 'hover:bg-gray-700 p-2 rounded'
                                }
                                end
                            >
                                Employees
                            </NavLink>
                            <NavLink
                                to="/admin/issues"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'hover:bg-gray-700 p-2 rounded bg-gray-700'
                                        : 'hover:bg-gray-700 p-2 rounded'
                                }
                                end
                            >
                                Issues
                            </NavLink>
                        </nav>
                    </div>
                    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
                        <Outlet />
                    </main>
                </div>

            </Layout>
        </>
    );

}

export default AdminDashboard;