"use client"

import { useActionState, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signout, submitSupportTicket } from "@lib/data/customer"
import { MembershipTier } from "@lib/util/dashboard"
import {
  GridIcon,
  PackageIcon,
  GamepadIcon,
  ClockIcon,
  GiftIcon,
  HeartIcon,
  UserIcon,
  MapPinIcon,
  ShieldIcon,
  LogOutIcon,
  HeadsetIcon,
} from "@modules/account/icons"

type Props = {
  customer: HttpTypes.StoreCustomer
  tier: MembershipTier
}

const navItems = [
  { href: "/account", label: "داشبورد", icon: GridIcon, exact: true },
  { href: "/account/orders", label: "سفارش‌های من", icon: PackageIcon },
  { href: "/account/games", label: "بازی‌های من", icon: GamepadIcon },
  { href: "/account/preorders", label: "پیش‌فروش‌های من", icon: ClockIcon },
  { href: "/account/gifts", label: "کدها و گیفت‌ها", icon: GiftIcon },
  { href: "/account/wishlist", label: "علاقه‌مندی‌ها", icon: HeartIcon },
  { href: "/account/profile", label: "اطلاعات حساب کاربری", icon: UserIcon },
  { href: "/account/addresses", label: "آدرس‌ها", icon: MapPinIcon },
  { href: "/account/security", label: "امنیت حساب", icon: ShieldIcon },
]

const DashboardSidebar = ({ customer, tier }: Props) => {
  const currentPath = usePathname()
  const countryCode = useParams().countryCode as string
  const [ticketOpen, setTicketOpen] = useState(false)

  const initial = (customer.first_name?.[0] || customer.email[0] || "?").toUpperCase()
  const fullName = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || customer.email

  return (
    <aside className="w-full shrink-0 lg:w-[260px]" dir="rtl">
      <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 text-lg font-black text-white">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{fullName}</p>
            <span
              className="mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold"
              style={{ color: tier.color, borderColor: `${tier.color}40`, backgroundColor: `${tier.color}14` }}
            >
              عضو {tier.label}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/45">
            <span>{tier.points.toLocaleString("fa-IR")} امتیاز کاربری</span>
            {tier.next && <span>تا سطح بعد {tier.progress}%</span>}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-l from-purple-500 to-fuchsia-500 transition-all"
              style={{ width: `${tier.progress}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0a0d14] p-2">
        {navItems.map((item) => {
          const isActive = item.exact ? currentPath === item.href : currentPath.startsWith(item.href)
          const Icon = item.icon
          return (
            <LocalizedClientLink
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-950/30"
                  : "text-white/55 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {item.label}
            </LocalizedClientLink>
          )
        })}

        <button
          type="button"
          onClick={() => signout(countryCode)}
          className="mt-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-400/80 transition hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOutIcon className="h-[18px] w-[18px] shrink-0" />
          خروج از حساب
        </button>
      </nav>

      <div className="mt-4 rounded-2xl border border-purple-400/15 bg-gradient-to-br from-purple-500/10 to-transparent p-5 text-center">
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-purple-400/25 bg-purple-500/10 text-purple-300">
          <HeadsetIcon className="h-5 w-5" />
        </div>
        <p className="mt-2.5 text-sm font-bold text-white">پشتیبانی ۲۴/۷</p>
        <p className="mt-1 text-xs leading-6 text-white/40">
          هر سوالی داری، تیم گیمینت همیشه پاسخگوعه.
        </p>
        <button
          type="button"
          onClick={() => setTicketOpen(true)}
          className="mt-3 w-full rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white transition hover:bg-purple-500"
        >
          ثبت تیکت جدید
        </button>
      </div>

      {ticketOpen && <SupportTicketModal onClose={() => setTicketOpen(false)} />}
    </aside>
  )
}

const SupportTicketModal = ({ onClose }: { onClose: () => void }) => {
  const [state, formAction] = useActionState(submitSupportTicket, null)

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c1018] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {state?.success ? (
          <div className="text-center">
            <p className="text-sm font-bold text-white">تیکت شما ثبت شد</p>
            <p className="mt-2 text-xs leading-6 text-white/50">
              تیم پشتیبانی گیمینت به‌زودی بررسیش می‌کنه و باهات در تماسه.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
            >
              متوجه شدم
            </button>
          </div>
        ) : (
          <form action={formAction}>
            <p className="text-sm font-bold text-white">ثبت تیکت پشتیبانی</p>
            <div className="mt-4 flex flex-col gap-3">
              <input
                name="subject"
                required
                placeholder="موضوع تیکت"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-400/50"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="توضیحات..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-400/50"
              />
            </div>
            {state?.error && (
              <p className="mt-2 text-xs text-rose-400">{state.error}</p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-bold text-white/60 transition hover:text-white"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
              >
                ارسال تیکت
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default DashboardSidebar
