import { Metadata } from "next"

import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { convertToLocale } from "@lib/util/money"
import { orderStatusBadge } from "@lib/util/dashboard"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PackageIcon } from "@modules/account/icons"

export const metadata: Metadata = {
  title: "سفارش‌های من | گیمینت",
  description: "مشاهده سفارش‌های شما در گیمینت.",
}

const toneClasses: Record<string, string> = {
  success: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-400/25 bg-amber-500/10 text-amber-300",
  danger: "border-rose-400/25 bg-rose-500/10 text-rose-300",
  neutral: "border-white/15 bg-white/[0.05] text-white/50",
}

export default async function Orders() {
  const orders = await listOrders(100, 0).catch(() => null)

  if (!orders) {
    notFound()
  }

  return (
    <div dir="rtl" className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">سفارش‌های من</h1>
        <p className="mt-1.5 text-sm text-white/45">تاریخچه کامل سفارش‌ها و وضعیت هرکدوم رو اینجا می‌بینی.</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
          <p className="text-sm text-white/40">هنوز سفارشی ثبت نکردی.</p>
          <LocalizedClientLink
            href="/categories/games"
            className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
          >
            شروع خرید
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const badge = orderStatusBadge(order)
            const items = order.items || []
            return (
              <LocalizedClientLink
                key={order.id}
                href={`/account/orders/details/${order.id}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-4 transition hover:border-purple-400/30"
              >
                <div className="flex -space-x-3 space-x-reverse">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 border-[#0a0d14] bg-white/[0.06]"
                    >
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-white/20">
                          <PackageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">
                    #{order.display_id} · {items[0]?.product_title || items[0]?.title}
                    {items.length > 1 && ` و ${(items.length - 1).toLocaleString("fa-IR")} مورد دیگر`}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {new Date(order.created_at).toLocaleDateString("fa-IR")} ·{" "}
                    {convertToLocale({ amount: order.total, currency_code: order.currency_code })}
                  </p>
                </div>

                <span className={`shrink-0 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${toneClasses[badge.tone]}`}>
                  {badge.label}
                </span>
              </LocalizedClientLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
