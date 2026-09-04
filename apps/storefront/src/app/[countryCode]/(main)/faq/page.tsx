import { Metadata } from "next"
import { PageHero } from "@modules/marketing/components"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "سوالات متداول | گیمینت",
  description: "پاسخ سوالات پرتکرار درباره خرید، تحویل، فعال‌سازی و پشتیبانی محصولات گیمینت",
}

const sections: { title: string; body: string[] }[] = [
  {
    title: "بعد از خرید، محصول رو چطور و کِی تحویل می‌گیرم؟",
    body: [
      "بیشتر سفارش‌ها بلافاصله یا در کوتاه‌ترین زمان ممکن پس از تأیید پرداخت، به‌صورت کد فعال‌سازی یا اطلاعات اکانت در همون صفحه سفارش و ایمیل شما قرار می‌گیره.",
      "برای عنوان‌های پیش‌فروش، تحویل دقیقاً هم‌زمان با تاریخ رسمی عرضه‌ی بازی از سوی ناشر انجام می‌شه.",
    ],
  },
  {
    title: "اکانت ظرفیتی چیه و چه فرقی با خرید مستقیم بازی داره؟",
    body: [
      "اکانت ظرفیتی یعنی بازی روی یک اکانت پلی‌استیشن مشترک با چند نفر دیگه فعال می‌شه که هزینه‌ی نهایی رو برای شما به‌مراتب پایین‌تر می‌آره.",
      "نکته مهم: نباید رمز عبور اکانت ظرفیتی رو تغییر بدید، چون این اکانت بین چند مشتری مشترکه و تغییر رمز باعث از دسترس خارج شدن بقیه می‌شه.",
    ],
  },
  {
    title: "اگه توی فعال‌سازی یا کد تحویلی مشکلی پیش بیاد چی؟",
    body: [
      "کافیه از طریق صفحه پشتیبانی یا تیکت حساب کاربری موضوع رو مطرح کنید؛ تیم گیمینت مشکل رو بررسی و در سریع‌ترین زمان رفع یا محصول جایگزین می‌کنه.",
    ],
  },
  {
    title: "چطور می‌تونم سفارش‌هام رو پیگیری کنم؟",
    body: [
      "از بخش «حساب کاربری › سفارش‌های من» می‌تونید وضعیت و جزئیات همه‌ی سفارش‌های قبلی و فعلی خودتون رو ببینید.",
    ],
  },
  {
    title: "روش‌های پرداخت گیمینت چیه؟",
    body: [
      "پرداخت از طریق درگاه‌های بانکی معتبر و امن انجام می‌شه. گیمینت هیچ‌وقت اطلاعات کامل کارت بانکی یا رمز دوم شما رو ذخیره یا مشاهده نمی‌کنه.",
    ],
  },
  {
    title: "آیا امکان کنسل کردن یا مرجوع کردن سفارش هست؟",
    body: [
      "چون محصولات گیمینت دیجیتالی هستن، بعد از تحویل کد یا اطلاعات اکانت امکان کنسلی وجود نداره؛ مگر در موارد اثبات‌شده‌ی نقص یا عدم مطابقت که تیم پشتیبانی موضوع رو بررسی و جبران می‌کنه.",
    ],
  },
  {
    title: "برای پیش‌فروش‌ها همین الان باید کل مبلغ رو پرداخت کنم؟",
    body: [
      "بله، سفارش پیش‌فروش هم مثل خرید عادی نهایی می‌شه و شما جایگاه خودتون رو برای تحویل در روز عرضه رسمی بازی تضمین می‌کنید.",
    ],
  },
]

export default function FaqPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <PageHero
          eyebrow="راهنما"
          title="سوالات متداول"
          description="پاسخ پرتکرارترین سوالات مشتریان گیمینت درباره خرید، تحویل و پشتیبانی رو اینجا پیدا می‌کنید."
        />

        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0d14] p-6 sm:p-8">
          {sections.map((section, index) => (
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a0d14] p-6 text-center sm:p-8">
          <p className="text-sm font-bold text-white">سوالت رو پیدا نکردی؟</p>
          <p className="mt-2 text-xs leading-6 text-white/45">
            تیم پشتیبانی گیمینت آماده‌ی پاسخگویی به شماست.
          </p>
          <LocalizedClientLink
            href="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
          >
            تماس با پشتیبانی
          </LocalizedClientLink>
        </div>
      </div>
    </main>
  )
}
