"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

import { toggleWishlistItem } from "@lib/data/customer"
import { HeartIcon } from "@modules/account/icons"

type Props = {
  productId: string
  initialWishlisted: boolean
  isAuthenticated: boolean
  className?: string
  label?: string
}

const WishlistButton = ({
  productId,
  initialWishlisted,
  isAuthenticated,
  className,
  label,
}: Props) => {
  const [wishlisted, setWishlisted] = useState(initialWishlisted)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const countryCode = useParams().countryCode as string

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push(`/${countryCode}/account`)
      return
    }

    setWishlisted((prev) => !prev)
    startTransition(async () => {
      const res = await toggleWishlistItem(productId)
      if (res.success && typeof res.wishlisted === "boolean") {
        setWishlisted(res.wishlisted)
      }
    })
  }

  if (label) {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={wishlisted}
        className={`flex items-center gap-1.5 text-xs font-semibold transition ${
          wishlisted ? "text-purple-300" : "text-white/45 hover:text-white"
        }`}
      >
        <HeartIcon className="h-4 w-4" filled={wishlisted} />
        {wishlisted ? "در علاقه‌مندی‌ها" : label}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={wishlisted}
      title={wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={
        className ||
        `grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition ${
          wishlisted
            ? "border-purple-400/40 bg-purple-500/15 text-purple-300"
            : "border-white/15 bg-white/[0.03] text-white/40 hover:text-white/70"
        }`
      }
    >
      <HeartIcon className="h-[18px] w-[18px]" filled={wishlisted} />
    </button>
  )
}

export default WishlistButton
