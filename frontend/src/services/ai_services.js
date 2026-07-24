import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const getSuggestion = async (prompt) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/suggest`,
        { prompt },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};