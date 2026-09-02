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
      className={`flex flex-col gap-3 border-b border-white/[0.06] py-5 last:border-0 transition sm:flex-row sm:items-start sm:gap-4 ${
        removing ? "pointer-events-none opacity-40" : ""
      }`}
      data-testid="product-row"
    >
      <div className="flex items-center gap-3 sm:contents">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="order-2 h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/[0.06] sm:order-4 sm:h-20 sm:w-20"
        >
          {item.thumbnail && (
            <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
          )}
        </LocalizedClientLink>

        <div className="order-1 min-w-0 flex-1 sm:order-2">
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
      </div>

      <div className="flex items-center justify-between gap-3 sm:contents">
        <div className="flex shrink-0 items-center gap-2 sm:order-1 sm:flex-col">
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
          <div className="text-right sm:text-center">
            <p className="text-xs font-bold text-white/70">
              {convertToLocale({ amount: item.unit_price ?? 0, currency_code: currencyCode })}
            </p>
            <p className="text-[10px] text-white/30">قیمت واحد</p>
          </div>
        </div>

        <div className="shrink-0 sm:order-3">
          <p className="mb-1.5 hidden text-center text-[10px] text-white/30 sm:block">تعداد</p>
          <QuantityStepper lineId={item.id} quantity={item.quantity} />
        </div>
      </div>
    </div>
  )
}

export default CartItemRow
