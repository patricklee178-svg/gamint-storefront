import { Metadata } from "next"
import { notFound } from "next/navigation"

import { retrieveCustomer } from "@lib/data/customer"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import WishlistGrid from "@modules/account/components/wishlist-grid"

export const metadata: Metadata = {
  title: "علاقه‌مندی‌ها | گیمینت",
  description: "بازی‌هایی که به علاقه‌مندی‌های خود اضافه کرده‌اید.",
}

export default async function Wishlist(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    notFound()
  }

  const wishlistIds = (customer.metadata?.wishlist as string[] | undefined) || []

  let items: { productId: string; title: string; platform: string; price: string; image: string; handle?: string }[] = []

  if (wishlistIds.length > 0) {
    const { response } = await listProducts({
      countryCode,
      queryParams: { id: wishlistIds, limit: wishlistIds.length },
    })

    items = response.products.map((product) => {
      const { cheapestPrice } = getProductPrice({ product })
      return {
        productId: product.id,
        title: product.title,
        platform: (product.metadata?.platform as string | undefined) || product.variants?.[0]?.title || "PS5",
        price: cheapestPrice ? cheapestPrice.calculated_price_number.toLocaleString("fa-IR") : "—",
        image: product.thumbnail || product.images?.[0]?.url || "",
        handle: product.handle,
      }
    })
  }

  return (
    <div dir="rtl" className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">علاقه‌مندی‌ها</h1>
        <p className="mt-1.5 text-sm text-white/45">بازی‌هایی که برای بعد نشون کردی.</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
          <p className="text-sm text-white/40">هنوز چیزی به علاقه‌مندی‌ها اضافه نکردی.</p>
          <LocalizedClientLink
            href="/categories/games"
            className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
          >
            مشاهده بازی‌ها
          </LocalizedClientLink>
        </div>
      ) : (
        <WishlistGrid items={items} />
      )}
    </div>
  )
}
