import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CAPACITY_ACCOUNT_MODULE } from "../../../../modules/capacity-account"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CAPACITY_ACCOUNT_MODULE) as any
  const limit = Number((req.query.limit as string) || 50)
  const offset = Number((req.query.offset as string) || 0)

  const [accounts, count] = await service.listAndCountCapacityAccounts(
    {},
    { take: limit, skip: offset, order: { created_at: "DESC" } }
  )

  res.json({ capacity_accounts: accounts, count, limit, offset })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CAPACITY_ACCOUNT_MODULE) as any
  const body = req.body as {
    product_id: string
    product_title: string
    label: string
    status?: string
    customer_id?: string
    order_id?: string
    notes?: string
  }

  if (!body.product_id || !body.product_title || !body.label) {
    res.status(400).json({ message: "product_id, product_title و label الزامی است." })
    return
  }

  const account = await service.createCapacityAccounts({
    product_id: body.product_id,
    product_title: body.product_title,
    label: body.label,
    status: body.status || "pending",
    customer_id: body.customer_id || null,
    order_id: body.order_id || null,
    notes: body.notes || null,
  })

  res.status(201).json({ capacity_account: account })
}
