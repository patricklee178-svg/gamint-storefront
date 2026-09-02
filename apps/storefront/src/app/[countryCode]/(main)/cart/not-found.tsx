import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "سبد خرید یافت نشد | گیمینت",
  description: "مشکلی پیش آمده است.",
}

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-3 bg-[#05070b] px-4 text-center text-white"
    >
      <h1 className="text-xl font-black">سبد خرید پیدا نشد</h1>
      <p className="max-w-sm text-sm leading-7 text-white/45">
        سبد خریدی که دنبالش بودی وجود نداره. کوکی‌های مرورگرت رو پاک کن و دوباره امتحان کن.
      </p>
      <LocalizedClientLink
        href="/"
        className="mt-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
      >
        بازگشت به صفحه اصلی
      </LocalizedClientLink>
    </div>
  )
}
