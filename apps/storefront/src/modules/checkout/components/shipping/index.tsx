"use client"
import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import { CheckIcon } from "@modules/cart/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({ cart, availableShippingMethods }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)

  const [showPickupOptions, setShowPickupOptions] = useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) =>
      (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string } } })
        .service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) =>
      (sm as unknown as { service_zone?: { fulfillment_set?: { type?: string } } })
        .service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => {
              if (p.value?.id) {
                pricesMap[p.value.id] = p.value.amount ?? 0
              }
            })

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    } else {
      setIsLoadingPrices(false)
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (id: string, variant: "shipping" | "pickup") => {
    setError(null)
    setShowPickupOptions(variant === "pickup" ? PICKUP_OPTION_ON : PICKUP_OPTION_OFF)

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2
          className={`flex items-center gap-2 text-sm font-bold text-white ${
            !isOpen && cart.shipping_methods?.length === 0 ? "opacity-40" : ""
          }`}
        >
          روش تحویل
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
          )}
        </h2>
        {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
          <button
            onClick={handleEdit}
            className="text-xs font-bold text-purple-400 transition hover:text-purple-300"
            data-testid="edit-delivery-button"
          >
            ویرایش
          </button>
        )}
      </div>

      {isOpen ? (
        <>
          <div data-testid="delivery-options-container">
            {hasPickupOptions && (
              <RadioGroup
                value={showPickupOptions}
                onChange={(_value) => {
                  const id = _pickupMethods.find((option) => !option.insufficient_inventory)?.id
                  if (id) handleSetShippingMethod(id, "pickup")
                }}
                className="mb-2"
              >
                <Radio
                  value={PICKUP_OPTION_ON}
                  data-testid="delivery-option-radio"
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition ${
                    showPickupOptions === PICKUP_OPTION_ON
                      ? "border-purple-400/50 bg-purple-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioDot checked={showPickupOptions === PICKUP_OPTION_ON} />
                    <span className="text-white">دریافت حضوری</span>
                  </div>
                  <span className="text-white/40">—</span>
                </Radio>
              </RadioGroup>
            )}

            <RadioGroup
              value={shippingMethodId}
              onChange={(v) => v && handleSetShippingMethod(v, "shipping")}
              className="flex flex-col gap-2"
            >
              {_shippingMethods?.map((option) => {
                const isDisabled =
                  option.price_type === "calculated" &&
                  !isLoadingPrices &&
                  typeof calculatedPricesMap[option.id] !== "number"

                return (
                  <Radio
                    key={option.id}
                    value={option.id}
                    disabled={isDisabled}
                    data-testid="delivery-option-radio"
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition ${
                      option.id === shippingMethodId
                        ? "border-purple-400/50 bg-purple-500/10"
                        : "border-white/10 hover:border-white/20"
                    } ${isDisabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioDot checked={option.id === shippingMethodId} />
                      <span className="text-white">{option.name}</span>
                    </div>
                    <span className="font-bold text-white/70">
                      {option.price_type === "flat"
                        ? convertToLocale({ amount: option.amount!, currency_code: cart?.currency_code })
                        : calculatedPricesMap[option.id]
                        ? convertToLocale({
                            amount: calculatedPricesMap[option.id],
                            currency_code: cart?.currency_code,
                          })
                        : isLoadingPrices
                        ? "..."
                        : "—"}
                    </span>
                  </Radio>
                )
              })}
            </RadioGroup>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="mt-4" data-testid="delivery-options-container">
              <p className="mb-2 text-xs font-bold text-white/60">انتخاب شعبه</p>
              <RadioGroup
                value={shippingMethodId}
                onChange={(v) => v && handleSetShippingMethod(v, "pickup")}
                className="flex flex-col gap-2"
              >
                {_pickupMethods?.map((option) => (
                  <Radio
                    key={option.id}
                    value={option.id}
                    disabled={option.insufficient_inventory}
                    data-testid="delivery-option-radio"
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 text-sm transition ${
                      option.id === shippingMethodId
                        ? "border-purple-400/50 bg-purple-500/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioDot checked={option.id === shippingMethodId} />
                      <span className="text-white">{option.name}</span>
                    </div>
                    <span className="font-bold text-white/70">
                      {convertToLocale({ amount: option.amount!, currency_code: cart?.currency_code })}
                    </span>
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          )}

          <ErrorMessage error={error} data-testid="delivery-option-error-message" />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !cart.shipping_methods?.[0]}
            className="mt-5 h-11 rounded-xl bg-purple-600 px-8 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
            data-testid="submit-delivery-option-button"
          >
            {isLoading ? "..." : "ادامه به پرداخت"}
          </button>
        </>
      ) : (
        (cart.shipping_methods?.length ?? 0) > 0 && (
          <div className="text-xs text-white/45">
            {cart.shipping_methods!.at(-1)!.name}{" "}
            {convertToLocale({
              amount: cart.shipping_methods!.at(-1)!.amount!,
              currency_code: cart?.currency_code,
            })}
          </div>
        )
      )}
    </div>
  )
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

export default Shipping
