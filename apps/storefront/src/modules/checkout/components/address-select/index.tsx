import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useMemo } from "react"

import compareAddresses from "@lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={`h-4 w-4 text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => addressInput && compareAddresses(a, addressInput))
  }, [addresses, addressInput])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="relative flex h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 text-right text-sm text-white outline-none focus:border-purple-400/50"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="truncate">
                {selectedAddress ? selectedAddress.address_1 : "انتخاب یک آدرس"}
              </span>
              <ChevronIcon open={open} />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[#0c1018] p-1 text-sm outline-none"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => {
              const isSelected = selectedAddress?.id === address.id
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 transition ${
                    isSelected ? "bg-purple-500/15" : "hover:bg-white/[0.04]"
                  }`}
                  data-testid="shipping-address-option"
                >
                  <p className="text-sm font-bold text-white">
                    {address.first_name} {address.last_name}
                  </p>
                  {address.company && (
                    <p className="text-xs text-white/40">{address.company}</p>
                  )}
                  <p className="mt-1 text-xs text-white/50">
                    {address.address_1}
                    {address.address_2 && `, ${address.address_2}`}
                  </p>
                  <p className="text-xs text-white/50">
                    {address.postal_code}, {address.city}
                  </p>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
