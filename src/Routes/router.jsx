import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import AuthLayout from "../layouts/AuthLayout";
import Signup from "../pages/auth/SignUp";
import EmailVerifyMessage from "../pages/auth/EmailVerifyMessage";
import EmailVerify from "../pages/auth/EmailVerify";
import Login from "../pages/auth/Login";
import ProtectRoute from "./ProtectRoute";
import App from "../App"
import Home from "../components/Home"
import RootLayout from "../layouts/RootLayout";
import SendOtpEmail from "../pages/auth/SentOtpEmail";
import ResetPassword from "../pages/auth/ResetPassword";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/admin/Dashboard";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            // Public & Guest Routes -- UnAuthozied User
            {
                element: <PublicRoute />,
                children: [
                    {
                        element: <AuthLayout />,
                        children: [
                            {
                                path: "/",
                                element: <Navigate to={"/signup"} replace />
                            },
                            {
                                path: "signup",
                                element: <Signup />
                            },
                            {
                                path: "email-verifyMessage",
                                element: <EmailVerifyMessage />
                            },
                            {
                                path: "email-verify",
                                element: <EmailVerify />
                            },
                            {
                                path: "login",
                                element: <Login />
                            },
                            {
                                path: "sendOtp-email",
                                element: <SendOtpEmail />
                            },
                            {
                                path: "resetPassword",
                                element: <ResetPassword />
                            }
                        ]
                    }
                ]
            },

            // Procted & Login -- Authenticated User
            {
                element: <ProtectRoute />,
                children: [
                    {
                        element: <App />,
                        children: [
                            {
                                path: "/home",
                                element: <Home />
                            }
                        ]
                    }
                ]
            },

            // Admin Route -- Admin Access 
            {
                element: <ProtectRoute />,
                children: [
                    {
                        element: <AdminRoute />,
                        children: [
                            {
                                element: <AuthLayout />,
                                children: [
                                    {
                                        path: "/admin",
                                        element: <Dashboard />
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            // page not fount route
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])

export default router