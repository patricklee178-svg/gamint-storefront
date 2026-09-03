"use client"

import { Plus } from "@medusajs/icons"
import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

import { addCustomerAddress } from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"

const SaveButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      data-testid="save-button"
      className="h-10 rounded-xl bg-purple-600 px-6 text-xs font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
    >
      {pending ? "در حال ذخیره..." : "ذخیره"}
    </button>
  )
}

const AddAddress = ({
  region,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="flex h-full min-h-[220px] w-full flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-[#0a0d14] p-5 text-white/70 transition hover:border-purple-400/40 hover:text-white"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-sm font-bold">آدرس جدید</span>
        <Plus />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <span className="mb-2 text-lg font-bold text-white">افزودن آدرس</span>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex w-full flex-col gap-y-3">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="نام"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="نام خانوادگی"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="شرکت (اختیاری)"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="آدرس"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="واحد، پلاک و... (اختیاری)"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="کد پستی"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="شهر"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label="استان (اختیاری)"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="شماره موبایل (اختیاری)"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="py-2 text-xs font-semibold text-rose-400"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="mt-6 flex gap-3">
              <button
                type="reset"
                onClick={close}
                className="h-10 rounded-xl border border-white/15 px-6 text-xs font-bold text-white/70 transition hover:border-white/30 hover:text-white"
                data-testid="cancel-button"
              >
                انصراف
              </button>
              <SaveButton />
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
