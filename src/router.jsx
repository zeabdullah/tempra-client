import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/shared/layouts/auth-layout";
import RequireAuth from "./components/shared/layouts/require-auth";
import RootLayout from "./components/shared/layouts/root-layout";
import CapsuleDetailsPage from "./pages/capsule-details";
import ForgotPasswordPage from "./pages/forgot-password";
import LoginPage from "./pages/login";
import MyCapsulesPage from "./pages/my-capsules";
import NewCapsulePage from "./pages/new-capsule";
import PublicFeedPage from "./pages/public-feed";
import SignupPage from "./pages/signup";

export const NO_NAVBAR_PAGES = ["/login", "/signup", "/forgot-password"];

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <PublicFeedPage />,
            },
            {
                path: "capsule/:id",
                element: <CapsuleDetailsPage />,
            },
            {
                element: <RequireAuth />,
                children: [
                    {
                        path: "new-capsule",
                        element: <NewCapsulePage />,
                    },
                    {
                        path: "my-capsules",
                        element: <MyCapsulesPage />,
                    },
                ],
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
