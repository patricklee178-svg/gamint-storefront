export const GENRE_QUERY_KEY = "genres"
export const MIN_PRICE_QUERY_KEY = "minPrice"
export const MAX_PRICE_QUERY_KEY = "maxPrice"

export const parseGenreHandles = (
  searchParams: Record<string, string | string[] | undefined>
): string[] => {
  const value = searchParams[GENRE_QUERY_KEY]

  if (typeof value === "string" && value.length > 0) {
    return Array.from(new Set(value.split(",").filter(Boolean)))
  }

  return []
}

export const parsePriceParam = (
  value: string | string[] | undefined
): number | undefined => {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = raw ? Number(raw) : NaN
  return Number.isFinite(parsed) ? parsed : undefined
}
