"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { CheckIcon } from "@modules/cart/icons"
import FaqAccordion from "@modules/products/components/faq-accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const tabDefs = [
  { key: "about", label: "درباره بازی" },
  { key: "activation", label: "روش فعال‌سازی" },
  { key: "warranty", label: "شرایط ضمانت" },
  { key: "faq", label: "سوالات متداول" },
] as const

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [active, setActive] = useState<(typeof tabDefs)[number]["key"]>("about")
  const features = (product.metadata?.features as string[] | undefined) || []

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14]">
      <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
        {tabDefs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              active === tab.key
                ? "bg-purple-600 text-white"
                : "text-white/50 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {active === "about" && (
          <div className="flex flex-col gap-5">
            {product.description ? (
              <p className="text-sm leading-8 text-white/60">{product.description}</p>
            ) : (
              <p className="text-sm text-white/35">توضیحاتی برای این بازی ثبت نشده است.</p>
            )}

            {features.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-bold text-white">ویژگی‌های کلیدی</h3>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                        <CheckIcon className="h-2.5 w-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                `${product.title} official trailer`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-purple-400/30"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-600 text-white">
                ▶
              </span>
              <div>
                <p className="text-sm font-bold text-white">تریلر رسمی بازی</p>
                <p className="text-[11px] text-white/40">مشاهده در یوتیوب</p>
              </div>
            </a>
          </div>
        )}

        {active === "activation" && (
          <div className="flex flex-col gap-3 text-sm leading-7 text-white/60">
            <p>
              پس از تأیید پرداخت، اطلاعات یا کد فعال‌سازی محصول در بخش «سفارش‌های من» در حساب کاربری شما
              قرار می‌گیره.
            </p>
            <p>
              همراه با تحویل، یک راهنمای گام‌به‌گام برای فعال‌سازی روی کنسول یا اکانت شما ارسال می‌شه. اگر
              توی هر مرحله سوالی داشتید، تیم پشتیبانی گیمینت همراهتونه.
            </p>
          </div>
        )}

        {active === "warranty" && (
          <div className="flex flex-col gap-3 text-sm leading-7 text-white/60">
            <p>گیمینت فعال‌سازی صحیح محصول رو تضمین می‌کنه؛ در صورت بروز مشکل در فعال‌سازی، مشکل رایگان برطرف می‌شه.</p>
            <p>
              برای پیش‌فروش‌ها، تحویل محصول هم‌زمان یا نزدیک به تاریخ انتشار رسمی بازی انجام می‌شه. در صورت
              تأخیر از سمت ناشر، از طریق تیکت پشتیبانی مطلع می‌شید.
            </p>
          </div>
        )}

        {active === "faq" && <FaqAccordion />}
      </div>
    </div>
  )
}

export default ProductTabs
