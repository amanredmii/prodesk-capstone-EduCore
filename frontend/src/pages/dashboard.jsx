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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

            <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/30 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                    <div>
                        <h1 className="text-3xl font-extrabold text-blue-700">
                            EduCore
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Learning Management Dashboard
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl text-white font-semibold shadow-md"
                    >
                        Logout
                    </button>

                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-10">


                <div className="flex flex-col md:flex-row justify-between gap-5 items-center mb-10">

                    <div>
                        <h2 className="text-4xl font-bold text-gray-800">
                            My Courses
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Manage your learning content
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/create-course")}
                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                    >
                        + Create Course
                    </button>

                </div>


                {courses.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-14 text-center">

                        <img
                            src="https://placehold.co/220x160?text=📚"
                            alt=""
                            className="mx-auto mb-6 rounded-xl"
                        />

                        <h2 className="text-3xl font-bold">
                            No Courses Yet
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Start by creating your first course.
                        </p>

                    </div>

                ) : (

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {courses.map((course) => (

                            <div
                                key={course._id}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                            >

                                <div className="overflow-hidden">

                                    <img
                                        src={
                                            course.thumbnail ||
                                            "https://placehold.co/600x350?text=EduCore"
                                        }
                                        alt={course.title}
                                        className="w-full h-52 object-cover hover:scale-110 transition duration-500"
                                    />

                                </div>

                                <div className="p-6">

                                    <h3 className="text-2xl font-bold text-gray-800 line-clamp-1">
                                        {course.title}
                                    </h3>

                                    <p className="text-gray-500 mt-3 line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-6">

                                        <span className="text-2xl font-bold text-blue-600">
                                            ₹ {course.price}
                                        </span>

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Active
                                        </span>

                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-6">

                                        <button
                                            onClick={() =>
                                                navigate(`/edit-course/${course._id}`)
                                            }
                                            className="bg-blue-400 hover:bg-yellow-500 transition py-3 rounded-xl font-semibold text-white"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(course._id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold text-white"
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
            <button
                onClick={() => navigate("/ai")}
                className="
        fixed
        bottom-8
        right-8
        z-50
        w-16
        h-16
        rounded-full
        bg-gradient-to-r
        from-violet-600
        via-indigo-600
        to-blue-600
        text-white
        shadow-2xl
        hover:scale-110
        hover:shadow-violet-500/40
        transition-all
        duration-300
        flex
        items-center
        justify-center
        group
    "
                title="AI Study Assistant"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm6 11l.9 2.6L21.5 18l-2.6.9L18 21l-.9-2.1L15 18l2.1-.9L18 14zM5 15l.7 2L8 18l-2.3.8L5 21l-.7-2.2L2 18l2.3-.8L5 15z"
                    />
                </svg>

                <span
                    className="
            absolute
            right-20
            whitespace-nowrap
            bg-gray-900
            text-white
            text-sm
            px-3
            py-2
            rounded-lg
            opacity-0
            group-hover:opacity-100
            transition
            duration-300
            pointer-events-none
        "
                >
                    AI Study Assistant
                </span>
            </button>

        </div>
    );
}

export default Dashboard;