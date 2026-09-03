import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Thumbnail from "@modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" data-testid="product-row">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-white" data-testid="product-name">
          {item.product_title}
        </p>
        {item.variant?.title && (
          <p className="mt-0.5 truncate text-[11px] text-white/40" data-testid="product-variant">
            نسخه: {item.variant.title}
          </p>
        )}
        <p className="mt-0.5 text-[11px] text-white/40">
          <span data-testid="product-quantity">{item.quantity.toLocaleString("fa-IR")}</span> عدد ×{" "}
          {convertToLocale({ amount: item.unit_price ?? 0, currency_code: currencyCode })}
        </p>
      </div>
      <span className="shrink-0 text-xs font-bold text-white/70" data-testid="product-price">
        {convertToLocale({ amount: item.total ?? 0, currency_code: currencyCode })}
      </span>
    </div>
  )
}

export default Item
