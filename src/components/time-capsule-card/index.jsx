import { Link } from "react-router-dom";
import MapPinSimpleIcon from "../../icons/map-pin-simple";
import CalendarDotsIcon from "../../icons/calendar-dots";
import cls from "../../lib/classnames";
import UserAvatar from "../shared/user-avatar";
import { timeCapsuleCardClasses } from "./variants";
import "./styles.css";

export default function TimeCapsuleCard({
    id,
    title,
    previewText,
    location,
    date,
    user,
    color = "blue",
}) {
    const { id: user_id, first_name, last_name, avatar_url } = user;

    return (
        <div className="time-capsule-card">
            <Link
                to={`/capsule/${id}`}
                className={cls(
                    "time-capsule-card__body card-animate",
                    timeCapsuleCardClasses[color],
                )}
            >
                <p
                    className="time-capsule-card__title fs-h2 line-clamp"
                    style={{ "--line-clamp": 3 }}
                >
                    {title}
                </p>
                <div className="time-capsule-card__meta">
                    <p
                        className="time-capsule-card__preview fs-body line-clamp"
                        style={{ "--line-clamp": 3 }}
                    >
                        {previewText}
                    </p>

                    <p className="time-capsule-card__meta-item">
                        <MapPinSimpleIcon className="time-capsule-card__meta-icon" />
                        <span className="time-capsule-card__meta-text fs-caption">
                            {location}
                        </span>
                    </p>
                    <p className="time-capsule-card__meta-item">
                        <CalendarDotsIcon className="time-capsule-card__meta-icon" />
                        <time className="time-capsule-card__meta-text fs-caption">
                            {date}
                        </time>
                    </p>
                </div>
            </Link>

            <Link
                to={`/user/${user_id}`}
                className="time-capsule-card__footer fs-button"
            >
                <UserAvatar
                    className="time-capsule-card__user-avatar"
                    src={avatar_url ?? "https://i.pravatar.cc/64?u=29485"}
                    size="xs"
                />
                <span className="time-capsule-card__user-name">
                    {first_name} {last_name}
                </span>
            </Link>
        </div>
    );
}
