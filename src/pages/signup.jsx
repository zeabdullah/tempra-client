import { useState } from "react";
import { AxiosError } from "axios";
import Input from "../components/shared/input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { buttonVariants } from "../components/shared/button/variants";
import Button from "../components/shared/button";
import { api } from "../api/api";
import AuthLayoutHeader from "../components/shared/layouts/auth-layout/auth-layout-header";
import Auth from "../lib/auth";

export default function SignupPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const { first_name, last_name, email, password } =
            Object.fromEntries(formData);

        setIsSubmitting(true);
        try {
            const { data } = await api.post("/auth/register", {
                first_name,
                last_name,
                email,
                password,
                avatar_url: null,
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
            <AuthLayoutHeader title="Create a new account" />

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-4)",
                }}
            >
                {error && (
                    <p
                        style={{ border: "1px solid var(--color-danger-300)" }}
                        className="bg-danger-100 text-danger-900 rounded-lg p-3"
                    >
                        {error.message}
                    </p>
                )}
                <div
                    style={{
                        display: "flex",
                        gap: "var(--spacing-3)",
                        alignItems: "flex-start",
                    }}
                >
                    <Input
                        label="First name"
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="John"
                        autoComplete="given-name"
                        error={error?.errors?.first_name}
                        style={{ flex: 1, width: "100%" }}
                        required
                    />
                    <Input
                        label="Last name"
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Doe"
                        autoComplete="family-name"
                        error={error?.errors?.last_name}
                        style={{ flex: 1, width: "100%" }}
                        required
                    />
                </div>
                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    error={error?.errors?.email}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password..."
                    autoComplete="new-password"
                    withPasswordToggle
                    error={error?.errors?.password}
                    required
                />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={buttonVariants.contained.primary}
                >
                    Create account
                </Button>

                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-900 fw-bold">
                        Log in.
                    </Link>
                </p>
            </form>
        </>
    );
}
