import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllCourses,
    searchCourses
} from "../../services/st_services";

import {
    enrollCourse
} from "../../services/enrollment_service";


function Dashboard() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);


    const fetchCourses = async () => {

        try {

            const data = await getAllCourses();

            setCourses(data);

        } catch (error) {

            console.log(error);

        }
    };


    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);


        if (value.trim() === "") {

            fetchCourses();
            return;

        }


        try {

            const data = await searchCourses(value);

            setCourses(data);

        } catch (error) {

            console.log(error);

        }

    };


    const handleEnroll = async (id) => {

        try {

            await enrollCourse(id);

            alert("Course enrolled successfully");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Enrollment failed"
            );

        }

    };


    const logout = () => {

        localStorage.clear();

        navigate("/");

    };


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">


            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">


                    <div>

                        <h1 className="text-3xl font-bold text-blue-700">
                            EduCore
                        </h1>

                        <p className="text-gray-500">
                            Student Learning Dashboard
                        </p>

                    </div>


                    <div className="flex gap-4">


                        <button
                            onClick={() => navigate("/my-courses")}
                            className="bg-blue-600 text-white px-5 py-2 rounded-xl"
                        >
                            My Courses
                        </button>


                        <button
                            onClick={logout}
                            className="bg-red-500 text-white px-5 py-2 rounded-xl"
                        >
                            Logout
                        </button>


                    </div>


                </div>

            </header>



            <main className="max-w-7xl mx-auto px-8 py-10">


                <section className="bg-white rounded-3xl shadow-lg p-10 mb-10">

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

                        <div>
                            <h2 className="text-4xl font-bold text-gray-800">
                                Welcome Back 👋
                            </h2>

                            <p className="text-gray-500 mt-3 text-lg">
                                Explore courses and continue your learning journey.
                            </p>
                        </div>

                        <div className="w-full lg:w-auto">
                            <input
                                value={keyword}
                                onChange={handleSearch}
                                placeholder="🔍 Search courses..."
                                className="
                    w-full
                    lg:w-96
                    border
                    rounded-xl
                    px-5
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    shadow-sm
                "
                            />
                        </div>

                    </div>

                </section>


                <div className="flex justify-between items-center mb-8">


                    <h2 className="text-3xl font-bold">
                        Available Courses
                    </h2>


                    <span className="text-gray-500">
                        {courses.length} Courses
                    </span>


                </div>




                {
                    courses.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center shadow">

                            <h2 className="text-2xl font-bold">
                                No courses available
                            </h2>

                        </div>


                    ) : (


                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


                            {
                                courses.map((course) => (


                                    <div
                                        key={course._id}
                                        className="
                                        bg-white
                                        rounded-3xl
                                        overflow-hidden
                                        shadow-lg
                                        hover:-translate-y-2
                                        transition
                                        "
                                    >


                                        <img

                                            src={
                                                course.thumbnail ||
                                                "https://placehold.co/600x350?text=EduCore"
                                            }

                                            alt={course.title}

                                            className="w-full h-52 object-cover"

                                        />



                                        <div className="p-6">


                                            <h3 className="text-2xl font-bold">

                                                {course.title}

                                            </h3>


                                            <p className="text-gray-500 mt-3 line-clamp-3">

                                                {course.description}

                                            </p>



                                            <div className="flex justify-between items-center mt-6">


                                                <span className="text-xl font-bold text-blue-600">

                                                    $ {course.price}

                                                </span>


                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                    Course

                                                </span>


                                            </div>



                                            <div className="grid grid-cols-2 gap-3 mt-6">


                                                <button

                                                    onClick={() =>
                                                        navigate(`/course/${course._id}`)
                                                    }

                                                    className="
                                                    bg-gray-800
                                                    text-white
                                                    py-3
                                                    rounded-xl
                                                    "

                                                >

                                                    Details

                                                </button>



                                                <button

                                                    onClick={() =>
                                                        handleEnroll(course._id)
                                                    }

                                                    className="
                                                    bg-blue-600
                                                    hover:bg-blue-700
                                                    text-white
                                                    py-3
                                                    rounded-xl
                                                    "

                                                >

                                                    Enroll

                                                </button>


                                            </div>


                                        </div>


                                    </div>


                                ))
                            }


                        </div>


                    )
                }


            </main>



            <button

                onClick={() => navigate("/ai")}

                className="
                fixed
                bottom-8
                right-8
                w-16
                h-16
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
                shadow-2xl
                text-2xl
                "

            >

                ✨

            </button>


        </div>

    );

}


export default Dashboard;