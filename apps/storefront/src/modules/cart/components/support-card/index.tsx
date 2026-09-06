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
      <a
        href="https://t.me/gamintsup"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-white/70 transition hover:border-[#229ED9]/40 hover:bg-[#229ED9]/10 hover:text-[#229ED9]"
      >
        <TelegramIcon className="h-4 w-4" />
        <span className="text-[10px] font-bold">تلگرام</span>
      </a>
      <a
        href="https://wa.me/989372694786"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-white/70 transition hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-[#25D366]"
      >
        <WhatsappIcon className="h-4 w-4" />
        <span className="text-[10px] font-bold">واتساپ</span>
      </a>
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
