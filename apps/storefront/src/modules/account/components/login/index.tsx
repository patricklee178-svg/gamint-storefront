import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import AuthInput from "@modules/account/components/auth-input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="flex w-full flex-col" data-testid="login-page">
      <h1 className="text-xl font-black text-white">خوش برگشتی</h1>
      <p className="mt-1.5 text-sm text-white/45">
        وارد حساب گیمینت خودت شو و به خرید ادامه بده.
      </p>

      {message?.state === "verification_required" && (
        <div
          className="mt-6 w-full rounded-xl border border-purple-400/20 bg-purple-500/10 p-4 text-center text-sm leading-6 text-white/70"
          data-testid="login-verification-message"
        >
          یک لینک تایید برای <strong className="text-white">{message.email}</strong> ارسال شد.
          ایمیلت رو تایید کن و دوباره وارد شو.
        </div>
      )}

      <form className="mt-6 w-full" action={formAction}>
        <div className="flex flex-col w-full gap-4">
          <AuthInput
            label="ایمیل"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <AuthInput
            label="رمز عبور"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />

        <SubmitButton
          data-testid="sign-in-button"
          className="mt-6 h-12 w-full rounded-xl !bg-purple-600 text-sm font-bold hover:!bg-purple-500"
        >
          ورود
        </SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-white/45">
        هنوز عضو گیمینت نیستی؟{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="font-bold text-purple-400 transition hover:text-purple-300"
          data-testid="register-button"
        >
          ثبت‌نام کن
        </button>
      </p>
    </div>
  )
}

export default Login
