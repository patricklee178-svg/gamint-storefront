"use client"

import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { clx } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import React, { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

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

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
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

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "flex h-full min-h-[220px] w-full flex-col justify-between rounded-2xl border border-white/10 bg-[#0a0d14] p-5 transition-colors",
          {
            "border-purple-400/40": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white" data-testid="address-name">
            {address.first_name} {address.last_name}
          </span>
          {address.company && (
            <span className="mt-1 text-xs text-white/45" data-testid="address-company">
              {address.company}
            </span>
          )}
          <div className="mt-2 flex flex-col gap-0.5 text-xs text-white/45">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="flex items-center gap-x-1.5 text-xs font-bold text-white/60 transition hover:text-white"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            ویرایش
          </button>
          <button
            className="flex items-center gap-x-1.5 text-xs font-bold text-white/60 transition hover:text-rose-400"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            حذف
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <span className="mb-2 text-lg font-bold text-white">ویرایش آدرس</span>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid w-full grid-cols-1 gap-y-3">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="نام"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
                <Input
                  label="نام خانوادگی"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="شرکت (اختیاری)"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label="آدرس"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label="واحد، پلاک و... (اختیاری)"
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="کد پستی"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="شهر"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label="استان (اختیاری)"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label="شماره موبایل (اختیاری)"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="py-2 text-xs font-semibold text-rose-400">
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

export default EditAddress
