import { ShieldCheckIcon, CheckIcon } from "@modules/cart/icons"

const points = [
  "ارائه اکانت‌های قانونی و تضمینی",
  "قیمت‌های رقابتی و منصفانه",
  "تحویل سریع و پشتیبانی واقعی",
  "تجربه خرید امن و راحت",
]

const TrustCard = () => (
  <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
    <div className="mb-4 flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
        <ShieldCheckIcon className="h-4 w-4" />
      </span>
      <h2 className="text-sm font-bold text-white">چرا از گیمینت خرید کنیم؟</h2>
    </div>

    <ul className="flex flex-col gap-2.5">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2 text-xs text-white/60">
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
            <CheckIcon className="h-2.5 w-2.5" />
          </span>
          {point}
        </li>
      ))}
    </ul>
  </div>
)

export default TrustCard
