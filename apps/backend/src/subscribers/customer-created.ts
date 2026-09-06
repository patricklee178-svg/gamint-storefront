import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)

  const {
    data: [customer],
  } = await query.graph({
    entity: "customer",
    fields: ["id", "email", "first_name", "has_account"],
    filters: { id: data.id },
  })

  if (!customer?.email || !customer.has_account) {
    return
  }

  await notificationModuleService.createNotifications({
    to: customer.email,
    channel: "email",
    template: "welcome",
    data: {
      customer_name: customer.first_name || "",
    },
  })
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
