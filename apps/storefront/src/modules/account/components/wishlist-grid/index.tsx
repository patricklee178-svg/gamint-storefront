"use client"

import { useState, useTransition } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { toggleWishlistItem } from "@lib/data/customer"
import { HeartIcon } from "@modules/account/icons"

type WishlistItem = {
  productId: string
  title: string
  platform: string
  price: string
  image: string
  handle?: string
}

const WishlistGrid = ({ items }: { items: WishlistItem[] }) => {
  const [list, setList] = useState(items)
  const [, startTransition] = useTransition()

  const handleRemove = (productId: string) => {
    setList((prev) => prev.filter((i) => i.productId !== productId))
    startTransition(() => {
      toggleWishlistItem(productId)
    })
  }

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
        <p className="text-sm text-white/40">علاقه‌مندی‌هات خالیه.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {list.map((item) => (
        <article
          key={item.productId}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-[0_16px_50px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
        >
          <button
            type="button"
            onClick={() => handleRemove(item.productId)}
            title="حذف از علاقه‌مندی‌ها"
            className="absolute left-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/60 text-purple-300 backdrop-blur transition hover:text-rose-400"
          >
            <HeartIcon className="h-4 w-4" filled />
          </button>
          <LocalizedClientLink href={item.handle ? `/products/${item.handle}` : "/store"} className="block">
            <div className="relative aspect-video overflow-hidden bg-[#111827]">
              {item.image && (
                <>
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-40 blur-xl"
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain transition duration-300"
                  />
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-transparent" />
            </div>
            <div className="p-3.5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 text-[13px] font-bold text-white">{item.title}</h3>
                <span className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-bold text-gray-300">
                  {item.platform}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-100">
                <span className="text-[11px] text-gray-500">از </span>
                {item.price} <span className="text-[10px] text-gray-400">تومان</span>
              </p>
            </div>
          </LocalizedClientLink>
        </article>
      ))}
    </div>
  )
}

export default WishlistGrid
