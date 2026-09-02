import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  // Intl has no widely-supported symbol for IRR and falls back to printing
  // the ISO code ("IRR 690,000"); this store prices and labels everything
  // in تومان (Toman), so format it to match instead.
  if (currency_code.toLowerCase() === "irr") {
    return `${amount.toLocaleString("fa-IR")} تومان`
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency_code,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
