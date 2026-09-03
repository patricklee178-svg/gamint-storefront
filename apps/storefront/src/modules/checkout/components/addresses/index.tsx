"use client"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { CheckIcon } from "@modules/cart/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction, isPending] = useActionState(setAddresses, null)

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold text-white">
          اطلاعات سفارش
          {!isOpen && (
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-purple-400 transition hover:text-purple-300"
            data-testid="edit-address-button"
          >
            ویرایش
          </button>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <ShippingAddress
            customer={customer}
            checked={sameAsBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsBilling && (
            <div className="mt-6">
              <h3 className="mb-4 text-sm font-bold text-white">آدرس صورت‌حساب</h3>
              <BillingAddress cart={cart} />
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 h-11 rounded-xl bg-purple-600 px-8 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-60"
            data-testid="submit-address-button"
          >
            {isPending ? "..." : "ادامه به روش تحویل"}
          </button>
          <ErrorMessage error={message} data-testid="address-error-message" />
        </form>
      ) : (
        <div className="text-sm">
          {cart && cart.shipping_address ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div data-testid="shipping-address-summary">
                <p className="mb-1 text-xs font-bold text-white/70">آدرس تحویل</p>
                <p className="text-xs text-white/45">
                  {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                </p>
                <p className="text-xs text-white/45">
                  {cart.shipping_address.address_1} {cart.shipping_address.address_2}
                </p>
                <p className="text-xs text-white/45">
                  {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                </p>
              </div>

              <div data-testid="shipping-contact-summary">
                <p className="mb-1 text-xs font-bold text-white/70">تماس</p>
                <p className="text-xs text-white/45" dir="ltr">
                  {cart.shipping_address.phone}
                </p>
                <p className="text-xs text-white/45">{cart.email}</p>
              </div>

              <div data-testid="billing-address-summary">
                <p className="mb-1 text-xs font-bold text-white/70">آدرس صورت‌حساب</p>
                {sameAsBilling ? (
                  <p className="text-xs text-white/45">مثل آدرس تحویل</p>
                ) : (
                  <>
                    <p className="text-xs text-white/45">
                      {cart.billing_address?.first_name} {cart.billing_address?.last_name}
                    </p>
                    <p className="text-xs text-white/45">
                      {cart.billing_address?.address_1} {cart.billing_address?.address_2}
                    </p>
                    <p className="text-xs text-white/45">
                      {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-white/35">در حال بارگذاری...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Addresses
