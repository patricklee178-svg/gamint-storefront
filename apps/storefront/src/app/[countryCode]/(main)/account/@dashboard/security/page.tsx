import { Metadata } from "next"

import { ShieldIcon } from "@modules/account/icons"

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

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-purple-400/20 bg-purple-500/10 text-purple-300">
          <ShieldIcon className="h-6 w-6" />
        </span>
        <p className="text-sm font-bold text-white">تغییر رمز عبور به‌زودی</p>
        <p className="max-w-xs text-xs leading-6 text-white/40">
          این بخش در حال توسعه‌ست. اگه لازمه رمز عبورت رو عوض کنی، از طریق تیکت پشتیبانی با ما در تماس باش.
        </p>
      </div>
    </div>
  )
}
