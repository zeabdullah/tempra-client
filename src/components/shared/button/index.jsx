import "./styles.css";

export default function Button({ children, className, ...props }) {
    const classes = `btn fs-button ${className || ""}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
