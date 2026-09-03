import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CAPACITY_ACCOUNT_MODULE } from "../../../../modules/capacity-account"

type OrderItem = {
  product_id?: string | null
  product_title?: string | null
  thumbnail?: string | null
  quantity: number
  unit_price: number
}

type Order = {
  id: string
  display_id: number
  total: number
  currency_code: string
  created_at: string
  status: string
  payment_status: string
  fulfillment_status: string
  items?: OrderItem[]
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const days = Number((req.query.days as string) || 30)
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "total",
      "currency_code",
      "created_at",
      "status",
      "payment_status",
      "fulfillment_status",
      "items.quantity",
      "items.unit_price",
      "items.product_id",
      "items.product_title",
      "items.thumbnail",
    ],
    filters: {
      created_at: { $gte: since.toISOString() },
    } as any,
  })

  const validOrders = (orders as unknown as Order[]).filter(
    (o) => o.status !== "canceled" && o.payment_status !== "canceled"
  )

  const totalSales = validOrders.reduce((sum, o) => sum + (o.total || 0), 0)
  const completedOrders = validOrders.filter((o) =>
    ["fulfilled", "shipped", "delivered", "partially_delivered"].includes(
      o.fulfillment_status
    )
  ).length

  const productAgg = new Map<
    string,
    { product_id: string; title: string; thumbnail: string | null; revenue: number; count: number }
  >()

  for (const o of validOrders) {
    for (const item of o.items || []) {
      if (!item.product_id) continue
      const existing = productAgg.get(item.product_id) || {
        product_id: item.product_id,
        title: item.product_title || "",
        thumbnail: item.thumbnail || null,
        revenue: 0,
        count: 0,
      }
      existing.revenue += (item.unit_price || 0) * (item.quantity || 0)
      existing.count += item.quantity || 0
      productAgg.set(item.product_id, existing)
    }
  }

  const productIds = Array.from(productAgg.keys())
  let marginById = new Map<string, number>()

  if (productIds.length > 0) {
    const { data: products } = await query.graph({
      entity: "product",
      fields: ["id", "metadata"],
      filters: { id: productIds } as any,
    })
    marginById = new Map(
      (products as { id: string; metadata?: Record<string, unknown> }[])
        .filter((p) => p.metadata?.profit_margin_percent !== undefined)
        .map((p) => [p.id, Number(p.metadata!.profit_margin_percent)])
    )
  }

  let netProfit = 0
  let profitCoveredRevenue = 0
  for (const [id, agg] of productAgg) {
    const margin = marginById.get(id)
    if (margin !== undefined && !Number.isNaN(margin)) {
      netProfit += agg.revenue * (margin / 100)
      profitCoveredRevenue += agg.revenue
    }
  }

  const topProducts = Array.from(productAgg.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["id", "created_at"],
    filters: { created_at: { $gte: since.toISOString() } } as any,
  })

  const dayMap = new Map<string, { sales: number; profit: number }>()
  for (const o of validOrders) {
    const day = o.created_at.slice(0, 10)
    const entry = dayMap.get(day) || { sales: 0, profit: 0 }
    entry.sales += o.total || 0
    for (const item of o.items || []) {
      const margin = item.product_id ? marginById.get(item.product_id) : undefined
      if (margin !== undefined) {
        entry.profit += (item.unit_price || 0) * (item.quantity || 0) * (margin / 100)
      }
    }
    dayMap.set(day, entry)
  }
  const chart = Array.from(dayMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, sales: Math.round(v.sales), profit: Math.round(v.profit) }))

  const capacityAccountService = req.scope.resolve(CAPACITY_ACCOUNT_MODULE) as any
  const accounts = await capacityAccountService.listCapacityAccounts({}, { take: 5000 })
  const statusCounts = { active: 0, pending: 0, expired: 0, suspended: 0 }
  for (const a of accounts) {
    if (a.status in statusCounts) {
      statusCounts[a.status as keyof typeof statusCounts]++
    }
  }

  const recentOrders = validOrders
    .slice()
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    .slice(0, 5)
    .map((o) => ({
      id: o.id,
      display_id: o.display_id,
      total: o.total,
      currency_code: o.currency_code,
      created_at: o.created_at,
      status: o.status,
      payment_status: o.payment_status,
      fulfillment_status: o.fulfillment_status,
      thumbnail: o.items?.[0]?.thumbnail || null,
      title: o.items?.[0]?.product_title || null,
    }))

  res.json({
    total_sales: Math.round(totalSales),
    net_profit: Math.round(netProfit),
    profit_covered_revenue: Math.round(profitCoveredRevenue),
    profit_data_complete: profitCoveredRevenue >= totalSales * 0.999,
    completed_orders: completedOrders,
    total_orders: validOrders.length,
    new_customers: customers.length,
    capacity_accounts: {
      total: accounts.length,
      ...statusCounts,
    },
    top_products: topProducts,
    chart,
    recent_orders: recentOrders,
    days,
  })
}
