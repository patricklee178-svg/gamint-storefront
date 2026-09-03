import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type TopProduct = {
  product_id: string
  title: string
  thumbnail: string | null
  revenue: number
  count: number
}

type RecentOrder = {
  id: string
  display_id: number
  total: number
  currency_code: string
  created_at: string
  status: string
  payment_status: string
  fulfillment_status: string
  thumbnail: string | null
  title: string | null
}

type Ticket = {
  id: string
  subject: string
  status: "open" | "closed"
  created_at: string
  customer_id: string
  customer_name: string
}

type Stats = {
  total_sales: number
  net_profit: number
  profit_data_complete: boolean
  completed_orders: number
  total_orders: number
  new_customers: number
  capacity_accounts: { total: number; active: number; pending: number; expired: number; suspended: number }
  top_products: TopProduct[]
  chart: { date: string; sales: number; profit: number }[]
  recent_orders: RecentOrder[]
}

const toman = (n: number) => `${Math.round(n).toLocaleString("fa-IR")} تومان`
const fa = (n: number) => n.toLocaleString("fa-IR")

const statusLabels: Record<string, { label: string; color: string }> = {
  fulfilled: { label: "تکمیل شده", color: "#34d399" },
  delivered: { label: "تکمیل شده", color: "#34d399" },
  shipped: { label: "تکمیل شده", color: "#34d399" },
  partially_delivered: { label: "تکمیل شده", color: "#34d399" },
  not_fulfilled: { label: "در حال پردازش", color: "#fbbf24" },
  captured: { label: "پرداخت شده", color: "#34d399" },
  awaiting: { label: "در انتظار پرداخت", color: "#fbbf24" },
  not_paid: { label: "در انتظار پرداخت", color: "#fbbf24" },
  canceled: { label: "لغو شده", color: "#f87171" },
}

function orderStatusLabel(o: RecentOrder) {
  if (["fulfilled", "delivered", "shipped", "partially_delivered"].includes(o.fulfillment_status)) {
    return statusLabels.fulfilled
  }
  if (o.payment_status === "captured" || o.payment_status === "partially_captured") {
    return statusLabels.awaiting
  }
  return statusLabels.not_paid
}

const DashboardPro = () => {
  const [days, setDays] = useState(30)
  const [stats, setStats] = useState<Stats | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`/admin/dashboard/stats?days=${days}`, { credentials: "include" }).then((r) => r.json()),
      fetch(`/admin/dashboard/tickets`, { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([statsRes, ticketsRes]) => {
        setStats(statsRes)
        setTickets((ticketsRes.tickets || []).slice(0, 5))
      })
      .finally(() => setLoading(false))
  }, [days])

  return (
    <div dir="rtl" className="min-h-screen bg-[#05070b] p-6 text-white">
      <style>{`
        .gm-scope * { box-sizing: border-box; }
      `}</style>
      <div className="gm-scope mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white">داشبورد گیمینت</h1>
            <p className="mt-1 text-xs text-white/40">خلاصه‌ی عملکرد فروشگاه بر اساس داده‌های واقعی</p>
          </div>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-xl border border-white/10 bg-[#0a0d14] px-3 py-2 text-xs font-bold text-white outline-none"
          >
            <option value={7}>۷ روز گذشته</option>
            <option value={30}>۳۰ روز گذشته</option>
            <option value={90}>۹۰ روز گذشته</option>
          </select>
        </div>

        {loading || !stats ? (
          <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-10 text-center text-sm text-white/40">
            در حال بارگذاری...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
              <StatCard label="کل فروش (تومان)" value={toman(stats.total_sales)} icon="$" />
              <StatCard
                label="سود خالص (تومان)"
                value={toman(stats.net_profit)}
                icon="📈"
                hint={!stats.profit_data_complete ? "بر اساس محصولات دارای درصد سود ثبت‌شده" : undefined}
              />
              <StatCard label="سفارش‌های تکمیل شده" value={fa(stats.completed_orders)} icon="✔" />
              <StatCard label="مشتریان جدید" value={fa(stats.new_customers)} icon="👤" />
              <StatCard label="اکانت‌های فعال" value={fa(stats.capacity_accounts.active)} icon="👥" />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
              <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                <h2 className="mb-4 text-sm font-bold text-white">نمودار فروش</h2>
                <SalesChart data={stats.chart} />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                <h2 className="mb-4 text-sm font-bold text-white">پرفروش‌ترین محصولات</h2>
                <div className="flex flex-col gap-3">
                  {stats.top_products.length === 0 && (
                    <p className="text-xs text-white/35">سفارشی در این بازه ثبت نشده.</p>
                  )}
                  {stats.top_products.map((p, i) => (
                    <div key={p.product_id} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple-500/15 text-[11px] font-black text-purple-300">
                        {fa(i + 1)}
                      </span>
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                        {p.thumbnail && <img src={p.thumbnail} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">{p.title}</p>
                        <p className="text-[11px] text-white/40">فروش: {fa(p.count)}</p>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-white/70">{toman(p.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                  <h2 className="mb-4 text-sm font-bold text-white">سفارش‌های اخیر</h2>
                  <div className="flex flex-col divide-y divide-white/[0.06]">
                    {stats.recent_orders.length === 0 && (
                      <p className="text-xs text-white/35">سفارشی در این بازه ثبت نشده.</p>
                    )}
                    {stats.recent_orders.map((o) => {
                      const st = orderStatusLabel(o)
                      return (
                        <div key={o.id} className="flex items-center gap-3 py-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                            {o.thumbnail && <img src={o.thumbnail} alt="" className="h-full w-full object-cover" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-white">
                              #GM-{fa(o.display_id)} {o.title ? `· ${o.title}` : ""}
                            </p>
                            <p className="text-[11px] text-white/40">
                              {new Date(o.created_at).toLocaleDateString("fa-IR")}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs font-bold text-white/70">{toman(o.total)}</span>
                          <span
                            className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold"
                            style={{ color: st.color, backgroundColor: `${st.color}1a` }}
                          >
                            {st.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                  <h2 className="mb-4 text-sm font-bold text-white">آخرین تیکت‌ها</h2>
                  <div className="flex flex-col divide-y divide-white/[0.06]">
                    {tickets.length === 0 && <p className="text-xs text-white/35">تیکتی ثبت نشده.</p>}
                    {tickets.map((t) => (
                      <div key={t.id} className="flex items-center gap-3 py-3">
                        <span
                          className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold ${
                            t.status === "open"
                              ? "bg-amber-400/15 text-amber-300"
                              : "bg-emerald-400/15 text-emerald-300"
                          }`}
                        >
                          {t.status === "open" ? "در انتظار پاسخ" : "بسته شده"}
                        </span>
                        <p className="min-w-0 flex-1 truncate text-xs font-bold text-white">{t.subject}</p>
                        <span className="shrink-0 text-[11px] text-white/40">{t.customer_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                  <h2 className="mb-4 text-sm font-bold text-white">وضعیت اکانت‌های ظرفیتی</h2>
                  <DonutChart
                    total={stats.capacity_accounts.total}
                    segments={[
                      { label: "فعال", value: stats.capacity_accounts.active, color: "#a855f7" },
                      { label: "در انتظار", value: stats.capacity_accounts.pending, color: "#c4b5fd" },
                      { label: "منقضی شده", value: stats.capacity_accounts.expired, color: "#f59e0b" },
                      { label: "معلق", value: stats.capacity_accounts.suspended, color: "#f43f5e" },
                    ]}
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
                  <h2 className="mb-4 text-sm font-bold text-white">خلاصه فروش</h2>
                  <div className="flex flex-col gap-3 text-sm">
                    <SummaryRow label="مجموع فروش دوره" value={toman(stats.total_sales)} />
                    <SummaryRow label="سفارش‌های دوره" value={fa(stats.total_orders)} />
                    <SummaryRow label="مشتریان جدید" value={fa(stats.new_customers)} />
                    <SummaryRow
                      label="میانگین ارزش سفارش"
                      value={stats.total_orders > 0 ? toman(stats.total_sales / stats.total_orders) : "—"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const StatCard = ({ label, value, icon, hint }: { label: string; value: string; icon: string; hint?: string }) => (
  <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-4" title={hint}>
    <span className="grid h-9 w-9 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
      {icon}
    </span>
    <p className="mt-3 text-base font-black text-white">{value}</p>
    <p className="mt-0.5 text-[11px] text-white/40">{label}</p>
  </div>
)

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-white/45">{label}</span>
    <span className="font-bold text-white">{value}</span>
  </div>
)

const SalesChart = ({ data }: { data: { date: string; sales: number; profit: number }[] }) => {
  if (data.length === 0) {
    return <div className="grid h-64 place-items-center text-xs text-white/35">داده‌ای برای نمایش نیست.</div>
  }

  const width = 900
  const height = 260
  const padding = 30
  const maxVal = Math.max(...data.map((d) => Math.max(d.sales, d.profit)), 1)

  const pointsFor = (key: "sales" | "profit") =>
    data.map((d, i) => {
      const x = padding + (i / Math.max(data.length - 1, 1)) * (width - padding * 2)
      const y = height - padding - (d[key] / maxVal) * (height - padding * 2)
      return `${x},${y}`
    })

  const salesPoints = pointsFor("sales")
  const profitPoints = pointsFor("profit")
  const areaPath = `M${padding},${height - padding} L${salesPoints.join(" L")} L${width - padding},${height - padding} Z`

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]" style={{ direction: "ltr" }}>
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padding}
            x2={width - padding}
            y1={padding + f * (height - padding * 2)}
            y2={padding + f * (height - padding * 2)}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        <path d={areaPath} fill="url(#salesFill)" />
        <polyline points={salesPoints.join(" ")} fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline
          points={profitPoints.join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-3 flex items-center gap-5 text-[11px] text-white/45">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-purple-400" /> فروش (تومان)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded border-t border-dashed border-white/40" /> سود (تومان)
        </span>
      </div>
    </div>
  )
}

const DonutChart = ({
  total,
  segments,
}: {
  total: number
  segments: { label: string; value: number; color: string }[]
}) => {
  const size = 160
  const stroke = 22
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  let offset = 0

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {total > 0 &&
          segments.map((s) => {
            const fraction = s.value / total
            const dash = fraction * circumference
            const circle = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            )
            offset += dash
            return circle
          })}
        <text x="50%" y="47%" textAnchor="middle" className="fill-white text-[22px] font-black">
          {total.toLocaleString("fa-IR")}
        </text>
        <text x="50%" y="62%" textAnchor="middle" className="fill-white/40 text-[10px]">
          کل اکانت‌ها
        </text>
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-white/60">{s.label}</span>
            <span className="font-bold text-white">
              {s.value.toLocaleString("fa-IR")} ({total > 0 ? Math.round((s.value / total) * 100) : 0}٪)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "داشبورد گیمینت",
})

export default DashboardPro
