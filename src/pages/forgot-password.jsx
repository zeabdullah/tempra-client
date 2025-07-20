import { buttonVariants } from "../components/shared/button/variants";
import Input from "../components/shared/input";
import AuthLayoutHeader from "../components/shared/layouts/auth-layout/auth-layout-header";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/shared/button";

export default function ForgotPasswordPage() {
    const [error, _setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email } = Object.fromEntries(formData);
        console.log(email);

        setIsSubmitting(true);
        // try {
        //     // const { data } = await api.post("/auth/forgot-password", { email });
        //     // navigate("/");
        // } catch (err) {
        //     if (err instanceof AxiosError) {
        //         setError(err.response.data);
        //         console.log(err.response?.data);
        //     } else console.log(err);
        // }
        setIsSubmitting(false);
    }

    return (
        <>
            <AuthLayoutHeader title="Forgot your password?" />

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "100%",
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

                <Input
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={buttonVariants.contained.primary}
                >
                    Send reset link
                </Button>

                <p>
                    Looking for login instead?{" "}
                    <Link to="/signup" className="text-gray-900 fw-bold">
                        Log in.
                    </Link>
                </p>
            </form>
        </>
    );
}
