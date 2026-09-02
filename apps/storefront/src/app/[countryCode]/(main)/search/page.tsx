import { Metadata } from "next"

import { parseOptionValueIds } from "@lib/util/product-option-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "جستجو | گیمینت",
  description: "جستجوی بازی، گیفت کارت و اشتراک در فروشگاه گیمینت",
}

type SearchPageSearchParams = Record<string, string | string[] | undefined> & {
  q?: string
  sortBy?: SortOptions
  page?: string
  optionValueIds?: string | string[]
}

type Params = {
  searchParams: Promise<SearchPageSearchParams>
  params: Promise<{
    countryCode: string
  }>
}

export default async function SearchPage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { q, sortBy, page } = searchParams
  const optionValueIds = parseOptionValueIds(searchParams)

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
      q={q}
    />
  )
}
