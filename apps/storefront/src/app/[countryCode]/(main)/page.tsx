import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeroSlider from "@modules/home/components/hero-slider"

export const metadata: Metadata = {
  title: "GAMINT | فروشگاه تخصصی بازی و اکانت پلی‌استیشن",
  description:
    "خرید بازی PS5، اکانت ظرفیتی، پیش‌فروش GTA VI، گیفت کارت و اشتراک‌های گیمینگ از GAMINT",
}

type Game = {
  title: string
  platform: string
  price: string
  image: string
  badge?: string
}

type CategoryIconName = "gamepad" | "users" | "preorder" | "plus" | "gift" | "discount"

const categories: { icon: CategoryIconName; title: string; text: string }[] = [
  { icon: "gamepad", title: "بازی‌های دیجیتال", text: "خرید آسان و تحویل سریع" },
  { icon: "users", title: "اکانت‌های ظرفیتی", text: "ظرفیت ۱، ۲ و ۳" },
  { icon: "preorder", title: "پیش‌فروش‌ها", text: "جدیدترین بازی‌ها" },
  { icon: "plus", title: "PS Plus", text: "اشتراک‌های پلی‌استیشن" },
  { icon: "gift", title: "گیفت کارت", text: "تحویل سریع و امن" },
  { icon: "discount", title: "تخفیف‌ها", text: "بهترین پیشنهادها" },
]

const bestSellers: Game[] = [
  { title: "EA SPORTS FC 26", platform: "PS5", price: "۲,۵۹۰,۰۰۰", image: "/images/games/fc26.jpg" },
  { title: "God of War Ragnarök", platform: "PS5", price: "۲,۷۸۰,۰۰۰", image: "/images/games/god-of-war.jpg" },
  { title: "Marvel's Spider-Man 2", platform: "PS5", price: "۲,۶۵۰,۰۰۰", image: "/images/games/spider-man-2-v3.jpg" },
  { title: "The Last of Us Part II", platform: "PS5", price: "۲,۴۹۰,۰۰۰", image: "/images/games/last-of-us-2-v3.jpg" },
  { title: "Hogwarts Legacy", platform: "PS5", price: "۲,۳۸۰,۰۰۰", image: "/images/games/hogwarts.jpg" },
  { title: "Red Dead Redemption 2", platform: "PS4", price: "۱,۹۵۰,۰۰۰", image: "/images/games/red-dead-2-v3.jpg" },
]

const newestGames: Game[] = [
  { title: "Stellar Blade", platform: "PS5", price: "۲,۶۵۰,۰۰۰", image: "/images/games/stellar-blade.jpg", badge: "جدید" },
  { title: "Rise of the Ronin", platform: "PS5", price: "۲,۴۵۰,۰۰۰", image: "/images/games/rise-of-ronin-v3.jpg", badge: "جدید" },
  { title: "Helldivers 2", platform: "PS5", price: "۱,۸۹۰,۰۰۰", image: "/images/games/helldivers-2.jpg" },
  { title: "Final Fantasy VII Rebirth", platform: "PS5", price: "۲,۶۸۰,۰۰۰", image: "/images/games/final-fantasy-7.jpg" },
  { title: "Monster Hunter Wilds", platform: "PS5", price: "۲,۱۵۰,۰۰۰", image: "/images/games/monster-hunter.jpg" },
  { title: "Dragon's Dogma 2", platform: "PS5", price: "۲,۳۹۰,۰۰۰", image: "/images/games/dragons-dogma-2.jpg" },
]

const preorders: Game[] = [
  { title: "Grand Theft Auto VI", platform: "PS5", price: "۲,۹۵۰,۰۰۰", image: "/images/games/gta6-hero.jpg", badge: "پیش‌فروش" },
  { title: "Death Stranding 2", platform: "PS5", price: "۲,۳۰۰,۰۰۰", image: "/images/games/death-stranding-2.jpg", badge: "پیش‌فروش" },
  { title: "Ghost of Yōtei", platform: "PS5", price: "۲,۲۵۰,۰۰۰", image: "/images/games/ghost-of-tsushima-v4.jpg", badge: "پیش‌فروش" },
  { title: "Assassin's Creed Shadows", platform: "PS5", price: "۲,۳۵۰,۰۰۰", image: "/images/games/ac-shadows.jpg", badge: "پیش‌فروش" },
  { title: "DOOM: The Dark Ages", platform: "PS5", price: "۲,۲۰۰,۰۰۰", image: "/images/games/doom-dark-ages.jpg", badge: "پیش‌فروش" },
  { title: "Cyberpunk 2077", platform: "PS5", price: "۲,۲۵۰,۰۰۰", image: "/images/games/cyberpunk.jpg" },
]

const faqs = [
  ["اکانت‌های ظرفیتی چگونه کار می‌کنند؟", "بعد از خرید، راهنمای کامل فعال‌سازی متناسب با ظرفیت انتخابی برای شما ارسال می‌شود و پشتیبانی تا اجرای کامل همراهتان است."],
  ["زمان تحویل سفارش چقدر است؟", "بیشتر سفارش‌ها به‌صورت خودکار یا در کوتاه‌ترین زمان ممکن تحویل می‌شوند. زمان دقیق در صفحه هر محصول نوشته شده است."],
  ["آیا امکان تغییر ریجن اکانت وجود دارد؟", "ریجن محصول قبل از خرید مشخص است. برای انتخاب بهترین ریجن می‌توانید پیش از ثبت سفارش با پشتیبانی مشورت کنید."],
  ["آیا بازی‌ها و اکانت‌ها قانونی و امن هستند؟", "تمام محصولات GAMINT با ضمانت اصالت، راهنمای فعال‌سازی و پشتیبانی تخصصی ارائه می‌شوند."],
  ["در صورت بروز مشکل چه کاری باید انجام دهم؟", "از طریق پشتیبانی آنلاین یا تلگرام با ما در ارتباط باشید؛ کارشناسان GAMINT مشکل را تا رفع کامل پیگیری می‌کنند."],
  ["روش‌های پرداخت در GAMINT چیست؟", "پرداخت امن آنلاین برای تمام سفارش‌ها فعال است و رسید خرید بلافاصله در حساب کاربری ثبت می‌شود."],
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

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" />
  </svg>
)

function GameCard({ game }: { game: Game }) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-[0_16px_50px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_18px_55px_rgba(124,58,237,.16)]">
      <LocalizedClientLink href="/store" className="block">
        <div className="relative aspect-video overflow-hidden bg-[#111827]">
          <img
            src={game.image}
            alt={game.title}
            loading="lazy"
            className="block h-full w-full object-cover object-center transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-transparent" />
          {game.badge && (
            <span className="absolute right-2.5 top-2.5 rounded-lg border border-purple-300/25 bg-purple-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-purple-950/40">
              {game.badge}
            </span>
          )}
          <span className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/50 text-sm text-white backdrop-blur">♡</span>
        </div>
        <div className="p-3.5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-[13px] font-bold text-white">{game.title}</h3>
            <span className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-bold text-gray-300">{game.platform}</span>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="text-xs font-semibold text-gray-100"><span className="text-[11px] text-gray-500">از </span>{game.price} <span className="text-[10px] text-gray-400">تومان</span></p>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gray-950 transition group-hover:bg-purple-500 group-hover:text-white"><CartIcon /></span>
          </div>
        </div>
      </LocalizedClientLink>
    </article>
  )
}

function GameSection({ title, eyebrow, games }: { title: string; eyebrow: string; games: Game[] }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold text-purple-400">{eyebrow}</p>
          <h2 className="text-xl font-black text-white sm:text-2xl">{title}</h2>
        </div>
        <LocalizedClientLink href="/store" className="flex items-center gap-2 text-xs font-semibold text-purple-400 transition hover:text-purple-300">
          مشاهده همه <ArrowIcon />
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {games.map((game) => <GameCard key={game.title} game={game} />)}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#05070b] pb-16 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(126,34,206,.11),transparent_30%),radial-gradient(circle_at_10%_55%,rgba(76,29,149,.08),transparent_28%)]" />
      <div className="relative mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <HeroSlider />

        <section className="relative z-10 -mt-1 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14]/95 shadow-2xl backdrop-blur sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {categories.map((category, index) => (
            <LocalizedClientLink href="/store" key={category.title} className={`group flex items-center gap-3 border-white/10 px-4 py-5 transition hover:bg-purple-500/10 ${index < categories.length - 1 ? "xl:border-l" : ""}`}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.03] text-purple-300 transition group-hover:border-purple-400/40 group-hover:bg-purple-500/15"><CategoryIcon name={category.icon} /></span>
              <span><strong className="block text-sm text-white">{category.title}</strong><small className="mt-1 block text-[10px] text-gray-500">{category.text}</small></span>
            </LocalizedClientLink>
          ))}
        </section>

        <GameSection eyebrow="انتخاب گیمرها" title="پرفروش‌ترین بازی‌ها" games={bestSellers} />
        <GameSection eyebrow="تازه‌رسیده‌ها" title="جدیدترین بازی‌ها" games={newestGames} />
        <GameSection eyebrow="قبل از همه بازی کن" title="پیش‌فروش‌های ویژه" games={preorders} />

        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141026] to-[#0a0d14] p-6">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />
            <p className="text-xs font-bold text-purple-400">اشتراک ویژه</p><h3 className="mt-2 text-2xl font-black">PS Plus Essential</h3><p className="mt-2 text-sm leading-7 text-gray-400">اشتراک ۱۲ ماهه با فعال‌سازی مطمئن و پشتیبانی GAMINT</p><LocalizedClientLink href="/store" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">مشاهده و خرید <ArrowIcon /></LocalizedClientLink>
          </article>
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] p-6">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <p className="text-xs font-bold text-blue-400">تحویل فوری</p><h3 className="mt-2 text-2xl font-black">گیفت کارت آمریکا</h3><p className="mt-2 text-sm leading-7 text-gray-400">خرید گیفت کارت پلی‌استیشن با بهترین قیمت و کد دیجیتال</p><LocalizedClientLink href="/store" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">مشاهده و خرید <ArrowIcon /></LocalizedClientLink>
          </article>
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#191020] to-[#0a0d14] p-6">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <p className="text-xs font-bold text-fuchsia-400">همیشه کنار شما</p><h3 className="mt-2 text-2xl font-black">پشتیبانی ۲۴/۷</h3><p className="mt-2 text-sm leading-7 text-gray-400">قبل و بعد از خرید برای انتخاب، فعال‌سازی و رفع مشکلات</p><LocalizedClientLink href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">تماس با پشتیبانی <ArrowIcon /></LocalizedClientLink>
          </article>
        </section>

        <section className="mt-7 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14] sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["◇", "قیمت‌های رقابتی", "بهترین قیمت بازار"],
            ["◉", "پشتیبانی ۲۴/۷", "چت و تلگرام"],
            ["♢", "پرداخت امن", "درگاه معتبر"],
            ["♧", "ضمانت اصالت", "تضمین محصولات"],
            ["⚡", "تحویل سریع", "در کمترین زمان"],
          ].map(([icon, title, text], index) => (
            <div key={title} className={`flex items-center gap-3 px-5 py-5 ${index < 4 ? "lg:border-l lg:border-white/10" : ""}`}>
              <span className="text-2xl text-purple-400">{icon}</span><span><strong className="block text-sm">{title}</strong><small className="text-[10px] text-gray-500">{text}</small></span>
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
