import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeroSlider from "@modules/home/components/hero-slider"
import { listCategoryGames } from "@lib/data/category-games"
import { GameSection } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "فروشگاه تخصصی بازی | گیمینت",
  description:
    "خرید بازی PS5، اکانت ظرفیتی، پیش‌فروش GTA VI، گیفت کارت و اشتراک‌های گیمینگ از گیمینت",
}

type CategoryIconName = "gamepad" | "users" | "preorder" | "plus" | "gift" | "discount"

const categories: { icon: CategoryIconName; title: string; text: string; href: string }[] = [
  { icon: "gamepad", title: "بازی‌های دیجیتال", text: "خرید آسان و تحویل سریع", href: "/categories/games" },
  { icon: "users", title: "اکانت‌های ظرفیتی", text: "ظرفیت ۱، ۲ و ۳", href: "/store" },
  { icon: "preorder", title: "پیش‌فروش‌ها", text: "جدیدترین بازی‌ها", href: "/preorders" },
  { icon: "plus", title: "PS Plus", text: "اشتراک‌های پلی‌استیشن", href: "/ps-plus" },
  { icon: "gift", title: "گیفت کارت", text: "تحویل سریع و امن", href: "/gift-cards" },
  { icon: "discount", title: "تخفیف‌ها", text: "بهترین پیشنهادها", href: "/store" },
]

type TrustIconName = "price" | "support" | "secure" | "authentic" | "delivery"

const trustItems: { icon: TrustIconName; title: string; text: string }[] = [
  { icon: "price", title: "قیمت‌های رقابتی", text: "بهترین قیمت بازار" },
  { icon: "support", title: "پشتیبانی ۲۴/۷", text: "چت و تلگرام" },
  { icon: "secure", title: "پرداخت امن", text: "درگاه معتبر" },
  { icon: "authentic", title: "ضمانت اصالت", text: "تضمین محصولات" },
  { icon: "delivery", title: "تحویل سریع", text: "در کمترین زمان" },
]

const faqs = [
  ["اکانت‌های ظرفیتی چگونه کار می‌کنند؟", "بعد از خرید، راهنمای کامل فعال‌سازی متناسب با ظرفیت انتخابی برای شما ارسال می‌شود و پشتیبانی تا اجرای کامل همراهتان است."],
  ["زمان تحویل سفارش چقدر است؟", "بیشتر سفارش‌ها به‌صورت خودکار یا در کوتاه‌ترین زمان ممکن تحویل می‌شوند. زمان دقیق در صفحه هر محصول نوشته شده است."],
  ["آیا امکان تغییر ریجن اکانت وجود دارد؟", "ریجن محصول قبل از خرید مشخص است. برای انتخاب بهترین ریجن می‌توانید پیش از ثبت سفارش با پشتیبانی مشورت کنید."],
  ["آیا بازی‌ها و اکانت‌ها قانونی و امن هستند؟", "تمام محصولات گیمینت با ضمانت اصالت، راهنمای فعال‌سازی و پشتیبانی تخصصی ارائه می‌شوند."],
  ["در صورت بروز مشکل چه کاری باید انجام دهم؟", "از طریق پشتیبانی آنلاین یا تلگرام با ما در ارتباط باشید؛ کارشناسان گیمینت مشکل را تا رفع کامل پیگیری می‌کنند."],
  ["روش‌های پرداخت در گیمینت چیست؟", "پرداخت امن آنلاین برای تمام سفارش‌ها فعال است و رسید خرید بلافاصله در حساب کاربری ثبت می‌شود."],
]

const CategoryIcon = ({ name }: { name: CategoryIconName }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden="true">
    {name === "gamepad" && <>
      <path d="M8.3 7.5h7.4a5.8 5.8 0 0 1 5.6 7.2l-.7 2.7a2.4 2.4 0 0 1-4.1 1l-1.3-1.5H8.8l-1.3 1.5a2.4 2.4 0 0 1-4.1-1l-.7-2.7a5.8 5.8 0 0 1 5.6-7.2Z" />
      <path d="M7.2 11v3M5.7 12.5h3M16.7 11.6h.01M18.4 13.3h.01" strokeLinecap="round" />
    </>}
    {name === "users" && <>
      <circle cx="9" cy="8.2" r="3" /><path d="M3.7 19c.5-3 2.5-4.7 5.3-4.7s4.8 1.7 5.3 4.7" strokeLinecap="round" />
      <path d="M15.2 5.6a2.8 2.8 0 0 1 0 5.3M16 14.5c2.4.3 3.9 1.8 4.3 4" strokeLinecap="round" />
    </>}
    {name === "preorder" && <>
      <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 9.5h18" strokeLinecap="round" />
      <path d="M12 13v3l2 1.2" strokeLinecap="round" strokeLinejoin="round" />
    </>}
    {name === "plus" && <>
      <path d="M12 3.2 14.1 9l5.7 2.1-5.7 2.1L12 19l-2.1-5.8-5.7-2.1L9.9 9 12 3.2Z" strokeLinejoin="round" />
      <path d="M18.5 3v4M16.5 5h4" strokeLinecap="round" />
    </>}
    {name === "gift" && <>
      <rect x="3" y="8" width="18" height="13" rx="2.5" /><path d="M3 12h18M12 8v13" />
      <path d="M12 8H8.2a2.6 2.6 0 1 1 2.1-4.1L12 8Zm0 0h3.8a2.6 2.6 0 1 0-2.1-4.1L12 8Z" strokeLinejoin="round" />
    </>}
    {name === "discount" && <>
      <path d="M20.2 13.2 13.3 20a2.4 2.4 0 0 1-3.4 0L4 14.1V4h10.1l6.1 5.8a2.4 2.4 0 0 1 0 3.4Z" strokeLinejoin="round" />
      <circle cx="8.2" cy="8.2" r="1.2" /><path d="m10 16 5-5M10.5 11h.01M14.5 16h.01" strokeLinecap="round" />
    </>}
  </svg>
)

const TrustIcon = ({ name }: { name: TrustIconName }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6" aria-hidden="true">
    {name === "price" && <>
      <path d="M20.2 13.2 13.3 20a2.4 2.4 0 0 1-3.4 0L4 14.1V4h10.1l6.1 5.8a2.4 2.4 0 0 1 0 3.4Z" strokeLinejoin="round" />
      <circle cx="8.2" cy="8.2" r="1.25" />
      <path d="m10.2 16.2 5.2-5.2M10.7 11.1h.01M15 16h.01" strokeLinecap="round" strokeWidth="2" />
    </>}
    {name === "support" && <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <path d="M4 13.2a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 13.2a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
      <path d="M17 18c-.8 1.4-2.2 2-4.1 2H11" strokeLinecap="round" />
      <circle cx="9.5" cy="20" r="1" fill="currentColor" stroke="none" />
    </>}
    {name === "secure" && <>
      <path d="M12 2.8 20 6v5.7c0 4.8-3.1 8.1-8 9.5-4.9-1.4-8-4.7-8-9.5V6l8-3.2Z" strokeLinejoin="round" />
      <path d="m8.3 12 2.4 2.4 5-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </>}
    {name === "authentic" && <>
      <path d="m12 2.7 2.2 2 3-.2.8 2.9 2.5 1.7-1.1 2.8 1.1 2.8-2.5 1.7-.8 2.9-3-.2-2.2 2-2.2-2-3 .2-.8-2.9-2.5-1.7 1.1-2.8-1.1-2.8L6 7.4l.8-2.9 3 .2 2.2-2Z" strokeLinejoin="round" />
      <path d="m8.2 12 2.5 2.5 5.2-5.2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </>}
    {name === "delivery" && <>
      <path d="M8 7.2 12 5l4 2.2v5.1L12 14.5l-4-2.2V7.2Z" strokeLinejoin="round" />
      <path d="m8 7.2 4 2.2 4-2.2M12 9.4v5.1M6 17h11M3.5 20h11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m17.3 13.5 3.2 2-3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </>}
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PromoIcon = ({ name }: { name: "plus" | "gift" | "support" }) => {
  if (name === "plus") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true">
        <defs>
          <radialGradient id="psplus-disc" cx="35%" cy="25%" r="78%">
            <stop stopColor="#34230B" />
            <stop offset="1" stopColor="#100B05" />
          </radialGradient>
          <linearGradient id="psplus-gold" x1="12" y1="10" x2="52" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF3A0" />
            <stop offset=".45" stopColor="#FACC32" />
            <stop offset="1" stopColor="#B96B00" />
          </linearGradient>
        </defs>
        <circle cx="31" cy="33" r="24" fill="url(#psplus-disc)" stroke="url(#psplus-gold)" strokeWidth="2.2" />
        <circle cx="48.5" cy="16.5" r="9.5" fill="url(#psplus-gold)" stroke="#FFF0A0" strokeWidth="1.2" />
        <path d="M48.5 12v9M44 16.5h9" stroke="#271400" strokeWidth="2.1" strokeLinecap="round" />
        <text x="30.5" y="37.5" textAnchor="middle" fontSize="17" fontWeight="900" fontFamily="Arial Black, Arial, sans-serif" fill="url(#psplus-gold)">PS</text>
        <path d="m18 45 3-5 3 5h-6ZM28 40h5v5h-5z" fill="none" stroke="#E8B92A" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="40.5" cy="42.5" r="2.7" fill="none" stroke="#E8B92A" strokeWidth="1.2" />
      </svg>
    )
  }

  if (name === "gift") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true">
        <defs>
          <linearGradient id="gift-blue" x1="9" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E63FF" />
            <stop offset="1" stopColor="#073A9E" />
          </linearGradient>
        </defs>
        <rect x="8" y="4" width="48" height="56" rx="9" fill="white" />
        <path d="M8 21h48v30a9 9 0 0 1-9 9H17a9 9 0 0 1-9-9V21Z" fill="url(#gift-blue)" />
        <rect x="12" y="9" width="14" height="8" rx="4" fill="#F3F6FF" stroke="#D9E0EF" />
        <path d="M13 10h12M13 12h12M13 14h12M13 16h12" stroke="#E63946" strokeWidth=".8" />
        <path d="M13 10h6v4h-6z" fill="#2446A8" />
        <path d="M33 31v15M33 31c8-1 10 2 9 6-1 3-4 4-9 4M22 47c5 3 16 3 21-1" fill="none" stroke="white" strokeWidth="3.1" strokeLinecap="round" />
        <text x="46" y="15" textAnchor="middle" fontSize="6" fontWeight="900" fill="#1746B0">US</text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true">
      <defs>
        <linearGradient id="support-headset-gold" x1="14" y1="10" x2="51" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF2A1" />
          <stop offset=".46" stopColor="#F7C538" />
          <stop offset="1" stopColor="#B96900" />
        </linearGradient>
        <radialGradient id="support-headset-dark" cx="35%" cy="25%" r="75%">
          <stop stopColor="#35240C" />
          <stop offset="1" stopColor="#100B05" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="27" fill="url(#support-headset-dark)" stroke="url(#support-headset-gold)" strokeWidth="2" />
      <path d="M17 33v-2c0-8.8 6.5-15.5 15-15.5S47 22.2 47 31v2" fill="none" stroke="url(#support-headset-gold)" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 33.5a4 4 0 0 1 4-4h2v12h-2a4 4 0 0 1-4-4v-4ZM47 33.5a4 4 0 0 0-4-4h-2v12h2a4 4 0 0 0 4-4v-4Z" fill="url(#support-headset-gold)" />
      <path d="M42 43c-1.7 3.5-4.9 5.2-9.5 5.2H29" fill="none" stroke="#F6CC52" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="27" cy="48.2" r="2.5" fill="#FFE88A" />
      <path d="M27 24.5c1.5-1.2 3.2-1.8 5-1.8s3.5.6 5 1.8" fill="none" stroke="#F8D971" strokeWidth="1.5" strokeLinecap="round" opacity=".75" />
    </svg>
  )
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const [bestSellers, newestGames, preorders] = await Promise.all([
    listCategoryGames({ categoryHandle: "games", countryCode, limit: 6 }),
    listCategoryGames({ categoryHandle: "games", countryCode, limit: 6, offset: 6 }),
    listCategoryGames({
      categoryHandle: "preorders",
      countryCode,
      limit: 6,
      badge: "پیش‌فروش",
    }),
  ])

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#05070b] pb-16 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(126,34,206,.11),transparent_30%),radial-gradient(circle_at_10%_55%,rgba(76,29,149,.08),transparent_28%)]" />
      <div className="relative mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <HeroSlider />

        <section className="relative z-10 mt-4 grid overflow-hidden rounded-2xl sm:mt-5 border border-white/10 bg-[#0a0d14]/95 shadow-2xl backdrop-blur sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => (
            <LocalizedClientLink href={category.href} key={category.title} className={`group flex items-center gap-3 border-white/10 px-4 py-5 transition hover:bg-purple-500/10 ${index < categories.length - 1 ? "xl:border-l" : ""}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-purple-300 transition group-hover:border-purple-400/40 group-hover:bg-purple-500/15"><CategoryIcon name={category.icon} /></span>
              <span><strong className="block text-sm text-white">{category.title}</strong><small className="mt-1 block text-[10px] text-gray-500">{category.text}</small></span>
            </LocalizedClientLink>
          ))}
        </section>

        {bestSellers.length > 0 && (
          <GameSection eyebrow="انتخاب گیمرها" title="پرفروش‌ترین بازی‌ها" games={bestSellers} viewAllHref="/categories/games" />
        )}
        {newestGames.length > 0 && (
          <GameSection eyebrow="تازه‌رسیده‌ها" title="جدیدترین بازی‌ها" games={newestGames} viewAllHref="/categories/games" />
        )}
        {preorders.length > 0 && (
          <GameSection eyebrow="قبل از همه بازی کن" title="پیش‌فروش‌های ویژه" games={preorders} viewAllHref="/preorders" />
        )}

        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#211706] to-[#0a0d14] p-6 pl-24 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 sm:pl-28">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="pointer-events-none absolute left-5 top-1/2 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-2xl border border-amber-300/30 bg-amber-400/10 text-amber-300 shadow-[0_0_35px_rgba(251,191,36,.28)] backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-amber-400/15 sm:h-20 sm:w-20">
              <img src="/images/playstation-plus-logo.png" alt="" className="h-12 w-12 object-contain sm:h-14 sm:w-14" aria-hidden="true" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-amber-300">اشتراک ویژه</p>
              <h3 className="mt-2 text-2xl font-black">PS Plus Essential</h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">اشتراک ۱۲ ماهه با فعال‌سازی مطمئن و پشتیبانی گیمینت</p>
              <LocalizedClientLink href="/ps-plus" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">مشاهده و خرید <ArrowIcon /></LocalizedClientLink>
            </div>
          </article>
          <article className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] p-6 pl-24 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 sm:pl-28">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute left-5 top-1/2 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-2xl border border-blue-300/25 bg-blue-500/10 text-blue-300 shadow-[0_0_35px_rgba(59,130,246,.25)] backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-blue-500/20 sm:h-20 sm:w-20">
              <PromoIcon name="gift" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-400">تحویل فوری</p>
              <h3 className="mt-2 text-2xl font-black">گیفت کارت آمریکا</h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">خرید گیفت کارت پلی‌استیشن با بهترین قیمت و کد دیجیتال</p>
              <LocalizedClientLink href="/gift-cards" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">مشاهده و خرید <ArrowIcon /></LocalizedClientLink>
            </div>
          </article>
          <article className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#241608] to-[#0a0d14] p-6 pl-24 transition duration-300 hover:-translate-y-1 hover:border-amber-400/30 sm:pl-28">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="pointer-events-none absolute left-5 top-1/2 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-2xl border border-amber-300/30 bg-amber-500/10 text-amber-300 shadow-[0_0_38px_rgba(245,158,11,.30)] backdrop-blur transition duration-300 group-hover:scale-105 group-hover:bg-amber-500/15 sm:h-20 sm:w-20">
              <PromoIcon name="support" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-amber-300">همیشه کنار شما</p>
              <h3 className="mt-2 text-2xl font-black">پشتیبانی ۲۴/۷</h3>
              <p className="mt-2 text-sm leading-7 text-gray-400">قبل و بعد از خرید برای انتخاب، فعال‌سازی و رفع مشکلات</p>
              <LocalizedClientLink href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">تماس با پشتیبانی <ArrowIcon /></LocalizedClientLink>
            </div>
          </article>
        </section>

        <section className="mt-7 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/95 shadow-[0_18px_60px_rgba(0,0,0,.18)] sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className={`group flex min-h-[132px] flex-col items-center justify-center gap-3 px-5 py-6 text-center transition duration-300 hover:bg-purple-500/[.07] ${index < trustItems.length - 1 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-fuchsia-500/5 text-purple-300 shadow-[0_8px_28px_rgba(126,34,206,.18)] transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-purple-300/45 group-hover:text-purple-200 group-hover:shadow-[0_10px_34px_rgba(168,85,247,.28)]">
                <TrustIcon name={item.icon} />
              </span>
              <span className="block text-center">
                <strong className="block text-center text-sm font-extrabold text-white">{item.title}</strong>
                <small className="mt-1 block text-center text-[10px] leading-5 text-gray-500">{item.text}</small>
              </span>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6"><p className="mb-1 text-xs font-semibold text-purple-400">هرچیزی که باید بدانید</p><h2 className="text-2xl font-black">سوالات متداول</h2></div>
          <div className="grid gap-3 lg:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group rounded-xl border border-white/10 bg-[#0a0d14] open:border-purple-500/30 open:bg-purple-500/[.04]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-gray-200">
                  {question}<span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 text-purple-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-5 text-xs leading-7 text-gray-400">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
