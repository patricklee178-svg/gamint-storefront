"use client"

import { useState } from "react"

const faqs = [
  {
    q: "آیا پیش‌خرید در روز انتشار در دسترس خواهد بود؟",
    a: "بله، سفارش‌های پیش‌فروش در اسرع وقت پس از عرضه رسمی بازی از سمت ناشر تحویل داده می‌شن.",
  },
  {
    q: "تحویل محصول دیجیتال چطور انجام می‌شه؟",
    a: "بعد از تأیید پرداخت، اطلاعات یا کد محصول در بخش «سفارش‌های من» حساب کاربری‌تون قرار می‌گیره.",
  },
  {
    q: "آیا امکان لغو یا بازگشت وجه پیش‌فروش وجود داره؟",
    a: "تا قبل از تحویل نهایی محصول امکان لغو سفارش و بازگشت وجه از طریق تیکت پشتیبانی وجود داره.",
  },
  {
    q: "اگه توی فعال‌سازی مشکل داشته باشم چیکار کنم؟",
    a: "کافیه از طریق بخش تیکت پشتیبانی توی حساب کاربری با ما در ارتباط باشید تا مشکل رو رایگان برطرف کنیم.",
  },
]

const FaqAccordion = () => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-right text-sm font-bold text-white"
            >
              {item.q}
              <span className={`shrink-0 text-white/40 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <p className="px-4 pb-4 text-xs leading-7 text-white/50">{item.a}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FaqAccordion
