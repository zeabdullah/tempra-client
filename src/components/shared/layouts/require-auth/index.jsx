import { Navigate, Outlet } from "react-router-dom";
import Auth from "../../../../lib/auth";

export default function RequireAuth() {
    if (!Auth.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}
