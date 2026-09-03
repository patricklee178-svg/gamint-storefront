import React from "react"

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label: string
}

const CheckoutInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, required, name, id, ...props }, ref) => {
    const inputId = id || name

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-xs font-semibold text-white/55">
          {label}
          {required && <span className="mr-1 text-purple-400">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
          {...props}
        />
      </div>
    )
  }
)

CheckoutInput.displayName = "CheckoutInput"

export default CheckoutInput
