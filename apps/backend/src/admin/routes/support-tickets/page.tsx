import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type Ticket = {
  id: string
  subject: string
  message: string
  status: "open" | "closed"
  created_at: string
  customer_id: string
  customer_name: string
  customer_email: string
}

const SupportTicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all")

  const load = () => {
    setLoading(true)
    fetch("/admin/dashboard/tickets", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setTickets(res.tickets || []))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleToggle = async (t: Ticket) => {
    const nextStatus = t.status === "open" ? "closed" : "open"
    setTickets((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: nextStatus } : x)))
    await fetch("/admin/dashboard/tickets", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_id: t.customer_id, ticket_id: t.id, status: nextStatus }),
    })
  }

  const filtered = tickets.filter((t) => filter === "all" || t.status === filter)

  return (
    <div dir="rtl" className="min-h-screen bg-[#05070b] p-6 text-white">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white">تیکت‌های پشتیبانی</h1>
            <p className="mt-1 text-xs text-white/40">تیکت‌هایی که مشتری‌ها از داشبورد حساب کاربری ثبت کرده‌اند</p>
          </div>
          <div className="flex gap-1 rounded-xl border border-white/10 bg-[#0a0d14] p-1">
            {(["all", "open", "closed"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === f ? "bg-purple-600 text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {f === "all" ? "همه" : f === "open" ? "باز" : "بسته"}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]">
          {loading ? (
            <p className="p-6 text-center text-xs text-white/40">در حال بارگذاری...</p>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-center text-xs text-white/40">تیکتی یافت نشد.</p>
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {filtered.map((t) => (
                <div key={t.id} className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{t.subject}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {t.customer_name} · {t.customer_email} ·{" "}
                        {new Date(t.created_at).toLocaleDateString("fa-IR")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(t)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold transition ${
                        t.status === "open"
                          ? "bg-amber-400/15 text-amber-300 hover:bg-amber-400/25"
                          : "bg-emerald-400/15 text-emerald-300 hover:bg-emerald-400/25"
                      }`}
                    >
                      {t.status === "open" ? "علامت‌گذاری به‌عنوان بسته" : "بازگشایی تیکت"}
                    </button>
                  </div>
                  <p className="mt-2.5 text-xs leading-6 text-white/55">{t.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "تیکت‌های پشتیبانی",
})

export default SupportTicketsPage
