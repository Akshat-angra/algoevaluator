"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function UserGreeting() {
    const { user } = useUser();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) setGreeting("Good Morning");
            else if (hour < 18) setGreeting("Good Afternoon");
            else setGreeting("Good Evening");
        };

        updateGreeting();
        const intervalId = setInterval(updateGreeting, 60000);
        return () => clearInterval(intervalId);
    }, []);

    if (!user) return "Welcome";

    return (
        <>
            {greeting}, <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">{user.firstName || "User"}</span><span className="ml-1">👋</span>
        </>
    );
}