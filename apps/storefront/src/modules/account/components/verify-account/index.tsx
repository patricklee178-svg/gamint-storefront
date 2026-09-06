"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { confirmEmailVerification } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type VerificationState = "verifying" | "success" | "error"

const VerifyAccount = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [state, setState] = useState<VerificationState>("verifying")
  // Guard against the effect running twice in React Strict Mode, which would
  // consume the single-use token before the customer sees the result.
  const confirmed = useRef(false)

  useEffect(() => {
    if (confirmed.current) {
      return
    }
    confirmed.current = true

    if (!token) {
      setState("error")
      return
    }

    confirmEmailVerification(token).then(({ success }) =>
      setState(success ? "success" : "error")
    )
  }, [token])

  return (
    <div
      dir="rtl"
      className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0d14] p-8 text-center text-white"
      data-testid="verify-account-page"
    >
      <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-purple-400/30 bg-purple-500/10 text-2xl">
        {state === "verifying" && "⏳"}
        {state === "success" && "✅"}
        {state === "error" && "⚠️"}
      </div>

      <h1 className="text-lg font-black">تأیید ایمیل</h1>

      {state === "verifying" && (
        <p className="mt-3 text-sm leading-7 text-white/50">
          در حال تأیید ایمیل شما...
        </p>
      )}

      {state === "success" && (
        <>
          <p className="mt-3 text-sm leading-7 text-white/50">
            ایمیل شما با موفقیت تأیید شد. حالا می‌تونی وارد حسابت بشی.
          </p>
          <LocalizedClientLink
            href="/account"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-purple-600 py-3 text-sm font-bold text-white transition hover:bg-purple-500"
          >
            ورود به حساب
          </LocalizedClientLink>
        </>
      )}

      {state === "error" && (
        <>
          <p className="mt-3 text-sm leading-7 text-white/50">
            این لینک تأیید نامعتبر یا منقضی شده. برای دریافت لینک جدید وارد حسابت شو.
          </p>
          <LocalizedClientLink
            href="/account"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-white/15 py-3 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            ورود به حساب
          </LocalizedClientLink>
        </>
      )}
    </div>
  )
}

export default VerifyAccount
