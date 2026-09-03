import { forwardRef, useMemo } from "react"

import CheckoutSelect from "@modules/checkout/components/checkout-select"
import { HttpTypes } from "@medusajs/types"

type CountrySelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  region?: HttpTypes.StoreRegion
}

const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  ({ region, ...props }, ref) => {
    const countryOptions = useMemo(() => {
      if (!region) {
        return []
      }

      return region.countries?.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
    }, [region])

    return (
      <CheckoutSelect ref={ref} label="کشور" placeholder="کشور" {...props}>
        {countryOptions?.map(({ value, label }, index) => (
          <option key={index} value={value} className="bg-[#0a0d14]">
            {label}
          </option>
        ))}
      </CheckoutSelect>
    )
  }
)

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
