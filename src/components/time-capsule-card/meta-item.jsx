export default function TimeCapsuleCardMetaItem({ icon, children }) {
    const IconComponent = icon;
    return (
        <p className="time-capsule-card__meta-item">
            <IconComponent className="time-capsule-card__meta-icon" />
            <span
                className="time-capsule-card__meta-text fs-caption line-clamp"
                style={{ "--line-clamp": 1 }}
            >
                {children}
            </span>
        </p>
    );
}
