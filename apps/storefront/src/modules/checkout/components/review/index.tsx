"use client"

import PaymentButton from "../payment-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSearchParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 &&
    cart?.total === 0
  )

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className={`rounded-2xl border border-white/10 bg-[#0a0d14] p-5 ${!isOpen ? "opacity-40" : ""}`}>
      <h2 className="mb-5 text-sm font-bold text-white">تأیید و تکمیل</h2>
      {isOpen && previousStepsCompleted && (
        <>
          <p className="mb-5 text-xs leading-6 text-white/45">
            با کلیک روی «ثبت نهایی سفارش»، شرایط استفاده و حریم خصوصی گیمینت رو می‌پذیری.{" "}
            <LocalizedClientLink href="/terms" className="text-purple-400 hover:text-purple-300">
              مشاهده شرایط استفاده
            </LocalizedClientLink>{" "}
            ·{" "}
            <LocalizedClientLink href="/privacy" className="text-purple-400 hover:text-purple-300">
              حریم خصوصی
            </LocalizedClientLink>
          </p>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
