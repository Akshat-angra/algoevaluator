"use client";
import { useEffect } from "react";
export default function RegisterUser() {
    useEffect(() => {
        fetch("/api/auth/register", { method: "GET" })
            .then(res => res.json())
            .then(data => console.log("User Registered:", data))
            .catch(err => console.error("User registration failed:", err));
    }, []);

    return null;
}
