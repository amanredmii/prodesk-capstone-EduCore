import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/course_service";

function CreateCourse() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        thumbnail: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await createCourse(form);

            alert("Course created successfully!");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to create course."
            );

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Create New Course
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="font-medium">
                            Course Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 mt-2"
                        />
                    </div>

                    <div>
                        <label className="font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows="4"
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
                            required
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
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Create Course
                    </button>

                </form>

            </div>

        </div>

    );
}

export default CreateCourse;