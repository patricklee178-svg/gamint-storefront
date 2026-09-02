import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import { ReceiptIcon, LockIcon } from "@modules/cart/icons"

const OrderSummaryCard = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
  const itemSubtotal = cart.item_subtotal ?? cart.subtotal ?? 0
  const discountTotal = cart.discount_subtotal ?? 0

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
          <ReceiptIcon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-bold text-white">خلاصه سفارش</h2>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-white/45">تعداد محصولات</span>
          <span className="font-semibold text-white">{itemCount.toLocaleString("fa-IR")} مورد</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/45">مجموع قیمت کالاها</span>
          <span className="font-semibold text-white">
            {convertToLocale({ amount: itemSubtotal, currency_code: cart.currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/45">تخفیف</span>
          <span className={`font-semibold ${discountTotal > 0 ? "text-emerald-400" : "text-white/30"}`}>
            {discountTotal > 0
              ? `- ${convertToLocale({ amount: discountTotal, currency_code: cart.currency_code })}`
              : "—"}
          </span>
        </div>
      </div>

      <div className="my-4 h-px w-full bg-white/10" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white/70">مبلغ قابل پرداخت</span>
        <span className="text-xl font-black text-purple-300" data-testid="cart-total">
          {convertToLocale({ amount: cart.total ?? 0, currency_code: cart.currency_code })}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] text-white/40">
        <LockIcon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
        اطلاعات شما در بستری امن و رمزگذاری‌شده منتقل می‌شود.
      </div>
    </div>
  )
}

export default OrderSummaryCard
