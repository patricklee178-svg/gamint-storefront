import type { ReactNode } from "react"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import {
  classifyOrderItems,
  getOrderTimeline,
  orderStatusBadge,
  timeAgoFa,
} from "@lib/util/dashboard"
import {
  WalletIcon,
  PackageIcon,
  GamepadIcon,
  GiftIcon,
  CheckCircleIcon,
  BoltIcon,
  BadgeCheckIcon,
  HeadsetIcon,
  ShieldIcon,
} from "@modules/account/icons"
import { ArrowIcon } from "@modules/marketing/components"

type Props = {
  customer: HttpTypes.StoreCustomer
  orders: HttpTypes.StoreOrder[]
}

const toneClasses: Record<string, string> = {
  success: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-400/25 bg-amber-500/10 text-amber-300",
  danger: "border-rose-400/25 bg-rose-500/10 text-rose-300",
  neutral: "border-white/15 bg-white/[0.05] text-white/50",
}

const Overview = ({ customer, orders }: Props) => {
  const { games, preorders, gifts } = classifyOrderItems(orders)
  const walletBalance = (customer.metadata?.wallet_balance as number | undefined) || 0
  const recentOrders = orders.slice(0, 5)
  const latestOrder = orders[0]
  const timeline = latestOrder ? getOrderTimeline(latestOrder) : null

  const activity = orders.slice(0, 4).map((order) => {
    const badge = orderStatusBadge(order)
    return {
      id: order.id,
      text: `سفارش #${order.display_id} ${
        badge.label === "تحویل شده" ? "با موفقیت تحویل شد" : "ثبت شد"
      }`,
      time: timeAgoFa(order.updated_at || order.created_at),
      tone: badge.tone,
    }
  })

  return (
    <div dir="rtl" className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#150b26] via-[#0c1018] to-[#05070b] p-8">
        <div className="pointer-events-none absolute left-6 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-purple-600/25 blur-[70px] sm:block" />
        <h1 className="relative text-2xl font-black text-white sm:text-3xl">
          خوش برگشتی، {customer.first_name || "گیمر"}! 👋
        </h1>
        <p className="relative mt-2 max-w-lg text-sm leading-7 text-white/50">
          از آخرین فعالیت‌های خودت توی گیمینت مطلع شو و به سرعت به سفارش‌ها و بازی‌هات دسترسی داشته باش.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<WalletIcon className="h-5 w-5" />}
          label="موجودی کیف پول"
          value={`${walletBalance.toLocaleString("fa-IR")} تومان`}
          action={
            <button
              type="button"
              disabled
              title="شارژ آنلاین کیف پول به‌زودی فعال می‌شود"
              className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-[11px] font-bold text-white/35"
            >
              شارژ کیف پول (به‌زودی)
            </button>
          }
        />
        <StatCard
          icon={<PackageIcon className="h-5 w-5" />}
          label="سفارش‌های من"
          value={orders.length.toLocaleString("fa-IR")}
          href="/account/orders"
        />
        <StatCard
          icon={<GamepadIcon className="h-5 w-5" />}
          label="بازی‌های من"
          value={games.length.toLocaleString("fa-IR")}
          href="/account/games"
        />
        <StatCard
          icon={<GiftIcon className="h-5 w-5" />}
          label="کدها و گیفت‌ها"
          value={gifts.length.toLocaleString("fa-IR")}
          href="/account/gifts"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">آخرین سفارش‌ها</h2>
            <LocalizedClientLink
              href="/account/orders"
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              مشاهده همه <ArrowIcon />
            </LocalizedClientLink>
          </div>

          {recentOrders.length === 0 ? (
            <EmptyState text="هنوز سفارشی ثبت نکردی." />
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {recentOrders.map((order) => {
                const badge = orderStatusBadge(order)
                const firstItem = order.items?.[0]
                return (
                  <LocalizedClientLink
                    key={order.id}
                    href={`/account/orders/details/${order.id}`}
                    className="flex items-center gap-3 py-3 transition hover:opacity-80"
                  >
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                      {firstItem?.thumbnail && (
                        <img src={firstItem.thumbnail} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-white">
                        #{order.display_id} · {firstItem?.product_title || firstItem?.title || "سفارش"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {new Date(order.created_at).toLocaleDateString("fa-IR")} ·{" "}
                        {convertToLocale({ amount: order.total, currency_code: order.currency_code })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-bold ${toneClasses[badge.tone]}`}
                    >
                      {badge.label}
                    </span>
                  </LocalizedClientLink>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {latestOrder && timeline && (
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
              <h2 className="mb-4 text-sm font-bold text-white">وضعیت سفارش اخیر</h2>
              <div className="mb-3 flex items-center gap-3">
                {latestOrder.items?.[0]?.thumbnail && (
                  <img
                    src={latestOrder.items[0].thumbnail}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    {latestOrder.items?.[0]?.product_title || latestOrder.items?.[0]?.title}
                  </p>
                  <p className="text-[11px] text-white/40">سفارش #{latestOrder.display_id}</p>
                </div>
              </div>
              <div className="flex flex-col gap-0">
                {timeline.map((stage, i) => (
                  <div key={stage.key} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          stage.done
                            ? "border-purple-400 bg-purple-500 text-white"
                            : "border-white/15 text-white/20"
                        }`}
                      >
                        {stage.done && <CheckCircleIcon className="h-3.5 w-3.5" />}
                      </span>
                      {i < timeline.length - 1 && (
                        <span className={`h-6 w-px ${stage.done ? "bg-purple-400/50" : "bg-white/10"}`} />
                      )}
                    </div>
                    <p className={`pb-4 text-xs ${stage.done ? "font-semibold text-white" : "text-white/35"}`}>
                      {stage.label}
                    </p>
                  </div>
                ))}
              </div>
              <LocalizedClientLink
                href={`/account/orders/details/${latestOrder.id}`}
                className="block text-center text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                مشاهده جزئیات سفارش
              </LocalizedClientLink>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
            <h2 className="mb-3 text-sm font-bold text-white">آخرین فعالیت‌ها</h2>
            {activity.length === 0 ? (
              <EmptyState text="فعالیتی ثبت نشده." />
            ) : (
              <div className="flex flex-col gap-3">
                {activity.map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${toneClasses[a.tone]}`}>
                      <CheckCircleIcon className="h-3 w-3" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-white/80">{a.text}</p>
                      <p className="mt-0.5 text-[10px] text-white/35">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MiniListCard
          title="پیش‌فروش‌های من"
          items={preorders}
          viewAllHref="/account/preorders"
          emptyText="هنوز پیش‌فروشی ثبت نکردی."
        />
        <MiniListCard
          title="بازی‌های من"
          items={games}
          viewAllHref="/account/games"
          emptyText="هنوز بازی‌ای نخریدی."
        />
      </section>

      <section className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 sm:grid-cols-3 lg:grid-cols-5">
        <Feature icon={<BoltIcon className="h-4 w-4" />} text="تحویل سریع" />
        <Feature icon={<BadgeCheckIcon className="h-4 w-4" />} text="ضمانت اصالت" />
        <Feature icon={<HeadsetIcon className="h-4 w-4" />} text="پشتیبانی ۲۴/۷" />
        <Feature icon={<GiftIcon className="h-4 w-4" />} text="تخفیف‌های ویژه" />
        <Feature icon={<ShieldIcon className="h-4 w-4" />} text="امنیت خرید" />
      </section>
    </div>
  )
}

const StatCard = ({
  icon,
  label,
  value,
  href,
  action,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
  action?: ReactNode
}) => {
  const content = (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0d14] p-4 transition hover:border-purple-400/30">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
        {icon}
      </span>
      <p className="mt-3 text-lg font-black text-white">{value}</p>
      <p className="mt-0.5 text-[11px] text-white/40">{label}</p>
      {action && <div className="mt-auto pt-3">{action}</div>}
    </div>
  )

  if (href) {
    return (
      <LocalizedClientLink href={href} className="block h-full">
        {content}
      </LocalizedClientLink>
    )
  }

  return content
}

const MiniListCard = ({
  title,
  items,
  viewAllHref,
  emptyText,
}: {
  title: string
  items: { order: HttpTypes.StoreOrder; item: HttpTypes.StoreOrderLineItem }[]
  viewAllHref: string
  emptyText: string
}) => (
  <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <LocalizedClientLink
        href={viewAllHref}
        className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
      >
        مشاهده همه <ArrowIcon />
      </LocalizedClientLink>
    </div>
    {items.length === 0 ? (
      <EmptyState text={emptyText} />
    ) : (
      <div className="flex flex-col gap-3">
        {items.slice(0, 3).map(({ order, item }) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
              {item.thumbnail && <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">{item.product_title || item.title}</p>
              <p className="mt-0.5 text-[11px] text-white/40">
                {new Date(order.created_at).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

const Feature = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex flex-col items-center gap-1.5 text-center">
    <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-purple-300">
      {icon}
    </span>
    <span className="text-[11px] font-semibold text-white/55">{text}</span>
  </div>
)

const EmptyState = ({ text }: { text: string }) => (
  <div className="rounded-xl border border-dashed border-white/10 py-8 text-center text-xs text-white/35">
    {text}
  </div>
)

export default Overview
