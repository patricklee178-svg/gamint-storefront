import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const method = order.shipping_methods?.[0] as { name?: string; total?: number } | undefined

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <h2 className="mb-4 text-sm font-bold text-white">اطلاعات ارسال</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div data-testid="shipping-address-summary">
          <p className="mb-1 text-xs font-bold text-white/70">آدرس تحویل</p>
          <p className="text-xs text-white/45">
            {order.shipping_address?.first_name} {order.shipping_address?.last_name}
          </p>
          <p className="text-xs text-white/45">
            {order.shipping_address?.address_1} {order.shipping_address?.address_2}
          </p>
          <p className="text-xs text-white/45">
            {order.shipping_address?.postal_code}
            {order.shipping_address?.postal_code && ", "}
            {order.shipping_address?.city}
          </p>
        </div>

        <div data-testid="shipping-contact-summary">
          <p className="mb-1 text-xs font-bold text-white/70">تماس</p>
          <p className="text-xs text-white/45" dir="ltr">
            {order.shipping_address?.phone}
          </p>
          <p className="text-xs text-white/45">{order.email}</p>
        </div>

        <div data-testid="shipping-method-summary">
          <p className="mb-1 text-xs font-bold text-white/70">روش تحویل</p>
          <p className="text-xs text-white/45">
            {method?.name} (
            {convertToLocale({
              amount: method?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
