import { MedusaService } from "@medusajs/framework/utils"
import CapacityAccount from "./models/capacity-account"

class CapacityAccountModuleService extends MedusaService({
  CapacityAccount,
}) {}

export default CapacityAccountModuleService
