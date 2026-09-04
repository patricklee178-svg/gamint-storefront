import repeat from "@lib/util/repeat"

const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-white/10 ${className}`} />
)

const SkeletonCartPage = () => {
  return (
    <div dir="rtl" className="min-h-[calc(100vh-72px)] bg-[#05070b] py-8 text-white">
      <div className="content-container">
        <Bar className="h-4 w-40" />

        <div className="mt-6 mb-8 h-16 rounded-2xl border border-white/10 bg-[#0a0d14]" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
              <Bar className="mb-4 h-4 w-32" />
              <div className="flex flex-col gap-4">
                {repeat(3).map((index) => (
                  <div key={index} className="flex items-center gap-4 border-t border-white/5 pt-4 first:border-t-0 first:pt-0">
                    <Bar className="h-16 w-16 shrink-0 rounded-xl" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Bar className="h-4 w-1/2" />
                      <Bar className="h-3 w-1/3" />
                    </div>
                    <Bar className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-[#0a0d14] p-5 sm:grid-cols-4">
              {repeat(4).map((index) => (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <Bar className="h-9 w-9 rounded-lg" />
                  <Bar className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#0a0d14] p-5">
              <Bar className="mb-4 h-4 w-24" />
              <div className="flex flex-col gap-3">
                <Bar className="h-3 w-full" />
                <Bar className="h-3 w-full" />
                <Bar className="h-10 w-full rounded-xl" />
              </div>
            </div>
            <div className="h-24 rounded-2xl border border-white/10 bg-[#0a0d14]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
