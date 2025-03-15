"use client";

import { useUser } from "@clerk/nextjs";
import { Hand, MessageSquare } from "lucide-react";
import { FooterSection } from "../components/footer/FooterSection";
import { toast, Toaster } from "sonner";

export default function Chat() {
    const { user } = useUser();

    const handleChatClick = () => {
        toast.success("Chat section is coming sooner than you think!", {
            duration: 3000,
        });
    };

    return (
        <>
            <div className="min-h-screen bg-[#1A1328] text-white flex flex-col items-center justify-center px-4">
                <Toaster position="top-center" richColors />

                <div className="flex items-center gap-2 border-2 border-purple-100 rounded-lg px-4 py-2 bg-purple-100/20 text-lg font-semibold shadow-lg">
                    <Hand className="w-6 h-6 text-yellow-400" />
                    <span>Hello, {user?.firstName || "Guest"}</span>
                </div>

                <p className="mt-4 text-center text-gray-300">
                    Our chat feature is in development! You'll be able to connect with others in real time soon.
                </p>

                <button
                    onClick={handleChatClick}
                    className="mt-6 flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition-all"
                >
                    <MessageSquare className="w-5 h-5" />
                    Chat
                </button>
            </div>

            <FooterSection />
        </>
    );
}
