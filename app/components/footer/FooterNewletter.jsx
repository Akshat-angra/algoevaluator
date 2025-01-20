import React from "react";

export function FooterNewsletter() {
    return (
        <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
                Get the latest updates on AI interviewing technology.
            </p>
            <form className="space-y-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder-gray-500 text-white"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
            hover:bg-blue-700 transition-colors duration-200"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
}
