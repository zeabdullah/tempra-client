import { Link } from "react-router-dom";
import GlobeHemisphereWestIcon from "../../icons/globe-hemisphere-west";
import LinkIcon from "../../icons/link";
import LockIcon from "../../icons/lock";
import CalendarDotsIcon from "../../icons/calendar-dots";
import MapPinSimpleIcon from "../../icons/map-pin-simple";
import cls from "../../lib/classnames";
import { timeCapsuleCardClasses } from "../time-capsule-card/variants";
import TimeCapsuleCardMetaItem from "../time-capsule-card/meta-item";

const visibilityValues = {
    public: { label: "Public", icon: GlobeHemisphereWestIcon },
    unlisted: { label: "Unlisted", icon: LinkIcon },
    private: { label: "Private", icon: LockIcon },
};

export default function MyTimeCapsuleCard({
    id,
    title,
    previewText,
    visibility,
    location,
    date,
    color = "blue",
}) {
    return (
        <div className="time-capsule-card">
            <Link
                to={`/capsule/${id}`}
                className={cls(
                    "time-capsule-card__body",
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

                    <TimeCapsuleCardMetaItem icon={MapPinSimpleIcon}>
                        {location}
                    </TimeCapsuleCardMetaItem>
                    <TimeCapsuleCardMetaItem
                        icon={visibilityValues[visibility].icon}
                    >
                        {visibilityValues[visibility].label}
                    </TimeCapsuleCardMetaItem>
                    <TimeCapsuleCardMetaItem icon={CalendarDotsIcon}>
                        {date}
                    </TimeCapsuleCardMetaItem>
                </div>
            </Link>
        </div>
    );
}
