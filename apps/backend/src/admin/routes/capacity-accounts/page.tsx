import { defineRouteConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type CapacityAccount = {
  id: string
  product_id: string
  product_title: string
  label: string
  status: "active" | "pending" | "expired" | "suspended"
  customer_id: string | null
  order_id: string | null
  notes: string | null
  created_at: string
}

type Product = { id: string; title: string }

const statusMeta: Record<CapacityAccount["status"], { label: string; color: string }> = {
  active: { label: "فعال", color: "#a855f7" },
  pending: { label: "در انتظار", color: "#c4b5fd" },
  expired: { label: "منقضی شده", color: "#f59e0b" },
  suspended: { label: "معلق", color: "#f43f5e" },
}

const CapacityAccountsPage = () => {
  const [accounts, setAccounts] = useState<CapacityAccount[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ product_id: "", label: "", status: "pending", notes: "" })
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    fetch("/admin/dashboard/capacity-accounts?limit=200", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setAccounts(res.capacity_accounts || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    fetch("/admin/products?limit=200&fields=id,title", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setProducts(res.products || []))
  }, [])

  const handleCreate = async () => {
    if (!form.product_id || !form.label) return
    setSaving(true)
    const product = products.find((p) => p.id === form.product_id)
    await fetch("/admin/dashboard/capacity-accounts", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: form.product_id,
        product_title: product?.title || "",
        label: form.label,
        status: form.status,
        notes: form.notes || undefined,
      }),
    })
    setSaving(false)
    setShowForm(false)
    setForm({ product_id: "", label: "", status: "pending", notes: "" })
    load()
  }

  const handleStatusChange = async (id: string, status: string) => {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, status: status as CapacityAccount["status"] } : a)))
    await fetch(`/admin/dashboard/capacity-accounts/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
  }

  const handleDelete = async (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id))
    await fetch(`/admin/dashboard/capacity-accounts/${id}`, { method: "DELETE", credentials: "include" })
  }

  const counts = accounts.reduce(
    (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
    {} as Record<string, number>
  )

  return (
    <div dir="rtl" className="min-h-screen bg-[#05070b] p-6 text-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white">اکانت‌های ظرفیتی</h1>
            <p className="mt-1 text-xs text-white/40">مدیریت اکانت‌های ظرفیتی و وضعیت هرکدوم</p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-purple-500"
          >
            {showForm ? "بستن فرم" : "+ افزودن اکانت"}
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(statusMeta) as CapacityAccount["status"][]).map((s) => (
            <div key={s} className="rounded-2xl border border-white/10 bg-[#0a0d14] p-4">
              <p className="text-lg font-black" style={{ color: statusMeta[s].color }}>
                {(counts[s] || 0).toLocaleString("fa-IR")}
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">{statusMeta[s].label}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="mb-4 rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select
                value={form.product_id}
                onChange={(e) => setForm({ ...form, product_id: e.target.value })}
                className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none"
              >
                <option value="">انتخاب محصول</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              <input
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                placeholder="برچسب اکانت (مثلاً ظرفیت ۲ - شماره ۵)"
                className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-white/25"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none"
              >
                {(Object.keys(statusMeta) as CapacityAccount["status"][]).map((s) => (
                  <option key={s} value={s}>
                    {statusMeta[s].label}
                  </option>
                ))}
              </select>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="یادداشت (اختیاری)"
                className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>
            <button
              type="button"
              onClick={handleCreate}
              disabled={saving || !form.product_id || !form.label}
              className="mt-3 rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
            >
              ثبت اکانت
            </button>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-[#0a0d14]">
          {loading ? (
            <p className="p-6 text-center text-xs text-white/40">در حال بارگذاری...</p>
          ) : accounts.length === 0 ? (
            <p className="p-6 text-center text-xs text-white/40">هنوز اکانتی ثبت نشده.</p>
          ) : (
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {accounts.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{a.label}</p>
                    <p className="mt-0.5 text-[11px] text-white/40">{a.product_title}</p>
                  </div>
                  <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    className="h-9 rounded-lg border border-white/10 bg-white/[0.04] px-2 text-xs font-bold text-white outline-none"
                    style={{ color: statusMeta[a.status].color }}
                  >
                    {(Object.keys(statusMeta) as CapacityAccount["status"][]).map((s) => (
                      <option key={s} value={s}>
                        {statusMeta[s].label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="rounded-lg border border-white/10 px-3 py-2 text-[11px] font-bold text-white/40 transition hover:border-rose-400/40 hover:text-rose-400"
                  >
                    حذف
                  </button>
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
  label: "اکانت‌های ظرفیتی",
})

export default CapacityAccountsPage
