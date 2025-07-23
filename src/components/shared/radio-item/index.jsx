import cls from "../../../lib/classnames";
import "./styles.css";

export default function RadioItem({ icon, text, isSelected, value, onClick }) {
    const IconComponent = icon;
    return (
        <button
            type="button"
            role="radio"
            value={value}
            onClick={() => onClick(value)}
            className={cls(
                "radio-item fs-body-bold",
                isSelected && "radio-item--selected",
            )}
        >
            <IconComponent />
            <span>{text}</span>
        </button>
    );
}
