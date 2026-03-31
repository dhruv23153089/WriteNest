import React, { useState } from 'react'

function Logo({width = "100px", className = ""}) {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className={`inline-flex items-center justify-center text-lg font-bold text-white ${className}`}
            style={{ width }}
        >
            {!imageError ? (
                <div className="aspect-[3/2] w-full">
                    <img
                        src="/logo.png"
                        alt="WriteNest"
                        className="h-full w-full object-contain"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                "WriteNest"
            )}
        </div>
    )
}

export default Logo
