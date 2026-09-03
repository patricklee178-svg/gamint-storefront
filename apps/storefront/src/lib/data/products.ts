"use server"

import { sdk } from "@lib/config"
import { OptionValueIds } from "@lib/util/product-option-filters"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

type ProductListQueryParams = (HttpTypes.FindParams &
  HttpTypes.StoreProductListParams) & {
  options?: string[]
  option_value_id?: string | string[]
}

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: ProductListQueryParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,*variants.options,+metadata,+tags,+categories.id,+categories.handle",
          ...queryParams,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

export const minPriceOf = (product: HttpTypes.StoreProduct): number => {
  if (!product.variants?.length) {
    return 0
  }

  const amounts = product.variants
    .map((v) => (v as { calculated_price?: { calculated_amount?: number } })
      .calculated_price?.calculated_amount ?? 0)
    .filter((amount) => amount > 0)

  return amounts.length ? Math.min(...amounts) : 0
}

const productHasAnyCategory = (
  product: HttpTypes.StoreProduct,
  categoryIds: string[]
): boolean => {
  const productCategoryIds = (product.categories || []).map((c) => c.id)
  return categoryIds.some((id) => productCategoryIds.includes(id))
}

type ProductFilters = {
  genreCategoryIds?: string[]
  minPrice?: number
  maxPrice?: number
}

const applyProductFilters = (
  products: HttpTypes.StoreProduct[],
  { genreCategoryIds, minPrice, maxPrice }: ProductFilters
): HttpTypes.StoreProduct[] => {
  let filtered = products

  if (genreCategoryIds?.length) {
    filtered = filtered.filter((p) => productHasAnyCategory(p, genreCategoryIds))
  }

  if (typeof minPrice === "number") {
    filtered = filtered.filter((p) => minPriceOf(p) >= minPrice)
  }

  if (typeof maxPrice === "number") {
    filtered = filtered.filter((p) => minPriceOf(p) <= maxPrice)
  }

  return filtered
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 1,
  queryParams,
  sortBy = "created_at",
  countryCode,
  optionValueIds,
  genreCategoryIds,
  minPrice,
  maxPrice,
}: {
  page?: number
  queryParams?: ProductListQueryParams
  sortBy?: SortOptions
  countryCode: string
  optionValueIds?: OptionValueIds
  genreCategoryIds?: string[]
  minPrice?: number
  maxPrice?: number
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: ProductListQueryParams
}> => {
  const limit = queryParams?.limit || 12
  const optionFilters = Array.from(
    new Set((optionValueIds || []).filter(Boolean))
  )

  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      ...(optionFilters.length ? { option_value_id: optionFilters } : {}),
      limit: 100,
    },
    countryCode,
  })

  const filtered = applyProductFilters(products, { genreCategoryIds, minPrice, maxPrice })

  const sortedProducts = sortProducts(filtered, sortBy)

  const pageParam = (page - 1) * limit

  const filteredCount = filtered.length

  const nextPage = filteredCount > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count: filteredCount,
    },
    nextPage,
    queryParams,
  }
}

/**
 * Fetches the (up to 100) products in a category, unfiltered, to compute real
 * sidebar facets: how many products fall under each genre category, and the
 * min/max price across the listing — used to size the price-range slider.
 */
export const getCategoryFacets = async ({
  categoryId,
  countryCode,
  genreCategoryIds,
  minPrice,
  maxPrice,
}: {
  categoryId: string
  countryCode: string
} & ProductFilters): Promise<{
  genreCounts: Record<string, number>
  priceBounds: { min: number; max: number }
  filteredCount: number
}> => {
  const {
    response: { products },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      category_id: [categoryId],
      limit: 100,
    } as ProductListQueryParams,
    countryCode,
  })

  const genreCounts: Record<string, number> = {}
  for (const product of products) {
    for (const category of product.categories || []) {
      if (category.handle?.startsWith("genre-")) {
        genreCounts[category.handle] = (genreCounts[category.handle] || 0) + 1
      }
    }
  }

  const prices = products.map(minPriceOf).filter((p) => p > 0)

  const priceBounds = prices.length
    ? { min: Math.min(...prices), max: Math.max(...prices) }
    : { min: 0, max: 0 }

  const filteredCount = applyProductFilters(products, {
    genreCategoryIds,
    minPrice,
    maxPrice,
  }).length

  return { genreCounts, priceBounds, filteredCount }
}
