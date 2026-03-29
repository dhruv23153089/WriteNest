import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 font-medium text-gray-700'  
            htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`w-full px-3 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-200 ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Input
