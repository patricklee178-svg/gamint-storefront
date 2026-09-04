import { Metadata } from "next"
import { getCategoryByHandle } from "@lib/data/categories"
import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowIcon, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "گیفت کارت پلی‌استیشن | گیمینت",
  description: "خرید گیفت کارت PSN آمریکا با تحویل فوری کد دیجیتال از گیمینت",
}

type GiftCard = {
  title: string
  price: string
  handle?: string
  thumbnail?: string | null
}

function GiftCardTile({ card }: { card: GiftCard }) {
  return (
    <LocalizedClientLink
      href={card.handle ? `/products/${card.handle}` : "/store"}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] transition duration-300 hover:-translate-y-1 hover:border-blue-400/40"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#060a14]">
        <img
          src={card.thumbnail || "/images/psn-gift-card-icon.jpg"}
          alt="گیفت کارت PSN"
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-white">{card.title}</h3>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-sm font-bold text-gray-100">{card.price}</p>
          <span className="flex items-center gap-1 text-xs font-semibold text-blue-300 transition group-hover:text-blue-200">
            خرید <ArrowIcon />
          </span>
        </div>
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
        price: cheapestPrice?.calculated_price || "—",
        handle: product.handle,
        thumbnail: product.thumbnail,
      }
    })
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="تحویل فوری"
          title="گیفت کارت پلی‌استیشن"
          description="گیفت کارت PSN آمریکا، تحویل آنی کد دیجیتال بعد از پرداخت."
          image="/images/gift-cards-banner-v7.jpg"
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-blue-400">همه‌ی مبالغ</p>
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
