import { useEffect } from "react";
import { toast } from "sonner";
import { Bot, Sparkles, Info } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
})


// Main component - simplifying the implementation to avoid state issues
export default function WelcomeHandler({ user, isDarkMode }) {
    useEffect(() => {
        // Check if this is the user's first visit
        const hasVisited = localStorage.getItem("algostub_welcomed");

        // Only show welcome toast on first visit
        if (!hasVisited) {
            // Set the flag immediately
            localStorage.setItem("algostub_welcomed", "true");

            // Get user's name when available
            const userName = user?.fullName || user?.username || "";

            // Delay welcome toast slightly to let the page load
            setTimeout(() => {
                showWelcomeToast(userName, isDarkMode);
            }, 1500);
        }
    }, [user, isDarkMode]);

    return null; // Component doesn't render anything directly
}

// Function to show the welcome toast
const showWelcomeToast = (userName, isDarkMode) => {
    toast.custom((t) => (
        <div
            className={`${isDarkMode
                ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-purple-900/30"
                : "bg-white text-gray-800 border border-purple-200/50"
                } shadow-lg overflow-hidden max-w-md w-full animate-in fade-in duration-300 ${dmSans.className}`}
        >
            <div className="flex items-stretch">
                <div className="w-2 bg-gradient-to-b from-indigo-600 to-purple-700"></div>
                <div className="flex-1 p-4">
                    <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/20 mr-3">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">Welcome to AlgoStub AI</h3>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Your coding assistant
                            </p>
                        </div>
                    </div>

                    <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {userName ? `Hey ${userName}! ` : "Hello! "}
                        I&apos;m here to help with your coding questions, explain algorithms, and assist with technical problems.
                    </p>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                toast.dismiss(t.id);
                                toast.success("Ready to help with your coding questions!", {
                                    icon: <Sparkles size={18} className="text-purple-500" />
                                });
                            }}
                            className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/20 text-white text-sm font-medium"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className={`px-3 py-2 rounded-lg text-sm ${isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                }`}
                        >
                            Dismiss
                        </button>
                    </div>

                    <div className="flex items-center mt-4">
                        <Info size={14} className={`mr-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"}`} />
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Type your first question in the chat to get started
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ), { duration: 8000, position: "top-center" });
};

// For debugging/development - add this to your component for testing
export function resetWelcomeStatus() {
    localStorage.removeItem("algostub_welcomed");
    console.log("Welcome status reset - will show welcome on next load");
}