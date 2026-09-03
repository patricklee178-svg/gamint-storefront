"use client"

import { useActionState } from "react"
import { submitSupportTicket } from "@lib/data/customer"

const ContactTicketForm = () => {
  const [state, formAction] = useActionState(submitSupportTicket, null)

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
        <p className="text-sm font-bold text-white">تیکت شما ثبت شد</p>
        <p className="mt-2 text-xs leading-6 text-white/50">
          تیم پشتیبانی گیمینت به‌زودی بررسیش می‌کنه و از طریق همین بخش (توی حساب کاربریت) باهات در تماسه.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="rounded-2xl border border-white/10 bg-[#0a0d14] p-6">
      <p className="text-sm font-bold text-white">ثبت تیکت پشتیبانی</p>
      <div className="mt-4 flex flex-col gap-3">
        <input
          name="subject"
          required
          placeholder="موضوع تیکت"
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-400/50"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="توضیحات..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-400/50"
        />
      </div>
      {state?.error && <p className="mt-2 text-xs text-rose-400">{state.error}</p>}
      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
      >
        ارسال تیکت
      </button>
    </form>
  )
}

export default ContactTicketForm
