import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyCourses,
    removeCourse,
    updateProgress
} from "../services/enrollmentService";


function MyCourses() {

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



    const handleRemove = async (courseId) => {

        if (!window.confirm("Remove this course?")) {
            return;
        }


        try {

            await removeCourse(courseId);

            fetchCourses();

        } catch (error) {

            console.log(error);

        }

    };



    const handleProgress = async (courseId, value) => {

        try {

            await updateProgress(
                courseId,
                Number(value)
            );

            fetchCourses();

        } catch (error) {

            console.log(error);

        }

    };



    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">


            <header className="bg-white shadow-sm sticky top-0 z-40">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">


                    <h1
                        onClick={() => navigate("/student/dashboard")}
                        className="text-3xl font-bold text-blue-700 cursor-pointer"
                    >
                        EduCore
                    </h1>


                    <button

                        onClick={() => navigate("/student/dashboard")}

                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"

                    >
                        Browse Courses
                    </button>


                </div>

            </header>



            <main className="max-w-7xl mx-auto px-8 py-10">


                <h1 className="text-4xl font-bold text-gray-800 mb-8">

                    My Learning

                </h1>



                {
                    courses.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow p-12 text-center">

                            <h2 className="text-3xl font-bold">
                                No Courses Enrolled
                            </h2>

                            <p className="text-gray-500 mt-3">
                                Start learning by enrolling in a course.
                            </p>

                        </div>


                    ) : (


                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


                            {
                                courses.map((item) => (


                                    <div

                                        key={item._id}

                                        className="
                                        bg-white
                                        rounded-3xl
                                        shadow-lg
                                        overflow-hidden
                                        hover:-translate-y-2
                                        transition
                                        "

                                    >


                                        <img

                                            src={
                                                item.course.thumbnail ||
                                                "https://placehold.co/600x350?text=EduCore"
                                            }

                                            alt={item.course.title}

                                            className="w-full h-52 object-cover"

                                        />



                                        <div className="p-6">


                                            <h2 className="text-2xl font-bold">

                                                {item.course.title}

                                            </h2>



                                            <p className="text-gray-500 mt-3">

                                                {item.course.description}

                                            </p>



                                            <div className="mt-6">


                                                <div className="flex justify-between mb-2">

                                                    <span>
                                                        Progress
                                                    </span>

                                                    <span className="font-bold">
                                                        {item.progress}%
                                                    </span>

                                                </div>



                                                <div className="w-full bg-gray-200 rounded-full h-3">


                                                    <div

                                                        className="
                                                        bg-blue-600
                                                        h-3
                                                        rounded-full
                                                        "

                                                        style={{
                                                            width: `${item.progress}%`
                                                        }}

                                                    ></div>


                                                </div>


                                            </div>




                                            <input

                                                type="range"

                                                min="0"

                                                max="100"

                                                value={item.progress}

                                                onChange={(e) =>
                                                    handleProgress(
                                                        item.course._id,
                                                        e.target.value
                                                    )
                                                }

                                                className="w-full mt-5"

                                            />




                                            <div className="grid grid-cols-2 gap-3 mt-6">


                                                <button

                                                    onClick={() =>
                                                        alert("Learning module coming soon")
                                                    }

                                                    className="
                                                    bg-blue-600
                                                    text-white
                                                    py-3
                                                    rounded-xl
                                                    "

                                                >

                                                    Continue

                                                </button>



                                                <button

                                                    onClick={() =>
                                                        handleRemove(item.course._id)
                                                    }

                                                    className="
                                                    bg-red-500
                                                    text-white
                                                    py-3
                                                    rounded-xl
                                                    "

                                                >

                                                    Remove

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


        </div>

    );

}


export default MyCourses;