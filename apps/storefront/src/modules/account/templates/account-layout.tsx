import React from "react"
import { HttpTypes } from "@medusajs/types"

import DashboardSidebar from "../components/dashboard-sidebar"
import { getMembershipTier } from "@lib/util/dashboard"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer
  orders: HttpTypes.StoreOrder[]
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, orders, children }) => {
  const totalSpent = orders
    .filter((o) => o.fulfillment_status !== "canceled" && o.payment_status !== "canceled")
    .reduce((sum, o) => sum + (o.total || 0), 0)

  const tier = getMembershipTier(totalSpent)

  return (
    <div dir="rtl" className="min-h-[calc(100vh-72px)] w-full bg-[#05070b] text-white">
      <div className="content-container flex flex-col gap-6 py-8 lg:flex-row lg:items-start">
        <DashboardSidebar customer={customer} tier={tier} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

export default AccountLayout
