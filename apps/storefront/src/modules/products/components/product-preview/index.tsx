import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CartIcon } from "@modules/marketing/components"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const thumbnail = product.thumbnail || product.images?.[0]?.url

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block min-w-0 overflow-hidden rounded-2xl border border-t-0 border-white/10 bg-[#0c1018] shadow-[0_16px_50px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_18px_55px_rgba(124,58,237,.16)]"
      data-testid="product-wrapper"
    >
      <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-[#111827] [transform:translateZ(0)]">
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-40 blur-xl"
            />
            <img
              src={thumbnail}
              alt={product.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain transition duration-300"
            />
          </>
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-gray-600">
            بدون تصویر
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-transparent" />
      </div>
      <div className="p-3.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3
            className="line-clamp-1 text-[13px] font-bold text-white"
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </div>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xs font-semibold text-gray-100" data-testid="price">
            {cheapestPrice && (
              <>
                <span className="text-[11px] text-gray-500">از </span>
                {cheapestPrice.calculated_price}
              </>
            )}
          </p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gray-950 transition group-hover:bg-purple-500 group-hover:text-white">
            <CartIcon />
          </span>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
