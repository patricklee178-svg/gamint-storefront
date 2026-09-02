"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const particles = [
  { left: "6%", size: 3, delay: "0s", duration: "7s" },
  { left: "14%", size: 2, delay: "1.2s", duration: "9s" },
  { left: "22%", size: 4, delay: "2.4s", duration: "6.5s" },
  { left: "31%", size: 2, delay: "0.6s", duration: "8s" },
  { left: "40%", size: 3, delay: "3.1s", duration: "7.5s" },
  { left: "49%", size: 2, delay: "1.8s", duration: "9.5s" },
  { left: "58%", size: 4, delay: "0.3s", duration: "6.8s" },
  { left: "67%", size: 2, delay: "2.9s", duration: "8.4s" },
  { left: "75%", size: 3, delay: "1.5s", duration: "7.2s" },
  { left: "83%", size: 2, delay: "3.6s", duration: "9.2s" },
  { left: "91%", size: 3, delay: "0.9s", duration: "6.6s" },
  { left: "97%", size: 2, delay: "2.1s", duration: "8.8s" },
]

const perks = [
  {
    title: "تحویل آنی",
    text: "کدهای بازی و گیفت کارت بلافاصله بعد از خرید در حساب شما فعال می‌شن.",
  },
  {
    title: "پشتیبانی واقعی",
    text: "تیم پشتیبانی گیمینت همیشه پاسخگوی سوالات و مشکلات شماست.",
  },
  {
    title: "پرداخت امن",
    text: "تمام تراکنش‌ها رمزنگاری‌شده و کاملا امن انجام می‌شن.",
  },
]

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
    <div dir="rtl" className="relative min-h-[calc(100vh-72px)] w-full overflow-hidden bg-[#05070b] text-white">
      <style>{`
        @keyframes gmDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: .55; }
          50% { transform: translate(-120px, 90px) scale(1.35); opacity: .95; }
        }
        @keyframes gmDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: .4; }
          50% { transform: translate(110px, -80px) scale(1.3); opacity: .8; }
        }
        @keyframes gmDrift3 {
          0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: .35; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: .85; }
        }
        @keyframes gmPulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,.45); transform: scale(1); }
          50% { box-shadow: 0 0 0 10px rgba(168,85,247,0); transform: scale(1.06); }
        }
        @keyframes gmRise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: .9; }
          90% { opacity: .5; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .gm-particle {
          position: absolute;
          bottom: -10px;
          border-radius: 9999px;
          background: rgb(196 132 252 / 0.85);
          box-shadow: 0 0 8px 2px rgb(168 85 247 / 0.55);
          animation-name: gmRise;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gm-blob-1, .gm-blob-2, .gm-blob-3, .gm-badge-pulse, .gm-particle { animation: none !important; }
        }
      `}</style>

      <div
        className="gm-blob-1 pointer-events-none absolute -top-40 right-1/4 h-[420px] w-[420px] rounded-full bg-purple-600/25 blur-[110px]"
        style={{ animation: "gmDrift1 9s ease-in-out infinite" }}
      />
      <div
        className="gm-blob-2 pointer-events-none absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-fuchsia-600/20 blur-[110px]"
        style={{ animation: "gmDrift2 11s ease-in-out infinite" }}
      />
      <div
        className="gm-blob-3 pointer-events-none absolute right-1/2 top-1/2 h-[260px] w-[260px] rounded-full bg-purple-500/20 blur-[90px]"
        style={{ animation: "gmDrift3 7s ease-in-out infinite" }}
      />

      {particles.map((p, i) => (
        <span
          key={i}
          className="gm-particle pointer-events-none"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden border-l border-white/10 bg-gradient-to-br from-[#0c1018] via-[#0a0d14] to-[#05070b] px-12 py-14 lg:flex">
          <div>
            <span
              className="gm-badge-pulse inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300"
              style={{ animation: "gmPulseRing 2.6s ease-in-out infinite" }}
            >
              گیمینت
            </span>
            <h1 className="mt-8 max-w-md text-4xl font-black leading-[1.35]">
              به بزرگ‌ترین فروشگاه دیجیتال بازی ایران خوش اومدی
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/50">
              وارد حساب گیمینت شو تا به سریع‌ترین شکل ممکن بازی، گیفت کارت و اشتراک پلی‌استیشن بخری.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{perk.title}</p>
                  <p className="mt-0.5 text-xs leading-6 text-white/45">{perk.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-14 sm:px-10">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${
                  currentView === LOGIN_VIEW.SIGN_IN
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                ورود
              </button>
              <button
                type="button"
                onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${
                  currentView === LOGIN_VIEW.REGISTER
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950/40"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                ثبت‌نام
              </button>
            </div>

            {currentView === LOGIN_VIEW.SIGN_IN ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
