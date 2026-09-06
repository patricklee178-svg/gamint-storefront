import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  keywords: [
    "خرید بازی PS5",
    "خرید بازی PS4",
    "اکانت ظرفیتی پلی استیشن",
    "پیش‌فروش بازی",
    "گیفت کارت PSN",
    "اشتراک PS Plus",
    "گیمینت",
  ],
  icons: {
    icon: [
      { url: "/gamint-favicon.png?v=2", type: "image/png", sizes: "256x256" },
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
    ],
    shortcut: "/gamint-favicon.png?v=2",
    apple: "/gamint-favicon.png?v=2",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fa" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
