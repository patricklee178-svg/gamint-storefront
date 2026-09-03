import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

type SupportTicket = {
  id: string
  subject: string
  message: string
  status: "open" | "closed"
  created_at: string
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)

  const customers = await customerModuleService.listCustomers(
    {},
    { take: 500, order: { updated_at: "DESC" } }
  )

  const tickets: (SupportTicket & {
    customer_id: string
    customer_name: string
    customer_email: string
  })[] = []

  for (const customer of customers) {
    const customerTickets = (customer.metadata?.support_tickets as SupportTicket[] | undefined) || []
    for (const ticket of customerTickets) {
      tickets.push({
        ...ticket,
        customer_id: customer.id,
        customer_name: [customer.first_name, customer.last_name].filter(Boolean).join(" ") || customer.email,
        customer_email: customer.email,
      })
    }
  }

  tickets.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  res.json({
    tickets: tickets.slice(0, 200),
    count: tickets.length,
    open_count: tickets.filter((t) => t.status === "open").length,
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const customerModuleService = req.scope.resolve(Modules.CUSTOMER)
  const { customer_id, ticket_id, status } = req.body as {
    customer_id: string
    ticket_id: string
    status: "open" | "closed"
  }

  if (!customer_id || !ticket_id || !status) {
    res.status(400).json({ message: "customer_id، ticket_id و status الزامی است." })
    return
  }

  const customer = await customerModuleService.retrieveCustomer(customer_id)
  const tickets = (customer.metadata?.support_tickets as SupportTicket[] | undefined) || []
  const nextTickets = tickets.map((t) => (t.id === ticket_id ? { ...t, status } : t))

  await customerModuleService.updateCustomers(customer_id, {
    metadata: { ...customer.metadata, support_tickets: nextTickets },
  })

  res.json({ success: true })
}
