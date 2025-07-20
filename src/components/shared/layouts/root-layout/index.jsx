import { Outlet, useLocation } from "react-router-dom";
import { NO_NAVBAR_PAGES } from "../../../../router";
import Navbar from "../../navbar";

export default function RootLayout() {
    const { pathname } = useLocation();

    const isAuthPage = NO_NAVBAR_PAGES.includes(pathname);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {!isAuthPage && <Navbar />}
            <Outlet />
        </div>
    );
}
