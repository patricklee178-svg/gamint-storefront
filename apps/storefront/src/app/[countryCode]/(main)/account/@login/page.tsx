import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "ورود | ثبت‌نام گیمینت",
  description: "وارد حساب کاربری گیمینت خود شوید یا یک حساب جدید بسازید.",
}

export default function Login() {
  return <LoginTemplate />
}
