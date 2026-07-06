import { useState } from "react";
import {
    FaEnvelope,
    FaLock,
    FaEye,
} from "react-icons/fa";
import { login } from "../services/auth_service";

function RightPanel() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(form);
            alert("Login Successful!");
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">

            <div className="w-full max-w-sm">

                <div className="flex justify-end mb-8">
                    <p className="text-sm text-gray-500">
                        New here?{" "}
                        <a
                            href="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Welcome Back
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Sign in to continue learning.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>

                        <div className="relative">

                            <FaEnvelope
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                            />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-11 border border-gray-300 rounded-lg pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email: e.target.value,
                                    })
                                }
                            />

                        </div>
                    </div>


                    <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <FaLock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                            />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full h-11 border border-gray-300 rounded-lg pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />

                            <FaEye
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer"
                            />

                        </div>
                    </div>


                    <div className="flex justify-between items-center text-sm">

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                className="accent-blue-600"
                            />

                            <span>Remember Me</span>

                        </label>

                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                        >
                            Forgot Password?
                        </a>

                    </div>


                    <button
                        type="submit"
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
                    >
                        Sign In
                    </button>

                </form>


                <div className="flex items-center my-6">

                    <div className="flex-1 border-t"></div>

                    <span className="mx-4 text-xs text-gray-400">
                        OR
                    </span>

                    <div className="flex-1 border-t"></div>

                </div>


                <p className="text-center text-xs text-gray-500 leading-5">
                    By signing in, you agree to our{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        Terms of Use
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline"
                    >
                        Privacy Policy
                    </a>.
                </p>

            </div>

        </div>
    );
}

export default RightPanel;