import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4 shrink-0 text-white/40"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
)

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50" dir="rtl">
      <header className="border-b border-white/10 bg-[#07070a]/95 text-white backdrop-blur-xl">
        <nav className="content-container flex h-[72px] w-full items-center justify-between gap-6">

          <div className="flex items-center gap-5">
            <LocalizedClientLink
              href="/"
              className="group flex items-center gap-3"
              data-testid="nav-store-link"
            >
        <img
          src="/gamint-logo-header.webp"
          alt="GAMINT"
          className="h-8 w-auto max-w-[145px] object-contain transition-transform duration-300 group-hover:scale-[1.02] small:h-9 small:max-w-[190px]"
        />
            </LocalizedClientLink>

            <div className="hidden items-center gap-6 text-sm text-white/70 large:flex">
              <LocalizedClientLink
                href="/store"
                className="transition-colors hover:text-white"
              >
                بازی‌ها
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/preorders"
                className="transition-colors hover:text-white"
              >
                پیش‌فروش
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/playstation"
                className="transition-colors hover:text-white"
              >
                پلی‌استیشن
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/gift-cards"
                className="transition-colors hover:text-white"
              >
                گیفت کارت
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/ps-plus"
                className="transition-colors hover:text-white"
              >
                پلی‌استیشن پلاس
              </LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden small:block">
              <LocalizedClientLink
                href="/account"
                className="text-sm text-white/70 transition-colors hover:text-white"
                data-testid="nav-account-link"
              >
                حساب کاربری
              </LocalizedClientLink>
            </div>

            <div className="text-sm text-white">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    href="/cart"
                    className="text-white/70 transition-colors hover:text-white"
                    data-testid="nav-cart-link"
                  >
                    سبد خرید (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>

            <div className="h-full large:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex flex-1 justify-end">
            <form
              action="/search"
              method="GET"
              className="hidden w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/70 transition focus-within:border-purple-400/40 medium:flex"
            >
              <SearchIcon />
              <input
                type="search"
                name="q"
                placeholder="جستجوی بازی، گیفت کارت و اشتراک..."
                className="w-full bg-transparent text-right text-white placeholder:text-white/40 focus:outline-none"
              />
            </form>
          </div>

        </nav>
      </header>
    </div>
  )
}
