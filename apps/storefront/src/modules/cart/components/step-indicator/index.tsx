import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CartOutlineIcon } from "@modules/cart/icons"

const steps = [
  { key: "cart", label: "سبد خرید" },
  { key: "address", label: "اطلاعات سفارش" },
  { key: "payment", label: "پرداخت" },
  { key: "review", label: "تأیید و تکمیل" },
]

export const CartBreadcrumb = () => (
  <div className="flex items-center gap-2 text-xs text-white/40">
    <CartOutlineIcon className="h-3.5 w-3.5" />
    <LocalizedClientLink href="/cart" className="font-bold text-white">
      سبد خرید
    </LocalizedClientLink>
    <span>&lt;</span>
    <span>پرداخت</span>
    <span>&lt;</span>
    <span>تأیید و تکمیل</span>
  </div>
)

export const StepIndicator = ({ current = "cart" }: { current?: string }) => {
  const currentIndex = steps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      {steps.map((step, i) => {
        const isActive = i === currentIndex
        const isDone = i < currentIndex

        return (
          <div key={step.key} className="flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-center gap-2">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-black transition ${
                  isActive
                    ? "border-purple-400 bg-purple-600 text-white shadow-[0_0_0_5px_rgba(168,85,247,.15)]"
                    : isDone
                    ? "border-purple-400/40 bg-purple-500/10 text-purple-300"
                    : "border-white/15 text-white/35"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-white/40"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={`h-px w-8 sm:w-16 ${isDone ? "bg-purple-400/50" : "bg-white/10"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
