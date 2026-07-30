import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourses } from "../../services/admin_services";

function Dashboard() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getMyCourses();
            setCourses(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <header className="bg-white shadow-md">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold text-blue-700">
                            EduCore Admin
                        </h1>

                        <p className="text-gray-500">
                            Learning Management System
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </header>

            <div className="max-w-7xl mx-auto p-8">

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h3 className="text-gray-500 text-sm">
                            Total Courses
                        </h3>

                        <h2 className="text-4xl font-bold mt-3 text-blue-600">
                            {courses.length}
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h3 className="text-gray-500 text-sm">
                            Total Students
                        </h3>

                        <h2 className="text-4xl font-bold mt-3 text-green-600">
                            0
                        </h2>

                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6">

                        <h3 className="text-gray-500 text-sm">
                            Total Enrollments
                        </h3>

                        <h2 className="text-4xl font-bold mt-3 text-purple-600">
                            0
                        </h2>

                    </div>

                </div>

                <div className="flex justify-between items-center mt-10">

                    <div>

                        <h2 className="text-3xl font-bold">
                            My Courses
                        </h2>

                        <p className="text-gray-500">
                            Manage your courses
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/create-course")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                    >
                        + Create Course
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;