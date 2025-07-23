import cls from "../../lib/classnames";
import "./styles.css";

export default function TypeCardItem({ icon, text, onClick, isSelected }) {
    const IconComponent = icon;
    return (
        <button
            type="button"
            onClick={onClick}
            className={cls(
                "type-card-item card-animate fs-body-bold",
                isSelected && "bg-primary-300",
            )}
        >
            <IconComponent height={48} width={48} />
            <div>{text}</div>
        </button>
    );
}
