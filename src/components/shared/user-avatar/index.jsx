import cls from "../../../lib/classnames";
import "./styles.css";

const avatarSizes = {
    xs: 32,
    sm: 40,
    md: 48,
    xl: 160,
};

const avatarClasses = {
    xs: "user-avatar--xs",
    sm: "user-avatar--sm",
    md: "user-avatar--md",
    xl: "user-avatar--xl",
};

export default function UserAvatar({
    src,
    alt = "Avatar",
    size = "md",
    className,
}) {
    return (
        <img
            src={src}
            alt={alt}
            width={avatarSizes[size]}
            height={avatarSizes[size]}
            className={cls("user-avatar", avatarClasses[size], className)}
        />
    );
}
