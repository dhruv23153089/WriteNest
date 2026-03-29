import React,{useId} from 'react'

function Select({
        options,
        label,
        className = '',
        ...props            
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 font-medium text-gray-700'  
            htmlFor={id}>
            </label>
            }
            <select
                className={`w-full px-3 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-200 ${className}`}
                id={id}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
