"use client";
import { useState, useEffect } from "react";

export default function ChallengePage() {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [code, setCode] = useState("");
    const [submissionResult, setSubmissionResult] = useState(null);
    const [executing, setExecuting] = useState(false);

    useEffect(() => {
        fetchChallenge();
    }, []);

    async function fetchChallenge() {
        try {
            setLoading(true);
            const res = await fetch("/api/challenge", { cache: "no-store" }); // Prevent caching issues
            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
            const data = await res.json();
            setChallenge(data.data);
        } catch (err) {
            setError(err.message || "Failed to fetch challenge");
        } finally {
            setLoading(false);
        }
    }


    async function submitSolution() {
        setExecuting(true);
        setSubmissionResult(null);

        try {
            // Simulated execution time and correctness (Replace with real logic)
            const executionTime = Math.random() * 5; // Fake execution time (0-5s)
            const isCorrect = Math.random() > 0.2; // 80% chance of being correct

            const res = await fetch("/api/challenge/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    challengeId: challenge._id,
                    executionTime,
                    isCorrect,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Submission failed");

            setSubmissionResult(data.message);
            fetchChallenge(); // Fetch next challenge based on updated difficulty
        } catch (err) {
            setSubmissionResult("Error submitting solution.");
        } finally {
            setExecuting(false);
        }
    }

    if (loading) return <p className="text-center mt-5">Loading challenge...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Adaptive Coding Challenge</h1>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <p className="mt-2">{challenge.description}</p>
                <span className={`inline-block px-3 py-1 mt-2 text-white rounded-full ${challenge.difficulty === "Easy" ? "bg-green-500" : challenge.difficulty === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}>
                    {challenge.difficulty}
                </span>
            </div>

            <textarea
                className="w-full mt-4 p-3 border rounded-lg"
                rows="5"
                placeholder="Write your solution here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
            ></textarea>

            <button
                onClick={submitSolution}
                disabled={executing}
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
                {executing ? "Submitting..." : "Submit Solution"}
            </button>

            {submissionResult && <p className="mt-3 text-green-600">{submissionResult}</p>}
        </div>
    );
}
