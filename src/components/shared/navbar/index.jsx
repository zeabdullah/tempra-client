import { Link } from "react-router-dom";
import cls from "../../../lib/classnames";
import useAuth from "../../../lib/hooks/use-auth";
import TempraLogo from "../../tempra-logo";
import UserAvatarDropdown from "../../user-avatar-dropdown";
import { buttonVariants } from "../button/variants";
import "./styles.css";
import PlusIcon from "../../../icons/plus";

export default function Navbar() {
    const session = useAuth();

    return (
        <header className="navbar">
            <div className="navbar__wrapper container">
                <Link to="/" className="navbar__logo">
                    <TempraLogo />
                </Link>

                <div className="navbar__actions-wrapper">
                    <div className="navbar__actions">
                        {session?.isLoggedIn ? (
                            <div className="navbar__actions--logged-in">
                                <Link
                                    to="/new-capsule"
                                    className={cls(
                                        "btn fs-button",
                                        buttonVariants.faded.primary,
                                        "d-flex align-items-center",
                                    )}
                                >
                                    <PlusIcon className="fs-body me-1" />
                                    New time capsule
                                </Link>
                                <Link to="/my-capsules" className="fs-button">
                                    My Capsules
                                </Link>
                            </div>
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
                                <Link to="/login" className="fs-button">
                                    Log in
                                </Link>
                            </>
                        )}
                    </div>
                    {session?.isLoggedIn && <UserAvatarDropdown />}
                </div>
            </div>
        </header>
    );
}
