export default function TimeCapsuleLoadingSkeleton({ numberOfCards = 11 }) {
    return Array.from({ length: numberOfCards }).map((_, idx) => (
        <div
            key={idx}
            style={{
                borderRadius: 16,
                backgroundColor: "var(--color-gray-100)",
                height: "22.5rem",
                animation: "pulse 2.5s infinite ease-in-out",
            }}
        />
    ));
}
