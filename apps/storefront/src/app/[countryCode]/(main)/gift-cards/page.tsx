import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowIcon, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "گیفت کارت پلی‌استیشن | گیمینت",
  description: "خرید گیفت کارت PSN با ریجن‌های مختلف و تحویل فوری کد دیجیتال از GAMINT",
}

type GiftCard = {
  region: string
  flag: string
  amount: string
  price: string
}

const giftCards: GiftCard[] = [
  { region: "آمریکا", flag: "🇺🇸", amount: "۱۰ دلاری", price: "۹۸۰,۰۰۰" },
  { region: "آمریکا", flag: "🇺🇸", amount: "۲۵ دلاری", price: "۲,۳۵۰,۰۰۰" },
  { region: "آمریکا", flag: "🇺🇸", amount: "۵۰ دلاری", price: "۴,۶۰۰,۰۰۰" },
  { region: "آمریکا", flag: "🇺🇸", amount: "۱۰۰ دلاری", price: "۹,۱۰۰,۰۰۰" },
  { region: "ترکیه", flag: "🇹🇷", amount: "۱۰۰ لیر", price: "۱,۲۵۰,۰۰۰" },
  { region: "ترکیه", flag: "🇹🇷", amount: "۲۵۰ لیر", price: "۳,۰۵۰,۰۰۰" },
  { region: "امارات", flag: "🇦🇪", amount: "۵۰ درهم", price: "۱,۷۵۰,۰۰۰" },
  { region: "امارات", flag: "🇦🇪", amount: "۱۰۰ درهم", price: "۳,۴۵۰,۰۰۰" },
]

function GiftCardTile({ card }: { card: GiftCard }) {
  return (
    <LocalizedClientLink
      href="/store"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40"
    >
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl transition group-hover:bg-blue-400/25" />
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-3xl">{card.flag}</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-300">PSN</span>
      </div>
      <h3 className="relative z-10 mt-4 text-lg font-black text-white">گیفت کارت {card.region}</h3>
      <p className="relative z-10 mt-1 text-sm text-gray-400">مبلغ {card.amount}</p>
      <div className="relative z-10 mt-5 flex items-end justify-between">
        <p className="text-sm font-bold text-gray-100">{card.price} <span className="text-[10px] font-normal text-gray-400">تومان</span></p>
        <span className="flex items-center gap-1 text-xs font-semibold text-blue-300 transition group-hover:text-blue-200">
          خرید <ArrowIcon />
        </span>
      </div>
    </LocalizedClientLink>
  )
}

export default function GiftCardsPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="تحویل فوری"
          title="گیفت کارت پلی‌استیشن"
          description="گیفت کارت PSN با ریجن‌های آمریکا، ترکیه و امارات، تحویل آنی کد دیجیتال بعد از پرداخت."
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-blue-400">همه‌ی مبالغ و ریجن‌ها</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">گیفت کارت‌های موجود</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 xsmall:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {giftCards.map((card) => (
              <GiftCardTile key={`${card.region}-${card.amount}`} card={card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
