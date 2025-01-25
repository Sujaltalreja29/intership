/* eslint-disable */

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode; // Type for `children`
    bgColor?: string;    // Optional background color
    textColor?: string;  // Optional text color
    className?: string;  // Optional additional classes
}

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            type={type || "button"}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
