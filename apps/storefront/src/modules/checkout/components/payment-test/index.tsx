const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <div
      className={`rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold text-amber-300 ${className || ""}`}
    >
      درگاه پرداخت آنلاین به‌زودی متصل می‌شه؛ فعلاً سفارش مستقیم ثبت و پیگیری می‌شه.
    </div>
  )
}

export default PaymentTest
