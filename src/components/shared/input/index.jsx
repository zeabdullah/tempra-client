import { useState, useId } from "react";
import WarningCircleIcon from "../../../icons/warning-circle";
import EyeClosedIcon from "../../../icons/eye-closed";
import EyeIcon from "../../../icons/eye";
import cls from "../../../lib/classnames";
import "./styles.css";

export default function Input({
    error,
    type = "text",
    withPasswordToggle,
    label,
    id,
    readOnly,
    className,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);
    const _internalId = useId();
    const inputId = id ?? _internalId; // set an internal id for semantics and a11y if not provided by the user

    if (type !== "password" && withPasswordToggle) {
        throw new Error(
            "<Input> component's `withPasswordToggle` prop can only be used with type='password'",
        );
    }

    let inputJsx = (
        <input
            className={cls("input__field rounded-xl", className)}
            id={inputId}
            type={type}
            {...props}
        />
    );
    if (type === "password" && withPasswordToggle !== false) {
        inputJsx = (
            <div className="input__field rounded-xl d-flex justify-between align-items-center">
                <input
                    className={cls("input__field__field flex-grow", className)}
                    id={inputId}
                    type={showPassword ? "text" : "password"}
                    {...props}
                />
                <button
                    type="button"
                    className="icon-btn ms-2"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                </button>
            </div>
        );
    }

    return (
        <div
            className={`input__root d-flex flex-col ${
                error ? "input__root--error" : ""
            } ${readOnly ? "input__root--readonly" : ""} ${className ?? ""}`}
        >
            <label
                className="input__label fs-label-text d-flex justify-between align-items-center"
                htmlFor={inputId}
            >
                <span>{label}</span>
                {error && <WarningCircleIcon className="icon-btn" />}
            </label>
            {inputJsx}
            {error && (
                <div className="fs-caption text-start text-danger-700 py-1">
                    {error}
                </div>
            )}
        </div>
    );
}
