import cls from "../../lib/classnames";
import "./styles.css";

export default function ColorSwatch({ color = "blue", onClick, isSelected }) {
    return (
        <button
            type="button"
            role="radio"
            value={color}
            onClick={() => onClick(color)}
            aria-label={color}
            className={cls(
                "color-swatch",
                `color-swatch--${color}`,
                isSelected && "color-swatch--selected",
            )}
        />
    );
}
