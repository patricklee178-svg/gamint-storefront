import { Metadata } from "next"
import { listCategoryGames } from "@lib/data/category-games"
import { GameSection, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "بازی‌های پلی‌استیشن | گیمینت",
  description: "خرید بازی‌های PS5 و PS4 با بهترین قیمت، تحویل سریع و ضمانت اصالت از گیمینت",
}

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

        <section className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white">
          <img
            src="/images/ps5-dualsense-render.jpg"
            alt="کنسول PS5 و دسته DualSense"
            className="h-auto w-full object-contain"
          />
        </section>

        {ps5Games.length > 0 && (
          <GameSection eyebrow="بازی‌های نسل جدید" title="بازی‌های PS5" games={ps5Games} viewAllHref="/categories/games" />
        )}
        {ps4Games.length > 0 && (
          <GameSection eyebrow="کلاسیک‌های همیشگی" title="بازی‌های PS4" games={ps4Games} viewAllHref="/categories/games" />
        )}
      </div>
    </main>
  )
}
