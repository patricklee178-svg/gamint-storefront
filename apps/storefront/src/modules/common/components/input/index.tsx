import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched: _touched, required, topLabel, className: _className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label htmlFor={name} className="text-xs font-semibold text-white/55">
          {topLabel || label}
          {required && <span className="mr-1 text-purple-400">*</span>}
        </label>
        <div className="relative flex w-full items-center">
          <input
            type={inputType}
            id={name}
            name={name}
            required={required}
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
            {...props}
            ref={inputRef}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 left-0 flex items-center px-3.5 text-white/35 transition hover:text-white/70"
            >
              {showPassword ? <Eye size="18" /> : <EyeOff size="18" />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
