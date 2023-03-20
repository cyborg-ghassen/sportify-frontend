import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const setAuthToken = (access) => {
    if (access) {
        api.defaults.headers.common["Authorization"] = "JWT " + access;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};
