import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getCategoryFacets } from "@lib/data/products"
import { listGenreCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import CategorySidebar from "@modules/categories/components/category-sidebar"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { OptionValueIds } from "@lib/util/product-option-filters"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  optionValueIds,
  genreHandles,
  minPrice,
  maxPrice,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
  genreHandles?: string[]
  minPrice?: number
  maxPrice?: number
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  const hasGenreFilters = category.handle === "games"

  let sidebar = (
    <RefinementList sortBy={sort} data-testid="sort-by-container" hideOptionsPicker />
  )
  let genreCategoryIds: string[] | undefined
  let resolvedMinPrice = minPrice
  let resolvedMaxPrice = maxPrice

  if (hasGenreFilters) {
    const [genreCategories, region] = await Promise.all([
      listGenreCategories(),
      getRegion(countryCode),
    ])

    genreCategoryIds = genreHandles?.length
      ? genreCategories.filter((g) => genreHandles.includes(g.handle)).map((g) => g.id)
      : undefined

    const facets = await getCategoryFacets({
      categoryId: category.id,
      countryCode,
      genreCategoryIds,
      minPrice,
      maxPrice,
    })

    const genres = genreCategories
      .map((g) => ({
        id: g.id,
        handle: g.handle,
        name: g.name,
        count: facets.genreCounts[g.handle] || 0,
      }))
      .filter((g) => g.count > 0)

    const boundsMin = facets.priceBounds.min
    const boundsMax = facets.priceBounds.max
    if (resolvedMinPrice !== undefined && resolvedMinPrice <= boundsMin) {
      resolvedMinPrice = undefined
    }
    if (resolvedMaxPrice !== undefined && resolvedMaxPrice >= boundsMax) {
      resolvedMaxPrice = undefined
    }

    sidebar = (
      <CategorySidebar
        sortBy={sort}
        genres={genres}
        selectedGenreHandles={genreHandles || []}
        priceBounds={facets.priceBounds}
        selectedMinPrice={minPrice}
        selectedMaxPrice={maxPrice}
        currencyCode={region?.currency_code || "irr"}
        resultCount={facets.filteredCount}
      />
    )
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="content-container">
        <div className="flex items-center gap-2 py-6 text-xs text-white/40">
          <LocalizedClientLink href="/" className="hover:text-white">
            خانه
          </LocalizedClientLink>
          {parents.map((parent) => (
            <span key={parent.id} className="flex items-center gap-2">
              <span>/</span>
              <LocalizedClientLink href={`/categories/${parent.handle}`} className="hover:text-white">
                {parent.name}
              </LocalizedClientLink>
            </span>
          ))}
          <span>/</span>
          <span className="font-bold text-white">{category.name}</span>
        </div>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-white" data-testid="category-page-title">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-2 max-w-2xl text-sm text-white/45">{category.description}</p>
            )}
          </div>
        </div>

        {category.category_children && category.category_children.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {category.category_children.map((c) => (
              <LocalizedClientLink
                key={c.id}
                href={`/categories/${c.handle}`}
                className="rounded-xl border border-white/10 bg-[#0a0d14] px-4 py-2 text-xs font-bold text-white/70 transition hover:border-purple-400/40 hover:text-white"
              >
                {c.name}
              </LocalizedClientLink>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-6 small:flex-row small:items-start" data-testid="category-container">
          {sidebar}
          <div className="w-full min-w-0">
            <Suspense
              fallback={<SkeletonProductGrid numberOfProducts={category.products?.length ?? 8} />}
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
                genreCategoryIds={genreCategoryIds}
                minPrice={resolvedMinPrice}
                maxPrice={resolvedMaxPrice}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
