import AuthLayout from "./components/shared/layouts/auth-layout";
import RootLayout from "./components/shared/layouts/root-layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { createBrowserRouter } from "react-router-dom";

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
                ],
            },
        ],
    },
]);
export default router;
