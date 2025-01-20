import { Bot, Code2, Sparkles } from "lucide-react";

function Features() {
    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-neutral-950 to-neutral-950 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <span
                className="absolute top-0 left-0 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-transparent font-bold z-10 pl-7 shadow-lg"
                style={{
                    WebkitTextStroke: "1px #ADD8E6",
                }}
            >
                Features
            </span>
            <section className="relative z-10 py-5 px-4 sm:px-6 lg:px-8 mt-48 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
                                    alt="AI Interview Process"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -left-6 bg-neutral-800 p-4 rounded-xl shadow-lg animate-bounce-slow">
                                <Bot className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="absolute top-1/2 -right-6 bg-neutral-800 p-4 rounded-xl shadow-lg animate-pulse">
                                <Code2 className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="absolute -bottom-6 left-1/2 bg-neutral-800 p-4 rounded-xl shadow-lg animate-bounce-slow">
                                <Sparkles className="w-8 h-8 text-yellow-500" />
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    Transform Your Hiring Process with{" "}
                                    <span className="text-blue-400">AI-Powered</span> Technical
                                    Interviews
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Experience the future of technical hiring with our advanced AI
                                    interview platform. Get deeper insights into candidates'
                                    problem-solving abilities and coding skills through
                                    intelligent assessment and real-time analysis.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 bg-blue-600 rounded-lg p-2">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            Smart Assessment
                                        </h3>
                                        <p className="text-gray-300 mt-1">
                                            AI-driven evaluation of coding style, efficiency, and
                                            problem-solving approach
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 bg-purple-600 rounded-lg p-2">
                                        <Code2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            Real-time Analysis
                                        </h3>
                                        <p className="text-gray-300 mt-1">
                                            Instant feedback and comprehensive reports on candidate
                                            performance
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 bg-yellow-500 rounded-lg p-2">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            Fair Evaluation
                                        </h3>
                                        <p className="text-gray-300 mt-1">
                                            Unbiased assessment based on objective coding metrics and
                                            standards
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold 
                transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                            >
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Features;
