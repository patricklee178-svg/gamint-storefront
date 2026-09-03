import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CAPACITY_ACCOUNT_MODULE } from "../../../../../modules/capacity-account"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CAPACITY_ACCOUNT_MODULE) as any
  const { id } = req.params
  const body = req.body as Record<string, unknown>

  const account = await service.updateCapacityAccounts({ id, ...body })
  res.json({ capacity_account: account })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CAPACITY_ACCOUNT_MODULE) as any
  const { id } = req.params

  await service.deleteCapacityAccounts([id])
  res.json({ id, deleted: true })
}
