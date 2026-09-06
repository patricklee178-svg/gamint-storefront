import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function orderCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)
  const config = container.resolve("configModule") as {
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
      "total",
      "currency_code",
      "items.title",
      "items.quantity",
      "items.thumbnail",
      "items.unit_price",
      "items.variant_title",
    ],
    filters: { id: data.id },
  })

  if (!order?.email) {
    return
  }

  const storefrontUrl = config.admin.storefrontUrl || "https://gamint.ir"
  const items = order.items || []
  const firstItem = items[0]
  const extraCount = items.length - 1

  await notificationModuleService.createNotifications({
    to: order.email,
    channel: "email",
    template: "payment-success",
    data: {
      order_id: order.display_id,
      product_title:
        firstItem?.title +
        (extraCount > 0 ? ` و ${extraCount.toLocaleString("fa-IR")} مورد دیگر` : ""),
      product_thumbnail: firstItem?.thumbnail || "",
      platform: firstItem?.variant_title || "PS5",
      quantity: (firstItem?.quantity || 1).toLocaleString("fa-IR"),
      item_price: Math.round(firstItem?.unit_price || 0).toLocaleString("fa-IR"),
      order_total: Math.round(order.total || 0).toLocaleString("fa-IR"),
      order_url: `${storefrontUrl}/account/orders/details/${order.id}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: "order.created",
}
