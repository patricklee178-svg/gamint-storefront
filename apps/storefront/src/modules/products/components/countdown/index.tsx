"use client"

import { useEffect, useState } from "react"

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const boxes: { key: keyof Remaining; label: string }[] = [
  { key: "seconds", label: "ثانیه" },
  { key: "minutes", label: "دقیقه" },
  { key: "hours", label: "ساعت" },
  { key: "days", label: "روز" },
]

const ReleaseCountdown = ({ targetDate }: { targetDate: string }) => {
  const target = new Date(targetDate).getTime()
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  useEffect(() => {
    if (Number.isNaN(target)) return
    setRemaining(getRemaining(target))
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (Number.isNaN(target) || !remaining) {
    return null
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
      <p className="mb-3 text-center text-xs font-bold text-white/50">زمان باقی‌مانده تا انتشار</p>
      <div className="flex items-center justify-center gap-2">
        {boxes.map((b) => (
          <div key={b.key} className="flex flex-col items-center gap-1">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-lg font-black text-white">
              {remaining[b.key].toLocaleString("fa-IR")}
            </span>
            <span className="text-[10px] text-white/40">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReleaseCountdown
