import { Metadata } from "next"
import { retrieveCustomer } from "@lib/data/customer"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactTicketForm from "@modules/contact/components/ticket-form"

export const metadata: Metadata = {
  title: "تماس با پشتیبانی | گیمینت",
  description: "برای هر سوالی قبل یا بعد از خرید، با پشتیبانی گیمینت در تماس باش.",
}

export default async function ContactPage() {
  const customer = await retrieveCustomer()

  return (
    <main dir="rtl" className="min-h-screen bg-[#05070b] pb-16 text-white">
      <div className="mx-auto w-full max-w-2xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold text-purple-400">همیشه کنار شما</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">تماس با پشتیبانی</h1>
          <p className="mt-3 text-sm leading-7 text-white/45">
            قبل و بعد از خرید، برای انتخاب، فعال‌سازی و رفع مشکلات، تیم گیمینت پاسخگوعه.
          </p>
        </div>

        {customer ? (
          <ContactTicketForm />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-8 text-center">
            <p className="text-sm font-bold text-white">برای ثبت تیکت، اول وارد حساب کاربریت شو</p>
            <p className="mt-2 text-xs leading-6 text-white/45">
              پیگیری تیکت‌ها و پاسخ‌ها از طریق حساب کاربریت انجام می‌شه، برای همین اول باید وارد بشی یا ثبت‌نام کنی.
            </p>
            <LocalizedClientLink
              href="/account"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
            >
              ورود / ثبت‌نام
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </main>
  )
}
