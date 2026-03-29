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
            className='mb-2 inline-block pl-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400'  
            htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`w-full rounded-2xl border border-[color:var(--line)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-slate-100 shadow-sm outline-none transition duration-200 placeholder:text-slate-500 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 file:mr-4 file:rounded-xl file:border-0 file:bg-[rgba(255,255,255,0.12)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-100 hover:file:bg-[rgba(255,255,255,0.18)] ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Input
