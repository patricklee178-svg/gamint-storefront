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
  prices: { duration: string; price: string; badge?: string; variantId: string }[]
}

const DURATION_ORDER = ["۱ ماهه", "۳ ماهه", "۱۲ ماهه"]

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-gradient-to-b ${plan.color} bg-[#0a0d14] p-6`}>
      <div className="flex items-center gap-3">
        <img src="/images/playstation-plus-logo.png" alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-black text-white">{plan.name}</h3>
          <p className="text-sm text-gray-400">{plan.tagline}</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm leading-7 text-gray-300">
            <span className="mt-0.5 text-purple-400">✓</span> {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5">
        {plan.prices.map((tier) => (
          <LocalizedClientLink
            key={tier.duration}
            href={`/products/${plan.handle}?v_id=${tier.variantId}`}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <span className="font-semibold text-gray-200">
              {tier.duration}
              {tier.badge && (
                <span className="mr-2 rounded-md bg-purple-600/90 px-1.5 py-0.5 text-xs font-bold text-white">{tier.badge}</span>
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

      const prices = (product.variants || [])
        .map((variant) => {
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
            variantId: variant.id,
          }
        })
        .sort(
          (a, b) => DURATION_ORDER.indexOf(a.duration) - DURATION_ORDER.indexOf(b.duration)
        )

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
          video="/videos/ps-plus-hero.mp4"
          videoPoster="/images/ps-plus-hero-poster.jpg"
        />

        {plans.length > 0 ? (
          <section className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => <PlanCard key={plan.handle} plan={plan} />)}
          </section>
        ) : (
          <p className="mt-12 text-sm text-gray-400">فعلاً پلن اشتراکی ثبت نشده است.</p>
        )}

        <PlusExplainer />
      </div>
    </main>
  )
}

const tierDescriptions = [
  {
    name: "PS Plus Essential",
    color: "border-amber-400/30 bg-amber-500/[0.04]",
    dot: "bg-amber-400",
    text: "پایه‌ی هر اشتراک پلی‌استیشن. با Essential می‌تونی توی بازی‌های چندنفره‌ی آنلاین شرکت کنی، هر ماه چند بازی رایگان به کتابخونه‌ت اضافه می‌شه، و ۱۰۰ گیگابایت فضای ابری برای ذخیره‌ی سیو بازی‌هات داری تا روی هر کنسولی که وارد شدی ادامه بدی. برای کسایی که فقط دنبال بازی آنلاین و چندتا بازی رایگان ماهانه‌ن، همین کافیه.",
  },
  {
    name: "PS Plus Extra",
    color: "border-purple-400/30 bg-purple-500/[0.04]",
    dot: "bg-purple-400",
    text: "همه‌ی امکانات Essential رو داره، به‌علاوه‌ی دسترسی به کتابخونه‌ای با بیش از ۴۰۰ بازی PS4 و PS5 که می‌تونی دانلود کنی و بدون محدودیت زمانی بازی کنی — نه اجاره، بلکه دسترسی کامل تا وقتی اشتراکت فعاله. برای کسایی که می‌خوان بدون خرید تک‌تک بازی‌ها، کتابخونه‌ی بزرگی برای امتحان کردن عناوین مختلف داشته باشن، بهترین گزینه‌ست.",
  },
  {
    name: "PS Plus Premium",
    color: "border-blue-400/30 bg-blue-500/[0.04]",
    dot: "bg-blue-400",
    text: "کامل‌ترین سطح اشتراک. همه‌ی مزایای Extra رو داره، به‌علاوه‌ی صدها بازی کلاسیک از نسل‌های PS3، PS2 و PSP (با پخش ابری برای بعضی عناوین)، امکان امتحان کردن نسخه‌ی آزمایشی بازی‌های تازه منتشرشده قبل از خرید، و در بعضی مناطق پخش ابری بازی‌های PS4 و PS5 بدون نیاز به دانلود. مناسب کسایی که می‌خوان کل تاریخچه‌ی پلی‌استیشن رو تجربه کنن.",
  },
]

const comparisonRows: { label: string; essential: boolean; extra: boolean; premium: boolean }[] = [
  { label: "بازی آنلاین چندنفره", essential: true, extra: true, premium: true },
  { label: "چند بازی رایگان ماهانه", essential: true, extra: true, premium: true },
  { label: "۱۰۰ گیگابایت فضای ابری", essential: true, extra: true, premium: true },
  { label: "تخفیف‌های اختصاصی فروشگاه", essential: true, extra: true, premium: true },
  { label: "دسترسی به کتابخونه‌ی ۴۰۰+ بازی", essential: false, extra: true, premium: true },
  { label: "دانلود و بازی بدون محدودیت زمانی", essential: false, extra: true, premium: true },
  { label: "بازی‌های کلاسیک PS3/PS2/PSP", essential: false, extra: false, premium: true },
  { label: "نسخه‌ی آزمایشی بازی‌های جدید", essential: false, extra: false, premium: true },
]

function Check({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="mx-auto grid h-5 w-5 place-items-center rounded-full bg-purple-500/15 text-purple-300">✓</span>
  ) : (
    <span className="mx-auto grid h-5 w-5 place-items-center text-white/15">—</span>
  )
}

function PlusExplainer() {
  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="mb-1 text-sm font-semibold text-purple-400">راهنمای انتخاب</p>
        <h2 className="text-xl font-black text-white sm:text-2xl">کدوم پلن پلی‌استیشن پلاس مناسب شماست؟</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tierDescriptions.map((tier) => (
          <div key={tier.name} className={`rounded-2xl border p-5 ${tier.color}`}>
            <div className="mb-3 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${tier.dot}`} />
              <h3 className="text-base font-black text-white">{tier.name}</h3>
            </div>
            <p className="text-sm leading-7 text-gray-300">{tier.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0d14]">
        <table className="w-full min-w-[560px] text-base">
          <thead>
            <tr className="border-b border-white/10 text-sm text-gray-400">
              <th className="p-4 text-right font-bold">امکانات</th>
              <th className="p-4 text-center font-bold text-amber-300">Essential</th>
              <th className="p-4 text-center font-bold text-purple-300">Extra</th>
              <th className="p-4 text-center font-bold text-blue-300">Premium</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.label} className={i !== comparisonRows.length - 1 ? "border-b border-white/5" : ""}>
                <td className="p-4 text-sm text-gray-200">{row.label}</td>
                <td className="p-4"><Check ok={row.essential} /></td>
                <td className="p-4"><Check ok={row.extra} /></td>
                <td className="p-4"><Check ok={row.premium} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
