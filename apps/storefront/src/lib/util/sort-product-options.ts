import { HttpTypes } from "@medusajs/types"

const OPTION_ORDER = ["نسخه", "پلتفرم", "ظرفیت"]

// Medusa doesn't guarantee product.options ordering, so we sort explicitly —
// otherwise platform/capacity selectors swap positions between products.
export const sortProductOptions = (
  options: HttpTypes.StoreProduct["options"]
) =>
  (options || []).slice().sort((a, b) => {
    const ai = OPTION_ORDER.indexOf(a.title ?? "")
    const bi = OPTION_ORDER.indexOf(b.title ?? "")
    return (ai === -1 ? OPTION_ORDER.length : ai) - (bi === -1 ? OPTION_ORDER.length : bi)
  })
