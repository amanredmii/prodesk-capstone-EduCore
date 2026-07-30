import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const register = async (data) => {

    const response = await axios.post(
        `${API}/register`,
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
        `${API}/login`,
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