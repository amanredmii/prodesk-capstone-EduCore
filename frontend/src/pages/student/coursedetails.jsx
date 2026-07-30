import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCourseById } from "../../services/st_services";
import { enrollCourse } from "../../services/enrollment_service";


function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);


    useEffect(() => {

        fetchCourse();

    }, []);



    const fetchCourse = async () => {

        try {

            const data = await getCourseById(id);

            setCourse(data);

        } catch (error) {

            console.log(error);

        }

    };



    const handleEnroll = async () => {

        try {

            await enrollCourse(course._id);

            alert("Course enrolled successfully");

            navigate("/my-courses");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Enrollment failed"
            );

        }

    };



    if (!course) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h2 className="text-2xl font-bold">
                    Loading course...
                </h2>

            </div>

        );

    }



    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">


            <header className="bg-white shadow-sm sticky top-0 z-40">

                <div className="max-w-6xl mx-auto px-8 py-5 flex justify-between items-center">


                    <h1
                        onClick={() => navigate("/student/dashboard")}
                        className="text-3xl font-bold text-blue-700 cursor-pointer"
                    >
                        EduCore
                    </h1>


                    <button

                        onClick={() => navigate("/my-courses")}

                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"

                    >
                        My Courses
                    </button>


                </div>

            </header>



            <main className="max-w-6xl mx-auto px-8 py-10">


                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">


                    <img

                        src={
                            course.thumbnail ||
                            "https://placehold.co/1200x500?text=EduCore"
                        }

                        alt={course.title}

                        className="w-full h-96 object-cover"

                    />



                    <div className="p-10">


                        <h1 className="text-4xl font-bold text-gray-800">

                            {course.title}

                        </h1>



                        <p className="text-gray-500 text-lg mt-5">

                            {course.description}

                        </p>



                        <div className="grid md:grid-cols-3 gap-6 mt-8">


                            <div className="bg-blue-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Price
                                </p>

                                <h3 className="text-3xl font-bold text-blue-600">

                                    ₹ {course.price}

                                </h3>

                            </div>



                            <div className="bg-green-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Instructor
                                </p>

                                <h3 className="text-xl font-bold">

                                    {
                                        course.authorId?.name ||
                                        "EduCore Instructor"
                                    }

                                </h3>

                            </div>



                            <div className="bg-purple-50 p-5 rounded-2xl">

                                <p className="text-gray-500">
                                    Status
                                </p>

                                <h3 className="text-xl font-bold text-green-600">

                                    Available

                                </h3>

                            </div>


                        </div>



                        <button

                            onClick={handleEnroll}

                            className="
                            mt-10
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-4
                            rounded-2xl
                            text-xl
                            font-bold
                            "

                        >

                            Enroll Now

                        </button>



                    </div>


                </div>


            </main>


        </div>

    );

}


export default CourseDetails;