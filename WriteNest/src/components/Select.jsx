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
            className='mb-2 inline-block pl-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400'  
            htmlFor={id}>
                {label}
            </label>
            }
            <select
                className={`w-full rounded-2xl border border-[color:var(--line)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-slate-100 shadow-sm outline-none transition duration-200 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 ${className}`}
                id={id}
                ref={ref}
                {...props}
            >
                {options?.map((option) => (
                    <option
                        key={typeof option === "string" ? option : option.value}
                        value={typeof option === "string" ? option : option.value}
                        className="bg-[#160a0d] text-slate-100"
                    >
                        {typeof option === "string" ? option : option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
