import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartItemRow from "@modules/cart/components/cart-item-row"
import DiscountForm from "@modules/cart/components/discount-form"
import OrderSummaryCard from "@modules/cart/components/order-summary-card"
import TrustCard from "@modules/cart/components/trust-card"
import SupportCard from "@modules/cart/components/support-card"
import { CartBreadcrumb, StepIndicator } from "@modules/cart/components/step-indicator"
import { RefundIcon, BoltIcon, HeadsetIcon, ShieldCheckIcon, CartOutlineIcon } from "@modules/cart/icons"

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const features = [
  { icon: RefundIcon, title: "ضمانت بازگشت وجه", text: "در صورت عدم فعال‌سازی" },
  { icon: BoltIcon, title: "تحویل سریع", text: "بین ۱۰ تا ۶۰ دقیقه" },
  { icon: HeadsetIcon, title: "پشتیبانی ۲۴/۷", text: "همیشه کنار شما هستیم" },
  { icon: ShieldCheckIcon, title: "فعال‌سازی آسان", text: "راهنمای کامل و اختصاصی" },
]

const CartTemplate = ({
  cart,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const hasItems = !!cart?.items?.length

  return (
    <div dir="rtl" className="min-h-[calc(100vh-72px)] bg-[#05070b] py-8 text-white">
      <div className="content-container">
        <CartBreadcrumb />

        <div className="mt-6 mb-8 rounded-2xl border border-white/10 bg-[#0a0d14] py-6">
          <StepIndicator current="cart" />
        </div>

        {hasItems && cart ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                <h1 className="mb-1 text-sm font-bold text-white">
                  محصولات شما ({cart.items!.length.toLocaleString("fa-IR")})
                </h1>

                <div className="mt-2">
                  {cart.items!
                    .slice()
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <CartItemRow key={item.id} item={item} currencyCode={cart.currency_code} />
                    ))}
                </div>
              </div>

              <div className="mt-4">
                <DiscountForm cart={cart} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 sm:grid-cols-4">
                {features.map((f) => (
                  <div key={f.title} className="flex flex-col items-center gap-1.5 text-center">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-purple-300">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-bold text-white">{f.title}</span>
                    <span className="text-[10px] text-white/35">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
                <LocalizedClientLink
                  href="/categories/games"
                  className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/15 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  ادامه خرید
                </LocalizedClientLink>
                <LocalizedClientLink
                  href={`/checkout?step=${getCheckoutStep(cart)}`}
                  data-testid="checkout-button"
                  className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-l from-purple-600 to-fuchsia-600 text-sm font-bold text-white transition hover:opacity-90"
                >
                  ادامه و وارد کردن اطلاعات
                </LocalizedClientLink>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <OrderSummaryCard cart={cart} />
              <TrustCard />
              <SupportCard />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-24 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/25">
              <CartOutlineIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">سبد خرید شما خالیه</p>
              <p className="mt-1 text-xs text-white/40">
                یه سری به بازی‌ها بزن و چیزی که دوست داری رو اضافه کن.
              </p>
            </div>
            <LocalizedClientLink
              href="/categories/games"
              className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
            >
              مشاهده بازی‌ها
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
