import { Metadata } from "next"
import { getCategoryByHandle } from "@lib/data/categories"
import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowIcon, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "گیفت کارت پلی‌استیشن | گیمینت",
  description: "خرید گیفت کارت PSN با ریجن‌های مختلف و تحویل فوری کد دیجیتال از گیمینت",
}

type GiftCard = {
  title: string
  flag: string
  price: string
  handle?: string
}

function flagFor(title: string) {
  if (title.includes("آمریکا")) return "🇺🇸"
  if (title.includes("ترکیه")) return "🇹🇷"
  if (title.includes("امارات")) return "🇦🇪"
  return "🎁"
}

function GiftCardTile({ card }: { card: GiftCard }) {
  return (
    <LocalizedClientLink
      href={card.handle ? `/products/${card.handle}` : "/store"}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40"
    >
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl transition group-hover:bg-blue-400/25" />
      <div className="relative z-10 flex items-start justify-between">
        <span className="text-3xl">{card.flag}</span>
        <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-gray-300">PSN</span>
      </div>
      <h3 className="relative z-10 mt-4 text-lg font-black text-white">{card.title}</h3>
      <div className="relative z-10 mt-5 flex items-end justify-between">
        <p className="text-sm font-bold text-gray-100">{card.price}</p>
        <span className="flex items-center gap-1 text-xs font-semibold text-blue-300 transition group-hover:text-blue-200">
          خرید <ArrowIcon />
        </span>
      </div>
    </LocalizedClientLink>
  )
}

export default async function GiftCardsPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const category = await getCategoryByHandle(["gift-cards"])

  let giftCards: GiftCard[] = []

  if (category) {
    const {
      response: { products },
    } = await listProductsWithSort({
      page: 1,
      queryParams: { category_id: [category.id], limit: 50 },
      sortBy: "created_at",
      countryCode,
    })

    giftCards = products.map((product) => {
      const { cheapestPrice } = getProductPrice({ product })
      return {
        title: product.title,
        flag: flagFor(product.title),
        price: cheapestPrice?.calculated_price || "—",
        handle: product.handle,
      }
    })
  }

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
          {giftCards.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 xsmall:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {giftCards.map((card) => (
                <GiftCardTile key={card.handle || card.title} card={card} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">فعلاً گیفت کارتی ثبت نشده است.</p>
          )}
        </section>
      </div>
    </main>
  )
}
