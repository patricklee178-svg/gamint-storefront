import { Metadata } from "next"
import { Suspense } from "react"

import VerifyAccount from "@modules/account/components/verify-account"

export const metadata: Metadata = {
  title: "تأیید ایمیل | گیمینت",
  description: "ایمیل حساب کاربری خودت رو در گیمینت تأیید کن.",
}

export default function VerifyAccountPage() {
  return (
    <div dir="rtl" className="min-h-[calc(100vh-72px)] w-full bg-[#05070b] flex justify-center px-8 py-16">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0d14] p-8 text-center text-white/50 text-sm">
            در حال تأیید ایمیل شما...
          </div>
        }
      >
        <VerifyAccount />
      </Suspense>
    </div>
  )
}
