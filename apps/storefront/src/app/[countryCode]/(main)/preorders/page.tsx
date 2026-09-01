import { Metadata } from "next"
import { Game, GameCard, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "پیش‌فروش بازی‌ها | گیمینت",
  description: "پیش‌خرید جدیدترین بازی‌های PS5 با تحویل فوری در زمان عرضه از GAMINT",
}

const preorders: Game[] = [
  { title: "Grand Theft Auto VI", platform: "PS5", price: "۲,۹۵۰,۰۰۰", image: "/images/games/gta6-hero.jpg", badge: "پیش‌فروش" },
  { title: "Death Stranding 2", platform: "PS5", price: "۲,۳۰۰,۰۰۰", image: "/images/games/death-stranding-2.jpg", badge: "پیش‌فروش" },
  { title: "Ghost of Yōtei", platform: "PS5", price: "۲,۲۵۰,۰۰۰", image: "/images/games/ghost-of-tsushima-v4.jpg", badge: "پیش‌فروش" },
  { title: "Assassin's Creed Shadows", platform: "PS5", price: "۲,۳۵۰,۰۰۰", image: "/images/games/ac-shadows.jpg", badge: "پیش‌فروش" },
  { title: "DOOM: The Dark Ages", platform: "PS5", price: "۲,۲۰۰,۰۰۰", image: "/images/games/doom-dark-ages.jpg", badge: "پیش‌فروش" },
  { title: "EA SPORTS FC 27", platform: "PS5", price: "۲,۶۵۰,۰۰۰", image: "/images/games/fc27-hero.jpg", badge: "پیش‌فروش" },
  { title: "Call of Duty: Modern Warfare 4", platform: "PS5", price: "۲,۴۵۰,۰۰۰", image: "/images/games/mw4-hero.webp", badge: "پیش‌فروش" },
  { title: "Monster Hunter Wilds", platform: "PS5", price: "۲,۱۵۰,۰۰۰", image: "/images/games/monster-hunter.jpg", badge: "پیش‌فروش" },
]

export default function PreordersPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="قبل از همه بازی کن"
          title="پیش‌فروش‌های ویژه گیمینت"
          description="با پیش‌خرید از GAMINT، بازی موردعلاقه‌ات همون روز عرضه با تحویل فوری و ضمانت اصالت دستته."
          image="/images/games/gta6-hero.jpg"
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-purple-400">لیست کامل</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">همه‌ی پیش‌فروش‌ها</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {preorders.map((game) => <GameCard key={game.title} game={game} />)}
          </div>
        </section>
      </div>
    </main>
  )
}
