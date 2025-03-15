"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: position.y,
                left: position.x,
                width: "30px",
                height: "30px",
                background: "url('https://lh3.googleusercontent.com/H2MMZR0mOR25jQf_4GdtDTufefua3igDkUq9TXdzfdqHXxkp9zfuVp3gSqAKRWGG2urjM0PlMIdLuZWcWRAtlUvZ=s120') no-repeat center/cover",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
            }}
        />
    );
}
