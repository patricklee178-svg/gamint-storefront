import { Metadata } from "next"
import { listCategoryGames } from "@lib/data/category-games"
import { GameSection, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "بازی‌های پلی‌استیشن | گیمینت",
  description: "خرید بازی‌های PS5 و PS4 با بهترین قیمت، تحویل سریع و ضمانت اصالت از گیمینت",
}

const consoles = [
  { title: "کنسول PS5 Slim", text: "نسل جدید، سرعت فوق‌العاده", price: "از ۴۵,۰۰۰,۰۰۰ تومان" },
  { title: "کنسول PS5 Pro", text: "بالاترین کیفیت گرافیک و فریم", price: "از ۶۵,۰۰۰,۰۰۰ تومان" },
  { title: "دسته DualSense", text: "لرزش هوشمند و صدای فضایی", price: "از ۴,۲۰۰,۰۰۰ تومان" },
]

export default async function PlayStationPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const games = await listCategoryGames({
    categoryHandle: "games",
    countryCode,
    limit: 50,
  })

  const ps5Games = games.filter((g) => g.platform === "PS5")
  const ps4Games = games.filter((g) => g.platform === "PS4")

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="دنیای پلی‌استیشن"
          title="بازی‌ها و لوازم جانبی پلی‌استیشن"
          description="بزرگ‌ترین مجموعه‌ی بازی‌های PS5 و PS4 در گیمینت، با ضمانت اصالت و پشتیبانی کامل."
          image="/images/games/god-of-war.jpg"
        />

        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {consoles.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-[#0a0d14] p-6 transition hover:-translate-y-1 hover:border-purple-500/40">
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-gray-400">{item.text}</p>
              <p className="mt-4 text-sm font-bold text-purple-300">{item.price}</p>
            </article>
          ))}
        </section>

        {ps5Games.length > 0 && (
          <GameSection eyebrow="بازی‌های نسل جدید" title="بازی‌های PS5" games={ps5Games} viewAllHref="/store" />
        )}
        {ps4Games.length > 0 && (
          <GameSection eyebrow="کلاسیک‌های همیشگی" title="بازی‌های PS4" games={ps4Games} viewAllHref="/store" />
        )}
      </div>
    </main>
  )
}
