import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HeadsetIcon, TelegramIcon, WhatsappIcon, TicketIcon } from "@modules/cart/icons"

const SupportCard = () => (
  <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
    <div className="mb-4 flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
        <HeadsetIcon className="h-4 w-4" />
      </span>
      <div>
        <h2 className="text-sm font-bold text-white">به کمک نیاز دارید؟</h2>
        <p className="text-[11px] text-white/40">با پشتیبانی ما در ارتباط باشید</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      <button
        type="button"
        disabled
        title="به‌زودی فعال می‌شود"
        className="flex cursor-not-allowed flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-white/25"
      >
        <TelegramIcon className="h-4 w-4" />
        <span className="text-[10px] font-bold">تلگرام</span>
      </button>
      <button
        type="button"
        disabled
        title="به‌زودی فعال می‌شود"
        className="flex cursor-not-allowed flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-white/25"
      >
        <WhatsappIcon className="h-4 w-4" />
        <span className="text-[10px] font-bold">واتساپ</span>
      </button>
      <LocalizedClientLink
        href="/account"
        className="flex flex-col items-center gap-1.5 rounded-xl border border-purple-400/20 bg-purple-500/10 py-3 text-purple-300 transition hover:bg-purple-500/20"
      >
        <TicketIcon className="h-4 w-4" />
        <span className="text-[10px] font-bold">تیکت</span>
      </LocalizedClientLink>
    </div>
  </div>
)

export default SupportCard
