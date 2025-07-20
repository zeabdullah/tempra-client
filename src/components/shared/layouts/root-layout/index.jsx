import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "../../button";
import ChevronDownIcon from "../../../../icons/chevron-down";
import { buttonVariants } from "../../button/variants";
import PlusIcon from "../../../../icons/plus";
import cls from "../../../../lib/classnames";
import useAuth from "../../../../lib/hooks/use-auth";
import { NO_NAVBAR_PAGES } from "../../../../router";

export default function RootLayout() {
    const session = useAuth();
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
            {!isAuthPage && (
                <header
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBlock: "var(--spacing-6)",
                        paddingInline: "var(--spacing-4)",
                        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <Link to="/" style={{ height: 42 }}>
                        <img
                            src="/tempra-logo-blue.svg"
                            alt="Tempra Logo"
                            height={42}
                        />
                    </Link>

                    <div className="d-flex" style={{ gap: "var(--spacing-8)" }}>
                        <div
                            className="d-flex align-items-center"
                            style={{ gap: "var(--spacing-4)" }}
                        >
                            {session?.isLoggedIn ? (
                                <LoggedInButtons />
                            ) : (
                                <AuthButtons />
                            )}
                        </div>
                        {session?.isLoggedIn && <UserAvatar />}
                    </div>
                </header>
            )}
            <Outlet />
        </div>
    );
}

function AuthButtons() {
    return (
        <>
            <Link
                to="/signup"
                className={cls("btn fs-button", buttonVariants.contained.gray)}
            >
                Sign up
            </Link>
            <Link
                to="/login"
                style={{ color: "currentColor" }}
                className="fs-button"
            >
                Log in
            </Link>
        </>
    );
}

function LoggedInButtons() {
    return (
        <>
            <Button
                className={cls(
                    buttonVariants.faded.primary,
                    "d-flex align-items-center",
                )}
            >
                <PlusIcon className="fs-body me-1" />
                New time capsule
            </Button>
            <Link
                to="/my-capsules"
                style={{ color: "currentColor" }}
                className="fs-button"
            >
                My Capsules
            </Link>
        </>
    );
}

function UserAvatar() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex align-items-center fs-h2"
            style={{
                gap: "var(--spacing-2)",
                position: "relative",
            }}
        >
            <select
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                }}
                id="profile-dropdown"
                defaultValue=""
                onChange={e => {
                    console.log(e.target.value);
                    switch (e.target.value) {
                        case "logout": {
                            localStorage.clear();
                            navigate("/");
                            location.reload();
                            break;
                        }
                        case "settings": {
                            navigate("/settings");
                            break;
                        }
                    }
                }}
            >
                <option value="" disabled></option>
                <option value="logout">log out</option>
                <option value="settings">Account Settings</option>
            </select>

            <img
                src="https://i.pravatar.cc/150?u=32345"
                alt="#user"
                width={48}
                height={48}
                className="rounded-full"
                style={{
                    outline: "2px solid rgb(100, 100, 100, 0.3)",
                    outlineOffset: -1,
                }}
            />
            <ChevronDownIcon height={24} />
        </div>
    );
}
