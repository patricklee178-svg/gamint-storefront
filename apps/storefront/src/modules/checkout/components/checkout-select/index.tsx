import React from "react"

type Props = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  label: string
  placeholder?: string
}

const CheckoutSelect = React.forwardRef<HTMLSelectElement, Props>(
  ({ label, required, name, id, placeholder = "انتخاب کنید", children, ...props }, ref) => {
    const selectId = id || name

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-xs font-semibold text-white/55">
          {label}
          {required && <span className="mr-1 text-purple-400">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          name={name}
          required={required}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-purple-400/50 focus:bg-white/[0.06]"
          {...props}
        >
          <option value="" disabled className="bg-[#0a0d14]">
            {placeholder}
          </option>
          {children}
        </select>
      </div>
    )
  }
)

CheckoutSelect.displayName = "CheckoutSelect"

export default CheckoutSelect
