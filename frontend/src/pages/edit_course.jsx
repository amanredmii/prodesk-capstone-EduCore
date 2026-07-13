import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCourseById,
    updateCourse,
} from "../services/course_service";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
    });

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {
        try {

            const course = await getCourseById(id);

            setForm({
                title: course.title,
                description: course.description,
                price: course.price,
                thumbnail: course.thumbnail,
            });

        } catch (error) {
            alert("Failed to load course.");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateCourse(id, form);

            alert("Course updated successfully!");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Update failed."
            );

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

            <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Edit Course
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <div>

                        <label className="font-medium">
                            Thumbnail URL
                        </label>

                        <input
                            type="text"
                            name="thumbnail"
                            value={form.thumbnail}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 mt-2"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        Update Course
                    </button>

                </form>

            </div>

        </div>

    );
}

export default EditCourse;