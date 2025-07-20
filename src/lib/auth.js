export default class Auth {
    static saveUserSession(payload) {
        if ("user" in payload && "auth" in payload) {
            localStorage.setItem("tempra--jwt", payload.auth.token);
            localStorage.setItem("tempra--user", JSON.stringify(payload.user));
        }
    }

    static isAuthenticated() {
        return (
            Boolean(localStorage.getItem("tempra--jwt")) &&
            Boolean(localStorage.getItem("tempra--user"))
        );
    }

    static logout() {
        localStorage.clear();
    }
}
