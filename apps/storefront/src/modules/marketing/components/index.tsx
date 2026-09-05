import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type Game = {
  title: string
  platform: string
  price: string
  image: string
  badge?: string
  handle?: string
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" />
  </svg>
)

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-t-0 border-white/10 bg-[#0c1018] shadow-[0_16px_50px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_18px_55px_rgba(124,58,237,.16)]">
      <LocalizedClientLink
        href={game.handle ? `/products/${game.handle}` : "/store"}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-[#111827] [transform:translateZ(0)]">
          <img
            src={game.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-80 blur-xl"
          />
          <img
            src={game.image}
            alt={game.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain transition duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1018] via-transparent to-transparent" />
          {game.badge && (
            <span className="absolute right-2.5 top-2.5 rounded-lg border border-purple-300/25 bg-purple-600/90 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-purple-950/40">
              {game.badge}
            </span>
          )}
          <span className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/50 text-sm text-white backdrop-blur">♡</span>
        </div>
        <div className="p-3.5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-[13px] font-bold text-white">{game.title}</h3>
            <span className="shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-bold text-gray-300">{game.platform}</span>
          </div>
          <div className="flex items-end justify-between gap-2">
            <p className="text-xs font-semibold text-gray-100"><span className="text-[11px] text-gray-500">از </span>{game.price} <span className="text-[10px] text-gray-400">تومان</span></p>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-gray-950 transition group-hover:bg-purple-500 group-hover:text-white"><CartIcon /></span>
          </div>
        </div>
      </LocalizedClientLink>
    </article>
  )
}

export function GameSection({
  title,
  eyebrow,
  games,
  viewAllHref = "/store",
}: {
  title: string
  eyebrow: string
  games: Game[]
  viewAllHref?: string
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold text-purple-400">{eyebrow}</p>
          <h2 className="text-xl font-black text-white sm:text-2xl">{title}</h2>
        </div>
        <LocalizedClientLink href={viewAllHref} className="flex items-center gap-2 text-xs font-semibold text-purple-400 transition hover:text-purple-300">
          مشاهده همه <ArrowIcon />
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        {games.map((game) => <GameCard key={game.title} game={game} />)}
      </div>
    </section>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  video,
  videoPoster,
}: {
  eyebrow: string
  title: string
  description: string
  image?: string
  video?: string
  videoPoster?: string
}) {
  return (
    <section className="relative mt-4 overflow-hidden rounded-2xl border border-x-white/10 border-b-white/10 border-t-0 bg-[#0a0d14] sm:mt-5">
      {video && (
        <>
          <video
            src={video}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
        </>
      )}
      {!video && image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/40 to-transparent" />
        </>
      )}
      <div className="relative z-10 px-6 py-14 sm:px-10 sm:py-20">
        <p className="mb-2 text-xs font-bold text-purple-400">{eyebrow}</p>
        <h1 className="max-w-xl text-3xl font-black text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-lg text-sm leading-7 text-gray-400">{description}</p>
      </div>
    </section>
  )
}
