import { Metadata } from "next"

import ProfilePassword from "@modules/account/components/profile-password"

export const metadata: Metadata = {
  title: "امنیت حساب | گیمینت",
  description: "مدیریت امنیت حساب کاربری شما در گیمینت.",
}

export default function Security() {
  return (
    <div dir="rtl" className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">امنیت حساب</h1>
        <p className="mt-1.5 text-sm text-white/45">تغییر رمز عبور و مدیریت امنیت حساب.</p>
      </div>

      <ProfilePassword />
    </div>
  )
}
