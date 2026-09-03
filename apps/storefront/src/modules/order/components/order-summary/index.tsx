import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) =>
    convertToLocale({ amount: amount ?? 0, currency_code: order.currency_code })

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <h2 className="mb-4 text-sm font-bold text-white">خلاصه مبلغ</h2>
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between text-white/60">
          <span>جمع جزء</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        {order.discount_total > 0 && (
          <div className="flex items-center justify-between text-white/60">
            <span>تخفیف</span>
            <span>- {getAmount(order.discount_total)}</span>
          </div>
        )}
        {order.gift_card_total > 0 && (
          <div className="flex items-center justify-between text-white/60">
            <span>کارت هدیه</span>
            <span>- {getAmount(order.gift_card_total)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-white/60">
          <span>هزینه ارسال</span>
          <span>{getAmount(order.shipping_total)}</span>
        </div>
        <div className="flex items-center justify-between text-white/60">
          <span>مالیات</span>
          <span>{getAmount(order.tax_total)}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm font-bold text-white/70">مبلغ کل</span>
        <span className="text-lg font-black text-purple-300">{getAmount(order.total)}</span>
      </div>
    </div>
  )
}

export default OrderSummary
