import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import ReleaseCountdown from "@modules/products/components/countdown"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { BoltIcon, ShieldCheckIcon, HeadsetIcon } from "@modules/cart/icons"
import { GiftIcon } from "@modules/account/icons"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const features = [
  { icon: ShieldCheckIcon, title: "تجربه محافظت‌شده", text: "خرید امن و بدون ریسک" },
  { icon: BoltIcon, title: "ضمانت فعال‌سازی", text: "فعال‌سازی تضمینی" },
  { icon: HeadsetIcon, title: "پشتیبانی ۲۴/۷", text: "همیشه در دسترس" },
  { icon: GiftIcon, title: "تحویل در زمان انتشار", text: "بدون تأخیر" },
]

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const categories = product.categories || []
  const isPreorder = categories.some((c) => c.handle === "preorders")
  const platform = (product.metadata?.platform as string | undefined) || product.variants?.[0]?.title || "PS5"
  const releaseDate = product.metadata?.release_date as string | undefined

  const badges = [
    { label: platform, tone: "purple" as const },
    ...(isPreorder ? [{ label: "پیش‌فروش", tone: "emerald" as const }] : []),
  ]

  return (
    <div dir="rtl" className="min-h-screen bg-[#05070b] py-6 text-white">
      <div className="content-container">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <LocalizedClientLink href="/" className="hover:text-white">صفحه اصلی</LocalizedClientLink>
          <span>&lt;</span>
          <LocalizedClientLink href="/categories/games" className="hover:text-white">بازی‌ها</LocalizedClientLink>
          <span>&lt;</span>
          <span className="font-bold text-white">{product.title}</span>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]" data-testid="product-container">
          <div className="min-w-0">
            <ProductInfo product={product} />

            <div className="mt-5">
              <Suspense fallback={<ProductActions disabled product={product} region={region} />}>
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>

          <div className="order-first lg:order-none">
            <ImageGallery images={images} badges={badges} />
          </div>
        </div>

        {isPreorder && (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {releaseDate ? (
              <ReleaseCountdown targetDate={releaseDate} />
            ) : (
              <div className="grid place-items-center rounded-2xl border border-white/10 bg-[#0a0d14] p-5 text-center">
                <p className="text-sm font-bold text-white">تاریخ انتشار به‌زودی اعلام می‌شود</p>
                <p className="mt-1 text-xs text-white/40">به محض اعلام تاریخ رسمی، اینجا بروزرسانی می‌شه.</p>
              </div>
            )}
            <div className="rounded-2xl border border-purple-400/15 bg-gradient-to-br from-purple-500/10 to-transparent p-5">
              <p className="text-sm font-bold text-white">پیش‌خرید؛ بهترین انتخاب</p>
              <p className="mt-1 text-xs leading-6 text-white/45">
                با پیش‌خرید در گیمینت، بازی رو در اسرع وقت پس از انتشار رسمی و بدون نگرانی از موجودی دریافت می‌کنی.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
              <p className="text-sm font-bold text-white">بونوس‌های احتمالی</p>
              <p className="mt-1 text-xs leading-6 text-white/45">
                در صورت اعلام محتوای پیش‌خرید ویژه از سمت ناشر، برای مشتریان گیمینت هم اعمال می‌شه.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ProductTabs product={product} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 sm:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-1.5 text-center">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-purple-300">
                <f.icon className="h-4 w-4" />
              </span>
              <span className="text-[11px] font-bold text-white">{f.title}</span>
              <span className="text-[10px] text-white/35">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="content-container mt-12" data-testid="related-products-container">
        <RelatedProducts product={product} countryCode={countryCode} />
      </div>
    </div>
  )
}

export default ProductTemplate
