import { model } from "@medusajs/framework/utils"

const CapacityAccount = model.define("capacity_account", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  product_title: model.text(),
  label: model.text(),
  status: model
    .enum(["active", "pending", "expired", "suspended"])
    .default("pending"),
  customer_id: model.text().nullable(),
  order_id: model.text().nullable(),
  notes: model.text().nullable(),
})

export default CapacityAccount
