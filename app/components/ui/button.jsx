import React from "react";

export const Button = ({ variant = "default", size = "default", children, className = "", ...props }) => {
    const baseStyles =
        "font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 relative";

    const variantStyles = {
        default: "bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30",
        outline: "bg-transparent border hover:bg-opacity-10 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20",
        ghost: "bg-transparent hover:bg-neutral-800",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        default: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};
