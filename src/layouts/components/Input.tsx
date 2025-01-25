/* eslint-disable */

import React, { useId, ForwardedRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;    // Optional label for the input
    className?: string; // Additional classes for styling
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, type = "text", className = "", ...props },
    ref: ForwardedRef<HTMLInputElement>
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    );
});

export default Input;
