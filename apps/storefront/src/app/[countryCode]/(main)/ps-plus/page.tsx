import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "اشتراک پلی‌استیشن پلاس | گیمینت",
  description: "خرید اشتراک PS Plus Essential، Extra و Premium با فعال‌سازی مطمئن از گیمینت",
}

type Plan = {
  name: string
  tagline: string
  color: string
  features: string[]
  prices: { duration: string; price: string; badge?: string }[]
}

const plans: Plan[] = [
  {
    name: "Essential",
    tagline: "شروع بازی آنلاین",
    color: "from-amber-500/20 to-transparent border-amber-400/30",
    features: ["بازی آنلاین چندنفره", "چند بازی رایگان ماهانه", "فضای ابری برای ذخیره بازی"],
    prices: [
      { duration: "۱ ماهه", price: "۳۹۰,۰۰۰" },
      { duration: "۳ ماهه", price: "۱,۰۵۰,۰۰۰" },
      { duration: "۱۲ ماهه", price: "۳,۲۰۰,۰۰۰", badge: "پرفروش" },
    ],
  },
  {
    name: "Extra",
    tagline: "کتابخانه‌ی بزرگ بازی",
    color: "from-purple-500/20 to-transparent border-purple-400/30",
    features: ["همه‌ی مزایای Essential", "دسترسی به کتابخانه‌ی بیش از ۴۰۰ بازی", "دانلود و بازی بدون محدودیت زمانی"],
    prices: [
      { duration: "۱ ماهه", price: "۵۹۰,۰۰۰" },
      { duration: "۳ ماهه", price: "۱,۶۵۰,۰۰۰" },
      { duration: "۱۲ ماهه", price: "۵,۱۰۰,۰۰۰", badge: "پیشنهاد ویژه" },
    ],
  },
  {
    name: "Premium",
    tagline: "کامل‌ترین تجربه پلی‌استیشن",
    color: "from-blue-500/20 to-transparent border-blue-400/30",
    features: ["همه‌ی مزایای Extra", "بازی‌های کلاسیک PS3/PS2/PSP", "نسخه‌ی آزمایشی بازی‌های جدید"],
    prices: [
      { duration: "۱ ماهه", price: "۶۹۰,۰۰۰" },
      { duration: "۳ ماهه", price: "۱,۹۵۰,۰۰۰" },
      { duration: "۱۲ ماهه", price: "۶,۲۰۰,۰۰۰" },
    ],
  },
]

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-gradient-to-b ${plan.color} bg-[#0a0d14] p-6`}>
      <div className="flex items-center gap-3">
        <img src="/images/playstation-plus-logo.png" alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-black text-white">PS Plus {plan.name}</h3>
          <p className="text-xs text-gray-400">{plan.tagline}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs leading-6 text-gray-300">
            <span className="mt-0.5 text-purple-400">✓</span> {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
        {plan.prices.map((tier) => (
          <LocalizedClientLink
            key={tier.duration}
            href="/store"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-xs transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <span className="font-semibold text-gray-200">
              {tier.duration}
              {tier.badge && (
                <span className="mr-2 rounded-md bg-purple-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white">{tier.badge}</span>
              )}
            </span>
            <span className="font-bold text-white">{tier.price} <span className="text-[10px] font-normal text-gray-400">تومان</span></span>
          </LocalizedClientLink>
        ))}
      </div>
    </article>
  )
}

export default function PsPlusPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="اشتراک ویژه"
          title="پلی‌استیشن پلاس"
          description="اشتراک PS Plus با فعال‌سازی مطمئن، تحویل سریع و پشتیبانی کامل گیمینت تا اجرای کامل."
        />

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
        </section>
      </div>
    </main>
  )
}
