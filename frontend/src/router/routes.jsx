import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import PrivateRouteEmployee from "./PrivateRouteEmployee";

// Auth
const LoginWrapper = React.lazy(
    async () => await import("../../src/pages/auth/Login")
);


// Admin
const AdminDashboardWrapper = React.lazy(
    async () => await import("../../src/pages/admin")
);

const AdminHomeWrapper = React.lazy(
    async () => await import("../../src/pages/admin/Home")
);

const AdminEmployeeWrapper = React.lazy(
    async () => await import("../../src/pages/admin/Employees")
);

const AdminIssuesWrapper = React.lazy(
    async () => await import("../../src/pages/admin/Issues")
);


// Employee
const EmployeeDashboardWrapper = React.lazy(
    async () => await import("../../src/pages/employee")
);

const EmployeeHomeWrapper = React.lazy(
    async () => await import("../../src/pages/employee/Home")
);

const EmployeeIssuesWrapper = React.lazy(
    async () => await import("../../src/pages/employee/Issues")
);

const EmployeeProfileWrapper = React.lazy(
    async () => await import("../../src/pages/employee/Profile")
);


const adminRoutes = [
    {
        path: `/admin`,
        element: (
            <PrivateRouteAdmin>
                <AdminDashboardWrapper />
            </PrivateRouteAdmin>
        ),
        children: [
            {
                path: `/admin`,
                element: (
                    <PrivateRouteAdmin>
                        <AdminHomeWrapper />
                    </PrivateRouteAdmin>
                )
            },
            {
                path: `/admin/employees`,
                element: (
                    <PrivateRouteAdmin>
                        <AdminEmployeeWrapper />
                    </PrivateRouteAdmin>
                )
            },
            {
                path: `/admin/issues`,
                element: (
                    <PrivateRouteAdmin>
                        <AdminIssuesWrapper />
                    </PrivateRouteAdmin>
                )
            },
        ],
    },
];

const employeeRoutes = [
    {
        path: `/employee`,
        element: (
            <PrivateRouteEmployee>
                <EmployeeDashboardWrapper />
            </PrivateRouteEmployee>
        ),
        children: [
            {
                path: `/employee`,
                element: (
                    <PrivateRouteEmployee>
                        <EmployeeHomeWrapper />
                    </PrivateRouteEmployee>
                )
            },
            {
                path: `/employee/issues`,
                element: (
                    <PrivateRouteEmployee>
                        <EmployeeIssuesWrapper />
                    </PrivateRouteEmployee>
                )
            },
            {
                path: `/employee/profile`,
                element: (
                    <PrivateRouteEmployee>
                        <EmployeeProfileWrapper />
                    </PrivateRouteEmployee>
                )
            },
        ],
    }
];

const authRoutes = [
    {
        path: `/`,
        element: <LoginWrapper />,
    },
    {
        path: `/login`,
        element: <LoginWrapper />,
    },
]

const commonRoutes = [

];

let routes = [...adminRoutes, ...employeeRoutes, ...authRoutes, ...commonRoutes];

const router = createBrowserRouter(routes);

export default router;
