"use client"

import React, { useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type AuthInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, name, label, required, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const inputId = id || name
    const isPassword = type === "password"

    return (
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-white/60"
        >
          {label}
          {required && <span className="mr-1 text-purple-400">*</span>}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={isPassword && showPassword ? "text" : type}
            required={required}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-purple-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-purple-500/10"
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="absolute inset-y-0 left-0 flex items-center px-3.5 text-white/35 transition hover:text-white/70"
              aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            >
              {showPassword ? <Eye size="18" /> : <EyeOff size="18" />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

AuthInput.displayName = "AuthInput"

export default AuthInput
