"use client"

import { useState, useTransition } from "react"
import { HttpTypes } from "@medusajs/types"
import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { TagIcon, TrashIcon } from "@modules/cart/icons"

const DiscountForm = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const promotions = cart.promotions || []

  const handleApply = () => {
    if (!code.trim()) return
    setError(null)

    const codes = [...promotions.map((p) => p.code).filter(Boolean), code.trim()] as string[]

    startTransition(async () => {
      try {
        await applyPromotions(codes)
        setCode("")
      } catch (e) {
        setError(e instanceof Error ? e.message : "کد تخفیف نامعتبر است.")
      }
    })
  }

  const handleRemove = (removeCode: string) => {
    const codes = promotions
      .map((p) => p.code)
      .filter((c): c is string => !!c && c !== removeCode)

    startTransition(async () => {
      await applyPromotions(codes)
    })
  }

  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-sm font-bold text-white">
        <TagIcon className="h-4 w-4 text-purple-300" />
        کد تخفیف دارید؟
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder="کد تخفیف خود را وارد کنید"
          className="h-11 w-full flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-400/50"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={isPending || !code.trim()}
          className="shrink-0 rounded-xl bg-purple-600 px-6 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
        >
          اعمال
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}

      {promotions.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2"
            >
              <span className="text-xs font-bold text-emerald-300">
                {promotion.code}
                {promotion.application_method?.type === "percentage" &&
                  ` (${promotion.application_method.value}%)`}
                {promotion.application_method?.type !== "percentage" &&
                  promotion.application_method?.value !== undefined &&
                  ` (${convertToLocale({
                    amount: +promotion.application_method.value,
                    currency_code: promotion.application_method.currency_code || cart.currency_code,
                  })})`}
              </span>
              {!promotion.is_automatic && (
                <button
                  type="button"
                  onClick={() => promotion.code && handleRemove(promotion.code)}
                  className="text-emerald-300/60 transition hover:text-rose-400"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscountForm
