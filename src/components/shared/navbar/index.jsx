import { Link } from "react-router-dom";
import cls from "../../../lib/classnames";
import useAuth from "../../../lib/hooks/use-auth";
import TempraLogo from "../../TempraLogo";
import UserAvatarDropdown from "../../user-avatar-dropdown";
import { buttonVariants } from "../button/variants";
import "./styles.css";
import PlusIcon from "../../../icons/plus";
import Button from "../button";

export default function Navbar() {
    const session = useAuth();

    return (
        <header className="navbar">
            <Link to="/" className="navbar__logo">
                <TempraLogo />
            </Link>

            <div className="navbar__actions-container">
                <div className="navbar__actions">
                    {session?.isLoggedIn ? (
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
                    ) : (
                        <>
                            <Link
                                to="/signup"
                                className={cls(
                                    "btn fs-button",
                                    buttonVariants.contained.gray,
                                )}
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
                    )}
                </div>
                {session?.isLoggedIn && <UserAvatarDropdown />}
            </div>
        </header>
    );
}
