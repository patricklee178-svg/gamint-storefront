import { defineMiddlewares, authenticate } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
})

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/customers/me/avatar",
      method: ["POST"],
      middlewares: [
        authenticate("customer", ["bearer", "session"]),
        upload.single("avatar"),
      ],
    },
    {
      matcher: "/store/customers/me/avatar",
      method: ["DELETE"],
      middlewares: [authenticate("customer", ["bearer", "session"])],
    },
  ],
})
