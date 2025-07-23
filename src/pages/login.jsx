import { buttonVariants } from "../components/shared/button/variants";
import Input from "../components/shared/input";
import AuthLayoutHeader from "../components/shared/layouts/auth-layout/auth-layout-header";
import { api } from "../api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/shared/button";
import { AxiosError } from "axios";
import Auth from "../lib/auth";

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);

        setIsSubmitting(true);
        try {
            const { data } = await api.post("/auth/login", {
                email,
                password,
            });
            Auth.saveUserSession(data.payload);
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response.data);
                console.warn(err.response?.data);
            } else console.warn(err);
        }
        setIsSubmitting(false);
    }

    return (
        <>
            <AuthLayoutHeader title="Login to Continue" />

            <form onSubmit={handleSubmit} className="auth-layout-form">
                {error && (
                    <p className="alert-box border-danger-300 bg-danger-100 text-danger-900 rounded-lg p-3">
                        {error.message}
                    </p>
                )}
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password..."
                    autoComplete="current-password"
                    error={error?.errors?.password}
                    withPasswordToggle
                    required
                />
                <Link
                    to="/forgot-password"
                    className="text-start text-gray-900 fs-button"
                >
                    Forgot password?
                </Link>
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={buttonVariants.contained.primary}
                >
                    Log in
                </Button>

                <p>
                    Are you new here?{" "}
                    <Link to="/signup" className="text-gray-900 fw-bold">
                        Sign up.
                    </Link>
                </p>
            </form>
        </>
    );
}
