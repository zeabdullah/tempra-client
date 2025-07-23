import { useMemo } from "react";

export default function useSession() {
    const session = useMemo(() => {
        const user = localStorage.getItem("tempra--user");
        const jwt = localStorage.getItem("tempra--jwt");
        if (user && jwt) {
            try {
                const userParsed = JSON.parse(user);
                return { isLoggedIn: true, user: userParsed, token: jwt };
            } catch (err) {
                console.warn(
                    "Error parsing user data from localStorage:",
                    err instanceof Error ? err.message : err,
                );
            }
        } else {
            return { isLoggedIn: false };
        }
    }, []);

    return session;
}
