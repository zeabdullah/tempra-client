import Auth from "../lib/auth";

import axios from "axios";
import { API_URL } from "../lib/constants";

export const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: "application/json" },
});

api.interceptors.response.use(
    response => response,
    err => {
        if (err.response?.status === 401 && Auth.isAuthenticated()) {
            Auth.logout();
            window.location.reload();
        }
        return Promise.reject(err);
    },
);
