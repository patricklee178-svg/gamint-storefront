import { Radio as RadioGroupOption } from "@headlessui/react"
import React, { useContext, type JSX } from "react"

import { isManual } from "@lib/constants"
import SkeletonCardDetails from "@modules/skeletons/components/skeleton-card-details"
import { PaymentElement } from "@stripe/react-stripe-js"
import PaymentTest from "../payment-test"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"

type PaymentContainerProps = {
  paymentProviderId: string
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  children?: React.ReactNode
}

const RadioDot = ({ checked }: { checked: boolean }) => (
  <span
    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
      checked ? "border-purple-400" : "border-white/25"
    }`}
  >
    {checked && <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />}
  </span>
)

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isSelected = selectedPaymentOptionId === paymentProviderId

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={`mb-2 flex cursor-pointer flex-col gap-2 rounded-xl border px-4 py-3.5 text-sm transition ${
        isSelected ? "border-purple-400/50 bg-purple-500/10" : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RadioDot checked={isSelected} />
          <span className="text-white">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </span>
        </div>
        <span className="text-purple-300">{paymentInfoMap[paymentProviderId]?.icon}</span>
      </div>
      {isManual(paymentProviderId) && <PaymentTest />}
      {children}
    </RadioGroupOption>
  )
}

export default PaymentContainer

export const StripePaymentContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setError,
  setPaymentComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setError: (error: string | null) => void
  setPaymentComplete: (complete: boolean) => void
}) => {
  const stripeReady = useContext(StripeContext)

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="my-3 transition-all duration-150 ease-in-out">
            <p className="mb-2 text-xs font-bold text-white/60">اطلاعات پرداخت را وارد کنید:</p>
            <PaymentElement
              options={{ layout: "accordion" }}
              onChange={(e) => {
                setError(null)
                setPaymentComplete(e.complete)
              }}
              onLoadError={(e) => {
                setPaymentComplete(false)
                setError(e.error?.message ?? "درگاه پرداخت بارگذاری نشد.")
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  )
}
