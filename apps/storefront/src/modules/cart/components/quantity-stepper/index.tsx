"use client"

import { useState } from "react"
import { updateLineItem } from "@lib/data/cart"
import { MinusIcon, PlusIcon } from "@modules/cart/icons"

type Props = {
  lineId: string
  quantity: number
  maxQuantity?: number
}

const QuantityStepper = ({ lineId, quantity, maxQuantity = 10 }: Props) => {
  const [value, setValue] = useState(quantity)
  const [updating, setUpdating] = useState(false)

  const commit = async (next: number) => {
    if (next < 1 || next > maxQuantity || next === value) return
    setValue(next)
    setUpdating(true)
    await updateLineItem({ lineId, quantity: next }).catch(() => setValue(value))
    setUpdating(false)
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => commit(value + 1)}
        disabled={updating || value >= maxQuantity}
        className="grid h-8 w-8 place-items-center text-white/60 transition hover:text-white disabled:opacity-30"
        aria-label="افزایش تعداد"
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm font-bold text-white">
        {updating ? "…" : value.toLocaleString("fa-IR")}
      </span>
      <button
        type="button"
        onClick={() => commit(value - 1)}
        disabled={updating || value <= 1}
        className="grid h-8 w-8 place-items-center text-white/60 transition hover:text-white disabled:opacity-30"
        aria-label="کاهش تعداد"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default QuantityStepper
