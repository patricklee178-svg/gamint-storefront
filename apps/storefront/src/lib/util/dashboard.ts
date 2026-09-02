import { HttpTypes } from "@medusajs/types"

export type MembershipTier = {
  key: "bronze" | "silver" | "gold" | "diamond"
  label: string
  color: string
  min: number
  next: number | null
  points: number
  progress: number
  totalSpent: number
}

const TIERS = [
  { key: "bronze" as const, label: "برنزی", color: "#cd7f32", min: 0, next: 5_000_000 },
  { key: "silver" as const, label: "نقره‌ای", color: "#c7d2e0", min: 5_000_000, next: 15_000_000 },
  { key: "gold" as const, label: "طلایی", color: "#facc15", min: 15_000_000, next: 40_000_000 },
  { key: "diamond" as const, label: "الماس", color: "#7dd3fc", min: 40_000_000, next: null },
]

export function getMembershipTier(totalSpent: number): MembershipTier {
  let current = TIERS[0]
  for (const tier of TIERS) {
    if (totalSpent >= tier.min) current = tier
  }

  const progress = current.next
    ? Math.min(
        100,
        Math.round(((totalSpent - current.min) / (current.next - current.min)) * 100)
      )
    : 100

  return {
    ...current,
    points: Math.floor(totalSpent / 1000),
    progress,
    totalSpent,
  }
}

const CATEGORY_PREORDER = "preorders"
const CATEGORY_GIFTCARDS = "gift-cards"

export type ClassifiedItem = {
  order: HttpTypes.StoreOrder
  item: HttpTypes.StoreOrderLineItem
}

export function classifyOrderItems(orders: HttpTypes.StoreOrder[] | null | undefined) {
  const games: ClassifiedItem[] = []
  const preorders: ClassifiedItem[] = []
  const gifts: ClassifiedItem[] = []

  for (const order of orders || []) {
    for (const item of order.items || []) {
      const categories = (item.product as unknown as { categories?: { handle: string }[] })
        ?.categories
      const handles = categories?.map((c) => c.handle) || []

      if (handles.includes(CATEGORY_PREORDER)) {
        preorders.push({ order, item })
      } else if (handles.includes(CATEGORY_GIFTCARDS)) {
        gifts.push({ order, item })
      } else {
        games.push({ order, item })
      }
    }
  }

  return { games, preorders, gifts }
}

export function orderItemToGame(entry: ClassifiedItem) {
  const { item } = entry
  const product = item.product as unknown as { handle?: string; metadata?: Record<string, unknown> } | undefined

  return {
    title: item.product_title || item.title,
    platform: (product?.metadata?.platform as string | undefined) || item.variant_title || "PS5",
    price: (item.unit_price * item.quantity).toLocaleString("fa-IR"),
    image: item.thumbnail || "",
    handle: product?.handle,
  }
}

export function getOrderTimeline(order: HttpTypes.StoreOrder) {
  const paid = ["captured", "partially_captured", "refunded", "partially_refunded"].includes(
    order.payment_status
  )
  const fulfilled = [
    "fulfilled",
    "partially_fulfilled",
    "shipped",
    "partially_shipped",
    "delivered",
    "partially_delivered",
  ].includes(order.fulfillment_status)
  const delivered = ["delivered", "partially_delivered"].includes(order.fulfillment_status)

  return [
    { key: "placed", label: "ثبت سفارش", done: true },
    { key: "paid", label: "پرداخت شد", done: paid },
    { key: "fulfilled", label: "در حال تحویل", done: fulfilled },
    { key: "delivered", label: "تحویل داده شد", done: delivered },
  ]
}

export function orderStatusBadge(
  order: HttpTypes.StoreOrder
): { label: string; tone: "success" | "warning" | "danger" | "neutral" } {
  if (order.fulfillment_status === "delivered" || order.fulfillment_status === "partially_delivered") {
    return { label: "تحویل شده", tone: "success" }
  }
  if (order.fulfillment_status === "canceled" || order.payment_status === "canceled") {
    return { label: "لغو شده", tone: "danger" }
  }
  if (
    order.fulfillment_status === "fulfilled" ||
    order.fulfillment_status === "shipped" ||
    order.fulfillment_status === "partially_fulfilled" ||
    order.fulfillment_status === "partially_shipped"
  ) {
    return { label: "در حال تحویل", tone: "warning" }
  }
  if (order.payment_status === "captured" || order.payment_status === "partially_captured") {
    return { label: "در حال بررسی", tone: "warning" }
  }
  return { label: "در انتظار پرداخت", tone: "neutral" }
}

export function timeAgoFa(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return "چند لحظه پیش"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes.toLocaleString("fa-IR")} دقیقه پیش`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours.toLocaleString("fa-IR")} ساعت پیش`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days.toLocaleString("fa-IR")} روز پیش`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months.toLocaleString("fa-IR")} ماه پیش`
  const years = Math.floor(months / 12)
  return `${years.toLocaleString("fa-IR")} سال پیش`
}
