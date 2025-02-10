"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handlePointerEvent = () => {
            const hoveredElement = document.elementFromPoint(position.x, position.y);
            const isClickable = hoveredElement?.matches('button, a, input, [role="button"]');
            setIsPointer(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handlePointerEvent);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handlePointerEvent);
        };
    }, [position.x, position.y]);

    return (
        <>
            <div
                className="cursor-dot"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: isPointer ? "scale(1.5)" : "scale(1)",
                }}
            />
            <div
                className="cursor-ring"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: isPointer ? "scale(1.5)" : "scale(1)",
                }}
            />
        </>
    );
}
