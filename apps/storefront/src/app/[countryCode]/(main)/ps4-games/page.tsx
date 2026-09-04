import { Metadata } from "next"
import { listCategoryGames } from "@lib/data/category-games"
import { GameCard, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "بازی‌های PS4 | گیمینت",
  description: "کلاسیک‌های همیشگی PS4 در گیمینت، با ضمانت اصالت و پشتیبانی کامل",
}

export default async function PS4GamesPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const games = await listCategoryGames({
    categoryHandle: "games",
    countryCode,
    limit: 200,
    platform: "PS4",
  })

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="کلاسیک‌های همیشگی"
          title="بازی‌های PS4"
          description="بهترین بازی‌های PS4 در گیمینت، با ضمانت اصالت و پشتیبانی کامل."
          image="/images/playstation-hero-banner.jpg"
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-purple-400">همه‌ی بازی‌ها</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">بازی‌های PS4 موجود</h2>
          </div>
          {games.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
              {games.map((game) => <GameCard key={game.handle || game.title} game={game} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-400">فعلاً بازی‌ای ثبت نشده است.</p>
          )}
        </section>
      </div>
    </main>
  )
}
