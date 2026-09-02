"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { deleteLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import QuantityStepper from "@modules/cart/components/quantity-stepper"
import { TrashIcon, BoltIcon } from "@modules/cart/icons"

type OptionEntry = {
  option?: { title?: string }
  value?: string
}

const CartItemRow = ({
  item,
  currencyCode,
}: {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
}) => {
  const [removing, setRemoving] = useState(false)

  const handleRemove = async () => {
    setRemoving(true)
    await deleteLineItem(item.id).catch(() => setRemoving(false))
  }

  const options = ((item.variant?.options as OptionEntry[] | undefined) || []).filter(
    (o) => o.option?.title && o.value
  )

  return (
    <div
      className={`flex items-start gap-4 border-b border-white/[0.06] py-5 last:border-0 transition ${
        removing ? "pointer-events-none opacity-40" : ""
      }`}
      data-testid="product-row"
    >
      <div className="flex shrink-0 flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          title="حذف از سبد خرید"
          className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/40 transition hover:border-rose-400/40 hover:text-rose-400"
          data-testid="product-delete-button"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="text-xs font-bold text-white/70">
            {convertToLocale({ amount: item.unit_price ?? 0, currency_code: currencyCode })}
          </p>
          <p className="text-[10px] text-white/30">قیمت واحد</p>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          data-testid="product-link"
          className="text-sm font-bold text-white hover:text-purple-300"
        >
          {item.product_title || item.title}
        </LocalizedClientLink>

        {options.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {options.map((o, i) => (
              <span
                key={i}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-white/60"
              >
                {o.option?.title} {o.value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300/80">
          <BoltIcon className="h-3 w-3" />
          تحویل آنی پس از پرداخت
        </div>
      </div>

      <div className="shrink-0">
        <p className="mb-1.5 text-center text-[10px] text-white/30">تعداد</p>
        <QuantityStepper lineId={item.id} quantity={item.quantity} />
      </div>

      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/[0.06]"
      >
        {item.thumbnail && (
          <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
        )}
      </LocalizedClientLink>
    </div>
  )
}

export default CartItemRow
