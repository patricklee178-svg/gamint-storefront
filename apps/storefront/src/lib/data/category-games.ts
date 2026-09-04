import "server-only"

import { HttpTypes } from "@medusajs/types"
import { getCategoryByHandle } from "./categories"
import { listProducts } from "./products"
import { getProductPrice } from "@lib/util/get-product-price"
import { Game } from "@modules/marketing/components"

/**
 * Fetches published products in a category and maps them to the `Game`
 * shape the marketing pages (preorders, playstation, homepage, ...) render
 * with.
 */
export async function listCategoryGames({
  categoryHandle,
  countryCode,
  limit = 24,
  offset = 0,
  badge,
  sortBy = "created_at",
}: {
  categoryHandle: string
  countryCode: string
  limit?: number
  offset?: number
  badge?: string
  sortBy?: "created_at" | "release_year"
}): Promise<Game[]> {
  const category = await getCategoryByHandle([categoryHandle])

  if (!category) {
    return []
  }

  if (sortBy === "release_year") {
    // No store-API field for real-world release date, so we pull the
    // (up to 100) products in the category and sort by the product's real
    // `metadata.release_year` ourselves — falls back to created_at only to
    // break ties among products that share a release year.
    const {
      response: { products },
    } = await listProducts({
      countryCode,
      queryParams: {
        category_id: [category.id],
        limit: 100,
        order: "-created_at",
      },
    })

    const sorted = [...products].sort((a, b) => {
      const yearA = Number(a.metadata?.release_year) || 0
      const yearB = Number(b.metadata?.release_year) || 0
      if (yearB !== yearA) return yearB - yearA
      return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    })

    return sorted.slice(offset, offset + limit).map((product) => mapToGame(product, badge))
  }

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      category_id: [category.id],
      limit: 100,
      order: "-created_at",
    },
  })

  // Products can be manually pinned to the front of a listing via
  // `metadata.pin_rank` (lower = earlier); everything else keeps the
  // API's -created_at order, since Array#sort is stable.
  const sorted = [...products].sort((a, b) => {
    const pinA = Number(a.metadata?.pin_rank)
    const pinB = Number(b.metadata?.pin_rank)
    const hasPinA = Number.isFinite(pinA)
    const hasPinB = Number.isFinite(pinB)
    if (hasPinA && hasPinB) return pinA - pinB
    if (hasPinA) return -1
    if (hasPinB) return 1
    return 0
  })

  return sorted.slice(offset, offset + limit).map((product) => mapToGame(product, badge))
}

function mapToGame(product: HttpTypes.StoreProduct, badge?: string): Game {
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
}
