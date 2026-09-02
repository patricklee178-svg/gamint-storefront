import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "اطلاعات حساب کاربری | گیمینت",
  description: "مشاهده و ویرایش پروفایل شما در گیمینت.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div dir="rtl" className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">اطلاعات حساب کاربری</h1>
        <p className="mt-1.5 text-sm text-white/45">
          نام، ایمیل، شماره موبایل و آدرس صورت‌حساب خودت رو اینجا ویرایش کن.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full rounded-2xl bg-white p-6">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}
