import { HttpTypes } from "@medusajs/types"
import Item from "@modules/order/components/item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items
    ?.slice()
    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <h2 className="mb-4 text-sm font-bold text-white">محصولات سفارش</h2>
      <div className="flex flex-col divide-y divide-white/[0.06]" data-testid="products-table">
        {items?.map((item) => (
          <Item key={item.id} item={item} currencyCode={order.currency_code} />
        ))}
      </div>
    </div>
  )
}

export default Items
