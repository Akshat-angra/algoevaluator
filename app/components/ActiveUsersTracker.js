"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const ActiveUsersTracker = () => {
    const [activeUsers, setActiveUsers] = useState(0);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        const updateActivity = () => {
            fetch("/api/user-activity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });
        };

        updateActivity();
        const interval = setInterval(updateActivity, 60000);

        return () => clearInterval(interval);
    }, [user]);

    useEffect(() => {
        const fetchActiveUsers = () => {
            fetch("/api/user-activity")
                .then((res) => res.json())
                .then((data) => setActiveUsers(data.activeUsers || 0));
        };

        fetchActiveUsers();
        const interval = setInterval(fetchActiveUsers, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center space-x-3 bg-black/80 backdrop-blur-md border border-gray-800 px-4 py-2 rounded-2xl"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-400 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 15H9v-1c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5v1z" />
                <circle cx="12" cy="10" r="1" />
            </svg>
            <p className="text-sm font-semibold text-white">
                Active Users: <span className="text-green-400">{activeUsers}</span>
            </p>
        </motion.div>
    );
};

export default ActiveUsersTracker;
