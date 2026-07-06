import { useState } from "react";
import { register } from "../services/auth_service";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(form);

        alert("Registration successful!");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">👤</span>
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Join Educore and start your journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200"
                    >
                        Register
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-slate-300"></div>
                    <span className="px-4 text-slate-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-slate-300"></div>
                </div>

                <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;