import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../services/course_service";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);



    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load courses.");
        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        const previousCourses = courses;

        setCourses(courses.filter(course => course._id !== id));

        try {
            await deleteCourse(id);
        } catch (error) {
            alert("Delete failed.");
            setCourses(previousCourses);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="bg-blue-600 text-white flex justify-between items-center px-8 py-4 shadow">

                <h1 className="text-2xl font-bold">
                    EduCore Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <div className="max-w-6xl mx-auto py-10">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        My Courses
                    </h2>

                    <button
                        onClick={() => navigate("/create-course")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                    >
                        + Create Course
                    </button>

                </div>

                {courses.length === 0 ? (

                    <div className="bg-white rounded-lg shadow p-8 text-center">

                        <h3 className="text-xl font-semibold">
                            No Courses Found
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Click "Create Course" to add your first course.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {courses.map((course) => (

                            <div
                                key={course._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >

                                <img
                                    src={
                                        course.thumbnail ||
                                        "https://placehold.co/600x350?text=Course"
                                    }
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-5">

                                    <h3 className="text-xl font-bold">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        {course.description}
                                    </p>

                                    <p className="mt-4 font-bold text-blue-600">
                                        ₹ {course.price}
                                    </p>

                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() => navigate(`/edit-course/${course._id}`)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;