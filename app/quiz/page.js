// "use client";
// import { useState } from "react";

// export default function QuizPage() {
//     const [topic, setTopic] = useState("");
//     const [difficulty, setDifficulty] = useState("");
//     const [mcqs, setMcqs] = useState([]);
//     const [selectedAnswers, setSelectedAnswers] = useState({});
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);

//     // 📌 Step 1: Fetch MCQs based on user selection
//     const fetchMCQs = async () => {
//         setLoading(true);
//         setResult(null); // Reset previous results
//         setSelectedAnswers({}); // Clear previous answers

//         try {
//             const response = await fetch("/api/mcq/generate", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ topic, difficulty }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setMcqs(data.data);
//             } else {
//                 alert("Error fetching MCQs!");
//             }
//         } catch (error) {
//             console.error("Error fetching MCQs:", error);
//         }

//         setLoading(false);
//     };

//     // 📌 Step 2: Handle user selecting an answer
//     const handleSelectAnswer = (mcqId, answer) => {
//         setSelectedAnswers((prev) => ({ ...prev, [mcqId]: answer }));
//     };

//     // 📌 Step 3: Submit answers & get results
//     const handleSubmit = async () => {
//         const formattedAnswers = Object.keys(selectedAnswers).map((mcqId) => ({
//             mcqId,
//             userAnswer: selectedAnswers[mcqId],
//         }));

//         const response = await fetch("/api/mcq/submit", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ answers: formattedAnswers }),
//         });

//         const data = await response.json();
//         setResult(data);
//     };

//     return (
//         <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow">
//             <h1 className="text-2xl font-bold mb-4">MCQ Quiz</h1>

//             {/* Step 1: Topic & Difficulty Selection Form */}
//             {!mcqs.length && !result && (
//                 <div className="mb-6">
//                     <label className="block mb-2">Select Topic:</label>
//                     <input
//                         type="text"
//                         value={topic}
//                         onChange={(e) => setTopic(e.target.value)}
//                         className="border p-2 w-full mb-4"
//                         placeholder="Enter topic (e.g., JavaScript, Networking)"
//                     />

//                     <label className="block mb-2">Select Difficulty:</label>
//                     <select
//                         value={difficulty}
//                         onChange={(e) => setDifficulty(e.target.value)}
//                         className="border p-2 w-full mb-4"
//                     >
//                         <option value="">Select Difficulty</option>
//                         <option value="easy">Easy</option>
//                         <option value="medium">Medium</option>
//                         <option value="hard">Hard</option>
//                     </select>

//                     <button
//                         onClick={fetchMCQs}
//                         className="bg-blue-500 text-white px-4 py-2 rounded"
//                         disabled={!topic || !difficulty || loading}
//                     >
//                         {loading ? "Fetching MCQs..." : "Start Quiz"}
//                     </button>
//                 </div>
//             )}

//             {/* Step 2: Display MCQs */}
//             {mcqs.length > 0 && !result && (
//                 <form>
//                     {mcqs.map((mcq) => (
//                         <div key={mcq._id} className="mb-4">
//                             <p className="font-semibold">{mcq.question}</p>
//                             {mcq.options.map((option, index) => {
//                                 const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
//                                 return (
//                                     <label key={option} className="block">
//                                         <input
//                                             type="radio"
//                                             name={mcq._id}
//                                             value={optionLetter}
//                                             onChange={() => handleSelectAnswer(mcq._id, optionLetter)}
//                                             className="mr-2"
//                                         />
//                                         {option}
//                                     </label>
//                                 );
//                             })}
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         onClick={handleSubmit}
//                         className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//                     >
//                         Submit Answers
//                     </button>
//                 </form>
//             )}

//             {/* Step 3: Display Results */}
//             {result && (
//                 <div className="mt-6 border-t pt-4">
//                     <h2 className="text-xl font-semibold">Results</h2>
//                     <p>Total Questions: {result.totalQuestions}</p>
//                     <p>Correct Answers: {result.correctAnswers}</p>
//                     <p>Score: {result.totalQuestions > 0 ? result.percentage.toFixed(2) + "%" : "N/A"}</p>

//                     <h4 className="mt-3">Detailed Results:</h4>
//                     {result.results.map((r) => (
//                         <p key={r.mcqId}>
//                             {r.question} - Your Answer: {r.userAnswer} ({r.isCorrect ? "✅ Correct" : "❌ Incorrect"})
//                         </p>
//                     ))}

//                     <button onClick={() => setMcqs([])} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//                         Try Again
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
// import { Cpu, Code, CheckCircle2, XCircle, ArrowLeft, Loader2, Brain, LogOut, Sparkles, Clock } from "lucide-react";
// import Link from "next/link";

// export default function QuizPage() {
//     const { user } = useUser();
//     const [topic, setTopic] = useState("");
//     const [difficulty, setDifficulty] = useState("");
//     const [mcqs, setMcqs] = useState([]);
//     const [selectedAnswers, setSelectedAnswers] = useState({});
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [remainingTime, setRemainingTime] = useState(null);
//     const [currentStep, setCurrentStep] = useState("selection"); // 'selection', 'quiz', 'results'

//     // Timer functionality
//     useEffect(() => {
//         let timer;
//         if (remainingTime && remainingTime > 0 && currentStep === "quiz") {
//             timer = setTimeout(() => {
//                 setRemainingTime(remainingTime - 1);
//             }, 1000);
//         } else if (remainingTime === 0) {
//             handleSubmit();
//         }

//         return () => clearTimeout(timer);
//     }, [remainingTime, currentStep]);

//     // Format time to MM:SS
//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Fetch MCQs based on user selection
//     const fetchMCQs = async () => {
//         if (!topic || !difficulty) {
//             return;
//         }

//         setLoading(true);
//         setResult(null);
//         setSelectedAnswers({});

//         try {
//             const response = await fetch("/api/mcq/generate", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ topic, difficulty }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setMcqs(data.data);
//                 // Set timer based on difficulty
//                 const timePerQuestion = difficulty === "easy" ? 30 : difficulty === "medium" ? 45 : 60;
//                 setRemainingTime(data.data.length * timePerQuestion);
//                 setCurrentStep("quiz");
//             } else {
//                 alert("Error fetching MCQs!");
//             }
//         } catch (error) {
//             console.error("Error fetching MCQs:", error);
//         }

//         setLoading(false);
//     };

//     // Handle user selecting an answer
//     const handleSelectAnswer = (mcqId, option, optionLetter) => {
//         setSelectedAnswers((prev) => ({
//             ...prev,
//             [mcqId]: {
//                 letter: optionLetter,
//                 text: option
//             }
//         }));
//     };

//     // Reset to start again
//     const resetQuiz = () => {
//         setTopic("");
//         setDifficulty("");
//         setMcqs([]);
//         setSelectedAnswers({});
//         setResult(null);
//         setRemainingTime(null);
//         setCurrentStep("selection");
//     };

//     // Submit answers & get results
//     const handleSubmit = async () => {
//         // Stop the timer
//         setRemainingTime(null);

//         const formattedAnswers = Object.keys(selectedAnswers).map((mcqId) => ({
//             mcqId,
//             userAnswer: selectedAnswers[mcqId].letter,
//         }));

//         try {
//             const response = await fetch("/api/mcq/submit", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ answers: formattedAnswers }),
//             });

//             const data = await response.json();
//             setResult(data);
//             setCurrentStep("results");
//         } catch (error) {
//             console.error("Error submitting answers:", error);
//         }
//     };

//     // Calculate progress percentage
//     const progressPercentage = mcqs.length > 0
//         ? (Object.keys(selectedAnswers).length / mcqs.length) * 100
//         : 0;

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-100">
//             {/* Navigation Bar */}
//             <nav className="bg-black border-b border-gray-800 sticky top-0 z-10">
//                 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex items-center">
//                             <Link href="/" className="flex items-center">
//                                 <Cpu className="h-8 w-8 text-purple-500" />
//                                 <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
//                                     AlgoStub Quiz
//                                 </span>
//                             </Link>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             {remainingTime !== null && (
//                                 <div className="flex items-center px-3 py-1 bg-gray-800 rounded-full">
//                                     <Clock className="w-4 h-4 text-yellow-400 mr-2" />
//                                     <span className="text-yellow-300 font-mono">{formatTime(remainingTime)}</span>
//                                 </div>
//                             )}

//                             {user && (
//                                 <div className="flex items-center space-x-3">
//                                     <span className="text-sm font-medium text-gray-300">Hi, {user.firstName || user.username}</span>
//                                     {user.imageUrl ? (
//                                         <img
//                                             src={user.imageUrl}
//                                             alt="Profile"
//                                             className="h-8 w-8 rounded-full ring-1 ring-purple-500 p-0.5"
//                                         />
//                                     ) : (
//                                         <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
//                                             <span className="text-white font-bold">
//                                                 {(user.firstName?.[0] || user.username?.[0] || "?").toUpperCase()}
//                                             </span>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             <Link href="/" className="flex items-center text-gray-400 hover:text-white transition duration-150">
//                                 <LogOut className="h-5 w-5" />
//                                 <span className="sr-only">Quit</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//                 {/* Topic & Difficulty Selection */}
//                 {currentStep === "selection" && (
//                     <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
//                         <div className="px-6 py-8">
//                             <div className="flex items-center justify-center mb-8">
//                                 <Brain className="h-12 w-12 text-purple-400 mr-3" />
//                                 <h1 className="text-3xl font-bold text-white">Start Your Quiz</h1>
//                             </div>

//                             <div className="max-w-md mx-auto bg-gray-850 border border-gray-700 rounded-xl p-6 shadow-inner">
//                                 <div className="space-y-6">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Topic</label>
//                                         <input
//                                             type="text"
//                                             value={topic}
//                                             onChange={(e) => setTopic(e.target.value)}
//                                             className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
//                                             placeholder="Enter topic (e.g., JavaScript, Data Structures)"
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
//                                         <div className="grid grid-cols-3 gap-3">
//                                             {["easy", "medium", "hard"].map((option) => (
//                                                 <button
//                                                     key={option}
//                                                     type="button"
//                                                     onClick={() => setDifficulty(option)}
//                                                     className={`px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-center transition-all duration-200 ${difficulty === option
//                                                         ? "bg-purple-600 border-purple-500 text-white"
//                                                         : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
//                                                         }`}
//                                                 >
//                                                     {option.charAt(0).toUpperCase() + option.slice(1)}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <button
//                                         onClick={fetchMCQs}
//                                         disabled={!topic || !difficulty || loading}
//                                         className="w-full flex items-center justify-center mt-6 px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//                                     >
//                                         {loading ? (
//                                             <>
//                                                 <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
//                                                 Generating Quiz...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Sparkles className="-ml-1 mr-2 h-5 w-5 text-white" />
//                                                 Start Quiz
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Quiz Questions */}
//                 {currentStep === "quiz" && mcqs.length > 0 && (
//                     <div className="space-y-6">
//                         <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
//                             <div className="flex justify-between items-center mb-6">
//                                 <div>
//                                     <h2 className="text-lg font-medium text-white">{topic} Quiz</h2>
//                                     <div className="mt-1 flex items-center">
//                                         <span className="text-xs font-medium bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
//                                             {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//                                         </span>
//                                         <span className="ml-3 text-sm text-gray-400">
//                                             {Object.keys(selectedAnswers).length} of {mcqs.length} answered
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={() => window.confirm("Are you sure you want to quit? Your progress will be lost.") && resetQuiz()}
//                                     className="text-gray-400 hover:text-white text-sm flex items-center transition duration-150"
//                                 >
//                                     <ArrowLeft className="h-4 w-4 mr-1" />
//                                     Exit Quiz
//                                 </button>
//                             </div>

//                             {/* Progress Bar */}
//                             <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-8">
//                                 <div
//                                     className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
//                                     style={{ width: `${progressPercentage}%` }}
//                                 />
//                             </div>

//                             {/* Questions */}
//                             <div className="space-y-8">
//                                 {mcqs.map((mcq, qIndex) => (
//                                     <div key={mcq._id} className="border border-gray-700 rounded-xl p-6 bg-gray-850">
//                                         <div className="flex items-center mb-4">
//                                             <div className="flex-shrink-0 bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center mr-3">
//                                                 <span className="text-sm font-medium text-white">{qIndex + 1}</span>
//                                             </div>
//                                             <h3 className="text-lg font-medium text-white">{mcq.question}</h3>
//                                         </div>

//                                         <div className="mt-4 grid grid-cols-1 gap-3">
//                                             {mcq.options.map((option, index) => {
//                                                 const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
//                                                 const isSelected = selectedAnswers[mcq._id]?.text === option;

//                                                 return (
//                                                     <div
//                                                         key={option}
//                                                         onClick={() => handleSelectAnswer(mcq._id, option, optionLetter)}
//                                                         className={`p-4 rounded-lg flex items-center cursor-pointer transition-all duration-200 ${isSelected
//                                                             ? "border-purple-500 border-2 bg-purple-900 bg-opacity-20"
//                                                             : "border border-gray-600 bg-gray-800 hover:bg-gray-750"
//                                                             }`}
//                                                     >
//                                                         <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs ${isSelected
//                                                             ? "bg-purple-500 text-white"
//                                                             : "bg-gray-700 text-gray-300"
//                                                             }`}>
//                                                             {optionLetter}
//                                                         </div>
//                                                         <span className={`${isSelected ? "text-white" : "text-gray-300"}`}>
//                                                             {option}
//                                                         </span>
//                                                     </div>
//                                                 );
//                                             })}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="mt-8 flex justify-center">
//                                 <button
//                                     onClick={handleSubmit}
//                                     className="px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
//                                 >
//                                     Submit Answers
//                                 </button>
//                             </div>

//                         </div>
//                     </div>
//                 )}

//                 {/* Results */}
//                 {currentStep === "results" && result && (
//                     <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
//                         <div className="text-center mb-6">
//                             <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 mb-4">
//                                 {result.score >= 70 ? (
//                                     <CheckCircle2 className="h-8 w-8 text-green-500" />
//                                 ) : (
//                                     <XCircle className="h-8 w-8 text-red-500" />
//                                 )}
//                             </div>
//                             <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
//                             <p className="mt-2 text-gray-300">
//                                 You scored {result.score}% ({result.correctAnswers} of {result.totalQuestions} correct)
//                             </p>
//                         </div>

//                         <div className="mt-8 space-y-6">
//                             {result.answers && result.answers.map((answer, index) => (
//                                 <div key={index} className={`border rounded-xl p-5 ${answer.isCorrect ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-red-500 bg-red-900 bg-opacity-20'
//                                     }`}>
//                                     <div className="flex items-start">
//                                         <div className="flex-shrink-0 mt-1">
//                                             {answer.isCorrect ? (
//                                                 <CheckCircle2 className="h-5 w-5 text-green-500" />
//                                             ) : (
//                                                 <XCircle className="h-5 w-5 text-red-500" />
//                                             )}
//                                         </div>
//                                         <div className="ml-3">
//                                             <h3 className="text-lg font-medium text-white">{answer.question}</h3>

//                                             <div className="mt-3 space-y-2">
//                                                 <div className="text-sm">
//                                                     <span className="text-gray-400">Your answer: </span>
//                                                     <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>
//                                                         {answer.userAnswer || 'No answer provided'}
//                                                     </span>
//                                                 </div>

//                                                 {!answer.isCorrect && (
//                                                     <div className="text-sm">
//                                                         <span className="text-gray-400">Correct answer: </span>
//                                                         <span className="text-green-400">{answer.correctAnswer}</span>
//                                                     </div>
//                                                 )}

//                                                 {answer.explanation && (
//                                                     <div className="mt-2 text-sm text-gray-300 bg-gray-850 p-3 rounded-lg">
//                                                         <span className="block font-medium text-gray-200 mb-1">Explanation:</span>
//                                                         {answer.explanation}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//                             <button
//                                 onClick={resetQuiz}
//                                 className="px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
//                             >
//                                 <ArrowLeft className="inline h-4 w-4 mr-2" />
//                                 Try Again
//                             </button>
//                             <Link href="/" className="px-6 py-3 border border-gray-600 text-base font-medium rounded-lg shadow-sm text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 text-center">
//                                 Return Home
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Cpu, Code, CheckCircle2, XCircle, ArrowLeft, Loader2, Brain, LogOut, Sparkles, Clock } from "lucide-react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { FooterSection } from "../components/footer/FooterSection";

export default function QuizPage() {
    const { user } = useUser();
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [mcqs, setMcqs] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [currentStep, setCurrentStep] = useState("selection"); // 'selection', 'quiz', 'results'
    const [submitting, setSubmitting] = useState(false);

    // Timer functionality
    useEffect(() => {
        let timer;
        if (remainingTime && remainingTime > 0 && currentStep === "quiz") {
            timer = setTimeout(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        } else if (remainingTime === 0) {
            handleSubmit();
        }

        return () => clearTimeout(timer);
    }, [remainingTime, currentStep]);

    // Format time to MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Fetch MCQs based on user selection
    const fetchMCQs = async () => {
        if (!topic || !difficulty) {
            return;
        }

        setLoading(true);
        setResult(null);
        setSelectedAnswers({});

        try {
            const response = await fetch("/api/mcq/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, difficulty }),
            });

            const data = await response.json();
            if (data.success) {
                setMcqs(data.data);
                // Set timer based on difficulty
                const timePerQuestion = difficulty === "easy" ? 30 : difficulty === "medium" ? 45 : 60;
                setRemainingTime(data.data.length * timePerQuestion);
                setCurrentStep("quiz");
                toast.success(`Quiz generated with ${data.data.length} questions!`);
            } else {
                toast.error("Failed to generate quiz questions!");
            }
        } catch (error) {
            console.error("Error fetching MCQs:", error);
            toast.error("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    // Handle user selecting an answer
    const handleSelectAnswer = (mcqId, option, optionLetter) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [mcqId]: {
                letter: optionLetter,
                text: option
            }
        }));
    };

    // Reset to start again
    const resetQuiz = () => {
        setTopic("");
        setDifficulty("");
        setMcqs([]);
        setSelectedAnswers({});
        setResult(null);
        setRemainingTime(null);
        setCurrentStep("selection");
        toast("Quiz reset. Start a new quiz!");
    };

    // Submit answers & get results
    const handleSubmit = async () => {
        // Stop the timer
        setRemainingTime(null);
        setSubmitting(true);

        toast.loading("Submitting your answers...");

        const formattedAnswers = Object.keys(selectedAnswers).map((mcqId) => ({
            mcqId,
            userAnswer: selectedAnswers[mcqId].letter,
        }));

        try {
            const response = await fetch("/api/mcq/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers: formattedAnswers }),
            });

            const data = await response.json();
            setResult(data);
            setCurrentStep("results");

            toast.dismiss();
            if (data.score >= 70) {
                toast.success(`Great job! You scored ${data.score}%`);
            } else {
                toast.info(`Quiz completed! You scored ${data.score}%`);
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
            toast.error("Failed to submit answers. Please try again.");
        }

        setSubmitting(false);
    };

    // Calculate progress percentage
    const progressPercentage = mcqs.length > 0
        ? (Object.keys(selectedAnswers).length / mcqs.length) * 100
        : 0;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Sonner Toast Container */}
            <Toaster position="top-center" richColors />

            {/* Navigation Bar */}
            <nav className="bg-black border-b border-gray-800 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Cpu className="h-8 w-8 text-purple-500" />
                                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                                    AlgoStub Quiz
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {remainingTime !== null && (
                                <div className="flex items-center px-3 py-1 bg-gray-800 rounded-full">
                                    <Clock className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span className="text-yellow-300 font-mono">{formatTime(remainingTime)}</span>
                                </div>
                            )}

                            {user && (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-300">Hi, {user.firstName || user.username}</span>
                                    {user.imageUrl ? (
                                        <img
                                            src={user.imageUrl}
                                            alt="Profile"
                                            className="h-8 w-8 rounded-full ring-1 ring-purple-500 p-0.5"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                {(user.firstName?.[0] || user.username?.[0] || "?").toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition duration-150">
                                <LogOut className="h-5 w-5" />
                                <span className="sr-only">Quit</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Topic & Difficulty Selection */}
                {currentStep === "selection" && (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <div className="flex items-center justify-center mb-8">
                                <Brain className="h-12 w-12 text-purple-400 mr-3" />
                                <h1 className="text-3xl font-bold text-white">Start Your Quiz</h1>
                            </div>

                            <div className="max-w-md mx-auto bg-gray-850 border border-gray-700 rounded-xl p-6 shadow-inner">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Topic</label>
                                        <input
                                            type="text"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                            placeholder="Enter topic (e.g., JavaScript, Data Structures)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {["easy", "medium", "hard"].map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setDifficulty(option)}
                                                    className={`px-4 py-3 rounded-lg border text-sm font-medium flex items-center justify-center transition-all duration-200 ${difficulty === option
                                                        ? "bg-purple-600 border-purple-500 text-white"
                                                        : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                                                        }`}
                                                >
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={fetchMCQs}
                                        disabled={!topic || !difficulty || loading}
                                        className="w-full flex items-center justify-center mt-6 px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                                                Generating Quiz...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="-ml-1 mr-2 h-5 w-5 text-white" />
                                                Start Quiz
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quiz Questions */}
                {currentStep === "quiz" && mcqs.length > 0 && (
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-medium text-white">{topic} Quiz</h2>
                                    <div className="mt-1 flex items-center">
                                        <span className="text-xs font-medium bg-purple-900 text-purple-300 px-2 py-1 rounded-full">
                                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                        </span>
                                        <span className="ml-3 text-sm text-gray-400">
                                            {Object.keys(selectedAnswers).length} of {mcqs.length} answered
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to quit? Your progress will be lost.")) {
                                            resetQuiz();
                                        }
                                    }}
                                    className="text-gray-400 hover:text-white text-sm flex items-center transition duration-150"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                    Exit Quiz
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-8">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            {/* Questions */}
                            <div className="space-y-8">
                                {mcqs.map((mcq, qIndex) => (
                                    <div key={mcq._id} className="border border-gray-700 rounded-xl p-6 bg-gray-850">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0 bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                                                <span className="text-sm font-medium text-white">{qIndex + 1}</span>
                                            </div>
                                            <h3 className="text-lg font-medium text-white">{mcq.question}</h3>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-3">
                                            {mcq.options.map((option, index) => {
                                                const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                                                const isSelected = selectedAnswers[mcq._id]?.text === option;

                                                return (
                                                    <div
                                                        key={option}
                                                        onClick={() => handleSelectAnswer(mcq._id, option, optionLetter)}
                                                        className={`p-4 rounded-lg flex items-center cursor-pointer transition-all duration-200 ${isSelected
                                                            ? "border-purple-500 border-2 bg-purple-900 bg-opacity-20"
                                                            : "border border-gray-600 bg-gray-800 hover:bg-gray-750"
                                                            }`}
                                                    >
                                                        // This continues from your incomplete code...

                                                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs ${isSelected
                                                            ? "bg-purple-500 text-white"
                                                            : "bg-gray-700 text-gray-300"
                                                            }`}>
                                                            {optionLetter}
                                                        </div>
                                                        <span className={`${isSelected ? "text-white" : "text-gray-300"}`}>
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 inline" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Answers"
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* Results */}
                {currentStep === "results" && result && (
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-900 mb-4">
                                {result.score >= 70 ? (
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                ) : (
                                    <XCircle className="h-8 w-8 text-red-500" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
                            <p className="mt-2 text-gray-300">
                                You scored {result.score}% ({result.correctAnswers} of {result.totalQuestions} correct)
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            {result.answers && result.answers.map((answer, index) => (
                                <div key={index} className={`border rounded-xl p-5 ${answer.isCorrect ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-red-500 bg-red-900 bg-opacity-20'
                                    }`}>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            {answer.isCorrect ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <XCircle className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-lg font-medium text-white">{answer.question}</h3>

                                            <div className="mt-3 space-y-2">
                                                <div className="text-sm">
                                                    <span className="text-gray-400">Your answer: </span>
                                                    <span className={answer.isCorrect ? 'text-green-400' : 'text-red-400'}>
                                                        {answer.userAnswer || 'No answer provided'}
                                                    </span>
                                                </div>

                                                {!answer.isCorrect && (
                                                    <div className="text-sm">
                                                        <span className="text-gray-400">Correct answer: </span>
                                                        <span className="text-green-400">{answer.correctAnswer}</span>
                                                    </div>
                                                )}

                                                {/* Enhanced Explanation Section */}
                                                <div className="mt-3 text-sm text-gray-300 bg-gray-850 p-4 rounded-lg border border-gray-700">
                                                    <span className="block font-medium text-white mb-2">Explanation:</span>
                                                    <p>{answer.explanation || "This question tests your understanding of key concepts in the subject matter."}</p>

                                                    {/* Additional learning resources - if available */}
                                                    {answer.resources && (
                                                        <div className="mt-3 pt-3 border-t border-gray-700">
                                                            <span className="block font-medium text-purple-300 mb-1">Learning Resources:</span>
                                                            <p className="text-gray-300">{answer.resources}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Results Summary Card */}
                        <div className="mt-8 p-5 bg-gray-850 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-medium text-white mb-3">Performance Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <div className="text-3xl font-bold text-white">{result.score}%</div>
                                    <div className="text-sm text-gray-400 mt-1">Overall Score</div>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <div className="text-3xl font-bold text-green-500">{result.correctAnswers}</div>
                                    <div className="text-sm text-gray-400 mt-1">Correct Answers</div>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <div className="text-3xl font-bold text-red-500">{result.totalQuestions - result.correctAnswers}</div>
                                    <div className="text-sm text-gray-400 mt-1">Incorrect Answers</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={resetQuiz}
                                className="px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                            >
                                <ArrowLeft className="inline h-4 w-4 mr-2" />
                                Try Again
                            </button>
                            <Link href="/" className="px-6 py-3 border border-gray-600 text-base font-medium rounded-lg shadow-sm text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 text-center">
                                Return Home
                            </Link>
                        </div>
                    </div>
                )}
            </main>
            <FooterSection />
        </div>
    );
}