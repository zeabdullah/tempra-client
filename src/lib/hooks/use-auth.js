import { useMemo } from "react";

// TODO: rename to `useSession`
export default function useAuth() {
    // TODO: refactor and/or move this into the `useMemo`
    const user = localStorage.getItem("tempra--user");
    const jwt = localStorage.getItem("tempra--jwt");

    const session = useMemo(() => {
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
    }, [jwt, user]);

    return session;
}
