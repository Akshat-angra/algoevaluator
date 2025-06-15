'use client';
import { useState } from 'react';
import { Code, Braces, BarChart2, Network, PenTool, AlertCircle, HelpCircle, ChevronDown } from 'lucide-react';

export default function AlgoEvaluatorFAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const faqs = [
        {
            question: "What is AlgoEvaluator?",
            answer: "AlgoEvaluator is a cutting-edge platform that analyzes algorithmic performance across multiple dimensions, helping developers identify optimization opportunities that traditional profilers miss. Our quantum-inspired heuristics model simulates thousands of edge cases simultaneously.",
            icon: <Code size={20} className="opacity-90" />
        },
        {
            question: "How does the evaluation process work?",
            answer: "Our proprietary neural analysis engine deconstructs your algorithms into fundamental patterns, comparing them against our vast database of optimized solutions. The system identifies inefficiencies at both macro and micro levels, suggesting context-specific improvements.",
            icon: <BarChart2 size={20} className="opacity-90" />
        },
        {
            question: "What languages and frameworks are supported?",
            answer: "AlgoEvaluator currently supports 17 programming languages including Python, JavaScript, Rust, Go, C++, and Java. We integrate with major frameworks and offer custom adapters for specialized environments through our extensible plugin architecture.",
            icon: <Braces size={20} className="opacity-90" />
        },
        {
            question: "How accurate are the optimization recommendations?",
            answer: "Our recommendations achieve 94.7% accuracy in real-world implementations, verified through our partnership with leading tech companies. Each suggestion includes a confidence score backed by benchmark data from similar algorithmic transformations.",
            icon: <Network size={20} className="opacity-90" />
        },
        {
            question: "What makes AlgoEvaluator different from other tools?",
            answer: "Unlike traditional profilers that focus on resource utilization, AlgoEvaluator examines algorithmic elegance, complexity scaling, and edge case handling. Our unique approach identifies subtle optimization patterns that emerge only in complex systems.",
            icon: <PenTool size={20} className="opacity-90" />
        }
    ];

    const handleMouseMove = (e) => {
        setCursorPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div
            className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <div
                className="absolute w-64 h-64 rounded-full bg-blue-500/5 blur-3xl pointer-events-none transition-all duration-1000 ease-out"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)'
                }}
            ></div>

            <div className="relative z-10 max-w-4xl w-full px-8 py-16">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center mb-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center rotate-45 transform transition-transform">
                                <span className="text-white font-bold text-lg -rotate-45">A</span>
                            </div>
                            <div className="absolute top-0 left-0 w-12 h-12 rounded-lg border border-blue-400 rotate-45 transform scale-110 opacity-50"></div>
                            <div className="absolute top-0 left-0 w-12 h-12 rounded-lg border border-blue-300 rotate-45 transform scale-125 opacity-20"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Algo<span className="text-blue-500">Evaluator</span></h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">Advanced Algorithm Analysis</p>
                </div>
                <div className="relative mb-8">
                    <div className="absolute -left-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-lg blur-md"></div>

                    <div className="relative flex items-center justify-between border-2 border-blue-500/30 bg-blue-900/20 rounded-lg p-5 backdrop-blur-sm">
                        <div className="flex items-center">
                            <div className="mr-4 bg-blue-500/20 p-2 rounded-lg">
                                <HelpCircle size={24} className="text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-white">Frequently Asked <span className="text-blue-400">Questions</span></h2>
                                <p className="text-blue-300/70 text-sm">Everything you need to know about AlgoEvaluator</p>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-24 h-12 relative">
                                <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/30 rounded-full"></div>
                                <div className="absolute top-0 right-0 w-12 h-1 bg-blue-500/20 rounded-full"></div>
                                <div className="absolute top-3 right-3 w-1 h-6 bg-blue-500/20 rounded-full"></div>
                                <div className="absolute bottom-0 right-8 w-8 h-1 bg-blue-500/20 rounded-full"></div>
                                <div className="absolute bottom-0 right-8 w-3 h-3 bg-blue-500/30 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-2 -bottom-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse opacity-20"></div>
                </div>
                <div className="space-y-6 bg-blue-950/20 rounded-lg p-6 border-blue-900/50 backdrop-blur-sm">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`relative transition-all duration-500 ease-out border-l-2 ${activeIndex === index ? 'border-blue-500 pl-6' : 'border-blue-800/30 pl-4'
                                }`}
                        >
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                            >
                                <div className="flex items-center">
                                    <div className={`mr-4 transition-all duration-300 ${activeIndex === index ? 'text-blue-500 scale-110' : 'text-blue-800'
                                        }`}>
                                        {faq.icon}
                                    </div>
                                    <h3 className={`text-lg font-medium transition-all duration-300 ${activeIndex === index ? 'text-blue-400' : 'text-gray-300'
                                        }`}>
                                        {faq.question}
                                    </h3>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={`ml-4 transition-all duration-300 ${activeIndex === index ? 'text-blue-400 rotate-180' : 'text-gray-600'
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-700 ease-in-out pr-12 ${activeIndex === index ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-400 mb-4 leading-relaxed">
                                    {faq.answer}
                                </p>

                                <div className="flex space-x-1 opacity-60">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1 h-1 rounded-full transition-all duration-300 delay-${i * 100} ${activeIndex === index ?
                                                (i % 3 === 0 ? 'bg-blue-400' : 'bg-gray-700') :
                                                'bg-gray-800'
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {activeIndex === index && (
                                <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 blur-sm -ml-1"></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-16 pt-8 border-t border-blue-900/30 flex justify-between items-center text-xs text-gray-600">
                    <div className="flex items-center">
                        <AlertCircle size={12} className="mr-2" />
                        <span>CONFIDENTIAL BETA ACCESS</span>
                    </div>
                    <div className="tracking-widest font-light">2025 © ALGOEVALUATOR</div>
                </div>
            </div>
        </div>
    );
}