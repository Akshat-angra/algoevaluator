// "use client";
// import { useEffect, useState } from "react";

// const quotes = [
//     "Strategic thinking transforms challenges into opportunities.",
//     "Excellence is not an act, but a consistent habit.",
//     "True leadership inspires performance beyond expectations.",
//     "Innovation distinguishes between a leader and a follower.",
//     "Professional growth requires continuous adaptation."
// ];

// export default function MotivationQuote() {
//     const [quote, setQuote] = useState("");
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         // Select a random quote on initial render
//         setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

//         // Fade in animation with a slight delay
//         const timer = setTimeout(() => {
//             setIsVisible(true);
//         }, 300);

//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <div className="absolute top-50 left-6 w-full max-w-md">
//             <div
//                 className={`flex items-center gap-3 py-4 px-5 rounded-md bg-gray-900 shadow-lg border-l-4 border-blue-600 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
//                     }`}
//             >
//                 <div className="flex-shrink-0 bg-blue-600/15 p-2 rounded-md">
//                     <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="text-blue-500"
//                     >
//                         <path
//                             d="M12 8L12 12M12 16V16.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </div>
//                 <div className="flex-1">
//                     <div className="flex">
//                         <span className="text-blue-500 text-lg font-medium mr-1">"</span>
//                         <p className="text-gray-100 text-sm font-medium">
//                             {quote}
//                             <span className="text-blue-500 text-lg font-medium ml-1">"</span>
//                         </p>
//                     </div>
//                     <div className="mt-1.5 flex items-center">
//                         <div className="h-px flex-grow bg-gray-800"></div>
//                         <div className="px-2 py-0.5 bg-blue-600/20 rounded-sm mx-2">
//                             <span className="text-xs uppercase tracking-wide text-blue-400 font-semibold">Executive Brief</span>
//                         </div>
//                         <div className="h-px flex-grow bg-gray-800"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";
import { useEffect, useState } from "react";

const quotes = [
    "Strategic thinking transforms challenges into opportunities.",
    "Excellence is not an act, but a consistent habit.",
    "True leadership inspires performance beyond expectations.",
    "Innovation distinguishes between a leader and a follower.",
    "Professional growth requires continuous adaptation."
];

export default function MotivationQuote() {
    const [quote, setQuote] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Select a random quote on initial render
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

        // Fade in animation with a slight delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`w-full my-3 flex items-center gap-3 py-3 px-4 rounded-md bg-gray-900 shadow-md border-l-4 border-blue-600 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            <div className="flex-shrink-0 bg-blue-600/15 p-1.5 rounded-md">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-500"
                >
                    <path
                        d="M12 8L12 12M12 16V16.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <div className="flex-1">
                <div className="flex">
                    <span className="text-blue-500 text-lg font-medium mr-1">"</span>
                    <p className="text-gray-100 text-sm font-medium">
                        {quote}
                        <span className="text-blue-500 text-lg font-medium ml-1">"</span>
                    </p>
                </div>
                <div className="mt-1 flex items-center">
                    <div className="h-px flex-grow bg-gray-800"></div>
                    <div className="px-2 py-0.5 bg-blue-600/20 rounded-sm mx-2">
                        <span className="text-xs uppercase tracking-wide text-blue-400 font-semibold">Executive Brief</span>
                    </div>
                    <div className="h-px flex-grow bg-gray-800"></div>
                </div>
            </div>
        </div>
    );
}