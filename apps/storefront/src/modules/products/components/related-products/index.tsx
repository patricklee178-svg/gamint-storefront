import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { GameSection } from "@modules/marketing/components"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const genreCategoryIds = (product.categories || [])
    .filter((c) => c.handle?.startsWith("genre-"))
    .map((c) => c.id)

  const otherCategoryIds = (product.categories || [])
    .filter((c) => !c.handle?.startsWith("genre-"))
    .map((c) => c.id)

  const categoryIds = genreCategoryIds.length > 0 ? genreCategoryIds : otherCategoryIds

  if (categoryIds.length === 0) {
    return null
  }

  const { response } = await listProducts({
    countryCode,
    queryParams: {
      category_id: categoryIds,
      limit: 7,
      fields: "*categories",
    },
  })

  const products = response.products.filter((p) => p.id !== product.id).slice(0, 6)

  if (!products.length) {
    return null
  }

  const games = products.map((p) => {
    const { cheapestPrice } = getProductPrice({ product: p })
    return {
      title: p.title,
      platform: (p.metadata?.platform as string | undefined) || p.variants?.[0]?.title || "PS5",
      price: cheapestPrice ? cheapestPrice.calculated_price_number.toLocaleString("fa-IR") : "—",
      image: p.thumbnail || p.images?.[0]?.url || "",
      handle: p.handle,
    }
  })

  return (
    <GameSection
      eyebrow="پیشنهاد ما"
      title="بازی‌های مشابه"
      games={games}
      viewAllHref="/categories/games"
    />
  )
}
