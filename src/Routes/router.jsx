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
import ProductsPage from "../pages/user/ProductsPage";
import ProductsCategoryPage from "../pages/user/ProductsCategoryPage";
import SingleProductsPage from "../pages/user/SingleProductsPage";
import AllProductsCategory from "../pages/user/AllProductsCategory";
import AllProductsPage from "../pages/user/AllProductsPage";
import ProfilePage from "../pages/user/ProfilePage";
import AdminLayout from "../layouts/AdminLayout";
import CreateProductsCard from "../pages/admin/CreateProductsCard";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminProductsCategory from "../pages/admin/AdminProductsCategory";
import AdminSingleProductsCategory from "../pages/admin/AdminSingleProductsCategory";
import EditPopup from "../components/EditPopup";
import AddToCardPage from "../pages/user/AddToCardPage";
import CheckOut from "../pages/user/CheckOut";

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
                                path: "/products",
                                element: <ProductsPage />
                            },
                            {
                                path: "/products/:id",
                                element: <SingleProductsPage />
                            },
                            {
                                path: "/products-category",
                                element: <AllProductsCategory />
                            },
                            {
                                path: "/products-category/:category",
                                element: <ProductsCategoryPage />
                            },
                            {
                                path: "/products-all",
                                element: <AllProductsPage />
                            },
                            {
                                path: "/my-profile",
                                element: <ProfilePage />
                            },
                            {
                                path: "/addToCard",
                                element: <AddToCardPage />
                            },
                            {
                                path: "/checkout",
                                element: <CheckOut />
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
                                element: <AdminLayout />,
                                children: [
                                    {
                                        path: "/adminPannel",
                                        element: <Navigate to={"/adminPannel/dashboard"}/>
                                    },
                                    {
                                        path: "/adminPannel/dashboard",
                                        element: <Dashboard />
                                    },
                                    {
                                        path: "/adminPannel/create-products",
                                        element: <CreateProductsCard />
                                    },
                                    {
                                        path: "/adminPannel/all-products",
                                        element: <AdminProductsPage />
                                    },
                                    {
                                        path: "/adminPannel/products-category",
                                        element: <AdminProductsCategory />
                                    },
                                    {
                                        path: "/adminPannel/products-category/:category",
                                        element: <AdminSingleProductsCategory />
                                    },
                                    {
                                        path: "/adminPannel/products-update",
                                        element: <EditPopup />
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