import axios from "axios";

const API = "http://localhost:5000/api/student/enrollments";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});


export const enrollCourse = async (courseId) => {

    const response = await axios.post(
        API,
        { courseId },
        authHeader()
    );

    return response.data;
};


export const getMyCourses = async () => {

    const response = await axios.get(
        API,
        authHeader()
    );

    return response.data;
};


export const removeCourse = async (courseId) => {

    const response = await axios.delete(
        `${API}/${courseId}`,
        authHeader()
    );

    return response.data;
};


export const updateProgress = async (courseId, progress) => {

    const response = await axios.put(
        `${API}/${courseId}/progress`,
        { progress },
        authHeader()
    );

    return response.data;
};