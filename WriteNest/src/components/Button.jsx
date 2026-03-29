import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-[var(--page-ink)]",
    textColor="text-white",
    className="",
    ...props
}) {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${bgColor} ${textColor} ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
