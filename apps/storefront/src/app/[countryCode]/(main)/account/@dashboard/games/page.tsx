import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listOrders } from "@lib/data/orders"
import { classifyOrderItems, orderItemToGame } from "@lib/util/dashboard"
import { GameCard } from "@modules/marketing/components"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "بازی‌های من | گیمینت",
  description: "کتابخانه بازی‌های خریداری‌شده شما در گیمینت.",
}

export default async function MyGames() {
  const orders = await listOrders(100, 0).catch(() => null)

  if (!orders) {
    notFound()
  }

  const { games } = classifyOrderItems(orders)

  return (
    <div dir="rtl" className="w-full">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">بازی‌های من</h1>
        <p className="mt-1.5 text-sm text-white/45">همه بازی‌هایی که تا الان از گیمینت خریدی.</p>
      </div>

      {games.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0d14] py-16 text-center">
          <p className="text-sm text-white/40">هنوز بازی‌ای نخریدی.</p>
          <LocalizedClientLink
            href="/categories/games"
            className="mt-4 inline-block rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
          >
            مشاهده بازی‌ها
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {games.map((entry) => (
            <GameCard key={entry.item.id} game={orderItemToGame(entry)} />
          ))}
        </div>
      )}
    </div>
  )
}
