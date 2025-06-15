"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function LoginUser() {
    const { userId } = useAuth();
    const { user } = useUser();
    const [lastLogin, setLastLogin] = useState("");

    useEffect(() => {
        if (userId) {
            const lastLoginTime = new Date().toLocaleString();
            setLastLogin(lastLoginTime);

            fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, lastLogin: new Date().toISOString() }),
            })
                .then(res => res.json())
                .then(data => console.log("Login Tracked:", data))
                .catch(err => console.error("Login tracking failed:", err));
        }
    }, [userId]);

    if (!user) return null;

    return (
        <div className="flex items-center gap-1.5 text-xs font-medium bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-gray-200">Last Login:</span>
            <span className="text-white">{lastLogin}</span>
        </div>
    );
}