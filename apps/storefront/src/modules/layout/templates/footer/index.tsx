import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer
      dir="rtl"
      className="w-full border-t border-white/10 bg-[#050507] text-white"
    >
      <div className="content-container">

        <div className="grid gap-12 py-14 small:py-16 medium:grid-cols-2 large:grid-cols-4">

          <div className="large:col-span-1">
            <LocalizedClientLink
              href="/"
              className="group inline-flex items-center gap-3.5"
            >
              <span className="relative grid h-14 w-[72px] shrink-0 place-items-center">
                <span className="absolute inset-2 rounded-full bg-purple-600/25 blur-xl transition duration-300 group-hover:bg-purple-500/40" />
                <img
                  src="/gamint-footer-mark.png"
                  alt=""
                  aria-hidden="true"
                  className="relative h-full w-full object-contain mix-blend-screen transition duration-300 group-hover:scale-105"
                />
              </span>

              <span
                dir="rtl"
                className="-skew-x-[6deg] bg-gradient-to-l from-white via-white to-purple-400 bg-clip-text text-[28px] font-black leading-none text-transparent drop-shadow-[0_0_16px_rgba(124,58,237,.28)] small:text-[32px]"
              >
                گیمینت
              </span>
            </LocalizedClientLink>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">
              فروشگاه تخصصی محصولات دیجیتال گیمینگ؛
              خرید بازی، اکانت ظرفیتی، پیش‌فروش،
              گیفت کارت و اشتراک با تحویل سریع.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-2 text-xs text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              پشتیبانی گیمینت فعال است
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black">فروشگاه</h3>

            <ul className="mt-5 space-y-3 text-sm text-white/45">
              <li>
                <LocalizedClientLink
                  href="/categories/games"
                  className="transition hover:text-purple-300"
                >
                  بازی‌های PS5
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store"
                  className="transition hover:text-purple-300"
                >
                  اکانت ظرفیتی
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/preorders"
                  className="transition hover:text-purple-300"
                >
                  پیش‌فروش بازی‌ها
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store"
                  className="transition hover:text-purple-300"
                >
                  گیفت کارت
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store"
                  className="transition hover:text-purple-300"
                >
                  PS Plus
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black">خدمات مشتریان</h3>

            <ul className="mt-5 space-y-3 text-sm text-white/45">
              <li>
                <LocalizedClientLink
                  href="/account"
                  className="transition hover:text-purple-300"
                >
                  حساب کاربری
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/cart"
                  className="transition hover:text-purple-300"
                >
                  سبد خرید
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/account/orders"
                  className="transition hover:text-purple-300"
                >
                  پیگیری سفارش
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/buying-guide"
                  className="transition hover:text-purple-300"
                >
                  راهنمای خرید
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/faq"
                  className="transition hover:text-purple-300"
                >
                  سوالات متداول
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black">اعتماد و پشتیبانی</h3>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-bold">تحویل سریع</div>
                <div className="mt-1 text-xs leading-5 text-white/40">
                  تحویل محصولات دیجیتال در سریع‌ترین زمان ممکن
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-bold">ضمانت و پشتیبانی</div>
                <div className="mt-1 text-xs leading-5 text-white/40">
                  پشتیبانی سفارش و اکانت بعد از خرید
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/35 small:flex-row small:items-center small:justify-between">
          <p>
            © {new Date().getFullYear()} گیمینت — تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-4">
            <LocalizedClientLink href="/terms" className="transition hover:text-purple-300">
              قوانین و مقررات
            </LocalizedClientLink>
            <LocalizedClientLink href="/privacy" className="transition hover:text-purple-300">
              حریم خصوصی
            </LocalizedClientLink>
          </div>
        </div>

      </div>
    </footer>
  )
}
