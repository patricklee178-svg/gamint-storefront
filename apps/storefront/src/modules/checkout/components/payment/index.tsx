"use client"
import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, { StripePaymentContainer } from "@modules/checkout/components/payment-container"
import { CheckIcon } from "@modules/cart/icons"
import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart
  availablePaymentMethods: { id: string }[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, { provider_id: method })
    }
  }

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 &&
    cart?.total === 0
  )

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), { scroll: false })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputPaymentDetails = isStripeLike(selectedPaymentMethod) && !activeSession
      const checkActiveSession = activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, { provider_id: selectedPaymentMethod })
      }

      if (!shouldInputPaymentDetails) {
        return router.push(pathname + "?" + createQueryString("step", "review"), { scroll: false })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className={`flex items-center gap-2 text-sm font-bold text-white ${!isOpen && !paymentReady ? "opacity-40" : ""}`}>
          پرداخت
          {!isOpen && paymentReady && (
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
          )}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-purple-400 transition hover:text-purple-300"
            data-testid="edit-payment-button"
          >
            ویرایش
          </button>
        )}
      </div>

      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <RadioGroup value={selectedPaymentMethod} onChange={(value: string) => setPaymentMethod(value)}>
              {availablePaymentMethods.map((paymentMethod) => (
                <div key={paymentMethod.id}>
                  {isStripeLike(paymentMethod.id) ? (
                    <StripePaymentContainer
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                      paymentInfoMap={paymentInfoMap}
                      setError={setError}
                      setPaymentComplete={setPaymentComplete}
                    />
                  ) : (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentProviderId={paymentMethod.id}
                      selectedPaymentOptionId={selectedPaymentMethod}
                    />
                  )}
                </div>
              ))}
            </RadioGroup>
          )}

          {paidByGiftcard && (
            <div>
              <p className="mb-1 text-xs font-bold text-white/70">روش پرداخت</p>
              <p className="text-xs text-white/45" data-testid="payment-method-summary">
                گیفت کارت
              </p>
            </div>
          )}

          <ErrorMessage error={error} data-testid="payment-method-error-message" />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              (isStripeLike(selectedPaymentMethod) && !paymentComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            className="mt-5 h-11 rounded-xl bg-purple-600 px-8 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
            data-testid="submit-payment-button"
          >
            {isLoading ? "..." : !activeSession && isStripeLike(selectedPaymentMethod) ? "وارد کردن اطلاعات پرداخت" : "ادامه به تأیید نهایی"}
          </button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <p className="text-xs text-white/45" data-testid="payment-method-summary">
              {paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id}
            </p>
          ) : paidByGiftcard ? (
            <p className="text-xs text-white/45" data-testid="payment-method-summary">
              گیفت کارت
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
