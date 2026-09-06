import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const { game_code, delivery_instructions } = req.body as {
    game_code?: string
    delivery_instructions?: string
  }

  if (!game_code) {
    res.status(400).json({ message: "game_code الزامی است." })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)
  const config = req.scope.resolve("configModule") as {
    admin: { storefrontUrl?: string }
  }

  const {
    data: [order],
  } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "items.title",
      "items.thumbnail",
      "items.variant_title",
    ],
    filters: { id },
  })

  if (!order?.email) {
    res.status(404).json({ message: "سفارش پیدا نشد." })
    return
  }

  const storefrontUrl = config.admin.storefrontUrl || "https://gamint.ir"
  const firstItem = order.items?.[0]

  await notificationModuleService.createNotifications({
    to: order.email,
    channel: "email",
    template: "game-delivery",
    data: {
      product_title: firstItem?.title || "",
      product_thumbnail: firstItem?.thumbnail || "",
      platform: firstItem?.variant_title || "PS5",
      order_id: order.display_id,
      game_code,
      delivery_instructions:
        delivery_instructions ||
        "کد رو از منوی مربوطه در فروشگاه پلتفرم خودت وارد کن تا بازی به کتابخونه‌ت اضافه بشه.",
      order_url: `${storefrontUrl}/account/orders/details/${order.id}`,
    },
  })

  res.json({ success: true })
}
