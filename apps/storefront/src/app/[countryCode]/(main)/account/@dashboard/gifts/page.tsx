import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listOrders } from "@lib/data/orders"
import { classifyOrderItems } from "@lib/util/dashboard"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { GiftIcon } from "@modules/account/icons"

export const metadata: Metadata = {
  title: "کدها و گیفت‌ها | گیمینت",
  description: "گیفت کارت‌ها و کدهای خریداری‌شده شما در گیمینت.",
}

export default async function MyGifts() {
  const orders = await listOrders(100, 0).catch(() => null)

  if (!orders) {
    notFound()
  }

  const { gifts } = classifyOrderItems(orders)

  return (
    <div dir="rtl" className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">کدها و گیفت‌ها</h1>
        <p className="mt-1.5 text-sm text-white/45">گیفت کارت‌هایی که از گیمینت خریدی.</p>
      </div>

      {gifts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
          <p className="text-sm text-white/40">هنوز گیفت کارتی نخریدی.</p>
          <LocalizedClientLink
            href="/gift-cards"
            className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
          >
            مشاهده گیفت کارت‌ها
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {gifts.map(({ order, item }) => (
            <LocalizedClientLink
              key={item.id}
              href={`/account/orders/details/${order.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-4 transition hover:border-purple-400/30"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
                <GiftIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">{item.product_title || item.title}</p>
                <p className="mt-1 text-xs text-white/40">
                  {new Date(order.created_at).toLocaleDateString("fa-IR")} · سفارش #{order.display_id}
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold text-white/70">
                {convertToLocale({ amount: item.unit_price * item.quantity, currency_code: order.currency_code })}
              </span>
            </LocalizedClientLink>
          ))}
        </div>
      )}
    </div>
  )
}
