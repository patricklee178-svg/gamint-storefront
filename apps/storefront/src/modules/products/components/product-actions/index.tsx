"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import WishlistButton from "@modules/products/components/wishlist-button"
import ShareButton from "@modules/products/components/share-button"
import { CheckCircleIcon } from "@modules/account/icons"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  isAuthenticated?: boolean
  initialWishlisted?: boolean
}

const trustPoints = [
  "پیش‌فروش رسمی و مطمئن",
  "تحویل در زمان انتشار",
  "گارانتی فعال‌سازی و دسترسی",
  "پشتیبانی ۲۴/۷",
]

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  isAuthenticated = false,
  initialWishlisted = false,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const countryCode = useParams().countryCode as string

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  const canBuy =
    inStock && !!selectedVariant && !disabled && !isAdding && !isBuyingNow && !!isValidVariant

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null

    setIsBuyingNow(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    router.push(`/${countryCode}/checkout?step=address`)
  }

  return (
    <div
      className="flex flex-col gap-y-5 rounded-2xl border border-white/10 bg-[#0a0d14] p-5"
      ref={actionsRef}
    >
      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-4">
          {(product.options || []).map((option) => (
            <OptionSelect
              key={option.id}
              option={option}
              current={options[option.id]}
              updateOption={setOptionValue}
              title={option.title ?? ""}
              data-testid="product-options"
              disabled={!!disabled || isAdding}
            />
          ))}
        </div>
      )}

      <ProductPrice product={product} variant={selectedVariant} />

      <div className="flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          disabled={!canBuy}
          data-testid="add-product-button"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-purple-600 text-sm font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isAdding
            ? "در حال افزودن..."
            : !selectedVariant
            ? "انتخاب نسخه"
            : !inStock || !isValidVariant
            ? "ناموجود"
            : "افزودن به سبد خرید"}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={!canBuy}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-bold text-white/80 transition hover:border-purple-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isBuyingNow ? "در حال انتقال..." : "خرید سریع"}
        </button>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4">
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center gap-2 text-xs text-white/55">
            <CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {point}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
        <WishlistButton
          productId={product.id}
          initialWishlisted={initialWishlisted}
          isAuthenticated={isAuthenticated}
          label="افزودن به علاقه‌مندی‌ها"
        />
        <ShareButton title={product.title} />
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </div>
  )
}
