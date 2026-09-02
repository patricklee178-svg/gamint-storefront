import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    return <>{login}</>
  }

  const orders = (await listOrders(100, 0).catch(() => [])) || []

  return (
    <AccountLayout customer={customer} orders={orders}>
      {dashboard}
    </AccountLayout>
  )
}
