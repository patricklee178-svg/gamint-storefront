import { cookies as nextCookies } from "next/headers"

import { convertToLocale } from "@lib/util/money"
import { paymentInfoMap } from "@lib/constants"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { CheckIcon, BoltIcon } from "@modules/cart/icons"
import OnboardingCta from "@modules/order/components/onboarding-cta"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({ order }: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"
  const payment = order.payment_collections?.[0]?.payments?.[0]

  return (
    <div dir="rtl" className="min-h-[calc(100vh-72px)] bg-[#05070b] py-10 text-white">
      <div className="content-container mx-auto max-w-3xl">
        {isOnboarding && (
          <div className="mb-6">
            <OnboardingCta orderId={order.id} />
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#150b26] via-[#0c1018] to-[#05070b] p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-400">
            <CheckIcon className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-xl font-black text-white">سفارشت با موفقیت ثبت شد!</h1>
          <p className="mt-2 text-sm text-white/50">
            جزئیات سفارش برای <span className="font-bold text-white">{order.email}</span> ارسال شد.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/40">
            <span>
              شماره سفارش: <span className="font-bold text-purple-300">#GM-{order.display_id.toLocaleString("fa-IR")}</span>
            </span>
            <span>{new Date(order.created_at).toLocaleDateString("fa-IR")}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">
          <BoltIcon className="h-4 w-4 shrink-0" />
          کد یا اطلاعات فعال‌سازی محصولات، به‌محض آماده شدن، توی بخش «سفارش‌های من» حساب کاربریت قرار می‌گیره.
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
          <h2 className="mb-4 text-sm font-bold text-white">محصولات سفارش</h2>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {order.items
              ?.slice()
              .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
              .map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-white">{item.product_title || item.title}</p>
                    <p className="mt-0.5 text-[11px] text-white/40">تعداد: {item.quantity.toLocaleString("fa-IR")}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-white/70">
                    {convertToLocale({ amount: item.total ?? 0, currency_code: order.currency_code })}
                  </span>
                </div>
              ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm font-bold text-white/70">مبلغ کل پرداخت‌شده</span>
            <span className="text-lg font-black text-purple-300">
              {convertToLocale({ amount: order.total ?? 0, currency_code: order.currency_code })}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
            <h2 className="mb-3 text-sm font-bold text-white">اطلاعات تماس</h2>
            <p className="text-xs text-white/45">
              {order.shipping_address?.first_name} {order.shipping_address?.last_name}
            </p>
            <p className="mt-1 text-xs text-white/45" dir="ltr">
              {order.shipping_address?.phone}
            </p>
            <p className="mt-1 text-xs text-white/45">{order.email}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
            <h2 className="mb-3 text-sm font-bold text-white">روش پرداخت</h2>
            {payment ? (
              <>
                <p className="text-xs font-bold text-white/70">
                  {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
                </p>
                <p className="mt-1 text-xs text-white/45">
                  {convertToLocale({ amount: payment.amount, currency_code: order.currency_code })} در تاریخ{" "}
                  {new Date(payment.created_at ?? "").toLocaleDateString("fa-IR")}
                </p>
              </>
            ) : (
              <p className="text-xs text-white/35">اطلاعاتی ثبت نشده.</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <LocalizedClientLink
            href="/account/orders"
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-purple-600 text-sm font-bold text-white transition hover:bg-purple-500"
          >
            مشاهده سفارش‌های من
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/categories/games"
            className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/15 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            ادامه خرید
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
