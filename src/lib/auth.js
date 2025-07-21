const LS_JWT = "tempra--jwt";
const LS_USER = "tempra--user";

export default class Auth {
    static getToken() {
        return localStorage.getItem(LS_JWT);
    }

    static getUserData() {
        const userDataStr = localStorage.getItem(LS_USER);
        if (userDataStr) {
            return JSON.parse(userDataStr);
        }
        return null;
    }

    static saveUserSession(payload) {
        if ("user" in payload && "auth" in payload) {
            localStorage.setItem(LS_JWT, payload.auth.token);
            localStorage.setItem(LS_USER, JSON.stringify(payload.user));
        }
    }

    static isAuthenticated() {
        return (
            Boolean(localStorage.getItem(LS_JWT)) &&
            Boolean(localStorage.getItem(LS_USER))
        );
    }

    static logout() {
        localStorage.removeItem(LS_JWT);
        localStorage.removeItem(LS_USER);
    }
}
