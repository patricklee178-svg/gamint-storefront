import { Metadata } from "next"
import { PageHero } from "@modules/marketing/components"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "راهنمای خرید | گیمینت",
  description: "راهنمای گام‌به‌گام خرید بازی، اکانت ظرفیتی، پیش‌فروش و گیفت کارت از گیمینت",
}

const steps: { title: string; body: string[] }[] = [
  {
    title: "۱. محصول موردنظرت رو پیدا کن",
    body: [
      "از بخش بازی‌های PS5، اکانت ظرفیتی، پیش‌فروش یا گیفت کارت، محصولی که می‌خوای رو انتخاب کن. توی صفحه هر محصول، توضیحات، تصاویر واقعی از خود بازی و روش فعال‌سازی رو می‌بینی.",
    ],
  },
  {
    title: "۲. نوع محصول رو انتخاب کن",
    body: [
      "برای خیلی از بازی‌ها هم گزینه‌ی خرید مستقیم (روی اکانت خودتون) و هم اکانت ظرفیتی (قیمت پایین‌تر، اکانت مشترک) موجوده. با توجه به بودجه و نیازت، یکی رو انتخاب کن.",
      "برای عناوین پیش‌فروش، همین الان جایگاهت رو با پرداخت رزرو می‌کنی و دقیقاً روز عرضه‌ی رسمی تحویل می‌گیری.",
    ],
  },
  {
    title: "۳. به سبد خرید اضافه و پرداخت کن",
    body: [
      "بعد از افزودن به سبد خرید، اطلاعات لازم رو وارد و از طریق درگاه بانکی معتبر پرداخت رو نهایی کن. اطلاعات کارت بانکی شما مستقیم و امن توسط درگاه پرداخت پردازش می‌شه.",
    ],
  },
  {
    title: "۴. محصول رو تحویل بگیر",
    body: [
      "بلافاصله یا در کوتاه‌ترین زمان ممکن، کد فعال‌سازی یا اطلاعات اکانت در صفحه سفارش و ایمیل شما قرار می‌گیره. مراحل فعال‌سازی هر محصول هم توی همون صفحه سفارش توضیح داده شده.",
    ],
  },
  {
    title: "۵. سفارش‌هات رو پیگیری کن",
    body: [
      "از بخش «حساب کاربری › سفارش‌های من» هر وقت بخوای می‌تونی وضعیت سفارش‌های قبلی و فعلیت رو ببینی.",
    ],
  },
]

const tips: string[] = [
  "برای اکانت‌های ظرفیتی، هیچ‌وقت رمز عبور اکانت رو تغییر نده؛ چون این اکانت بین چند مشتری مشترکه.",
  "قبل از خرید پیش‌فروش، تاریخ عرضه‌ی رسمی رو توی صفحه محصول چک کن.",
  "اگه مطمئن نیستی کدوم نسخه (PS4/PS5) مناسب کنسول توئه، قبل از خرید با پشتیبانی هماهنگ کن.",
]

export default function BuyingGuidePage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="راهنما"
          title="راهنمای خرید"
          description="از انتخاب محصول تا تحویل و فعال‌سازی؛ همه‌ی مراحل خرید از گیمینت رو اینجا قدم‌به‌قدم توضیح دادیم."
        />

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0d14] p-6 sm:p-8">
          {steps.map((section, index) => (
            <section
              key={section.title}
              className={index > 0 ? "mt-8 border-t border-white/10 pt-8" : ""}
            >
              <h2 className="text-lg font-black text-white sm:text-xl">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-8 text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0d14] p-6 sm:p-8">
          <h2 className="text-lg font-black text-white sm:text-xl">نکات مهم</h2>
          <ul className="mt-4 space-y-3">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm leading-8 text-gray-400">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0d14] p-6 text-center sm:p-8">
          <p className="text-sm font-bold text-white">سوال دیگه‌ای داری؟</p>
          <p className="mt-2 text-xs leading-6 text-white/45">
            سوالات متداول رو بررسی کن یا مستقیم با پشتیبانی گیمینت در تماس باش.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <LocalizedClientLink
              href="/faq"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
            >
              سوالات متداول
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
            >
              تماس با پشتیبانی
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </main>
  )
}
