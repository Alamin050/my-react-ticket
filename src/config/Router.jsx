import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import TicketList from "../pages/TicketList";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import TicketDetails from "../pages/TicketDetails";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/tickets",
                element: <ProtectedRoute><TicketList /></ProtectedRoute>,
            },
            {
                path: "/tickets/:id",
                element: <ProtectedRoute><TicketDetails /></ProtectedRoute>,
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/logout",
                element: <Logout />,
            },
        ]
    }
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;