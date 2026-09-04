import { Metadata } from "next"
import { getCategoryByHandle } from "@lib/data/categories"
import { listProductsWithSort } from "@lib/data/products"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "اشتراک پلی‌استیشن پلاس | گیمینت",
  description: "خرید اشتراک PS Plus Essential، Extra و Premium با فعال‌سازی مطمئن از گیمینت",
}

const planMeta: Record<string, { tagline: string; color: string; features: string[]; badgeDuration?: string; badge?: string }> = {
  Essential: {
    tagline: "شروع بازی آنلاین",
    color: "from-amber-500/20 to-transparent border-amber-400/30",
    features: ["بازی آنلاین چندنفره", "چند بازی رایگان ماهانه", "فضای ابری برای ذخیره بازی"],
    badgeDuration: "۱۲ ماهه",
    badge: "پرفروش",
  },
  Extra: {
    tagline: "کتابخانه‌ی بزرگ بازی",
    color: "from-purple-500/20 to-transparent border-purple-400/30",
    features: ["همه‌ی مزایای Essential", "دسترسی به کتابخانه‌ی بیش از ۴۰۰ بازی", "دانلود و بازی بدون محدودیت زمانی"],
    badgeDuration: "۱۲ ماهه",
    badge: "پیشنهاد ویژه",
  },
  Premium: {
    tagline: "کامل‌ترین تجربه پلی‌استیشن",
    color: "from-blue-500/20 to-transparent border-blue-400/30",
    features: ["همه‌ی مزایای Extra", "بازی‌های کلاسیک PS3/PS2/PSP", "نسخه‌ی آزمایشی بازی‌های جدید"],
  },
}

type Plan = {
  name: string
  handle: string
  tagline: string
  color: string
  features: string[]
  prices: { duration: string; price: string; badge?: string }[]
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-gradient-to-b ${plan.color} bg-[#0a0d14] p-6`}>
      <div className="flex items-center gap-3">
        <img src="/images/playstation-plus-logo.png" alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-black text-white">{plan.name}</h3>
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
            href={`/products/${plan.handle}`}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-xs transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <span className="font-semibold text-gray-200">
              {tier.duration}
              {tier.badge && (
                <span className="mr-2 rounded-md bg-purple-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white">{tier.badge}</span>
              )}
            </span>
            <span className="font-bold text-white">{tier.price}</span>
          </LocalizedClientLink>
        ))}
      </div>
    </article>
  )
}

export default async function PsPlusPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const category = await getCategoryByHandle(["ps-plus"])

  let plans: Plan[] = []

  if (category) {
    const {
      response: { products },
    } = await listProductsWithSort({
      page: 1,
      queryParams: { category_id: [category.id], limit: 20 },
      sortBy: "created_at",
      countryCode,
    })

    plans = products.map((product) => {
      const key = Object.keys(planMeta).find((k) => product.title.includes(k))
      const meta = key ? planMeta[key] : { tagline: "", color: "from-purple-500/20 to-transparent border-purple-400/30", features: [] }

      const prices = (product.variants || []).map((variant) => {
        const price = variant.calculated_price
        return {
          duration: variant.title || "",
          price: price
            ? convertToLocale({
                amount: price.calculated_amount,
                currency_code: price.currency_code,
              })
            : "—",
          badge: meta.badgeDuration === variant.title ? meta.badge : undefined,
        }
      })

      return {
        name: product.title,
        handle: product.handle || "",
        tagline: meta.tagline,
        color: meta.color,
        features: meta.features,
        prices,
      }
    })
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="اشتراک ویژه"
          title="پلی‌استیشن پلاس"
          description="اشتراک PS Plus با فعال‌سازی مطمئن، تحویل سریع و پشتیبانی کامل گیمینت تا اجرای کامل."
          image="/images/ps-plus-banner.jpg"
        />

        {plans.length > 0 ? (
          <section className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => <PlanCard key={plan.handle} plan={plan} />)}
          </section>
        ) : (
          <p className="mt-12 text-sm text-gray-400">فعلاً پلن اشتراکی ثبت نشده است.</p>
        )}
      </div>
    </main>
  )
}
