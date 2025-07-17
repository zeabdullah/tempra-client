import { useState, useId } from "react";
import WarningCircleIcon from "../../../icons/warning-circle";
import "./styles.css";
import EyeClosedIcon from "../../../icons/eye-closed";
import EyeIcon from "../../../icons/eye";

export default function Input({
    error,
    type = "text",
    withPasswordToggle,
    label,
    id,
    name,
    value,
    onChange,
    readOnly,
    required,
    placeholder,
    className,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const _internalId = useId();
    const inputId = id ?? _internalId;

    if (type !== "password" && withPasswordToggle) {
        throw new Error(
            "<Input> component's `withPasswordToggle` prop can only be used with type='password'",
            { cause: this },
        );
    }

    let inputJsx = (
        <input
            className="input__field rounded-xl"
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
        />
    );
    if (type === "password" && withPasswordToggle !== false) {
        inputJsx = (
            <div className="input__field rounded-xl d-flex justify-between align-items-center">
                <input
                    className="input__field__field flex-grow"
                    id={inputId}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    required={required}
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
        </div>
    );
}
