"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroSlide = {
  id: string
  image: string
  alt: string
  objectPosition: string
  publisher: string
  eyebrow: string
  title: string
  accent: string
  accentPrefix?: string
  accentClass: string
  description: string
  badges: string[]
  primaryLabel: string
  secondaryLabel: string
  mirror?: boolean
}

const slides: HeroSlide[] = [
  {
    id: "gta6",
    image: "/images/games/gta6-hero.jpg",
    alt: "Grand Theft Auto VI",
    objectPosition: "50% 0%",
    publisher: "ROCKSTAR GAMES",
    eyebrow: "پیش‌فروش رسمی GAMINT",
    title: "Grand Theft",
    accent: "Auto VI",
    accentClass: "from-fuchsia-400 via-purple-400 to-orange-300",
    description: "افسانه‌ای در راه است؛ تحویل فوری با ضمانت فعال‌سازی.",
    badges: ["دانلود روز انتشار", "ضمانت اصالت", "پشتیبانی ۲۴/۷"],
    primaryLabel: "مشاهده و پیش‌خرید",
    secondaryLabel: "دیدن تریلر بازی",
  },
  {
    id: "fc27",
    image: "/images/games/fc27-final.png",
    alt: "EA SPORTS FC 27",
    objectPosition: "50% 28%",
    publisher: "EA SPORTS",
    eyebrow: "پیش‌فروش فصل جدید فوتبال",
    title: "EA SPORTS",
    accent: "FC 27",
    accentClass: "from-cyan-300 via-blue-400 to-purple-400",
    description: "نسل تازه فوتبال از راه رسیده؛ پیش‌خرید مطمئن با تحویل سریع.",
    badges: ["تحویل فوری", "نسخه PS5", "ضمانت اصالت"],
    primaryLabel: "پیش‌خرید FC 27",
    secondaryLabel: "مشاهده نسخه‌ها",
    mirror: false,
  },
  {
    id: "mw4",
    image: "/images/games/mw4-hero.webp",
    alt: "Call of Duty Modern Warfare 4",
    objectPosition: "50% 30%",
    publisher: "INFINITY WARD",
    eyebrow: "پیش‌فروش ویژه GAMINT",
    title: "Modern",
    accentPrefix: "Warf",
    accent: "are 4",
    accentClass: "from-white via-gray-300 to-amber-300",
    description: "نبرد مدرن دوباره آغاز می‌شود؛ نسخه PS5 با پشتیبانی کامل GAMINT.",
    badges: ["دانلود روز انتشار", "نسخه PS5", "پشتیبانی ۲۴/۷"],
    primaryLabel: "پیش‌خرید Modern Warfare 4",
    secondaryLabel: "دیدن تریلر بازی",
  },
]

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
    <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function HeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [paused])

  const showPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length)
  const showNext = () => setActive((current) => (current + 1) % slides.length)

  return (
    <section
      className="group/hero relative mt-5 min-h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-[#080b12] shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:min-h-[520px]"
      aria-roledescription="carousel"
      aria-label="بازی‌های ویژه GAMINT"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const isActive = active === index

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${isActive ? "z-10 scale-100 opacity-100" : "pointer-events-none z-0 scale-[1.025] opacity-0"}`}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full max-w-full object-cover transition-transform duration-[6500ms] ease-out"
              style={{
                objectPosition: slide.objectPosition,
                transform: slide.mirror
                  ? `scaleX(-1) scale(${isActive ? 1.035 : 1})`
                  : `scale(${isActive ? 1.035 : 1})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070910]/60 via-transparent to-black/10" />

            <div className="relative z-10 flex min-h-[460px] items-end px-5 py-8 sm:min-h-[520px] sm:items-center sm:px-10 lg:px-16">
              <div className={`ml-auto max-w-xl rounded-3xl border border-white/10 bg-black/30 p-5 text-right backdrop-blur-sm transition-all delay-150 duration-700 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" /> {slide.eyebrow}
                </span>
                <p className="mb-2 text-sm font-semibold tracking-[.22em] text-purple-300">{slide.publisher}</p>
                <h1 className="text-4xl font-black leading-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
                  {slide.title}<br />
                  {slide.accentPrefix && <span className="text-white">{slide.accentPrefix}</span>}
                  <span className={`bg-gradient-to-l ${slide.accentClass} bg-clip-text text-transparent`}>{slide.accent}</span>
                </h1>
                <p className="mt-5 max-w-lg text-sm leading-7 text-gray-300 sm:text-base">{slide.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-gray-300">
                  {slide.badges.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">✓ {item}</span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <LocalizedClientLink href="/store" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-gray-950 shadow-xl transition hover:bg-purple-500 hover:text-white">
                    {slide.primaryLabel} <ArrowIcon />
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/store" className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-purple-400/50 hover:bg-purple-500/10">
                    {slide.secondaryLabel}
                  </LocalizedClientLink>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <button
        type="button"
        onClick={showPrevious}
        className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition hover:border-purple-400/60 hover:bg-purple-500/25 group-hover/hero:opacity-100 sm:grid"
        aria-label="اسلاید قبلی"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={showNext}
        className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition hover:border-purple-400/60 hover:bg-purple-500/25 group-hover/hero:opacity-100 sm:grid"
        aria-label="اسلاید بعدی"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-md">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === index ? "w-8 bg-purple-400" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
            aria-label={`نمایش اسلاید ${index + 1}: ${slide.alt}`}
            aria-current={active === index ? "true" : undefined}
          />
        ))}
      </div>

      <span className="absolute bottom-5 left-6 z-30 hidden text-[10px] font-semibold tracking-[.2em] text-white/45 sm:block">
        0{active + 1} / 0{slides.length}
      </span>
    </section>
  )
}
