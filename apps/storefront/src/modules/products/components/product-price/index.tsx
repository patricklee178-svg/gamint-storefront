import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse rounded-lg bg-white/[0.06]" />
  }

  return (
    <div className="flex flex-col">
      <span
        className={`text-2xl font-black ${
          selectedPrice.price_type === "sale" ? "text-purple-300" : "text-white"
        }`}
      >
        {!variant && <span className="ml-1 text-sm font-normal text-white/40">از</span>}
        <span data-testid="product-price" data-value={selectedPrice.calculated_price_number}>
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-white/35 line-through" data-testid="original-product-price">
            {selectedPrice.original_price}
          </span>
          <span className="rounded-md bg-rose-500/15 px-1.5 py-0.5 text-[11px] font-bold text-rose-400">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  )
}
