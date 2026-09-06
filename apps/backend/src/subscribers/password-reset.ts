import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function resetPasswordTokenHandler({
  event: {
    data: { entity_id: email, token, actor_type },
  },
  container,
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) {
  if (actor_type !== "customer") {
    return
  }

  const notificationModuleService = container.resolve(Modules.NOTIFICATION)
  const config = container.resolve("configModule") as {
    admin: { storefrontUrl?: string }
  }

  const storefrontUrl = config.admin.storefrontUrl || "https://gamint.ir"

  await notificationModuleService.createNotifications({
    to: email,
    channel: "email",
    template: "password-reset",
    data: {
      reset_url: `${storefrontUrl}/account/reset-password?token=${token}&email=${encodeURIComponent(
        email
      )}`,
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
