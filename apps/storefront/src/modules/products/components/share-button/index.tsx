"use client"

import { useState } from "react"

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" />
    <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" strokeLinecap="round" />
  </svg>
)

const ShareButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        return
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold text-white/45 transition hover:text-white"
    >
      <ShareIcon />
      {copied ? "لینک کپی شد" : "اشتراک‌گذاری"}
    </button>
  )
}

export default ShareButton
