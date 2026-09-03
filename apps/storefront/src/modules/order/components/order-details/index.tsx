import { HttpTypes } from "@medusajs/types"
import { orderStatusBadge } from "@lib/util/dashboard"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const toneClasses: Record<string, string> = {
  success: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-400/25 bg-amber-500/10 text-amber-300",
  danger: "border-rose-400/25 bg-rose-500/10 text-rose-300",
  neutral: "border-white/15 bg-white/[0.05] text-white/50",
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const badge = orderStatusBadge(order)

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#150b26] via-[#0c1018] to-[#05070b] p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-white/40">شماره سفارش</p>
          <p className="mt-1 text-lg font-black text-purple-300" data-testid="order-id">
            #{order.display_id.toLocaleString("fa-IR")}
          </p>
        </div>
        {showStatus && (
          <span
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${toneClasses[badge.tone]}`}
            data-testid="order-status"
          >
            {badge.label}
          </span>
        )}
      </div>
      <p className="mt-4 text-xs text-white/45" data-testid="order-date">
        تاریخ ثبت: {new Date(order.created_at).toLocaleDateString("fa-IR")}
      </p>
      <p className="mt-1 text-xs text-white/45">
        جزئیات سفارش برای{" "}
        <span className="font-bold text-white" data-testid="order-email">
          {order.email}
        </span>{" "}
        ارسال شد.
      </p>
    </div>
  )
}

export default OrderDetails
