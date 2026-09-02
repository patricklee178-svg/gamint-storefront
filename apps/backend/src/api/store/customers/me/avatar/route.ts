import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

type MulterRequest = MedusaRequest & {
  file?: {
    originalname: string
    mimetype: string
    buffer: Buffer
    size: number
  }
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function POST(req: MulterRequest, res: MedusaResponse) {
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const file = req.file

  if (!file) {
    res.status(400).json({ message: "هیچ فایلی ارسال نشده است." })
    return
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    res.status(400).json({ message: "فقط فایل‌های تصویری (jpg, png, webp, gif) مجاز است." })
    return
  }

  const fileModuleService = req.scope.resolve(Modules.FILE)
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

  const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")

  const [uploaded] = await fileModuleService.createFiles([
    {
      filename: `avatar-${customerId}-${Date.now()}-${safeName}`,
      mimeType: file.mimetype,
      content: file.buffer.toString("binary"),
    },
  ])

  const customer = await customerModuleService.retrieveCustomer(customerId)
  const previousAvatarFileId = customer.metadata?.avatar_file_id as string | undefined

  await customerModuleService.updateCustomers(customerId, {
    metadata: {
      ...customer.metadata,
      avatar_url: uploaded.url,
      avatar_file_id: uploaded.id,
    },
  })

  if (previousAvatarFileId) {
    await fileModuleService.deleteFiles([previousAvatarFileId]).catch(() => {})
  }

  res.json({ avatar_url: uploaded.url })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const fileModuleService = req.scope.resolve(Modules.FILE)
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

  const customer = await customerModuleService.retrieveCustomer(customerId)
  const avatarFileId = customer.metadata?.avatar_file_id as string | undefined

  await customerModuleService.updateCustomers(customerId, {
    metadata: {
      ...customer.metadata,
      avatar_url: null,
      avatar_file_id: null,
    },
  })

  if (avatarFileId) {
    await fileModuleService.deleteFiles([avatarFileId]).catch(() => {})
  }

  res.json({ success: true })
}
