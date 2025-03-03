"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
export default function LoginUser() {
    const { userId } = useAuth();
    useEffect(() => {
        if (userId) {
            fetch("/api/auth/login", { method: "POST" })
                .then(res => res.json())
                .then(data => console.log("Login Tracked:", data))
                .catch(err => console.error("Login tracking failed:", err));
        }
    }, [userId]);

    return null;
}
