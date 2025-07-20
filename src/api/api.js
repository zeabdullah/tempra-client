import axios from "axios";
import { API_URL } from "../lib/constants";

export const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: "application/json" },
});
