import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { StepIndicator } from "@modules/cart/components/step-indicator"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CartOutlineIcon } from "@modules/cart/icons"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "تسویه حساب | گیمینت",
}

const stepKeyMap: Record<string, string> = {
  address: "address",
  delivery: "address",
  payment: "payment",
  review: "review",
}

export default async function Checkout(props: {
  searchParams: Promise<{ step?: string }>
}) {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()
  const searchParams = await props.searchParams
  const currentStep = stepKeyMap[searchParams.step || ""] || "address"

  return (
    <div className="content-container py-8">
      <div className="mb-6 flex items-center gap-2 text-xs text-white/40">
        <CartOutlineIcon className="h-3.5 w-3.5" />
        <LocalizedClientLink href="/cart" className="hover:text-white">
          سبد خرید
        </LocalizedClientLink>
        <span>&lt;</span>
        <span className="font-bold text-white">تسویه حساب</span>
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-[#0a0d14] py-6">
        <StepIndicator current={currentStep} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}
