import "server-only"

import { getCategoryByHandle } from "./categories"
import { listProductsWithSort } from "./products"
import { getProductPrice } from "@lib/util/get-product-price"
import { Game } from "@modules/marketing/components"

/**
 * Fetches published products in a category and maps them to the `Game`
 * shape the marketing pages (preorders, playstation, ...) render with.
 */
export async function listCategoryGames({
  categoryHandle,
  countryCode,
  limit = 24,
  badge,
}: {
  categoryHandle: string
  countryCode: string
  limit?: number
  badge?: string
}): Promise<Game[]> {
  const category = await getCategoryByHandle([categoryHandle])

  if (!category) {
    return []
  }

  const {
    response: { products },
  } = await listProductsWithSort({
    queryParams: { category_id: [category.id], limit },
    sortBy: "created_at",
    countryCode,
  })

  return products.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    const platform =
      (product.metadata?.platform as string | undefined) ||
      product.variants?.[0]?.title ||
      "PS5"

    return {
      title: product.title,
      platform,
      price: cheapestPrice
        ? cheapestPrice.calculated_price_number.toLocaleString("fa-IR")
        : "—",
      image: product.thumbnail || product.images?.[0]?.url || "",
      badge,
      handle: product.handle,
    }
  })
}
