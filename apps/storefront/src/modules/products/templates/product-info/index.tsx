import { HttpTypes } from "@medusajs/types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const genres = (product.categories || []).filter((c) => c.handle?.startsWith("genre-"))

  return (
    <div id="product-info" className="flex flex-col gap-y-3">
      <h1 className="text-2xl font-black text-white sm:text-3xl" data-testid="product-title">
        {product.title}
      </h1>

      {product.subtitle && <p className="text-sm text-white/50">{product.subtitle}</p>}

      {genres.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {genres.map((g) => (
            <span
              key={g.id}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-white/60"
            >
              {g.name}
            </span>
          ))}
        </div>
      )}

      {product.description && (
        <p
          className="whitespace-pre-line text-sm leading-7 text-white/50"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
