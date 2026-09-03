import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div dir="rtl" className="min-h-screen w-full bg-[#05070b] text-white">
      <div className="border-b border-white/10 bg-[#07070a]/95 backdrop-blur-xl">
        <nav className="content-container flex h-16 items-center justify-between">
          <LocalizedClientLink
            href="/"
            className="group flex items-center gap-3"
            data-testid="store-link"
          >
            <img
              src="/gamint-logo-header.webp"
              alt="GAMINT"
              className="h-7 w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            data-testid="back-to-cart-link"
          >
            بازگشت به سبد خرید
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </LocalizedClientLink>
        </nav>
      </div>
      <div data-testid="checkout-container">{children}</div>
    </div>
  )
}
