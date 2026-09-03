import { Module } from "@medusajs/framework/utils"
import CapacityAccountModuleService from "./service"

export const CAPACITY_ACCOUNT_MODULE = "capacity_account"

export default Module(CAPACITY_ACCOUNT_MODULE, {
  service: CapacityAccountModuleService,
})
