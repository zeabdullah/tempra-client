import { Link } from "react-router-dom";

export default function AuthLayoutHeader({ title }) {
    return (
        <hgroup className="auth-layout-header mx-auto">
            <Link to="/">
                <img
                    src="/tempra-logo-blue.svg"
                    alt="Tempra logo"
                    height={42}
                    className="auth-layout-header__logo"
                />
            </Link>
            <h1 className="fs-h2">{title}</h1>
        </hgroup>
    );
}
