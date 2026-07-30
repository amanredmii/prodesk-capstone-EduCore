import axios from "axios";

const API =
    import.meta.env.VITE_API_URL + "/api/courses";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});


export const createCourse = async (courseData) => {
    const response = await axios.post(
        API,
        courseData,
        authHeader()
    );

    return response.data;
};


export const getCourses = async () => {
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


export const updateCourse = async (id, courseData) => {
    const response = await axios.put(
        `${API}/${id}`,
        courseData,
        authHeader()
    );

    return response.data;
};


export const deleteCourse = async (id) => {
    const response = await axios.delete(
        `${API}/${id}`,
        authHeader()
    );

    return response.data;
};