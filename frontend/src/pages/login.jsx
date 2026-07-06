import { useState } from "react";
import { login } from "../services/auth_service";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(form);

        alert("Login successful!");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-slate-500 mb-8">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;