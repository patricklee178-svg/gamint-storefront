import { Metadata } from "next"
import { Game, GameSection, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "بازی‌های پلی‌استیشن | گیمینت",
  description: "خرید بازی‌های PS5 و PS4 با بهترین قیمت، تحویل سریع و ضمانت اصالت از GAMINT",
}

const ps5Games: Game[] = [
  { title: "EA SPORTS FC 26", platform: "PS5", price: "۲,۵۹۰,۰۰۰", image: "/images/games/fc26.jpg" },
  { title: "God of War Ragnarök", platform: "PS5", price: "۲,۷۸۰,۰۰۰", image: "/images/games/god-of-war.jpg" },
  { title: "Marvel's Spider-Man 2", platform: "PS5", price: "۲,۶۵۰,۰۰۰", image: "/images/games/spider-man-2-v3.jpg" },
  { title: "Stellar Blade", platform: "PS5", price: "۲,۶۵۰,۰۰۰", image: "/images/games/stellar-blade.jpg", badge: "جدید" },
  { title: "Rise of the Ronin", platform: "PS5", price: "۲,۴۵۰,۰۰۰", image: "/images/games/rise-of-ronin-v3.jpg", badge: "جدید" },
  { title: "Helldivers 2", platform: "PS5", price: "۱,۸۹۰,۰۰۰", image: "/images/games/helldivers-2.jpg" },
  { title: "Final Fantasy VII Rebirth", platform: "PS5", price: "۲,۶۸۰,۰۰۰", image: "/images/games/final-fantasy-7.jpg" },
  { title: "Dragon's Dogma 2", platform: "PS5", price: "۲,۳۹۰,۰۰۰", image: "/images/games/dragons-dogma-2.jpg" },
  { title: "Hogwarts Legacy", platform: "PS5", price: "۲,۳۸۰,۰۰۰", image: "/images/games/hogwarts.jpg" },
  { title: "Ghost of Tsushima", platform: "PS5", price: "۲,۲۵۰,۰۰۰", image: "/images/games/ghost-yotei.jpg" },
  { title: "Monster Hunter Wilds", platform: "PS5", price: "۲,۱۵۰,۰۰۰", image: "/images/games/monster-hunter.jpg" },
  { title: "Cyberpunk 2077", platform: "PS5", price: "۲,۲۵۰,۰۰۰", image: "/images/games/cyberpunk.jpg" },
]

const ps4Games: Game[] = [
  { title: "Red Dead Redemption 2", platform: "PS4", price: "۱,۹۵۰,۰۰۰", image: "/images/games/red-dead-2-v3.jpg" },
  { title: "The Last of Us Part II", platform: "PS4", price: "۲,۴۹۰,۰۰۰", image: "/images/games/last-of-us-2-v3.jpg" },
  { title: "Marvel's Spider-Man 2", platform: "PS4", price: "۲,۶۵۰,۰۰۰", image: "/images/games/spider-man-2.jpg" },
  { title: "Rise of the Ronin", platform: "PS4", price: "۲,۴۵۰,۰۰۰", image: "/images/games/rise-of-ronin.jpg" },
]

const consoles = [
  { title: "کنسول PS5 Slim", text: "نسل جدید، سرعت فوق‌العاده", price: "از ۴۵,۰۰۰,۰۰۰ تومان" },
  { title: "کنسول PS5 Pro", text: "بالاترین کیفیت گرافیک و فریم", price: "از ۶۵,۰۰۰,۰۰۰ تومان" },
  { title: "دسته DualSense", text: "لرزش هوشمند و صدای فضایی", price: "از ۴,۲۰۰,۰۰۰ تومان" },
]

export default function PlayStationPage() {
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

        <GameSection eyebrow="بازی‌های نسل جدید" title="بازی‌های PS5" games={ps5Games} />
        <GameSection eyebrow="کلاسیک‌های همیشگی" title="بازی‌های PS4" games={ps4Games} />
      </div>
    </main>
  )
}
