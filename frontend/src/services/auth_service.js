import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL + "/api/auth";

export const register = async (data) => {

    const response = await axios.post(
        `${API_URL}/register`,
        data
    );

    localStorage.setItem(
        "token",
        response.data.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );

    localStorage.setItem(
        "role",
        response.data.user.role
    );

    return response.data;
};

export const login = async (data) => {

    const response = await axios.post(
        `${API_URL}/login`,
        data
    );

    localStorage.setItem(
        "token",
        response.data.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );

    localStorage.setItem(
        "role",
        response.data.user.role
    );

    return response.data;
};