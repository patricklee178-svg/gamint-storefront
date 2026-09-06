import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function verificationRequestedHandler({
  event: {
    data: { entity_id: email, entity_type, code },
  },
  container,
}: SubscriberArgs<{
  entity_id: string
  entity_type: string
  code: string
}>) {
  if (entity_type !== "email") {
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
    template: "email-verification",
    data: {
      verification_url: `${storefrontUrl}/verify-account?token=${code}`,
      otp_code: code,
    },
  })
}

export const config: SubscriberConfig = {
  event: "auth.verification_requested",
}
