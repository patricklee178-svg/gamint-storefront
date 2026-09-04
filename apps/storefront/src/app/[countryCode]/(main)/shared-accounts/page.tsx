import { Metadata } from "next"
import { getCategoryByHandle } from "@lib/data/categories"
import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowIcon, PageHero } from "@modules/marketing/components"

export const metadata: Metadata = {
  title: "اکانت ظرفیتی پلی‌استیشن | گیمینت",
  description: "خرید اکانت ظرفیتی PS5 و PS4 با فعال‌سازی مطمئن و پشتیبانی کامل از گیمینت",
}

type SharedAccount = {
  title: string
  price: string
  handle?: string
  thumbnail?: string | null
}

function SharedAccountTile({ item }: { item: SharedAccount }) {
  return (
    <LocalizedClientLink
      href={item.handle ? `/products/${item.handle}` : "/store"}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1730] to-[#0a0d14] transition duration-300 hover:-translate-y-1 hover:border-purple-400/40"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#060a14]">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16">
              <path d="M17 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M17 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-9-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black text-white">{item.title}</h3>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-sm font-bold text-gray-100">{item.price}</p>
          <span className="flex items-center gap-1 text-xs font-semibold text-purple-300 transition group-hover:text-purple-200">
            خرید <ArrowIcon />
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}

export default async function SharedAccountsPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const category = await getCategoryByHandle(["shared-accounts"])

  let accounts: SharedAccount[] = []

  if (category) {
    const {
      response: { products },
    } = await listProductsWithSort({
      page: 1,
      queryParams: { category_id: [category.id], limit: 50 },
      sortBy: "created_at",
      countryCode,
    })

    accounts = products.map((product) => {
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
          eyebrow="مقرون‌به‌صرفه"
          title="اکانت ظرفیتی پلی‌استیشن"
          description="اکانت‌های ظرفیتی PS5 و PS4 با فعال‌سازی مطمئن، قیمت مناسب و پشتیبانی کامل گیمینت."
        />

        <section className="mt-12">
          <div className="mb-5">
            <p className="mb-1 text-xs font-semibold text-purple-400">همه‌ی اکانت‌ها</p>
            <h2 className="text-xl font-black text-white sm:text-2xl">اکانت‌های ظرفیتی موجود</h2>
          </div>
          {accounts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 xsmall:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {accounts.map((item) => (
                <SharedAccountTile key={item.handle || item.title} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-24 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/25">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M17 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M17 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-9-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-white">به‌زودی اکانت‌های ظرفیتی اینجا اضافه می‌شن</p>
                <p className="mt-1 text-xs text-white/40">
                  فعلاً اکانت ظرفیتی‌ای ثبت نشده، سری به بازی‌ها بزن.
                </p>
              </div>
              <LocalizedClientLink
                href="/categories/games"
                className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
              >
                مشاهده بازی‌ها
              </LocalizedClientLink>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
