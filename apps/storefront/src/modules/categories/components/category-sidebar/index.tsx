"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import { convertToLocale } from "@lib/util/money"
import {
  GENRE_QUERY_KEY,
  MAX_PRICE_QUERY_KEY,
  MIN_PRICE_QUERY_KEY,
} from "@lib/util/category-filters"
import SortProducts, { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const FilterIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
    <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = ({ open, className = "h-4 w-4" }: { open: boolean; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={`${className} transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type Genre = { id: string; handle: string; name: string; count: number }

type CategorySidebarProps = {
  sortBy: SortOptions
  genres: Genre[]
  selectedGenreHandles: string[]
  priceBounds: { min: number; max: number }
  selectedMinPrice?: number
  selectedMaxPrice?: number
  currencyCode: string
  resultCount: number
}

const CategorySidebar = ({
  sortBy,
  genres,
  selectedGenreHandles,
  priceBounds,
  selectedMinPrice,
  selectedMaxPrice,
  currencyCode,
  resultCount,
}: CategorySidebarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const boundsMin = priceBounds.min
  const boundsMax = Math.max(priceBounds.max, priceBounds.min + 1)

  const [localMin, setLocalMin] = useState(selectedMinPrice ?? boundsMin)
  const [localMax, setLocalMax] = useState(selectedMaxPrice ?? boundsMax)

  useEffect(() => {
    setLocalMin(selectedMinPrice ?? boundsMin)
    setLocalMax(selectedMaxPrice ?? boundsMax)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMinPrice, selectedMaxPrice, boundsMin, boundsMax])

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())
      updater(params)
      params.delete("page")
      const queryString = params.toString()
      router.push(queryString ? `${pathname}?${queryString}` : pathname)
    },
    [pathname, router, searchParams]
  )

  const setQueryParams = (name: string, value: string) =>
    updateQueryParams((params) => params.set(name, value))

  const toggleGenre = (handle: string) => {
    const isSelected = selectedGenreHandles.includes(handle)
    const next = isSelected
      ? selectedGenreHandles.filter((h) => h !== handle)
      : [...selectedGenreHandles, handle]

    updateQueryParams((params) => {
      if (next.length) {
        params.set(GENRE_QUERY_KEY, next.join(","))
      } else {
        params.delete(GENRE_QUERY_KEY)
      }
    })
  }

  const commitPriceRange = () => {
    updateQueryParams((params) => {
      if (localMin <= boundsMin) {
        params.delete(MIN_PRICE_QUERY_KEY)
      } else {
        params.set(MIN_PRICE_QUERY_KEY, String(Math.round(localMin)))
      }
      if (localMax >= boundsMax) {
        params.delete(MAX_PRICE_QUERY_KEY)
      } else {
        params.set(MAX_PRICE_QUERY_KEY, String(Math.round(localMax)))
      }
    })
  }

  const activeFilterCount =
    selectedGenreHandles.length +
    (selectedMinPrice !== undefined ? 1 : 0) +
    (selectedMaxPrice !== undefined ? 1 : 0)

  const clearAll = () => {
    updateQueryParams((params) => {
      params.delete(GENRE_QUERY_KEY)
      params.delete(MIN_PRICE_QUERY_KEY)
      params.delete(MAX_PRICE_QUERY_KEY)
    })
  }

  const fmt = (amount: number) => convertToLocale({ amount, currency_code: currencyCode })

  const sortedGenres = useMemo(
    () => [...genres].sort((a, b) => b.count - a.count),
    [genres]
  )

  const priceRangePercent = useMemo(() => {
    const span = boundsMax - boundsMin || 1
    return {
      left: ((localMin - boundsMin) / span) * 100,
      right: 100 - ((localMax - boundsMin) / span) * 100,
    }
  }, [localMin, localMax, boundsMin, boundsMax])

  const body = (
    <div className="flex flex-col gap-8">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} />

      <div className="h-px bg-white/[0.06]" />

      <div className="flex flex-col gap-3">
        <p className="text-xs font-bold text-white/70">محدوده قیمت</p>
        <div dir="ltr" className="px-1 pt-2">
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div
              className="absolute h-1.5 rounded-full bg-purple-500"
              style={{ left: `${priceRangePercent.left}%`, right: `${priceRangePercent.right}%` }}
            />
            <input
              type="range"
              min={boundsMin}
              max={boundsMax}
              value={localMin}
              onChange={(e) => setLocalMin(Math.min(Number(e.target.value), localMax))}
              onMouseUp={commitPriceRange}
              onTouchEnd={commitPriceRange}
              onKeyUp={commitPriceRange}
              className="range-thumb pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
              style={{ zIndex: localMin > boundsMax - 10 ? 5 : 3 }}
            />
            <input
              type="range"
              min={boundsMin}
              max={boundsMax}
              value={localMax}
              onChange={(e) => setLocalMax(Math.max(Number(e.target.value), localMin))}
              onMouseUp={commitPriceRange}
              onTouchEnd={commitPriceRange}
              onKeyUp={commitPriceRange}
              className="range-thumb pointer-events-none absolute inset-x-0 top-1/2 h-1.5 w-full -translate-y-1/2 appearance-none bg-transparent"
              style={{ zIndex: 4 }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/45">
          <span>{fmt(localMin)}</span>
          <span>{fmt(localMax)}</span>
        </div>
      </div>

      {sortedGenres.length > 0 && (
        <>
          <div className="h-px bg-white/[0.06]" />
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-white/70">ژانر</p>
            <div className="flex flex-col gap-2.5">
              {sortedGenres.map((genre) => {
                const checked = selectedGenreHandles.includes(genre.handle)
                return (
                  <label
                    key={genre.id}
                    className="flex cursor-pointer items-center justify-between gap-2"
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleGenre(genre.handle)}
                        className="peer hidden"
                      />
                      <span
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded border transition ${
                          checked
                            ? "border-purple-400 bg-purple-500"
                            : "border-white/25 bg-transparent"
                        }`}
                      >
                        {checked && (
                          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                            <path
                              d="M2.5 6.2l2.2 2.2 4.8-5"
                              stroke="white"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className={`text-xs ${checked ? "font-bold text-white" : "text-white/55"}`}>
                        {genre.name}
                      </span>
                    </span>
                    <span className="text-[11px] text-white/30">{genre.count.toLocaleString("fa-IR")}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </>
      )}

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="rounded-xl border border-white/15 py-2.5 text-xs font-bold text-white/60 transition hover:border-rose-400/40 hover:text-rose-300"
        >
          پاک کردن فیلترها ({activeFilterCount.toLocaleString("fa-IR")})
        </button>
      )}
    </div>
  )

  return (
    <>
      <style jsx global>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #fff;
          border: 3px solid #a855f7;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #fff;
          border: 3px solid #a855f7;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {/* mobile toggle */}
      <button
        onClick={() => setMobileOpen((v) => !v)}
        className="mb-4 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#0a0d14] px-4 py-3 text-sm font-bold text-white small:hidden"
      >
        <span className="flex items-center gap-2">
          <FilterIcon />
          فیلترها و مرتب‌سازی
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[10px] text-white">
              {activeFilterCount.toLocaleString("fa-IR")}
            </span>
          )}
        </span>
        <span className="flex items-center gap-2 text-xs font-normal text-white/40">
          {resultCount.toLocaleString("fa-IR")} نتیجه
          <ChevronIcon open={mobileOpen} />
        </span>
      </button>

      {mobileOpen && (
        <div className="mb-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 small:hidden">
          {body}
        </div>
      )}

      <aside className="hidden shrink-0 small:block small:w-[240px]">
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
          {body}
        </div>
      </aside>
    </>
  )
}

export default CategorySidebar
