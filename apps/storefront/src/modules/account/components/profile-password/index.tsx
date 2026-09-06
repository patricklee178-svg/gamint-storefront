"use client"

import { useActionState, useEffect, useRef } from "react"
import Input from "@modules/common/components/input"
import { updateCustomerPassword } from "@lib/data/customer"

const ProfilePassword = () => {
  const [state, formAction, isPending] = useActionState(
    updateCustomerPassword,
    null
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="rounded-2xl border border-white/10 bg-[#0a0d14] p-6">
      <p className="text-sm font-bold text-white">تغییر رمز عبور</p>
      <p className="mt-1 text-xs leading-6 text-white/40">
        برای تغییر رمز عبور، ابتدا رمز فعلی‌ت رو وارد کن.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <Input
          label="رمز عبور فعلی"
          name="old_password"
          type="password"
          required
          autoComplete="current-password"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="رمز عبور جدید"
            name="new_password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <Input
            label="تکرار رمز عبور جدید"
            name="confirm_password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-3 text-xs text-rose-400">{state.error}</p>
      )}
      {state?.success && (
        <p className="mt-3 text-xs text-emerald-400">
          رمز عبورت با موفقیت تغییر کرد.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "در حال ثبت..." : "تغییر رمز عبور"}
      </button>
    </form>
  )
}

export default ProfilePassword
