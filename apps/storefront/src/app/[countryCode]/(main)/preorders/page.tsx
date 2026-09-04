import { Metadata } from "next"
import { listCategoryGames } from "@lib/data/category-games"
import { GameCard, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "پیش‌فروش بازی‌ها | گیمینت",
  description: "پیش‌خرید جدیدترین بازی‌های PS5 با تحویل فوری در زمان عرضه از گیمینت",
}

export default async function PreordersPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const preorders = await listCategoryGames({
    categoryHandle: "preorders",
    countryCode,
    badge: "پیش‌فروش",
  })

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="قبل از همه بازی کن"
          title="پیش‌فروش‌های ویژه گیمینت"
          description="با پیش‌خرید از گیمینت، بازی موردعلاقه‌ات همون روز عرضه با تحویل فوری و ضمانت اصالت دستته."
          image="/images/games/preorders-hero.jpg"
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-purple-400">لیست کامل</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">همه‌ی پیش‌فروش‌ها</h2>
          </div>
          {preorders.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {preorders.map((game) => <GameCard key={game.title} game={game} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-400">فعلاً پیش‌فروشی ثبت نشده است.</p>
          )}
        </section>
      </div>
    </main>
  )
}
