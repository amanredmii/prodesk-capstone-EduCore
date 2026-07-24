import { useState } from "react";
import { getSuggestion } from "../services/ai_services";

function AIChat() {
    const [prompt, setPrompt] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault();

        if (!prompt.trim()) {
            alert("Please enter a question.");
            return;
        }

        try {
            setLoading(true);

            const data = await getSuggestion(prompt);

            setAnswer(data.data);
        } catch (error) {
            console.error(error);

            setAnswer(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                AI Study Assistant
            </h1>

            <form onSubmit={handleAsk}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask your study question..."
                    className="w-full h-40 border rounded-lg p-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Generating..." : "Ask AI"}
                </button>
            </form>

            {answer && (
                <div className="mt-8 p-5 border rounded-lg bg-gray-100">
                    <h2 className="text-xl font-semibold mb-3">
                        AI Response
                    </h2>

                    <p className="whitespace-pre-wrap">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}

export default AIChat;