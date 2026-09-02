import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listOrders } from "@lib/data/orders"
import { classifyOrderItems, orderItemToGame } from "@lib/util/dashboard"
import { GameCard } from "@modules/marketing/components"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "پیش‌فروش‌های من | گیمینت",
  description: "پیش‌فروش‌هایی که در گیمینت ثبت کرده‌اید.",
}

export default async function MyPreorders() {
  const orders = await listOrders(100, 0).catch(() => null)

  if (!orders) {
    notFound()
  }

  const { preorders } = classifyOrderItems(orders)

  return (
    <div dir="rtl" className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">پیش‌فروش‌های من</h1>
        <p className="mt-1.5 text-sm text-white/45">بازی‌هایی که پیش‌فروششون رو ثبت کردی.</p>
      </div>

      {preorders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
          <p className="text-sm text-white/40">هنوز پیش‌فروشی ثبت نکردی.</p>
          <LocalizedClientLink
            href="/preorders"
            className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
          >
            مشاهده پیش‌فروش‌ها
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {preorders.map((entry) => (
            <GameCard key={entry.item.id} game={{ ...orderItemToGame(entry), badge: "پیش‌فروش" }} />
          ))}
        </div>
      )}
    </div>
  )
}
