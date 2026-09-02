"use client"

import { useActionState } from "react"
import AuthInput from "@modules/account/components/auth-input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="flex w-full flex-col" data-testid="register-page">
      <h1 className="text-xl font-black text-white">ساخت حساب گیمینت</h1>
      <p className="mt-1.5 text-sm text-white/45">
        عضو گیمینت شو و به سریع‌ترین شکل بازی، گیفت کارت و اشتراک بخر.
      </p>

      {message?.state === "verification_required" && (
        <div
          className="mt-6 w-full rounded-xl border border-purple-400/20 bg-purple-500/10 p-4 text-center text-sm leading-6 text-white/70"
          data-testid="register-verification-message"
        >
          یک لینک تایید برای <strong className="text-white">{message.email}</strong> ارسال شد.
          ایمیلت رو چک کن و بعد از تایید وارد شو.
        </div>
      )}

      <form className="mt-6 flex w-full flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-4">
          <div className="grid grid-cols-2 gap-3">
            <AuthInput
              label="نام"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <AuthInput
              label="نام خانوادگی"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <AuthInput
            label="ایمیل"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <AuthInput
            label="شماره موبایل"
            name="phone"
            type="tel"
            dir="ltr"
            placeholder="09xxxxxxxxx"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <AuthInput
            label="رمز عبور"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />

        <p className="mt-5 text-center text-xs leading-6 text-white/35">
          با ساخت حساب، شرایط استفاده و حریم خصوصی گیمینت رو می‌پذیری.
        </p>

        <SubmitButton
          className="mt-3 h-12 w-full rounded-xl !bg-purple-600 text-sm font-bold hover:!bg-purple-500"
          data-testid="register-button"
        >
          ساخت حساب
        </SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-white/45">
        قبلا عضو شدی؟{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="font-bold text-purple-400 transition hover:text-purple-300"
        >
          وارد شو
        </button>
      </p>
    </div>
  )
}

export default Register
