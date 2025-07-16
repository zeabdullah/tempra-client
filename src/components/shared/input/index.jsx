import { useState, useId } from "react";
import WarningCircleIcon from "../../../icons/warning-circle";
import "./styles.css";
import EyeClosedIcon from "../../../icons/eye-closed";
import EyeIcon from "../../../icons/eye";

export default function Input({
    error,
    label,
    type = "text",
    id,
    name,
    value,
    onChange,
    readOnly,
    required,
    placeholder,
    className,
}) {
    const _internalId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? _internalId;

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
    if (type === "password") {
        inputJsx = (
            <div className="input__field rounded-xl d-flex justify-between align-items-center">
                <input
                    className="input__field__field"
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
                    style={{ fontSize: 20, height: 20, marginInlineStart: 8 }}
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
                {error && <WarningCircleIcon style={{ fontSize: 20 }} />}
            </label>
            {inputJsx}
        </div>
    );
}
