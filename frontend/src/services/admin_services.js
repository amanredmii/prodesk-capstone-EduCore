import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL + "/api/admin/courses";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getMyCourses = async () => {
    const response = await axios.get(
        API_URL,
        authHeader()
    );

    return response.data;
};

export const createCourse = async (courseData) => {
    const response = await axios.post(
        API_URL,
        courseData,
        authHeader()
    );

    return response.data;
};

export const updateCourse = async (id, courseData) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        courseData,
        authHeader()
    );

    return response.data;
};

export const deleteCourse = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        authHeader()
    );

    return response.data;
};