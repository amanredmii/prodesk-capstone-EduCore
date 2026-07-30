import axios from "axios";

const API =
    import.meta.env.VITE_API_URL + "/api/student/courses";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});


export const getAllCourses = async () => {

    const response = await axios.get(
        API,
        authHeader()
    );

    return response.data;
};


export const getCourseById = async (id) => {

    const response = await axios.get(
        `${API}/${id}`,
        authHeader()
    );

    return response.data;
};


export const searchCourses = async (keyword) => {

    const response = await axios.get(
        `${API}/search?keyword=${keyword}`,
        authHeader()
    );

    return response.data;
};