import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "آدرس‌ها | گیمینت",
  description: "مشاهده و مدیریت آدرس‌های شما.",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div dir="rtl" className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-black text-white">آدرس‌ها</h1>
        <p className="mt-1.5 text-sm text-white/45">
          آدرس‌های خودت رو اینجا مدیریت کن تا موقع خرید سریع‌تر انتخابشون کنی.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
