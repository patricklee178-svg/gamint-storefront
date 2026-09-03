import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import OrderSummaryCard from "@modules/cart/components/order-summary-card"
import DiscountForm from "@modules/cart/components/discount-form"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div dir="rtl" className="flex flex-col gap-4 lg:sticky lg:top-6">
      <OrderSummaryCard cart={cart} />

      <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
        <h2 className="mb-4 text-sm font-bold text-white">محصولات شما</h2>
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {cart.items
            ?.slice()
            .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
            .map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">{item.product_title || item.title}</p>
                  <p className="mt-0.5 text-[11px] text-white/40">تعداد: {item.quantity.toLocaleString("fa-IR")}</p>
                </div>
                <span className="shrink-0 text-xs font-bold text-white/70">
                  {convertToLocale({ amount: item.total ?? 0, currency_code: cart.currency_code })}
                </span>
              </div>
            ))}
        </div>
      </div>

      <DiscountForm cart={cart} />
    </div>
  )
}

export default CheckoutSummary
