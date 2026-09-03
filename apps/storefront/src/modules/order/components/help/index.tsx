import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Help = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <h2 className="mb-1.5 text-sm font-bold text-white">نیاز به کمک داری؟</h2>
      <p className="text-xs leading-6 text-white/45">
        برای هر سوالی درباره این سفارش می‌تونی از دکمه «ثبت تیکت جدید» کنار صفحه استفاده کنی یا با{" "}
        <LocalizedClientLink href="/contact" className="font-bold text-purple-400 hover:text-purple-300">
          پشتیبانی گیمینت
        </LocalizedClientLink>{" "}
        در تماس باشی.
      </p>
    </div>
  )
}

export default Help
