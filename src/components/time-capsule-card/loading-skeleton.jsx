export default function TimeCapsuleLoadingSkeleton({ numberOfCards = 11 }) {
    return Array.from({ length: numberOfCards }).map((_, idx) => (
        <div key={idx} className="time-capsule-card-skeleton" />
    ));
}
