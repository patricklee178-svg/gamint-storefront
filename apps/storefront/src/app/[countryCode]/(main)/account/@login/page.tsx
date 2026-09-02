import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "وارد حساب کاربری گیمینت خود شوید.",
}

export default function Login() {
  return <LoginTemplate />
}
