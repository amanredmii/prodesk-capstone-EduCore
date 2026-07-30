import { useEffect, useState } from "react";
import { getMyCourses, removeCourse } from "../services/enrollment_service";

function MyCourses() {
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

    const handleRemove = async (courseId) => {
        try {
            await removeCourse(courseId);

            setCourses((prev) =>
                prev.filter((item) => item.course._id !== courseId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                My Courses
            </h1>

            {courses.length === 0 ? (
                <p className="text-gray-500">
                    No enrolled courses found.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <img
                                src={item.course.thumbnail}
                                alt={item.course.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="text-xl font-bold">
                                    {item.course.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    {item.course.description}
                                </p>

                                <p className="mt-3 font-semibold text-green-600">
                                    ₹{item.course.price}
                                </p>

                                <div className="mt-4">
                                    <p className="text-sm font-medium">
                                        Progress
                                    </p>

                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{
                                                width: `${item.progress}%`
                                            }}
                                        ></div>
                                    </div>

                                    <p className="text-sm mt-2">
                                        {item.progress}%
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        handleRemove(item.course._id)
                                    }
                                    className="mt-5 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                                >
                                    Remove Course
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyCourses;