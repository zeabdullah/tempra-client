import AuthLayout from "./components/shared/layouts/auth-layout";
import RootLayout from "./components/shared/layouts/root-layout";
import ForgotPasswordPage from "./pages/forgot-password";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { createBrowserRouter } from "react-router-dom";

export const NO_NAVBAR_PAGES = ["/login", "/signup", "/forgot-password"];

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "signup",
                        element: <SignupPage />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPasswordPage />,
                    },
                ],
            },
        ],
    },
]);
export default router;
