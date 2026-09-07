import { HttpTypes } from "@medusajs/types"

const OPTION_ORDER = ["نسخه", "پلتفرم", "ظرفیت"]
const VALUE_ORDER = ["PS4", "PS5", "ظرفیت اول", "ظرفیت دوم", "ظرفیت سوم", "ظرفیت کامل"]

// Medusa doesn't guarantee product.options/values ordering, so we sort
// explicitly — otherwise the platform/capacity selectors swap positions
// between products.
export const sortProductOptions = (
  options: HttpTypes.StoreProduct["options"]
) =>
  (options || []).slice().sort((a, b) => {
    const ai = OPTION_ORDER.indexOf(a.title ?? "")
    const bi = OPTION_ORDER.indexOf(b.title ?? "")
    return (ai === -1 ? OPTION_ORDER.length : ai) - (bi === -1 ? OPTION_ORDER.length : bi)
  })

export const sortOptionValues = <T extends { value: string }>(values: T[] | null | undefined) =>
  (values || []).slice().sort((a, b) => {
    const ai = VALUE_ORDER.indexOf(a.value)
    const bi = VALUE_ORDER.indexOf(b.value)
    return (ai === -1 ? VALUE_ORDER.length : ai) - (bi === -1 ? VALUE_ORDER.length : bi)
  })
